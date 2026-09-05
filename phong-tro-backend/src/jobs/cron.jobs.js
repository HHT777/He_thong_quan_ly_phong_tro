const cron = require("node-cron");
const hopDongService = require("../services/hopDong.service");
const { ThongBao, TaiKhoan, KhachThue, DatCoc } = require("../models");

/**
 * Initialize all cron jobs
 */
const initCronJobs = () => {
  // Job 1: BR-02 - Alert contract expiry (run daily at 08:00)
  cron.schedule("0 8 * * *", async () => {
    try {
      console.log("[CRON] Running contract expiry check...");

      const expiringContracts = await hopDongService.getExpiringContracts(30);

      for (const hopDong of expiringContracts) {
        // Find tenant account
        const taiKhoan = await TaiKhoan.findOne({
          where: { ma_khach_thue: hopDong.ma_khach_thue },
        });

        if (taiKhoan) {
          // Create notification
          await ThongBao.create({
            ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
            loai_thong_bao: "HOP_DONG",
            noi_dung: `Hợp đồng của bạn sắp hết hạn vào ngày ${hopDong.ngay_ket_thuc.toLocaleDateString("vi-VN")}`,
            doi_tuong_lien_quan: "HOP_DONG",
          });
        }

        // Also notify landlord
        const landownerAccount = await TaiKhoan.findOne({
          where: { vai_tro: "CHU_TRO", ten_dang_nhap: { $ne: null } },
        });

        if (landownerAccount) {
          await ThongBao.create({
            ma_tai_khoan_nhan: landownerAccount.ma_tai_khoan,
            loai_thong_bao: "HOP_DONG",
            noi_dung: `Hợp đồng của khách ${hopDong.khachThue.ho_ten} sắp hết hạn`,
            doi_tuong_lien_quan: "HOP_DONG",
          });
        }
      }

      console.log(
        `[CRON] Contract expiry check completed. Found ${expiringContracts.length} expiring contracts`,
      );
    } catch (error) {
      console.error("[CRON] Error in contract expiry check:", error);
    }
  });

  // Job 2: BR-05 - Check overdue room deposits (run daily at 09:00)
  cron.schedule("0 9 * * *", async () => {
    try {
      console.log("[CRON] Running overdue room deposit check...");

      const today = new Date();

      const overdueDeposits = await DatCoc.findAll({
        where: {
          trang_thai: "DANG_GIU",
          ngay_het_han_giu: {
            [require("sequelize").Op.lt]: today,
          },
        },
      });

      console.log(
        `[CRON] Found ${overdueDeposits.length} overdue room deposits`,
      );

      // Update status and notify
      for (const deposit of overdueDeposits) {
        await deposit.update({ trang_thai: "HET_HAN" });

        // Notify tenant
        const khachTaiKhoan = await TaiKhoan.findOne({
          where: { ma_khach_thue: deposit.ma_khach_thue },
        });

        if (khachTaiKhoan) {
          await ThongBao.create({
            ma_tai_khoan_nhan: khachTaiKhoan.ma_tai_khoan,
            loai_thong_bao: "DAT_COC",
            noi_dung:
              "Thời hạn giữ phòng của bạn đã hết. Vui lòng liên hệ chủ trọ để xác nhận",
            doi_tuong_lien_quan: "DAT_COC",
          });
        }
      }

      console.log("[CRON] Overdue room deposit check completed");
    } catch (error) {
      console.error("[CRON] Error in overdue room deposit check:", error);
    }
  });

  // Job 3: Monthly bill generation (run on 1st of month at 07:00)
  cron.schedule("0 7 1 * *", async () => {
    try {
      console.log("[CRON] Running monthly bill generation...");

      const { KhoanPhaiThu, HopDong, PhongTro } = require("../models");

      // Get all active contracts
      const activeContracts = await HopDong.findAll({
        where: { trang_thai: "DANG_HIEU_LUC" },
        include: [
          { model: PhongTro, as: "phongTro" },
          { model: KhachThue, as: "khachThue" },
        ],
      });

      const monthYear = new Date().toISOString().substring(0, 7); // YYYY-MM

      for (const hopDong of activeContracts) {
        // Check if bill already exists for this month
        const existingBill = await KhoanPhaiThu.findOne({
          where: {
            ma_phong: hopDong.ma_phong,
            ky: monthYear,
          },
        });

        if (!existingBill) {
          // Create monthly bill
          await KhoanPhaiThu.create({
            ma_phong: hopDong.ma_phong,
            ma_khach_thue: hopDong.ma_khach_thue,
            ky: monthYear,
            tien_phong: hopDong.gia_thue,
            tien_dien: 0, // Will be updated when electricity reading is confirmed
            tien_nuoc: 0,
            phi_dich_vu: hopDong.phi_dich_vu,
            phi_phat_sinh: 0,
            khoan_giam_tru: 0,
            tong_phai_thanh_toan: hopDong.gia_thue + hopDong.phi_dich_vu,
            han_thanh_toan: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              5,
            ),
            trang_thai_thanh_toan: "CHUA_THANH_TOAN",
          });

          // Notify tenant
          const taiKhoan = await TaiKhoan.findOne({
            where: { ma_khach_thue: hopDong.ma_khach_thue },
          });

          if (taiKhoan) {
            await ThongBao.create({
              ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
              loai_thong_bao: "TIEN_PHONG",
              noi_dung: `Khoản phải thanh toán tháng ${monthYear} đã được tạo. Vui lòng thanh toán trước ngày 5 hàng tháng`,
              doi_tuong_lien_quan: "KHOAN_PHAI_THU",
            });
          }
        }
      }

      console.log(
        `[CRON] Monthly bill generation completed. Processed ${activeContracts.length} contracts`,
      );
    } catch (error) {
      console.error("[CRON] Error in monthly bill generation:", error);
    }
  });

  console.log("✓ Cron jobs initialized successfully");
};

module.exports = { initCronJobs };

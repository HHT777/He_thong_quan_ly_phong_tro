const { ThanhToan, KhoanPhaiThu, TaiKhoan, ThongBao } = require("../models");
const khoanPhaiThuService = require("./khoanPhaiThu.service");

class ThanhToanService {
  async createThanhToan(data) {
    // Verify bill exists
    const khoan = await KhoanPhaiThu.findByPk(data.ma_khoan_phai_thu);
    if (!khoan) {
      throw {
        status: 404,
        message: "Hóa đơn không tồn tại",
      };
    }

    // Create payment
    const thanhToan = await ThanhToan.create({
      ...data,
      nguoi_xac_nhan: data.nguoi_xac_nhan || null,
    });

    // Update bill status
    await khoanPhaiThuService.updateBillStatus(data.ma_khoan_phai_thu);

    // Send notification
    const khachThue = await KhoanPhaiThu.findByPk(data.ma_khoan_phai_thu, {
      attributes: ["ma_khach_thue"],
    });

    const taiKhoan = await TaiKhoan.findOne({
      where: { ma_khach_thue: khachThue.ma_khach_thue },
    });

    if (taiKhoan) {
      await ThongBao.create({
        ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
        loai_thong_bao: "THANH_TOAN",
        noi_dung: `Thanh toán ${data.so_tien.toLocaleString("vi-VN")}đ ngày ${new Date(data.ngay_thanh_toan).toLocaleDateString("vi-VN")} đã được ghi nhận`,
        doi_tuong_lien_quan: "THANH_TOAN",
      });
    }

    return thanhToan;
  }

  async getThanhToanList(filters, pagination) {
    const where = {};

    if (filters.ma_khoan_phai_thu) {
      where.ma_khoan_phai_thu = filters.ma_khoan_phai_thu;
    }

    if (filters.phuong_thuc) {
      where.phuong_thuc = filters.phuong_thuc;
    }

    const billInclude = {
      model: KhoanPhaiThu,
      as: "khoanPhaiThu",
      attributes: ["ky", "tong_phai_thanh_toan", "trang_thai_thanh_toan"],
    };
    if (filters.ma_khach_thue) {
      billInclude.where = { ma_khach_thue: filters.ma_khach_thue };
    }

    const { count, rows } = await ThanhToan.findAndCountAll({
      where,
      include: [
        {
          ...billInclude,
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["ngay_thanh_toan", "DESC"]],
    });

    return { total: count, data: rows };
  }

  async getThanhToanById(maThanhToan) {
    const thanhToan = await ThanhToan.findByPk(maThanhToan, {
      include: [
        {
          model: KhoanPhaiThu,
          as: "khoanPhaiThu",
        },
      ],
    });

    if (!thanhToan) {
      throw {
        status: 404,
        message: "Không tìm thấy khoản thanh toán",
      };
    }

    return thanhToan;
  }

  async getPaymentsByBill(maKhoanPhaiThu) {
    return await ThanhToan.findAll({
      where: { ma_khoan_phai_thu: maKhoanPhaiThu },
      order: [["ngay_thanh_toan", "DESC"]],
    });
  }

  async getTotalPaidForBill(maKhoanPhaiThu) {
    const result = await ThanhToan.sum("so_tien", {
      where: { ma_khoan_phai_thu: maKhoanPhaiThu },
    });

    return result || 0;
  }

  async getPaymentStats(startDate, endDate) {
    /**
     * Get payment statistics for a date range
     */
    const payments = await ThanhToan.findAll({
      where: {
        ngay_thanh_toan: {
          [require("sequelize").Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        "phuong_thuc",
        [
          require("sequelize").fn("SUM", require("sequelize").col("so_tien")),
          "total_amount",
        ],
        [
          require("sequelize").fn(
            "COUNT",
            require("sequelize").col("ma_thanh_toan"),
          ),
          "count",
        ],
      ],
      group: ["phuong_thuc"],
      raw: true,
    });

    return payments;
  }
}

module.exports = new ThanhToanService();

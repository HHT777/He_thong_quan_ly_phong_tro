const {
  DatCoc,
  KhachThue,
  PhongTro,
  HopDong,
  TaiKhoan,
  ThongBao,
} = require("../models");
const { Op } = require("sequelize");

class DatCocService {
  async createDatCoc(data) {
    // Verify customer exists
    const khachThue = await KhachThue.findByPk(data.ma_khach_thue);
    if (!khachThue) {
      throw {
        status: 404,
        message: "Khách thuê không tồn tại",
      };
    }

    // Verify room exists
    const phong = await PhongTro.findByPk(data.ma_phong);
    if (!phong) {
      throw {
        status: 404,
        message: "Phòng trọ không tồn tại",
      };
    }

    // Check if room is available
    if (phong.trang_thai !== "TRONG") {
      throw {
        status: 400,
        message:
          "Phòng này không khả dụng. Trạng thái hiện tại: " + phong.trang_thai,
      };
    }

    // Create deposit
    const datCoc = await DatCoc.create({
      ...data,
      trang_thai: "DANG_GIU",
    });

    // Update room status to DA_GIU
    await phong.update({ trang_thai: "DA_GIU" });

    // Send notification
    const taiKhoan = await TaiKhoan.findOne({
      where: { ma_khach_thue: data.ma_khach_thue },
    });

    if (taiKhoan) {
      await ThongBao.create({
        ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
        loai_thong_bao: "DAT_COC",
        noi_dung: `Tiền cọc ${data.so_tien_coc.toLocaleString("vi-VN")} đã được ghi nhận. Thời hạn giữ phòng đến ${new Date(data.ngay_het_han_giu).toLocaleDateString("vi-VN")}`,
        doi_tuong_lien_quan: "DAT_COC",
      });
    }

    return datCoc;
  }

  async getDatCocList(filters, pagination) {
    const where = {};

    if (filters.ma_khach_thue) {
      where.ma_khach_thue = filters.ma_khach_thue;
    }

    if (filters.ma_phong) {
      where.ma_phong = filters.ma_phong;
    }

    if (filters.trang_thai) {
      where.trang_thai = filters.trang_thai;
    }

    const { count, rows } = await DatCoc.findAndCountAll({
      where,
      include: [
        {
          model: KhachThue,
          as: "khachThue",
          attributes: ["ho_ten", "so_dien_thoai"],
        },
        {
          model: PhongTro,
          as: "phongTro",
          attributes: ["ma_phong", "gia_thue"],
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["ngay_dat_coc", "DESC"]],
    });

    return { total: count, data: rows };
  }

  async getDatCocById(maDatCoc) {
    const datCoc = await DatCoc.findByPk(maDatCoc, {
      include: [
        {
          model: KhachThue,
          as: "khachThue",
        },
        {
          model: PhongTro,
          as: "phongTro",
        },
      ],
    });

    if (!datCoc) {
      throw {
        status: 404,
        message: "Không tìm thấy thông tin đặt cọc",
      };
    }

    return datCoc;
  }

  async updateDatCoc(maDatCoc, data) {
    const datCoc = await this.getDatCocById(maDatCoc);

    await datCoc.update(data);

    return datCoc;
  }

  async confirmDeposit(maDatCoc) {
    /**
     * Confirm deposit and transition room status to DANG_THUE
     * This is typically done after signing the contract
     */
    const datCoc = await this.getDatCocById(maDatCoc);

    await datCoc.update({
      trang_thai: "DANG_THUE",
      ngay_xu_ly: new Date(),
    });

    // Update room status
    await PhongTro.update(
      { trang_thai: "DANG_THUE" },
      { where: { ma_phong: datCoc.ma_phong } },
    );

    return datCoc;
  }

  async cancelDeposit(maDatCoc, reason = null) {
    /**
     * Cancel deposit and return room to TRONG status
     */
    const datCoc = await this.getDatCocById(maDatCoc);

    // Check if contract exists
    const hopDong = await HopDong.findOne({
      where: {
        ma_phong: datCoc.ma_phong,
        trang_thai: { [Op.in]: ["DANG_HIEU_LUC", "DA_KET_THUC"] },
      },
    });

    if (hopDong) {
      throw {
        status: 400,
        message: "Không thể hủy cọc khi có hợp đồng liên quan",
      };
    }

    await datCoc.update({
      trang_thai: "DA_HUY",
      ngay_xu_ly: new Date(),
    });

    // Return room to TRONG status
    await PhongTro.update(
      { trang_thai: "TRONG" },
      { where: { ma_phong: datCoc.ma_phong } },
    );

    // Notify customer
    const taiKhoan = await TaiKhoan.findOne({
      where: { ma_khach_thue: datCoc.ma_khach_thue },
    });

    if (taiKhoan) {
      await ThongBao.create({
        ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
        loai_thong_bao: "DAT_COC",
        noi_dung: `Hủy đặt cọc phòng số ${datCoc.ma_phong}. Tiền cọc sẽ được hoàn lại.`,
        doi_tuong_lien_quan: "DAT_COC",
      });
    }

    return datCoc;
  }

  async getDatCocByRoom(maPhong, trangThai = "DANG_GIU") {
    return await DatCoc.findOne({
      where: {
        ma_phong: maPhong,
        trang_thai: trangThai,
      },
    });
  }
}

module.exports = new DatCocService();

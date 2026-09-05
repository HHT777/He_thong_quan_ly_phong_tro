const {
  KhoanPhaiThu,
  ThanhToan,
  PhongTro,
  KhachThue,
  DienNuoc,
  TaiKhoan,
  ThongBao,
} = require("../models");
const { Op } = require("sequelize");

class KhoanPhaiThuService {
  async createKhoanPhaiThu(data) {
    // Verify room and customer exist
    const phong = await PhongTro.findByPk(data.ma_phong);
    if (!phong) {
      throw {
        status: 404,
        message: "Phòng trọ không tồn tại",
      };
    }

    const khachThue = await KhachThue.findByPk(data.ma_khach_thue);
    if (!khachThue) {
      throw {
        status: 404,
        message: "Khách thuê không tồn tại",
      };
    }

    // Check if bill already exists for this month
    const existingBill = await KhoanPhaiThu.findOne({
      where: {
        ma_phong: data.ma_phong,
        ky: data.ky,
      },
    });

    if (existingBill) {
      throw {
        status: 400,
        message: "Hóa đơn tháng này đã tồn tại",
      };
    }

    // Create bill
    const khoanPhaiThu = await KhoanPhaiThu.create({
      ...data,
      trang_thai_thanh_toan: "CHUA_THANH_TOAN",
    });

    // Send notification to customer
    const taiKhoan = await TaiKhoan.findOne({
      where: { ma_khach_thue: data.ma_khach_thue },
    });

    if (taiKhoan) {
      await ThongBao.create({
        ma_tai_khoan_nhan: taiKhoan.ma_tai_khoan,
        loai_thong_bao: "TIEN_PHONG",
        noi_dung: `Hóa đơn tháng ${data.ky} (${data.tong_phai_thanh_toan.toLocaleString("vi-VN")}đ) cần thanh toán trước ${new Date(data.han_thanh_toan).toLocaleDateString("vi-VN")}`,
        doi_tuong_lien_quan: "KHOAN_PHAI_THU",
      });
    }

    return khoanPhaiThu;
  }

  async getKhoanPhaiThuList(filters, pagination) {
    const where = {};

    if (filters.ma_phong) {
      where.ma_phong = filters.ma_phong;
    }

    if (filters.ma_khach_thue) {
      where.ma_khach_thue = filters.ma_khach_thue;
    }

    if (filters.trang_thai_thanh_toan) {
      where.trang_thai_thanh_toan = filters.trang_thai_thanh_toan;
    }

    if (filters.ky) {
      where.ky = filters.ky;
    }

    const { count, rows } = await KhoanPhaiThu.findAndCountAll({
      where,
      include: [
        {
          model: PhongTro,
          as: "phongTro",
          attributes: ["gia_thue"],
        },
        {
          model: KhachThue,
          as: "khachThue",
          attributes: ["ho_ten", "so_dien_thoai"],
        },
        {
          model: ThanhToan,
          as: "thanhToans",
          attributes: ["ma_thanh_toan", "so_tien", "ngay_thanh_toan"],
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["ky", "DESC"]],
    });

    return { total: count, data: rows };
  }

  async getKhoanPhaiThuById(maKhoanPhaiThu) {
    const khoan = await KhoanPhaiThu.findByPk(maKhoanPhaiThu, {
      include: [
        {
          model: PhongTro,
          as: "phongTro",
        },
        {
          model: KhachThue,
          as: "khachThue",
        },
        {
          model: ThanhToan,
          as: "thanhToans",
        },
      ],
    });

    if (!khoan) {
      throw {
        status: 404,
        message: "Không tìm thấy khoản phải thu",
      };
    }

    return khoan;
  }

  async getOutstandingBills(maKhachThue) {
    /**
     * Get all unpaid bills for a customer
     */
    return await KhoanPhaiThu.findAll({
      where: {
        ma_khach_thue: maKhachThue,
        trang_thai_thanh_toan: {
          [Op.in]: ["CHUA_THANH_TOAN", "THANH_TOAN_MOT_PHAN", "QUA_HAN"],
        },
      },
      include: [
        {
          model: PhongTro,
          as: "phongTro",
        },
      ],
      order: [["han_thanh_toan", "ASC"]],
    });
  }

  async updateBillStatus(maKhoanPhaiThu) {
    /**
     * Update bill status based on payment status
     * Check if bill is fully paid or overdue
     */
    const khoan = await this.getKhoanPhaiThuById(maKhoanPhaiThu);

    // Get total paid
    const payments = await ThanhToan.sum("so_tien", {
      where: { ma_khoan_phai_thu: maKhoanPhaiThu },
    });

    const totalPaid = payments || 0;
    const totalOwed = khoan.tong_phai_thanh_toan;

    let newStatus = "CHUA_THANH_TOAN";

    if (totalPaid >= totalOwed) {
      newStatus = "DA_THANH_TOAN";
    } else if (totalPaid > 0) {
      newStatus = "THANH_TOAN_MOT_PHAN";
    } else if (new Date() > khoan.han_thanh_toan) {
      newStatus = "QUA_HAN";
    }

    await khoan.update({ trang_thai_thanh_toan: newStatus });

    return khoan;
  }

  async getOverdueBills() {
    /**
     * Get all overdue bills
     */
    const now = new Date();
    return await KhoanPhaiThu.findAll({
      where: {
        han_thanh_toan: { [Op.lt]: now },
        trang_thai_thanh_toan: {
          [Op.in]: ["CHUA_THANH_TOAN", "THANH_TOAN_MOT_PHAN"],
        },
      },
    });
  }
}

module.exports = new KhoanPhaiThuService();

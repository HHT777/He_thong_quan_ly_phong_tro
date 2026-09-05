const {
  HopDong,
  KhachThue,
  PhongTro,
  DatCoc,
  ThongBao,
  TaiKhoan,
} = require("../models");
const { Op } = require("sequelize");

class HopDongService {
  async createHopDong(data) {
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

    // Check if there's a valid active contract on this room
    const existingContract = await HopDong.findOne({
      where: {
        ma_phong: data.ma_phong,
        trang_thai: "DANG_HIEU_LUC",
      },
    });

    if (existingContract) {
      throw {
        status: 400,
        message: "Phòng này đã có hợp đồng còn hiệu lực",
      };
    }

    // Create contract
    const hopDong = await HopDong.create(data);

    // Update room status to DA_GIU
    await phong.update({ trang_thai: "DA_GIU" });

    // Send notification to customer
    const taiKhoanKhach = await TaiKhoan.findOne({
      where: { ma_khach_thue: data.ma_khach_thue },
    });

    if (taiKhoanKhach) {
      await ThongBao.create({
        ma_tai_khoan_nhan: taiKhoanKhach.ma_tai_khoan,
        loai_thong_bao: "HOP_DONG",
        noi_dung: "Hợp đồng thuê phòng của bạn đã được tạo",
        doi_tuong_lien_quan: "HOP_DONG",
      });
    }

    return hopDong;
  }

  async getHopDongList(filters, pagination) {
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

    const { count, rows } = await HopDong.findAndCountAll({
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
      order: [["ngay_ky", "DESC"]],
    });

    return { total: count, data: rows };
  }

  async getHopDongById(maHopDong) {
    const hopDong = await HopDong.findByPk(maHopDong, {
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

    if (!hopDong) {
      throw {
        status: 404,
        message: "Hợp đồng không tồn tại",
      };
    }

    return hopDong;
  }

  async updateHopDong(maHopDong, data) {
    const hopDong = await this.getHopDongById(maHopDong);

    await hopDong.update(data);

    return hopDong;
  }

  async renewHopDong(maHopDong, ngayBatDauMoi, ngayKetThucMoi, giaThueMoi) {
    /**
     * BR-02: Cảnh báo hết hạn hợp đồng
     * BR-09: Nên hỗ trợ gia hạn hợp đồng
     */
    const hopDong = await this.getHopDongById(maHopDong);

    await hopDong.update({
      ngay_bat_dau: ngayBatDauMoi,
      ngay_ket_thuc: ngayKetThucMoi,
      gia_thue: giaThueMoi || hopDong.gia_thue,
    });

    return hopDong;
  }

  async getExpiringContracts(daysBeforeExpiry = 30) {
    /**
     * BR-02: Cảnh báo ít nhất 1 tháng trước khi hết hạn
     */
    const now = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysBeforeExpiry);

    return await HopDong.findAll({
      where: {
        trang_thai: "DANG_HIEU_LUC",
        ngay_ket_thuc: {
          [Op.between]: [now, expiryDate],
        },
      },
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
  }

  async getContractByRoom(maPhong) {
    return await HopDong.findOne({
      where: {
        ma_phong: maPhong,
        trang_thai: "DANG_HIEU_LUC",
      },
    });
  }

  async settleContract(maHopDong) {
    const hopDong = await this.getHopDongById(maHopDong);

    await hopDong.update({
      trang_thai: "DA_THANH_LY",
    });

    // Update room status to TRONG
    await PhongTro.update(
      { trang_thai: "TRONG" },
      { where: { ma_phong: hopDong.ma_phong } },
    );

    return hopDong;
  }
}

module.exports = new HopDongService();

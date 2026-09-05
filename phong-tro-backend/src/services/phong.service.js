const { PhongTro, CanTro } = require("../models");
const { Op } = require("sequelize");

class PhongService {
  async createPhong(data) {
    // Check if can exists
    const canTro = await CanTro.findByPk(data.ma_can);
    if (!canTro) {
      throw {
        status: 404,
        message: "Căn trọ không tồn tại",
      };
    }

    const phong = await PhongTro.create({
      ma_can: data.ma_can,
      gia_thue: data.gia_thue,
      trang_thai: data.trang_thai || "TRONG",
      mo_ta: data.mo_ta,
    });

    return phong;
  }

  async getPhongList(filters, pagination) {
    const where = {};

    if (filters.ma_can) {
      where.ma_can = filters.ma_can;
    }

    if (filters.trang_thai) {
      where.trang_thai = filters.trang_thai;
    }

    const { count, rows } = await PhongTro.findAndCountAll({
      where,
      include: [
        {
          model: CanTro,
          as: "canTro",
          attributes: ["ten_can", "dia_chi"],
        },
      ],
      limit: pagination.limit,
      offset: pagination.offset,
      order: [["ma_phong", "ASC"]],
    });

    return { total: count, data: rows };
  }

  async getPhongById(maPhong) {
    const phong = await PhongTro.findByPk(maPhong, {
      include: [
        {
          model: CanTro,
          as: "canTro",
        },
      ],
    });

    if (!phong) {
      throw {
        status: 404,
        message: "Phòng trọ không tồn tại",
      };
    }

    return phong;
  }

  async updatePhong(maPhong, data) {
    const phong = await this.getPhongById(maPhong);

    await phong.update(data);

    return phong;
  }

  async deletePhong(maPhong) {
    const phong = await this.getPhongById(maPhong);

    // BR-15: Không xóa nếu có lịch sử hợp đồng
    const hopDongCount = await phong.countHopDongs();
    if (hopDongCount > 0) {
      throw {
        status: 400,
        message:
          "Không thể xóa phòng khi có hợp đồng liên quan. Hãy chuyển trạng thái sang ngừng hoạt động",
      };
    }

    await phong.destroy();

    return { message: "Xóa phòng thành công" };
  }

  async getPhongByCanAndStatus(maCan, trangThai) {
    return await PhongTro.findAll({
      where: {
        ma_can: maCan,
        trang_thai: trangThai,
      },
    });
  }

  async updatePhongStatus(maPhong, trangThai) {
    const phong = await this.getPhongById(maPhong);
    await phong.update({ trang_thai: trangThai });
    return phong;
  }
}

module.exports = new PhongService();

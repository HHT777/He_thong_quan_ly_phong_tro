const { CanTro, PhongTro, KhachThue, HopDong, ChiPhi } = require("../models");

function notFound(message) {
  return { status: 404, message };
}

class ManagementController {
  async listCanTro(req, res, next) {
    try {
      const data = await CanTro.findAll({
        include: [{ model: PhongTro, as: "phongs" }],
        order: [["ma_can", "ASC"]],
      });
      res.json({
        success: true,
        data,
        message: "Lấy danh sách căn trọ thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async createCanTro(req, res, next) {
    try {
      res
        .status(201)
        .json({
          success: true,
          data: await CanTro.create(req.body),
          message: "Tạo căn trọ thành công",
        });
    } catch (error) {
      next(error);
    }
  }

  async updateCanTro(req, res, next) {
    try {
      const item = await CanTro.findByPk(req.params.id);
      if (!item) throw notFound("Căn trọ không tồn tại");
      await item.update(req.body);
      res.json({
        success: true,
        data: item,
        message: "Cập nhật căn trọ thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCanTro(req, res, next) {
    try {
      const item = await CanTro.findByPk(req.params.id);
      if (!item) throw notFound("Căn trọ không tồn tại");
      await item.destroy();
      res.json({
        success: true,
        data: null,
        message: "Xóa căn trọ thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async listKhachThue(req, res, next) {
    try {
      const data = await KhachThue.findAll({
        include: [{ model: HopDong, as: "hopDongs" }],
        order: [["ma_khach_thue", "ASC"]],
      });
      res.json({
        success: true,
        data,
        message: "Lấy danh sách khách thuê thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async createKhachThue(req, res, next) {
    try {
      res
        .status(201)
        .json({
          success: true,
          data: await KhachThue.create(req.body),
          message: "Tạo khách thuê thành công",
        });
    } catch (error) {
      next(error);
    }
  }

  async updateKhachThue(req, res, next) {
    try {
      const item = await KhachThue.findByPk(req.params.id);
      if (!item) throw notFound("Khách thuê không tồn tại");
      await item.update(req.body);
      res.json({
        success: true,
        data: item,
        message: "Cập nhật khách thuê thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteKhachThue(req, res, next) {
    try {
      const item = await KhachThue.findByPk(req.params.id);
      if (!item) throw notFound("Khách thuê không tồn tại");
      await item.destroy();
      res.json({
        success: true,
        data: null,
        message: "Xóa khách thuê thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async listChiPhi(req, res, next) {
    try {
      const data = await ChiPhi.findAll({ order: [["ngay_chi", "DESC"]] });
      res.json({
        success: true,
        data,
        message: "Lấy danh sách chi phí thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async createChiPhi(req, res, next) {
    try {
      res
        .status(201)
        .json({
          success: true,
          data: await ChiPhi.create({
            ...req.body,
            nguoi_ghi_nhan: req.user.ma_tai_khoan,
          }),
          message: "Tạo khoản chi thành công",
        });
    } catch (error) {
      next(error);
    }
  }

  async updateChiPhi(req, res, next) {
    try {
      const item = await ChiPhi.findByPk(req.params.id);
      if (!item) throw notFound("Khoản chi không tồn tại");
      await item.update(req.body);
      res.json({
        success: true,
        data: item,
        message: "Cập nhật khoản chi thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteChiPhi(req, res, next) {
    try {
      const item = await ChiPhi.findByPk(req.params.id);
      if (!item) throw notFound("Khoản chi không tồn tại");
      await item.destroy();
      res.json({
        success: true,
        data: null,
        message: "Xóa khoản chi thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ManagementController();

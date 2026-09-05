const phongService = require("../services/phong.service");
const phongValidation = require("../validations/phong.validation");
const paginationService = require("../utils/pagination.util");

class PhongController {
  async createPhong(req, res, next) {
    try {
      const { error, value } = phongValidation.createPhong.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const phong = await phongService.createPhong(value);

      res.status(201).json({
        success: true,
        data: phong,
        message: "Tạo phòng trọ thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPhongList(req, res, next) {
    try {
      const pagination = paginationService.paginate(req);
      const { count, data } = await phongService.getPhongList(
        req.query,
        pagination,
      );

      const response = paginationService.buildResponse(
        data,
        count,
        pagination.page,
        pagination.limit,
      );

      res.json({
        success: true,
        data: response.data,
        pagination: response.pagination,
        message: "Lấy danh sách phòng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPhongById(req, res, next) {
    try {
      const phong = await phongService.getPhongById(req.params.id);

      res.json({
        success: true,
        data: phong,
        message: "Lấy thông tin phòng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePhong(req, res, next) {
    try {
      const { error, value } = phongValidation.updatePhong.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const phong = await phongService.updatePhong(req.params.id, value);

      res.json({
        success: true,
        data: phong,
        message: "Cập nhật phòng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePhong(req, res, next) {
    try {
      const result = await phongService.deletePhong(req.params.id);

      res.json({
        success: true,
        data: result,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PhongController();

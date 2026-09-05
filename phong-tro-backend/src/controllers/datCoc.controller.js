const datCocService = require("../services/datCoc.service");
const datCocValidation = require("../validations/datCoc.validation");
const paginationService = require("../utils/pagination.util");

class DatCocController {
  async createDatCoc(req, res, next) {
    try {
      const { error, value } = datCocValidation.createDatCoc.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const datCoc = await datCocService.createDatCoc(value);

      res.status(201).json({
        success: true,
        data: datCoc,
        message: "Tạo đặt cọc thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getDatCocList(req, res, next) {
    try {
      const pagination = paginationService.paginate(req);
      const { count, data } = await datCocService.getDatCocList(
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
        message: "Lấy danh sách đặt cọc thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getDatCocById(req, res, next) {
    try {
      const datCoc = await datCocService.getDatCocById(req.params.id);

      res.json({
        success: true,
        data: datCoc,
        message: "Lấy thông tin đặt cọc thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDatCoc(req, res, next) {
    try {
      const { error, value } = datCocValidation.updateDatCoc.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const datCoc = await datCocService.updateDatCoc(req.params.id, value);

      res.json({
        success: true,
        data: datCoc,
        message: "Cập nhật đặt cọc thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async confirmDeposit(req, res, next) {
    try {
      const datCoc = await datCocService.confirmDeposit(req.params.id);

      res.json({
        success: true,
        data: datCoc,
        message: "Xác nhận đặt cọc thành công. Phòng sẵn sàng thuê",
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelDeposit(req, res, next) {
    try {
      const datCoc = await datCocService.cancelDeposit(
        req.params.id,
        req.body.reason,
      );

      res.json({
        success: true,
        data: datCoc,
        message: "Hủy đặt cọc thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DatCocController();

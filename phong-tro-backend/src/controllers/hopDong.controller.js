const hopDongService = require("../services/hopDong.service");
const hopDongValidation = require("../validations/hopDong.validation");
const paginationService = require("../utils/pagination.util");

class HopDongController {
  async createHopDong(req, res, next) {
    try {
      const { error, value } = hopDongValidation.createHopDong.validate(
        req.body,
      );
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const hopDong = await hopDongService.createHopDong(value);

      res.status(201).json({
        success: true,
        data: hopDong,
        message: "Tạo hợp đồng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getHopDongList(req, res, next) {
    try {
      const filters = { ...req.query };
      if (req.user.vai_tro === "KHACH_THUE")
        filters.ma_khach_thue = req.user.ma_khach_thue;
      const pagination = paginationService.paginate(req);
      const { count, data } = await hopDongService.getHopDongList(
        filters,
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
        message: "Lấy danh sách hợp đồng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getHopDongById(req, res, next) {
    try {
      const hopDong = await hopDongService.getHopDongById(req.params.id);
      if (
        req.user.vai_tro === "KHACH_THUE" &&
        hopDong.ma_khach_thue !== req.user.ma_khach_thue
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Bạn chỉ được xem hợp đồng của mình",
          });
      }

      res.json({
        success: true,
        data: hopDong,
        message: "Lấy thông tin hợp đồng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateHopDong(req, res, next) {
    try {
      const { error, value } = hopDongValidation.updateHopDong.validate(
        req.body,
      );
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const hopDong = await hopDongService.updateHopDong(req.params.id, value);

      res.json({
        success: true,
        data: hopDong,
        message: "Cập nhật hợp đồng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async renewHopDong(req, res, next) {
    try {
      const { error, value } = hopDongValidation.renewHopDong.validate(
        req.body,
      );
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const hopDong = await hopDongService.renewHopDong(
        req.params.id,
        value.ngay_bat_dau_moi,
        value.ngay_ket_thuc_moi,
        value.gia_thue_moi,
      );

      res.json({
        success: true,
        data: hopDong,
        message: "Gia hạn hợp đồng thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getExpiringContracts(req, res, next) {
    try {
      const expiring = await hopDongService.getExpiringContracts();

      res.json({
        success: true,
        data: expiring,
        message: "Lấy danh sách hợp đồng sắp hết hạn thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HopDongController();

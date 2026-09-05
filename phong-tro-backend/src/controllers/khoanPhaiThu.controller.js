const khoanPhaiThuService = require("../services/khoanPhaiThu.service");
const thanhToanService = require("../services/thanhToan.service");
const {
  khoanPhaiThuValidation,
  thanhToanValidation,
} = require("../validations/khoanPhaiThu.validation");
const paginationService = require("../utils/pagination.util");

class KhoanPhaiThuController {
  async createKhoanPhaiThu(req, res, next) {
    try {
      const { error, value } =
        khoanPhaiThuValidation.createKhoanPhaiThu.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const khoan = await khoanPhaiThuService.createKhoanPhaiThu(value);

      res.status(201).json({
        success: true,
        data: khoan,
        message: "Tạo khoản phải thu thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getKhoanPhaiThuList(req, res, next) {
    try {
      const filters = { ...req.query };
      if (req.user.vai_tro === "KHACH_THUE")
        filters.ma_khach_thue = req.user.ma_khach_thue;
      const pagination = paginationService.paginate(req);
      const { count, data } = await khoanPhaiThuService.getKhoanPhaiThuList(
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
        message: "Lấy danh sách khoản phải thu thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getKhoanPhaiThuById(req, res, next) {
    try {
      const khoan = await khoanPhaiThuService.getKhoanPhaiThuById(
        req.params.id,
      );
      if (
        req.user.vai_tro === "KHACH_THUE" &&
        khoan.ma_khach_thue !== req.user.ma_khach_thue
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Bạn chỉ được xem khoản phải thu của mình",
          });
      }

      res.json({
        success: true,
        data: khoan,
        message: "Lấy thông tin khoản phải thu thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getOutstandingBills(req, res, next) {
    try {
      if (
        req.user.vai_tro === "KHACH_THUE" &&
        String(req.params.khachThueId) !== String(req.user.ma_khach_thue)
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Bạn chỉ được xem hóa đơn của mình",
          });
      }
      const data = await khoanPhaiThuService.getOutstandingBills(
        req.params.khachThueId,
      );

      res.json({
        success: true,
        data,
        message: "Lấy danh sách hóa đơn chưa thanh toán thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getOverdueBills(req, res, next) {
    try {
      const data = await khoanPhaiThuService.getOverdueBills();

      res.json({
        success: true,
        data,
        message: "Lấy danh sách hóa đơn quá hạn thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

class ThanhToanController {
  async createThanhToan(req, res, next) {
    try {
      const { error, value } = thanhToanValidation.createThanhToan.validate(
        req.body,
      );
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      // Add current user as acknowledgment person if landlord
      if (req.user.vai_tro === "CHU_TRO") {
        value.nguoi_xac_nhan = req.user.ma_tai_khoan;
      }

      const thanhToan = await thanhToanService.createThanhToan(value);

      res.status(201).json({
        success: true,
        data: thanhToan,
        message: "Ghi nhận thanh toán thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getThanhToanList(req, res, next) {
    try {
      const filters = { ...req.query };
      if (req.user.vai_tro === "KHACH_THUE")
        filters.ma_khach_thue = req.user.ma_khach_thue;
      const pagination = paginationService.paginate(req);
      const { count, data } = await thanhToanService.getThanhToanList(
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
        message: "Lấy danh sách thanh toán thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getThanhToanById(req, res, next) {
    try {
      const thanhToan = await thanhToanService.getThanhToanById(req.params.id);

      res.json({
        success: true,
        data: thanhToan,
        message: "Lấy thông tin thanh toán thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaymentStats(req, res, next) {
    try {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);

      if (!req.query.startDate || !req.query.endDate) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng cung cấp startDate và endDate",
        });
      }

      const stats = await thanhToanService.getPaymentStats(startDate, endDate);

      res.json({
        success: true,
        data: stats,
        message: "Lấy thống kê thanh toán thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  KhoanPhaiThuController: new KhoanPhaiThuController(),
  ThanhToanController: new ThanhToanController(),
};

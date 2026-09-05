const authService = require("../services/auth.service");
const authValidation = require("../validations/auth.validation");

class AuthController {
  async login(req, res, next) {
    try {
      // Validate
      const { error, value } = authValidation.login.validate(req.body);
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const result = await authService.login(
        value.ten_dang_nhap,
        value.mat_khau,
      );

      res.json({
        success: true,
        data: result,
        message: "Đăng nhập thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async registerKhachThue(req, res, next) {
    try {
      // Validate
      const { error, value } = authValidation.registerKhachThue.validate(
        req.body,
      );
      if (error) {
        error.isJoi = true;
        return next(error);
      }

      const result = await authService.registerKhachThue(value);

      res.status(201).json({
        success: true,
        data: result,
        message: "Đăng ký tài khoản khách thuê thành công",
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await authService.getProfile(req.user.ma_tai_khoan);

      res.json({
        success: true,
        data: profile,
        message: "Lấy thông tin tài khoản thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

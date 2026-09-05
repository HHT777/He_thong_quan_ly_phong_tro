const Joi = require("joi");

const authValidation = {
  login: Joi.object({
    ten_dang_nhap: Joi.string().required().messages({
      "any.required": "Tên đăng nhập không được để trống",
    }),
    mat_khau: Joi.string().required().messages({
      "any.required": "Mật khẩu không được để trống",
    }),
  }),

  registerKhachThue: Joi.object({
    ten_dang_nhap: Joi.string().alphanum().min(3).required().messages({
      "string.alphanum": "Tên đăng nhập chỉ chứa chữ và số",
      "string.min": "Tên đăng nhập phải ít nhất 3 ký tự",
      "any.required": "Tên đăng nhập không được để trống",
    }),
    mat_khau: Joi.string().min(6).required().messages({
      "string.min": "Mật khẩu phải ít nhất 6 ký tự",
      "any.required": "Mật khẩu không được để trống",
    }),
    ho_ten: Joi.string().required().messages({
      "any.required": "Họ tên không được để trống",
    }),
    so_dien_thoai: Joi.string()
      .pattern(/^[0-9]{10,11}$/)
      .messages({
        "string.pattern.base": "Số điện thoại phải là 10-11 chữ số",
      }),
    cccd_giay_to: Joi.string().required().messages({
      "any.required": "CCCD/Giấy tờ không được để trống",
    }),
  }),
};

module.exports = authValidation;

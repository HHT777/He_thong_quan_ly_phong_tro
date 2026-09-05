const Joi = require("joi");

const phongValidation = {
  createPhong: Joi.object({
    ma_can: Joi.number().required().messages({
      "any.required": "Mã căn không được để trống",
    }),
    gia_thue: Joi.number().positive().required().messages({
      "number.positive": "Giá thuê phải lớn hơn 0",
      "any.required": "Giá thuê không được để trống",
    }),
    trang_thai: Joi.string().valid(
      "TRONG",
      "DA_GIU",
      "DANG_THUE",
      "DANG_XU_LY_TRA_PHONG",
    ),
    mo_ta: Joi.string(),
  }),

  updatePhong: Joi.object({
    gia_thue: Joi.number().positive(),
    trang_thai: Joi.string().valid(
      "TRONG",
      "DA_GIU",
      "DANG_THUE",
      "DANG_XU_LY_TRA_PHONG",
    ),
    mo_ta: Joi.string(),
  }),

  getPhong: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    ma_can: Joi.number(),
    trang_thai: Joi.string(),
  }),
};

module.exports = phongValidation;

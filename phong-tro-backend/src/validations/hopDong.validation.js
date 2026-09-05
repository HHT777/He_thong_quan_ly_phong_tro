const Joi = require("joi");

const hopDongValidation = {
  createHopDong: Joi.object({
    ma_khach_thue: Joi.number().required(),
    ma_phong: Joi.number().required(),
    ngay_ky: Joi.date().required(),
    ngay_bat_dau: Joi.date().required(),
    ngay_ket_thuc: Joi.date().required(),
    chu_ky_thanh_toan: Joi.string().required(),
    gia_thue: Joi.number().positive().required(),
    tien_coc: Joi.number().positive().required(),
    phi_dich_vu: Joi.number().default(0),
    dieu_khoan: Joi.string(),
    file_hop_dong: Joi.string(),
  }),

  updateHopDong: Joi.object({
    ngay_ky: Joi.date(),
    ngay_bat_dau: Joi.date(),
    ngay_ket_thuc: Joi.date(),
    chu_ky_thanh_toan: Joi.string(),
    gia_thue: Joi.number().positive(),
    tien_coc: Joi.number().positive(),
    phi_dich_vu: Joi.number(),
    dieu_khoan: Joi.string(),
    trang_thai: Joi.string().valid(
      "DANG_HIEU_LUC",
      "DA_KET_THUC",
      "DA_THANH_LY",
    ),
  }),

  renewHopDong: Joi.object({
    ngay_bat_dau_moi: Joi.date().required(),
    ngay_ket_thuc_moi: Joi.date().required(),
    gia_thue_moi: Joi.number().positive(),
  }),
};

module.exports = hopDongValidation;

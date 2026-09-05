const Joi = require("joi");

const datCocValidation = {
  createDatCoc: Joi.object({
    ma_khach_thue: Joi.number().required(),
    ma_phong: Joi.number().required(),
    so_tien_coc: Joi.number().positive().required(),
    ngay_dat_coc: Joi.date().required(),
    ngay_bat_dau_giu: Joi.date().required(),
    ngay_het_han_giu: Joi.date().required(),
    ghi_chu: Joi.string(),
  }),

  updateDatCoc: Joi.object({
    trang_thai: Joi.string().valid(
      "DANG_GIU",
      "DANG_THUE",
      "DA_HUY",
      "HET_HAN",
    ),
    ngay_xu_ly: Joi.date(),
  }),
};

module.exports = datCocValidation;

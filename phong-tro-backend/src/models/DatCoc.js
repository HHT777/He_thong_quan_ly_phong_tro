const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DatCoc = sequelize.define(
  "DatCoc",
  {
    ma_dat_coc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_khach_thue: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    so_tien_coc: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    ngay_dat_coc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_bat_dau_giu: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_het_han_giu: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_xu_ly: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    trang_thai: {
      type: DataTypes.ENUM("DANG_GIU", "DANG_THUE", "DA_HUY", "HET_HAN"),
      defaultValue: "DANG_GIU",
      allowNull: false,
    },
  },
  {
    tableName: "dat_coc",
    timestamps: false,
  },
);

module.exports = DatCoc;

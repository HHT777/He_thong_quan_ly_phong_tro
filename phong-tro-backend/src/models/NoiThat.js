const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const NoiThat = sequelize.define(
  "NoiThat",
  {
    ma_tai_san: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ten_thiet_bi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    loai_thiet_bi: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    so_luong: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    tinh_trang: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ngay_ghi_nhan: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ghi_chu: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "noi_that",
    timestamps: false,
  },
);

module.exports = NoiThat;

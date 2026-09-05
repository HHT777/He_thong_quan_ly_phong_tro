const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ChiPhi = sequelize.define(
  "ChiPhi",
  {
    ma_chi_phi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ngay_chi: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ma_can: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    loai_chi_phi: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    so_tien: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    nguoi_ghi_nhan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ma_tai_san: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hinh_anh_minh_chung: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "chi_phi",
    timestamps: false,
  },
);

module.exports = ChiPhi;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DienNuoc = sequelize.define(
  "DienNuoc",
  {
    ma_dien_nuoc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ky: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    chi_so_dau: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    chi_so_cuoi: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    luong_su_dung: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    don_gia: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    thanh_tien: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    so_nguoi: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tien_nuoc: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    nguoi_nhap: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hinh_anh_minh_chung: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    trang_thai_xac_nhan: {
      type: DataTypes.ENUM("CHO_XAC_NHAN", "DA_XAC_NHAN", "CAN_DIEU_CHINH"),
      defaultValue: "CHO_XAC_NHAN",
      allowNull: false,
    },
  },
  {
    tableName: "dien_nuoc",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["ma_phong", "ky"],
      },
    ],
  },
);

module.exports = DienNuoc;

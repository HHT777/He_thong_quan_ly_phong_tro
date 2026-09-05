const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HopDong = sequelize.define(
  "HopDong",
  {
    ma_hop_dong: {
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
    ngay_ky: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_bat_dau: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ngay_ket_thuc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    chu_ky_thanh_toan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gia_thue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    tien_coc: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    phi_dich_vu: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    dieu_khoan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trang_thai: {
      type: DataTypes.ENUM("DANG_HIEU_LUC", "DA_KET_THUC", "DA_THANH_LY"),
      defaultValue: "DANG_HIEU_LUC",
      allowNull: false,
    },
    file_hop_dong: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "hop_dong",
    timestamps: false,
  },
);

module.exports = HopDong;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ThanhToan = sequelize.define(
  "ThanhToan",
  {
    ma_thanh_toan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_khoan_phai_thu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ngay_thanh_toan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    so_tien: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    phuong_thuc: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nguoi_xac_nhan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ghi_chu: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "thanh_toan",
    timestamps: false,
  },
);

module.exports = ThanhToan;

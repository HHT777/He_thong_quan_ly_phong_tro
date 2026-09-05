const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TraPhong = sequelize.define(
  "TraPhong",
  {
    ma_tra_phong: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_hop_dong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ngay_thong_bao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ngay_du_kien_tra: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ngay_tra_thuc_te: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    chi_so_dien_cuoi: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    cong_no: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    hu_hong: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    khoan_khau_tru: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    tien_coc_ban_dau: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    tien_coc_hoan_lai: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    ngay_thanh_ly: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ly_do: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "tra_phong",
    timestamps: false,
  },
);

module.exports = TraPhong;

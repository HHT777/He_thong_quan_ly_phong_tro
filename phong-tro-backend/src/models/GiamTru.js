const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const GiamTru = sequelize.define(
  "GiamTru",
  {
    ma_giam_tru: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    loai_giam_tru: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gia_tri_giam: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    thoi_gian_ap_dung: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ma_khach_thue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ma_phong: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ma_hop_dong: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ly_do: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    trang_thai: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "giam_tru",
    timestamps: false,
  },
);

module.exports = GiamTru;

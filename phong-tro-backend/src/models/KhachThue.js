const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const KhachThue = sequelize.define(
  "KhachThue",
  {
    ma_khach_thue: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ho_ten: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    so_dien_thoai: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    cccd_giay_to: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: true,
    },
    thong_tin_lien_he: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    trang_thai: {
      type: DataTypes.ENUM("DANG_THUE", "DA_CHUYEN_DI", "TAM_DUNG"),
      defaultValue: "DANG_THUE",
      allowNull: false,
    },
  },
  {
    tableName: "khach_thue",
    timestamps: false,
  },
);

module.exports = KhachThue;

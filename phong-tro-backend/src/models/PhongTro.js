const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PhongTro = sequelize.define(
  "PhongTro",
  {
    ma_phong: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_can: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gia_thue: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    trang_thai: {
      type: DataTypes.ENUM(
        "TRONG",
        "DA_GIU",
        "DANG_THUE",
        "DANG_XU_LY_TRA_PHONG",
      ),
      defaultValue: "TRONG",
      allowNull: false,
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "phong_tro",
    timestamps: false,
  },
);

module.exports = PhongTro;

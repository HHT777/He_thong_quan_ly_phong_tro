const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ThongBao = sequelize.define(
  "ThongBao",
  {
    ma_thong_bao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ma_tai_khoan_nhan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doi_tuong_lien_quan: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    loai_thong_bao: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thoi_diem_gui: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    trang_thai_doc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "thong_bao",
    timestamps: false,
  },
);

module.exports = ThongBao;

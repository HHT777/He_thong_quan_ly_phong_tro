const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const TaiKhoan = sequelize.define(
  "TaiKhoan",
  {
    ma_tai_khoan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ten_dang_nhap: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vai_tro: {
      type: DataTypes.ENUM("CHU_TRO", "KHACH_THUE"),
      allowNull: false,
    },
    trang_thai: {
      type: DataTypes.ENUM("HOAT_DONG", "TAM_DUNG"),
      defaultValue: "HOAT_DONG",
      allowNull: false,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ma_khach_thue: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "tai_khoan",
    timestamps: false,
    hooks: {
      beforeCreate: async (taiKhoan) => {
        if (taiKhoan.mat_khau) {
          const salt = await bcrypt.genSalt(10);
          taiKhoan.mat_khau = await bcrypt.hash(taiKhoan.mat_khau, salt);
        }
      },
      beforeUpdate: async (taiKhoan) => {
        if (taiKhoan.changed("mat_khau")) {
          const salt = await bcrypt.genSalt(10);
          taiKhoan.mat_khau = await bcrypt.hash(taiKhoan.mat_khau, salt);
        }
      },
    },
  },
);

// Instance method to check password
TaiKhoan.prototype.checkPassword = async function (password) {
  if (this.mat_khau.startsWith("$2a$") || this.mat_khau.startsWith("$2b$")) {
    return await bcrypt.compare(password, this.mat_khau);
  }

  // Supports the plain-text development records from database.md.
  return password === this.mat_khau;
};

module.exports = TaiKhoan;

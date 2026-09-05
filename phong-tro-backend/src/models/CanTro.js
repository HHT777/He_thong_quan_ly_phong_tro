const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CanTro = sequelize.define(
  "CanTro",
  {
    ma_can: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ten_can: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dia_chi: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "can_tro",
    timestamps: false,
  },
);

module.exports = CanTro;

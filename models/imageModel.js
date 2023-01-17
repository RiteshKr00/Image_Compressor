const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Image = createDB.define("image", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  originalSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compressedSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compressedPercent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
});

module.exports = Image;

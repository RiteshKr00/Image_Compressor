const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Image = createDB.define("image", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  originalSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  compressedSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  downloadLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
});

module.exports = Image;

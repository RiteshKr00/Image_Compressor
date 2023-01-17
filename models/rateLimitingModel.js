const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const RateLimit = createDB.define("rateLimit", {
  ip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  requests: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

module.exports = RateLimit;

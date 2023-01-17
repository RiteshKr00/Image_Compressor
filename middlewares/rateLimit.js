const { Op } = require("sequelize");
const RateLimitModel = require("../models/rateLimitingModel");

function rateLimit(req, res, next) {
  const oneHourAgo = new Date(Date.now() - 3600000);
  RateLimitModel.findOne({
    where: {
      ip: req.clientIp,
      timestamp: { [Op.gte]: oneHourAgo }, //timestamp >= oneHourAgo
    },
  })
    .then((rate) => {
      if (rate && rate.requests >= 10) {
        return res.status(429).json({ message: "Too Many Requests" });
      }
      if (rate) {
        rate.requests += 1;
        rate.save();
      } else {
        RateLimitModel.create({ ip: req.ip });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({ err: err });
    });
}
module.exports = rateLimit;

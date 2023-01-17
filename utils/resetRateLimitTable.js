const { Op } = require("sequelize");
const RateLimit = require("../models/rateLimitingModel");
const Image = requre("../models/imageModel");

const resetRateLimit = () => {
  setInterval(() => {
    const oneHourAgo = new Date(Date.now() - 3600000);
    const sixHourAgo = new Date(Date.now() - 3600000 * 6);
    //Reset Rate limit
    RateLimit.destroy({
      where: {
        timestamp: { [Op.lt]: oneHourAgo }, //timestamp < oneHourAgo
      },
    })
      .then(() => {
        console.log("Successfully deleted records older than an hour.");
      })
      .catch((err) => {
        console.log(err);
      });
    //Delete 6 hr earlier compressed image
    Image.destroy({
      where: {
        createdAt: { [Op.lt]: sixHourAgo }, //timestamp < oneHourAgo
      },
    })
      .then(() => {
        console.log("Successfully deleted Images older than six hour.");
      })
      .catch((err) => {
        console.log(err);
      });
  }, 3600000);
};

module.exports = resetRateLimit;

const express = require("express");
const { connectToDB } = require("./config/db");
const app = express();
const path = require("path");
require("dotenv").config();
// const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/image");
const resetRateLimit = require("./utils/resetRateLimitTable");
const PORT = 3000;

connectToDB();

//Set Interval to delete rate limiting table older than one hr
resetRateLimit();
//middlewares
app.use(express.json());
//read ip address of client
app.use((req, res, next) => {
  let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  req.clientIp = clientIp;
  next();
});
//handle MUlter Error
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }
  next(err);
});
// Routes
app.use("/api/v1/image", imageRoutes);

app.get("/", async (_req, res) => {
  return res.status(200).send("API works");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running at port:${process.env.PORT}`);
});

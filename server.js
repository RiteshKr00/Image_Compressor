const express = require("express");
const { connectToDB } = require("./config/db");
const app = express();
const path = require("path");

// const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/image");

const PORT = 3000;

connectToDB();

app.use(express.json());
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

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});

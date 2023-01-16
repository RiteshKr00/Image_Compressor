const express = require("express");
const router = express.Router();
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const Image = require("../models/imageModel");
const imageUpload = require("../utils/fileUpload");

router.post("/compress", imageUpload, async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.json({ message: `You must select a file.` });
    }
    const imgType = req.file.mimetype === "image/jpeg" ? "jpeg" : "png";
    /*M1 store compressed image temp to newFilePath to upload it at cloudinary
    const newFilePath = path.join(
      __dirname,
      "../public/compressed/",
      "_" + req.file.originalname
    );
    await sharp(req.file.buffer)
      .resize()
      .jpeg({ quality: 50 })
      .toFile(newFilePath);
    fs.unlinkSync(newFilePath);
    return res.status(200).json({ success: true, message: "image uploaded" });
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      image: fs.readFileSync(
        path.join(`${__dirname}/../public/uploads/${req.file.filename}`)
      ),
    }).then((image) => {
      fs.writeFileSync(
        __dirname + "../public/uploads/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });*/
    // M2 can be converted to buffer and stored as blob in db
    let buffer;
    if (imgType === "jpeg") {
      buffer = await sharp(req.file.buffer).jpeg({ quality: 50 }).toBuffer();
    } else {
      buffer = await sharp(req.file.buffer).png({ quality: 50 }).toBuffer();
    }
    const createImage = await Image.create({
      image: buffer,
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error.message });
  }
});
router.get("/getImage", imageUpload, async (req, res) => {
  try {
    const image = await Image.findByPk(3);
    // console.log(image.dataValues.image);
    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": "attachment; filename=image.png",
    });
    res.end(image.image, "binary");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error.message });
  }
});
module.exports = router;

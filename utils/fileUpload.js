const multer = require("multer");
const storage = multer.memoryStorage();

function uploadFile(req, res, next) {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, //10MB
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(
          new Error("Invalid file type. Only JPG and png images are allowed."),
          false
        );
      }
    },
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        error: err.message,
      });
    }
    // Everything went fine.
    next();
  });
}
module.exports = uploadFile;

/* Disk Storage

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

function uploadFile(req, res, next) {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, //10MB
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
      ) {
        cb(null, true);
      } else {
        cb(
          new Error("Invalid file type. Only JPG and PNG images are allowed."),
          false
        );
      }
    },
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        error: err.message,
      });
    }
    // Everything went fine.
    next();
  });
}
module.exports = uploadFile;


*/

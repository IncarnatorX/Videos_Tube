import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb is the call back
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + uniqueSuffix);
  },
});

const upload = multer({ storage });

export default upload;

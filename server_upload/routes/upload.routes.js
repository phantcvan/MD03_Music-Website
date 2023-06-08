const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/assets`);
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage }).single("avatar");
router.post("/", (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
      } else if (err) {
        console.log(err);
      }
    });
  });
  
const uploadMany = multer({ storage }).array("video", 12);
router.post("/many",async  (req, res) => {
  uploadMany(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.log(err);
    }
  });
  try {
    const { Content } = req.body;

    const query = "INSERT INTO `clone-yt`.videos (Content) VALUES (?)";
    await database.execute(query, [Content]);

    res.status(200).json({ message: "Note added successfully" });
} catch (error) {
    res.status(500).json({ error: "An error occurred while adding the note" });
}
});

module.exports = router;
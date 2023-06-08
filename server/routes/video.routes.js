const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const checkExistIdVideo = require("../middleware/checkExistId");
const validateData = require("../middleware/validateData");
const multer = require("multer");



router.get("/", async (req, res) => {
  console.log(req);
  const searchQuery = req.query.search;
  try {
    let query = "SELECT * FROM `clone-yt`.videos";
    query += ` WHERE title <> 'draft'`;
    if (searchQuery) {
      query += ` AND title LIKE '%${searchQuery}%'`;
    }
    query += ` ORDER BY CASE WHEN upload_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) THEN views / DATEDIFF(CURDATE(), upload_date) ELSE -1 * views END DESC`;
    console.log(query);
    let data = await database.execute(query);
    let [videos] = data;
    res.json({
      status: "success",
      videos,
    });
  } catch (error) {
    res.json({ error });
  }
});

// Read all of tag
router.get("/tags", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM `clone-yt`.tags");
    let [tags] = data;
    res.json({
      status: "success",
      tags,
    });
  } catch (error) {
    res.json({ error });
  }
});


router.get("/list_tags", async (req, res) => {
  try {
    let data = await database.execute(`SELECT tag FROM tags AS t 
    JOIN videos AS v ON t.video_id = v.video_id 
    GROUP BY tag 
    ORDER BY MAX(v.views) DESC`);
    let [tags] = data;
    res.json({
      status: "success",
      tags,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.get("/:id", checkExistIdVideo, async (req, res) => {
  try {
    let { id } = req.params
    const query = 'SELECT * FROM `clone-yt`.videos WHERE video_id = ?';
    let data = await database.execute(query, [id])
    let [findVideo] = data;
    // response về cho client
    res.status(200).json({
      findVideo,
    })
  } catch (error) {
    res.json({
      error,
    })
  }
})


// Lấy video thuộc về channel
router.get("/channel/:channel_id", async (req, res) => {
  try {
    let { channel_id } = req.params
    const query = `SELECT * FROM videos WHERE channel_id = ?`;
    let data = await database.execute(query, [channel_id])
    let [videoBelongChannel] = data;
    // response về cho client
    res.status(200).json({
      videoBelongChannel,
    })
  } catch (error) {
    res.json({
      error,
    })
  }
})

// Post video

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/assets`);
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/", (req, res) => {
  console.log(req.body);
  upload.array("video", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên video" });
    } else if (err) {
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên video" });
    } else {
      if (req.files) {
        const newVideo = {
          video_id: req.body.video_id,
          channel_id: req.body.channel_id,
          videoURL: `http://localhost:8000/assets/${req.files[0].filename}`,
          upload_date: req.body.upload_date,
          views: 0,
          title:req.body.title
        };
        try {
          const query = `
        INSERT INTO videos (video_id, channel_id, upload_date, videoURL, views,title) 
        VALUES (?, ?, ?, ?, ?,?);
      `;
          const params = [
            newVideo.video_id,
            newVideo.channel_id,
            newVideo.upload_date,
            newVideo.videoURL,
            newVideo.views,
            newVideo.title
          ];
          await database.execute(query, params);
          return res.status(200).json({ 
            status:200,
            success: true, 
            message: "Upload successfully", 
            newVideo });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: "Upload failed.", error });
        }
      }
    }
  });
});


// Update lượng view
router.put("/views/:id", async (req, res) => {
  const { id } = req.params;
  const { views } = req.body;
  try {
    const query = `
    UPDATE videos SET views = ? WHERE video_id = ?`;
    let data = await database.execute(query, [views, id]);
    console.log("123");
    let [videos] = data;
    res.json({
      message: "Update video successfully",
      videos,
    });
  } catch (error) {
    res.json({ error });
  }
});

// Update thông tin video
router.put("/:id", (req, res) => {
  const { id } = req.params;
  upload.array("thumbnail", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên ảnh" });
    } else if (err) {
      console.log(err);
      res.status(500).json({ message: "Lỗi khi tải lên ảnh" });
    } else {
      console.log("FILENAME",req.files[0].filename);
      if (req.files) {
        const title=req.body.title;
        const description=req.body.description;
        const thumbnail=`http://localhost:8000/assets/${req.files[0].filename}`
        try {
          const query = `UPDATE videos SET title = ?, description = ?, thumbnail = ? WHERE video_id = ?`;
          const params = [
            title,
            description,
            thumbnail,
            id,
          ];
          await database.execute(query, params);
          return res.status(200).json({ 
            status: 200,
            success: true, 
            message: "Update successfully"});
        } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: "Update failed.", error });
        }
      }
    }
  });
});


router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  // Sd database lấy về toàn bộ videos
  try {
    let data = await database.execute(`DELETE FROM videos WHERE channel_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;

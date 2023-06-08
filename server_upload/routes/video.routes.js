const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const checkExistIdVideo = require("../middleware/checkExistId");
const validateData = require("../middleware/validateData");

router.get("/", async (req, res) => {
  console.log(req);
  const searchQuery = req.query.search;
  try {
    let query = "SELECT * FROM `clone-yt`.videos";
    if (searchQuery) {
      query += ` WHERE title LIKE '%${searchQuery}%'`;
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


router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  // Sd database lấy về toàn bộ tasks
  try {
    let data = await database.execute(`DELETE FROM task_keeper.tbl_task WHERE Task_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const database = require("../utils/database");

// Read all of tag
router.get("/", async (req, res) => {
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

// tag belong video_id
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params
    const query = 'SELECT * FROM `clone-yt`.tags WHERE video_id = ?';
    let data = await database.execute(query, [id])
    let [tags] = data;

    res.json({
      status: "success",
      tags,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post('/', async (req, res) => {
  const { videoId, tags } = req.body;
  console.log(tags);
  
  try {
    for (const tag of tags) {
      const data = { video_id: videoId, tag: tag };
      const query = 'INSERT INTO tags (video_id, tag) VALUES (?, ?)';
      await database.execute(query, [data.video_id, data.tag]);
    }
    
    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Tags added successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add tags',
      error
    });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await database.execute(`DELETE FROM tags WHERE video_id = ${id}`);
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});


  module.exports = router;
const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.post('/', async (req, res) => {
    const { videoId, tags } = req.body;
  
    try {
      const insertQueries = tags.map(tag => {
        return {
          video_id: videoId,
          tag: tag
        };
      });
  
      const query = 'INSERT INTO tags_data (video_id, tag) VALUES ?';
      await database.execute(query, [insertQueries]);
  
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

  module.exports = router;
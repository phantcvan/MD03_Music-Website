const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
    try {
        let data = await database.execute("SELECT * FROM `clone-yt`.comments");
        let [comments] = data;
        res.json({
            status: "success",
            comments,
        });
    } catch (error) {
        res.json({ error });
    }
});

router.get("/:video_id", async (req, res) => {
    try {
        let { video_id } = req.params
        const query = `SELECT comments.cmt_id, comments.email, comments.video_id, comments.cmt_date, content, channels.*
    FROM comments
    INNER JOIN videos ON comments.video_id = videos.video_id
    INNER JOIN channels ON comments.email = channels.email
    WHERE comments.video_id = ?
    ORDER BY comments.cmt_date DESC;`;
        let data = await database.execute(query, [video_id])
        let [findCmt] = data;
        // response về cho client
        res.status(200).json({
            findCmt,
        })
    } catch (error) {
        res.json({
            error,
        })
    }
})


router.post("/", async (req, res) => {
    const { email, video_id, content, cmt_date } = req.body;
    const newComment = [
        email,
        video_id,
        content,
        cmt_date]
    console.log(req.body);
    try {
        const query = `
      INSERT INTO comments (email, video_id, content, cmt_date)
       VALUES (?, ?, ?, ?)`;
        let data = await database.execute(query, newComment);
        console.log("123");
        let [comment] = data;
        return res.status(200).json({
            status: 200,
            message: "Post comment successfully",
            comment,
        });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
});

module.exports = router;
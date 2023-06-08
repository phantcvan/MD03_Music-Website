const database = require("../utils/database");
const checkExistIdVideo = async (req, res, next) => {
    try {
      const {id} = req.params; // Lấy ID từ tham số trong yêu cầu
      console.log(id);
      // Thực hiện truy vấn để kiểm tra ID tồn tại
      const query = 'SELECT * FROM `clone-yt`.videos WHERE video_id = ?';
      let data = await database.execute(query, [id])
      // let data = await database.execute(`SELECT * FROM videos WHERE Task_id=${id}`);
      let [findTask] = data;
      if (findTask.length>0) {
        next();
      } else {
        // Nếu ID không tồn tại, trả về lỗi
        return res.status(404).json({ error: "ID not found" });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "An error occurred while checking ID" });
    }
  };

module.exports = checkExistIdVideo;
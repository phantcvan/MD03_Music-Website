const database = require("../utils/database");
const checkExistEmail = async (req, res, next) => {
    try {
      const {email} = req.body; // Lấy ID từ tham số trong yêu cầu
      console.log(id);
      // Thực hiện truy vấn để kiểm tra ID tồn tại
      const query = 'SELECT * FROM `clone-yt`.channels WHERE email = ?';
      let data = await database.execute(query, [email])
      // let data = await database.execute(`SELECT * FROM videos WHERE Task_id=${id}`);
      let [findEmail] = data;
      if (findEmail.length===0) {
        next();
      } else {
        // Nếu ID không tồn tại, trả về lỗi
        return res.status(404).json({ error: "Email exists" });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "An error occurred while checking ID" });
    }
  };

module.exports = checkExistEmail;
const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const videoRoutes = require("./routes/video.routes");
const uploadRoutes = require("./routes/upload.routes");
const channelRoutes = require("./routes/channel.routes");
const commentRoutes = require("./routes/cmt.routes");
const tagRoutes = require("./routes/tag.routes");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true, }));

server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

server.use("/api/v1/videos", videoRoutes);
server.use("/api/v1/upload", uploadRoutes);
server.use("/api/v1/channels", channelRoutes);
server.use("/api/v1/comments", commentRoutes);
server.use("/api/v1/tags", tagRoutes);

server.listen(8000, () => {
  console.log("http://localhost:8000");
});

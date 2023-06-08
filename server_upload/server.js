const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true, }));

const videoRoutes = require("./routes/video.routes");
const uploadRoutes = require("./routes/upload.routes");
const channelRoutes = require("./routes/channel.routes");

server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

server.use("/api/v1/videos", videoRoutes);
server.use("/api/v1/upload", uploadRoutes);
server.use("/api/v1/channels", channelRoutes);

server.listen(8000, () => {
  console.log("http://localhost:8000");
});

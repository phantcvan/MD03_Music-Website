import React, { useState } from "react";
import { MdVerified } from "react-icons/md";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { incrementView } from '../slices/videoSlice';
import { useDispatch, useSelector } from "react-redux";
import { handleNumber } from "../static/fn";
// import { setChannels, setCurrentUser, getChannels, getCurrentUser } from '../slices/channelSlice';


const VideoComp = ({ video_id, channel_id, upload_date, views, title, thumbnail, allChannels, h, channelDisplay }) => {

  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const channelIndex = allChannels?.findIndex((e, i) => e.channel_id == channel_id)
  const channelName = allChannels[channelIndex]?.channel_name;
  const channelLogo = allChannels[channelIndex]?.logoUrl;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageStyle = {
    transform: isHovered ? "scale(1.1)" : "none",
    transition: "transform 0.3s ease-in-out",
  };

  const dateConvert = new Date(upload_date);
  const uploadTime = dateConvert.toLocaleDateString('en-GB');
  // Khi click thì tăng view
  const handleVideoClick = () => {
    dispatch(incrementView(video_id));
  };

  return (
    <div className="flex flex-col cursor-pointer mt-2">
      <div className={`relative w-full h-[${h}] overflow-hidden rounded-2xl `}>
        <Link to={`/video/${video_id}`} onClick={handleVideoClick}>
          <img
            src={thumbnail}
            alt=""
            className="h-[100%] w-[100%] overflow-hidden object-cover"
            style={imageStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          // onError={handleGifLoadError}
          />
        </Link>
      </div>
      <div className="flex mt-3">
        {channelDisplay
          &&
          <Link to={`/channel/${channel_id}`}>
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img src={channelLogo} alt="" className="w-full h-full  object-cover" />
            </div>
          </Link>
        }
        <div className="ml-2">
          <>
            <Link to={`/video/${video_id}`}>
              <h2 className="font-medium text-yt-white text-sm mt-0 mb-0 items-center">
                {title?.length <= 50 ? title : `${title.substr(0, 50)}...`}
              </h2>
            </Link>
          </>
          {channelDisplay
            &&
            <Link to={`/channel/${channel_id}`}>
              <h3 className="text-yt-gray text-xs mt-1 flex items-center">
                {channelName}
                <span className="p-1">
                  <MdVerified />
                </span>
              </h3>
            </Link>
          }
          <p className="text-yt-gray m-0 font-medium text-xs">
            {`${handleNumber(Number(views))}`} Views • {uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoComp;

import React, { memo, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { BiDislike } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";


const VideoInfo = ({ id, channel_id, channelLogo, channelName, setOpen }) => {
    const [isSubscribe, setIsSubscribe] = useState(false)


    // share video --> copy link vào clipboard
    const handleCopy = () => {
        setOpen(true);
        navigator.clipboard.writeText(`http://localhost:3000/video/${id}`)
            .then(() => {
                console.log('Link copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy link:', error);
            });
    };



    return (
        <div className='flex w-full'>
            <div className="flex items-center justify-between w-[100%]">
                <div className="px-3 flex gap-3 justify-between items-center">
                    <div>
                        <Link to={`/channel/${channel_id}`}>
                            <img src={channelLogo} alt="" className="h-9 w-9 rounded-full" />
                        </Link>
                    </div>
                    <h3 className="text-yt-white font-medium text-base">
                        {channelName && channelName.length <= 25
                            ? channelName
                            : `${channelName && channelName.substr(0, 20)}...`}
                    </h3>
                    {isSubscribe
                        ? <button className="bg-yt-light-2 text-yt-white flex px-3 py-2 rounded-lg text-sm font-medium ml-3">
                            <span className='flex items-center gap-2'><FaRegBell size={18} /> Subscribed</span>
                        </button>
                        : <button className="bg-yt-white px-3 py-2 rounded-lg text-sm font-medium ml-3">
                            Subscribe
                        </button>}

                </div>
                <div className="flex pl-28">
                    <div className="flex bg-yt-light-black items-center rounded-2xl h-10 ">
                        <div className="rounded-l-2xl h-10 flex px-3 items-center border-r-2 border-r-yt-light-1 cursor-pointer hover:bg-yt-light-1">
                            <AiFillLike className="text-yt-white text-2xl" />
                            <p className="text-yt-white pl-2 pr-3 text-sm font-semibold">
                                300K
                            </p>
                        </div>
                        <div className="rounded-r-2xl h-10 flex items-center cursor-pointer px-5 hover:bg-yt-light-1">
                            <BiDislike className="text-[22px] font-extralight text-yt-white" />
                        </div>
                    </div>
                    <div className="flex bg-yt-light-black items-center rounded-2xl h-10 mx-1 cursor-pointer hover:bg-yt-light-1">
                        <div className="flex px-3 items-center cursor-pointer">
                            <RiShareForwardLine className="text-2xl text-yt-white font-thin" />
                            <span className="text-yt-white pl-2 pr-3 text-sm font-semibold" onClick={handleCopy}>
                                Share
                            </span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default memo(VideoInfo)
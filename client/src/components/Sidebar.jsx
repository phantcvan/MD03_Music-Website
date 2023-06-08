import React, { useState } from "react";
import { SideBar, CategoryItems } from "../static/data";
import "../App.css";
import { Link } from "react-router-dom";
import { getAllChannels} from '../slices/channelSlice';
import { getUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [active, setActive] = useState("Home");
  const user = useSelector(getUser);
  const allChannels = useSelector(getAllChannels);
  const sidebar = SideBar();
  // const channel_id = allChannels?.find((e, i) => e.email === user.email)?.channel_id;

  return (
    <div className="yt-scrollbar scrollbar-hide overflow-scroll w-60 bg-yt-black h-[calc(100vh-53px)] 
    mt-14 fixed top-0 left-0 text-yt-white p-3 z-20">
      <div className="mb-4">
        {sidebar.SideBarItems.Top.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"
                }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <hr className="text-yt-light-black my-2" />
      <div className="mb-4">
        {sidebar.SideBarItems.Middle.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"
                }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <hr className="text-yt-light-black my-2" />
      <h2 className="pt-1 px-3">Explore</h2>
      <div className="mb-4">
        {sidebar.SideBarItems.Explore.map((item, index) => (
          <Link to={item.path} key={index}>
            <div
              key={index}
              className={`h-10 flex justify-start px-3 rounded-xl items-center cursor-pointer hover:bg-yt-light-black my-1 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"
                }`}
              onClick={() => setActive(item.name)}
            >
              <span className="mr-5">{item.icon}</span>
              <p className="p-2 text-sm font-medium">{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <hr className="text-yt-light-black" />
      <div className="flex flex-wrap">
        {CategoryItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`h-8 flex flex-wrap justify-start px-1 rounded-xl items-center cursor-pointer hover:bg-yt-light-black`}
            >
              <p className="px-2 text-sm">{item}</p>
            </div>
          )
        }
        )}
      </div>
      <hr className="text-yt-light-black my-2" />
    </div>
  );
};

export default Sidebar;

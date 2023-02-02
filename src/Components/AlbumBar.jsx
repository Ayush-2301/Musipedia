import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const AlbumBar = ({ album, i, data }) => {
  // const dispatch = useDispatch();

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };
  // const handlePlayClick = () => {
  //   dispatch(setActiveSong({ song, data, i }));
  //   dispatch(playPause(true));
  // };

  return (
    <div className={`flex  w-full h-full  font-poppins items-center`}>
      <div className="flex flex-col h-full w-[220px] font-thin ">
        <Link to={`/songs/${album?.id}`}>
          <img
            src={album?.cover_art_url}
            alt=""
            className="w-[220px] mx-1 rounded-md drop-shadow-md "
          />
        </Link>

        <div className="text-center flex flex-col">
          <div className=" ml-2 text-white text-base text-center ">
            <Link to={`/songs/${album?.id}`}>{album?.full_title}</Link>
          </div>
          <div className=" text-gray-400">
            {album?.release_date_components?.year}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumBar;

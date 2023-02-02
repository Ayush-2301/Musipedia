import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongBar = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      className={`flex  w-full border-l-0 border-r-0 border-t-0 border-gray-400 border-solid border h-[80px] font-poppins items-center `}
    >
      <div className="flex  items-center font-thin flex-row text-xl w-full justify-between">
        <div className="flex flex-row items-center  w-full">
          <div className="mx-2">{i + 1}. </div>
          <div className="">
            <img
              src={song?.header_image_url}
              alt=""
              className="w-[70px] mx-1"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className=" ml-2 text-white">
              <Link to={`/songs/${song?.title}`}>{song?.title}</Link>
            </div>
            <div className=" ml-2 text-gray-400 w-full text-center">
              <Link
                to={song?.artist_names ? `/artists/${song?.artist_names}` : "/"}
              >
                {song?.artist_names}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`justify-center items-center bg-black bg-opacity-50  ${
            activeSong?.title === song?.title
              ? `flex bg-black bg-opacity-70`
              : `flex`
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SongBar;

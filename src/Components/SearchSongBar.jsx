import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import ArtistTopSongsPlayPause from "./ArtistTopSongsPlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SearchSongBar = ({ song, i, activeSong, isPlaying, data }) => {
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
      className={`flex  w-full h-[80px] font-poppins items-center z-20  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2 hover:bg-gray-500 hover:bg-opacity-20
`}
    >
      <div className="flex items-center font-thin flex-row text-xl w-full justify-between">
        <div className="flex flex-row items-center w-full">
          <div className="w-[60px]">
            <img
              src={song?.images?.coverart}
              alt=""
              className="w-[70px] mx-1"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="ml-3 text-white">
              <Link to={`/songs/${song?.share?.subject}`}>{song?.title}</Link>
            </div>
            <div className=" ml-3 text-gray-400 hover:underline ">
              <Link to={song?.subtitle ? `/artists/${song?.subtitle}` : "/"}>
                {song?.subtitle}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`justify-center items-center   ${
            activeSong?.title === song?.title ? `flex  ` : `flex`
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

export default SearchSongBar;

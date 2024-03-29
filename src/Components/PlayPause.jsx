import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  return isPlaying &&
    activeSong?.subtitle === song.subtitle &&
    activeSong?.title === song.title ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePlay}
    />
  );
};

export default PlayPause;

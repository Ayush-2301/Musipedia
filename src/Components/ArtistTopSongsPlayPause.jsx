import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const ArtistTopSongsPlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  return isPlaying && activeSong?.name === song.attributes?.name ? (
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

export default ArtistTopSongsPlayPause;

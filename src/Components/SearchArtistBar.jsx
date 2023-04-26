import React from "react";
import { Link } from "react-router-dom";

const SearchArtistBar = ({ artist, i }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full font-poppins items-center z-20  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-20 ">
      <img src={artist?.avatar} className="rounded-full w-[120px]" alt="" />
      <div className="flex flex-col items-start justify-start  w-full p-2">
        <div className=" flex w-full items-end  text-gray-400 text-lg font-semibold ">
          <Link
            className="w-full hover:underline"
            to={artist?.name ? `/artists/${artist?.name}` : "/"}
          >
            {artist?.name}
          </Link>
          <div className=" text-base px-3 py-1 border-gray-700 rounded-full border">
            Artist
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArtistBar;

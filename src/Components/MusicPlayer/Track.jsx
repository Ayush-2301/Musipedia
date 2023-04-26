import React from "react";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "w-full" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      {(activeSong?.images?.coverart || activeSong?.artwork?.url) && (
        <img
          src={
            activeSong?.images?.coverart
              ? activeSong?.images?.coverart
              : activeSong?.artwork?.url
                  .replace("{w}", "100")
                  .replace("{h}", "100")
          }
          alt="cover art"
          className="w-full"
        />
      )}
    </div>
    <div className="w-[50%]">
      {activeSong?.title ? (
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : "No active Song"}
        </p>
      ) : (
        <p className="truncate text-white font-bold text-lg">
          {activeSong?.name ? activeSong?.name : "No active Song"}
        </p>
      )}
      {activeSong?.subtitle ? (
        <p className="truncate text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
        </p>
      ) : (
        <p className="truncate text-gray-300">
          {activeSong?.artistName ? activeSong?.artistName : "No active Song"}
        </p>
      )}
    </div>
  </div>
);

export default Track;

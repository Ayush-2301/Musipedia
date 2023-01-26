import React from "react";
import { useGetTopArtistsQuery } from "../redux/services/shazamCore";
import { SongCard } from "../Components/index";
import { genres } from "../assets/constant/constant";
import { useDispatch, useSelector } from "react-redux";
const TopCharts = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, loading, error } = useGetTopArtistsQuery();
  if (error) {
    return <div>Error</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const songCharts = data?.tracks?.slice(0, 10).map((song, i) => {
    return (
      <SongCard
        key={song.key}
        song={song}
        i={i}
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={data}
      />
    );
  });
  return (
    <div
      className={`container mx-auto p-6  flex flex-col font-poppins bg-[#040404] text-white px-[13%] 
        `}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-[90px]  font-[600] justify-start mb-[10px] leading-[135px] z-20">
          Top charts
        </div>
        <select
          onChange={() => {}}
          value=""
          className="border-[1.5px] border-gray-400 border-solid bg-black p-3 text-md text-white outline-none w-[25%] z-20 "
        >
          {genres.map((genre, i) => {
            return (
              <option key={i + 1} value={genre.value}>
                {genre.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="z-20">{songCharts}</div>
      <div>Load more</div>
    </div>
  );
};

export default TopCharts;

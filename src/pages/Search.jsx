import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetShazamSearchQuery } from "../redux/services/shazamCore";
import { SearchSongBar, SearchArtistBar, Error } from "../Components";
import { useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkelton from "../Components/CardSkelton";
import BigCardSkelton from "../Components/BigCardSkelton";
import CircleCardSkeleton from "../Components/CircleCardSkeleton";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, isError } = useGetShazamSearchQuery(searchTerm);
  const songList = data?.tracks?.hits?.map((song, i) => (
    <SearchSongBar
      key={song.track.key}
      song={song.track}
      i={i}
      isPlaying={isPlaying}
      activeSong={activeSong}
      data={data?.tracks?.hits}
    />
  ));
  const artistList = data?.artists?.hits?.map((artist, i) => (
    <SearchArtistBar key={artist.artist.adamid} artist={artist.artist} i={i} />
  ));
  console.log(isFetching);
  if (isError) return <Error />;
  return (
    <div className="container flex flex-col gap-y-5 mx-[200px] p-6  font-poppins bg-[#040404]  text-white h-[1000px] mb-[50px]">
      <div className="flex flex-row  justify-between h-full z-20">
        <div className=" w-full h-full p-3">
          <div className="text-[50px] font-[600] tracking-wide z-20 mb-2">
            Top Result
          </div>
          {!isFetching ? (
            data?.tracks?.hits[0]?.track && (
              <div
                className="flex flex-col justify-start space-y-3 p-3
            
              
              w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
          hover:bg-gray-500 hover:bg-opacity-20"
              >
                <img
                  src={data?.tracks?.hits[0]?.track?.images?.coverart}
                  alt=""
                  className="w-[200px] rounded-md"
                />

                <div className="flex flex-col justify-center items-start">
                  <div className="text-white text-8xl font-extrabold">
                    <Link
                      to={`/songs/${data?.tracks?.hits[0]?.track?.share?.subject}`}
                    >
                      {data?.tracks?.hits[0]?.track?.title}
                    </Link>
                  </div>
                  <div className=" ml-2 flex w-full items-end  text-gray-400 text-2xl font-semibold ">
                    <Link
                      className="hover:underline"
                      to={
                        data?.tracks?.hits[0]?.track?.subtitle
                          ? `/artists/${data?.tracks?.hits[0]?.track?.subtitle}`
                          : "/"
                      }
                    >
                      {data?.tracks?.hits[0]?.track?.subtitle}
                    </Link>
                    <div className=" ml-4 text-lg px-3 py-1 border-gray-700 rounded-full border ">
                      Song
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <BigCardSkelton cards={1} />
          )}
        </div>
        <div className=" w-full h-full p-3">
          <div className="text-[50px] font-[600] tracking-wide z-20">Songs</div>
          {!isFetching ? songList : <CardSkelton cards={5} />}
        </div>
      </div>
      <div className="flex flex-col h-full w-full z-20 p-3">
        <div className="text-[50px] font-[600] tracking-wide z-20">Artists</div>
        <div className="flex flex-row space-x-2">
          {!isFetching ? (
            artistList
          ) : (
            <div className="flex flex-row space-x-9">
              <CircleCardSkeleton cards={5} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

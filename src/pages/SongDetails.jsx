import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetGeniusSearchQuery,
  useGetGeniusSongDataQuery,
  useGetGeniusSongLyricsQuery,
  useGetGeniusAlbumDataQuery,
} from "../redux/services/geniusCore";
import { Loader, Error } from "../Components";
const SongDetails = () => {
  const { songid } = useParams();
  const [expanded, setExpanded] = useState(false);
  const {
    data: g_SongId,
    isFetching: g_isFetching,
    error: g_error,
    isSuccess: g_SongIdSuccess,
  } = useGetGeniusSearchQuery(songid);
  const g_songId = g_SongId?.hits[0]?.result?.id;

  const {
    data: g_songData,
    isFetching: g_isFetchingSongData,
    error: g_errorSongData,
    isSuccess: g_songDataSuccess,
  } = useGetGeniusSongDataQuery(g_songId);

  const {
    data: g_songLyrics,
    isFetching: g_isFetchingSongLyrics,
    error: g_errorSongLyrics,
    isSuccess: g_lyricsSuccess,
  } = useGetGeniusSongLyricsQuery(g_songId);

  const {
    data: g_albumData,
    isFetching: albumFetching,
    isError: albumError,
    isSuccess: albumSuccess,
  } = useGetGeniusAlbumDataQuery(g_songData?.song?.album?.id);
  const displayCredits = expanded
    ? g_songData?.song?.custom_performances
    : g_songData?.song?.custom_performances.slice(0, 6);
  if (
    g_isFetching ||
    g_isFetchingSongData ||
    g_isFetchingSongLyrics ||
    albumFetching
  )
    return <Loader />;
  if (g_error || g_errorSongData || g_errorSongLyrics || albumError)
    return <Error />;
  if (g_lyricsSuccess || g_SongIdSuccess || g_songDataSuccess || albumSuccess) {
    return (
      <div className="flex flex-col w-full text-white h-full font-poppins z-20 mb-[100px] ">
        <div className="h-[350px]  w-full relative mb-[50px]">
          <div className=" flex justify-center items-center">
            <img
              className="object-cover w-full h-[350px]"
              src={
                g_songData?.song?.custom_header_image_url
                  ? g_songData?.song?.custom_header_image_url
                  : g_songData?.song?.song_art_image_url
              }
              alt=""
            />
          </div>
          <div className="absolute bottom-[-30px] w-[250px] h-[250px] left-[200px] drop-shadow-md">
            <img
              src={
                g_songData?.song?.custom_song_art_image_url
                  ? g_songData?.song?.custom_song_art_image_url
                  : g_songData?.song?.song_art_image_url
              }
              alt=""
            />
          </div>
          <div className="absolute flex flex-row bottom-0 left-[480px] text-xl font-poppins  mb-3">
            <div className="flex flex-row space-x-32">
              <div>
                <div className="text-4xl font-extrabold">
                  {g_songData?.song?.title}
                </div>
                <Link
                  to={
                    g_songData?.song
                      ? `/artists/${g_songData?.song?.artist_names}`
                      : "/"
                  }
                >
                  <p>{g_songData?.song?.artist_names}</p>
                </Link>
                <p>Track on: {g_songData?.song?.album?.name}</p>
              </div>
              <div className="flex flex-row space-x-8 text-lg">
                <div className="flex flex-col">
                  <p>Produced by</p>
                  <div className="flex flex-row">
                    {g_songData?.song?.producer_artists?.map((producer, i) => {
                      return (
                        <p key={i} className="text-2xl">
                          {producer.name}
                          {i !== g_songData?.song?.producer_artists?.length - 1
                            ? " ,"
                            : ""}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>Release Date</p>
                  <p className="text-2xl">
                    {g_songData?.song?.release_date_for_display}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-3"></div>
          </div>
        </div>
        <div className="container flex flex-col space-y-8 px-[200px]  font-poppins h-full text-white">
          <div className="mb-5">
            <p className="text-[90px] font-[600] tracking-wider  mb-[10px] leading-[135px] z-20">
              Lyrics
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: g_songLyrics?.lyrics?.lyrics?.body?.html,
              }}
            ></div>
          </div>
          <div className="">
            <p className="text-[90px] font-[600] tracking-wider h-full mb-[5px] leading-[135px] z-20">
              About
            </p>
            <p className="font-2xl font-medium border p-9 ">
              {g_songData?.song?.description_preview}
            </p>
          </div>
          <div className="">
            <p className="text-[90px] font-[600] tracking-wider  mb-[5px] leading-[135px] z-20">
              Album
            </p>
            <div className="flex  items-center">
              <img
                src={g_songData?.song?.album?.cover_art_url}
                className="w-[200px]"
                alt=""
              />
              <div className="font-2xl  px-9">
                <p>{g_songData?.song?.album?.full_title}</p>
                <Link
                  className="underline"
                  to={`/artists/${g_songData?.song?.album?.artist?.name}`}
                >
                  {g_songData?.song?.album?.artist?.name}
                </Link>
              </div>
            </div>
            <div className="grid  grid-cols-2 mt-5 ">
              {g_albumData?.album_appearances &&
                g_albumData?.album_appearances?.map((song, i) => {
                  return (
                    <p
                      key={song.song.id}
                      className={`${
                        g_songData?.song?.title === song?.song?.title
                          ? `border`
                          : ""
                      } p-2  text-lg  w-max`}
                    >
                      <Link
                        className="hover:underline"
                        to={`/songs/${song?.song?.title}`}
                      >
                        {i + 1}. {song?.song?.title}
                      </Link>
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className=" self-start text-[90px] font-[600] tracking-wider h-full mb-[5px] leading-[135px] z-20">
              Credits
            </p>
            <div className="grid grid-cols-2  self-start w-full">
              {displayCredits.map((credit) => {
                return (
                  <div key={credit.id} className="w-max p-5 font-poppins">
                    <p className="font-extrabold text-lg">{credit?.label}</p>
                    <p className=" underline tracking-wide">
                      <a href={credit?.artists[0]?.url} target="_blank">
                        {credit?.artists[0].name}
                      </a>
                    </p>
                  </div>
                );
              })}
              <div className="w-full p-5 ">
                <p className="font-extrabold text-lg">Recorded At</p>
                <p className="underline tracking-wide">
                  {g_songData?.song?.recording_location}
                </p>
              </div>
              <div className="w-full p-5">
                <p className="font-extrabold text-lg">Release Date</p>
                <p className="underline tracking-wide">
                  {g_songData?.song?.release_date_for_display}
                </p>
              </div>
            </div>
            <button
              className="ml-3 self-start font-extrabold text-2xl cursor-pointer border  hover:underline px-5 py-2 transition"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SongDetails;

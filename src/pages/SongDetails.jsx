import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useGetGeniusSearchQuery,
  useGetGeniusSongDataQuery,
  useGetGeniusSongLyricsQuery,
} from "../redux/services/geniusCore";
import { Loader, Error } from "../Components";
const SongDetails = () => {
  const { songid } = useParams();
  console.log("name", songid);

  const {
    data: g_SongId,
    isFetching: g_isFetching,
    error: g_error,
    isSuccess: g_SongIdSuccess,
  } = useGetGeniusSearchQuery(songid);
  const g_songId = g_SongId?.hits[0]?.result?.id;
  if (g_SongIdSuccess) {
    console.log("g_songId", g_songId);
  }

  const {
    data: g_songData,
    isFetching: g_isFetchingSongData,
    error: g_errorSongData,
    isSuccess: g_songDataSuccess,
  } = useGetGeniusSongDataQuery(g_songId);
  if (g_songDataSuccess) console.log("songData", g_songData);

  const {
    data: g_songLyrics,
    isFetching: g_isFetchingSongLyrics,
    error: g_errorSongLyrics,
    isSuccess: g_lyricsSuccess,
  } = useGetGeniusSongLyricsQuery(g_songId);
  if (g_lyricsSuccess) console.log("songLyrics", g_songLyrics);

  if (g_isFetching || g_isFetchingSongData || g_isFetchingSongLyrics)
    return <Loader />;
  if (g_error || g_errorSongData || g_errorSongLyrics) return <Error />;

  return (
    <div className="flex flex-col w-full text-white h-full font-poppins ">
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
          <p className="mb-[100px]">{g_songData?.song?.description_preview}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;

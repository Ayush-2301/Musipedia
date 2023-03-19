import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetShazamSearchQuery,
  useGetShazamArtistTopSongsQuery,
} from "../redux/services/shazamCore";
import { setGradientColor } from "../redux/features/colorSlice";
import {
  useGetGeniusSearchQuery,
  useGetGeniusArtistDataQuery,
  useGetGeniusArtistTopSongsQuery,
  useGetGeniusArtistTopAlbumsQuery,
} from "../redux/services/geniusCore";
import { useState } from "react";
import { Loader, Error, SongBar, AlbumBar } from "../Components";
import {
  FiCornerDownRight,
  FiCornerRightDown,
  FiCornerRightUp,
} from "react-icons/fi";

const ArtistDetails = () => {
  // getting id from the link
  const { id } = useParams();
  const {
    data: s_artistData,
    isFetching: s_isFetching,
    isError: s_isError,
  } = useGetShazamSearchQuery(id);
  const s_artistId = s_artistData?.artists?.hits[0]?.artist?.adamid;
  const {
    data: s_artistTopSongs,
    isFetching: s_fetchingTopSongs,
    isError: s_errorTopSongs,
    isSuccess: s_successTopSongs,
  } = useGetShazamArtistTopSongsQuery(s_artistId);
  const {
    data: g_ArtistId,
    isFetching: g_isFetching,
    error: g_error,
    isSuccess: g_artistIdSuccess,
  } = useGetGeniusSearchQuery(id);
  const g_artistId = g_ArtistId?.hits[0]?.result?.primary_artist?.id;
  const {
    data: g_artistData,
    isFetching: g_isFetchingArtistData,
    error: g_errorArtistData,
    isSuccess: g_artistDataSuccess,
  } = useGetGeniusArtistDataQuery(g_artistId);

  const [isReadShow, setIsReadShown] = useState(false);
  const toggleBtn = () => {
    setIsReadShown((prevState) => !prevState);
  };
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const songGrid = s_artistTopSongs?.data?.slice(0, 6).map((song, i) => {
    return (
      <SongBar
        key={song.id}
        song={song}
        i={i}
        isPlaying={isPlaying}
        activeSong={activeSong}
        data={s_artistTopSongs}
      />
    );
  });

  const {
    data: g_ArtistTopAlbum,
    isFetching: g_fetchingTopAlbum,
    error: g_errorTopAlbum,
    isSuccess: g_successTopAlbum,
  } = useGetGeniusArtistTopAlbumsQuery(g_artistId);
  const albumGrid = g_ArtistTopAlbum?.albums?.map((album, i) => {
    return (
      <AlbumBar key={album.id} i={i} data={g_ArtistTopAlbum} album={album} />
    );
  });

  if (
    g_isFetching ||
    g_isFetchingArtistData ||
    s_fetchingTopSongs ||
    g_fetchingTopAlbum
  )
    return <Loader />;
  if (g_error || g_errorArtistData || s_errorTopSongs || g_errorTopAlbum)
    return <Error />;
  if (
    g_artistIdSuccess ||
    g_artistDataSuccess ||
    s_successTopSongs ||
    g_successTopAlbum
  ) {
    return (
      <div className="flex flex-col w-full text-white h-full">
        <div className="h-[350px]  w-full relative mb-[50px]">
          <div className=" flex justify-center items-center">
            <img
              className="object-cover w-full h-[350px]"
              src={g_artistData?.artist?.header_image_url}
              alt=""
            />
          </div>
          <div className="absolute bottom-[-30px] w-[250px] h-[250px] left-[200px] drop-shadow-md ">
            <img src={g_artistData?.artist?.image_url} alt="" />
          </div>
          <div className="absolute bottom-0 left-[480px] font-poppins  mb-3 ">
            <div className="text-6xl font-extrabold">
              {g_artistData?.artist?.name}
            </div>
            <div className="flex flex-row space-x-3">
              AKA:
              {g_artistData?.artist?.alternate_names?.map((name, i) => {
                return (
                  <p key={i} className="ml-2">
                    {name}
                    {i !== g_artistData?.artist?.alternate_names?.length - 1
                      ? " ,"
                      : ""}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="container flex flex-col px-[200px]  font-poppins  text-white">
          <div>
            {g_artistData?.artist?.description_preview && (
              <>
                <div className="text-[90px] font-[600] tracking-wider  mb-[10px] leading-[135px] z-20">
                  About
                </div>
                <div className="">
                  <div className="font-2xl font-medium border p-9 ">
                    {isReadShow
                      ? g_artistData?.artist?.description_preview
                      : `${g_artistData?.artist?.description_preview.substr(
                          0,
                          1000
                        )} . . .`}
                    <button className=" text-center">
                      {!isReadShow ? (
                        <FiCornerRightDown
                          className="font-extrabold block"
                          onClick={toggleBtn}
                          size={25}
                        />
                      ) : (
                        <FiCornerRightUp
                          className="font-extrabold block"
                          onClick={toggleBtn}
                          size={25}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          {s_artistTopSongs?.data && (
            <div>
              <div className="text-[50px] font-[600] tracking-wide  mb-[10px] leading-[120px] z-20">
                Popular Songs
              </div>
              <div className="grid grid-cols-2 grid-rows-3 gap-2">
                {songGrid}
              </div>
            </div>
          )}
          {g_ArtistTopAlbum?.albums[0] && (
            <div className="mb-9">
              <div className="text-[50px] font-[600] tracking-wide  mb-[10px] leading-[120px] z-20 ">
                Popular Albums
              </div>
              <div className="grid grid-cols-3 grid-rows-2">{albumGrid}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ArtistDetails;

// using the id to get the artist id by using serach query of shazam

// const [s_artistId, setS_artistId] = useState("");
// const {
//   data: s_ArtistId,
//   isFetching: s_isFetching,
//   error: s_error,
//   isSuccess: s_fetchedArtistId,
// } = useGetShazamSearchQuery(id);
// if (s_fetchedArtistId) console.log(s_ArtistId);
// // creating a state of s_artistid
// if (s_fetchedArtistId) {
//   useEffect(() => {
//     setS_artistId(s_ArtistId?.artists?.hits[0]?.artist?.adamid);
//   }, [id]);
//   console.log("s_artistId", s_artistId);
// }
// // fetching the artist data from shazam core using s_artistId
// if (s_fetchedArtistId) {
//   const {
//     data: s_artistData,
//     isFetching: isFetchingArtistDetails,
//     error: s_artistError,
//     isSuccess: s_fetchedArtistData,
//   } = useGetBackgroundColorQuery(s_artistId);
//   if (s_fetchedArtistData) console.log("s_artistData", s_artistData);
//   if (s_artistError) console.log("error");
// }

// if (s_fetchedArtistData) {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const color = s_artistData?.data[0]?.attributes?.artwork?.bgColor;
//     console.log(color);
//     dispatch(setGradientColor(color));
//   }, [id, dispatch]);
// }
//
//

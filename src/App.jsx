import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetBackgroundColorQuery,
  useGetTopArtistsQuery,
} from "./redux/services/shazamCore";
import { useDispatch } from "react-redux";
import { setGradientColor } from "./redux/features/colorSlice";
import { NavBar, MusicPlayer, Footer, Loader, Error } from "./Components/index";
import {
  ArtistDetails,
  TopArtists,
  Explore,
  Search,
  SongDetails,
  TopCharts,
} from "./pages";
import { SkeletonTheme } from "react-loading-skeleton";
const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const [artistId, setArtistId] = useState("");
  const { data, isFetching, error } = useGetTopArtistsQuery();
  useEffect(() => {
    if (data?.tracks && data?.tracks.length > 0) {
      setArtistId(data.tracks[1].artists[0]?.adamid);
    }
  }, [data]);
  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetBackgroundColorQuery(artistId);
  const dispatch = useDispatch();
  useEffect(() => {
    const color = artistData?.data[0]?.attributes?.artwork?.bgColor;
    dispatch(setGradientColor(color));
  }, [artistData, dispatch]);
  if (error) {
    return <Error />;
  }
  if (isFetching) {
    return <Loader />;
  }
  if (isFetchingArtistDetails) {
    return <Loader />;
  }

  return (
    <div className="relative flex flex-col bg-[#040404]  ">
      <NavBar />

      <div className="flex flex-row justify-between ">
        <SkeletonTheme baseColor="#2c2b2b" highlightColor="#575757">
          <Routes>
            <Route path="/" element={<TopArtists />} />
            <Route path="/top-charts" element={<TopCharts />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/songs/:songid" element={<SongDetails />} />
            <Route path="/search/:searchTerm" element={<Search />} />
          </Routes>
        </SkeletonTheme>
      </div>
      {(activeSong?.name || activeSong?.title) && (
        <div
          className={`h-28 sticky flex bottom-0 left-0 right-0 animate-slideup bg-transparent  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10  z-50`}
        >
          <MusicPlayer />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;

// const [gradientColor, setGradientColor] = useState("");
// useEffect(() => {
//   setGradientColor(artistData?.data[0].attributes?.artwork?.bgColor);
// }, [gradientColor]);
// useEffect(() => {
//   if (artistData)
//     setGradientColor((prevColor) => {
//       return artistData?.data[0].attributes?.artwork?.bgColor;
//     });
// }, [artistData]);

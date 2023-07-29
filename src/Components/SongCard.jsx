import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      className={`flex  w-full  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-20  h-[75px] font-poppins items-center`}
    >
      <div className="flex  items-center font-thin flex-row text-2xl w-full justify-between">
        <div className="flex flex-row items-center  w-full">
          <div className="mx-2">{i + 1}. </div>
          <div className="">
            <img
              src={song.images?.coverarthq}
              alt=""
              className="w-[60px] mx-2"
            />
          </div>
          <div className="ml-4">
            <Link to={`/songs/${song?.share?.subject}`}>{song?.title}</Link>
          </div>
        </div>
        <div className="mr-2 text-gray-400 w-full text-center">
          <Link to={song?.artists ? `/artists/${song?.subtitle}` : "/"}>
            {song?.subtitle}
          </Link>
        </div>
        <div
          className={`justify-center items-center bg-opacity-50 mr-2 ${
            activeSong?.title === song?.title ? `flex bg-opacity-70` : `flex`
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SongCard;

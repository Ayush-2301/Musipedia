import React from "react";
import pointer from "../assets/pointer.png";
import { useGetTopArtistsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import { Error, Loader } from "../Components/index";
import { BiShuffle } from "react-icons/bi";
import { useSelector } from "react-redux";
const TopArtists = () => {
  // const gradientColor = "183659";
  const gradientColor = useSelector((state) => state.color.gradientColor);
  const pointerImage = (props) => {
    return (
      <img
        className={`${props ? "block" : "hidden"} w-7 h-7 ml-2`}
        src={pointer}
        alt=""
      />
    );
  };

  const {
    data: s_topArtist,
    isFetching: s_isFetching,
    isError: s_isError,
  } = useGetTopArtistsQuery();
  const s_topFiveArtist = s_topArtist?.tracks.slice(0, 5);
  const artists = s_topFiveArtist?.map((artist, i) => {
    let opacityValue = {
      opacity: 1 - i / 5,
    };

    if (s_isError) {
      return <Error />;
    }
    if (s_isFetching) {
      return <Loader />;
    }
    return (
      <div key={i} className="flex flex-row w-full items-center z-20">
        <div
          style={opacityValue}
          className={`${
            i === 0
              ? "text-[52px] font-[400] px-0 leading-[78px]"
              : "text-xl font-medium font-poppins"
          }text-xl font-medium tracking-wide flex flex-row items-center w-full `}
        >
          {i + 1}.
          <p className="hover:underline">
            <Link to={artist.subtitle ? `/artists/${artist?.subtitle}` : "/"}>
              {artist?.subtitle}
            </Link>
          </p>
          {i === 0 ? pointerImage(true) : pointerImage(false)}
        </div>
      </div>
    );
  });
  const EllipseColor = (gradientColor) => ({
    width: `300px`,
    height: `300px`,
    background: `radial-gradient(41.09% 41.09% at 50% 50%,#${gradientColor} 0%,rgba(217, 217, 217, 0) 100%)`,
  });
  const btnBorder = (gradientColor) => ({
    borderColor: `#${gradientColor}`,
  });
  return (
    <div className="container flex flex-col gap-y-5 mx-[200px] p-6  font-poppins bg-[#040404]  text-white h-[1000px] ">
      <div className="flex flex-row justify-between mb-10  ">
        <div className="flex flex-col ">
          <div className="text-[90px] font-[600] tracking-wider justify-start mb-[10px] leading-[135px] z-20">
            Top Artists
          </div>
          <div className="flex flex-col justify-center  items-center font-poppins mx-2 ">
            {artists}
          </div>
        </div>
        <div>
          <img
            className="w-[400px] h-[400px] z-20  rounded-lg"
            src={s_topFiveArtist[0]?.images?.background}
            alt=""
          />
        </div>
      </div>
      <div>
        <div
          className={`border-[4px] border-solid  justify-center items-center rounded-full p-4 py-2 flex w-[30%] z-20`}
          style={btnBorder(gradientColor)}
        >
          <span className="font-bold text-3xl mr-2 font-poppins tracking-wide text-center z-20">
            Play Something
          </span>
          <BiShuffle
            size={40}
            style={{ color: `#${gradientColor}` }}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="relative">
        {/* <div
          className="absolute top-[0px] mix-blend-screen right-[-80px] z-10 blur-[60px]"
          style={EllipseColor(gradientColor)}
        ></div> */}
        <div
          className="absolute  top-[0px] mix-blend-screen left-[-80px] z-10 blur-[60px]"
          style={EllipseColor(gradientColor)}
        ></div>
      </div>
      <div className="flex flex-col text-6xl font-poppins font-extrabold h-[270px] bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 z-20 p-6 space-y-3 justify-center tracking-wide leading-[65px]">
        <div>Play, Create &</div>
        <div>Explore</div>
        <div>
          The World of <span style={{ color: `#${gradientColor}` }}>Music</span>
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
// const [firstArtistId, setFirstArtistId] = useState("");
// useEffect(() => {
//   setFirstArtistId(topFiveArtistId[0]);
// }, [data]);
// // const firstArtistId = topFiveArtistId[0];
// console.log(typeof firstArtistId, firstArtistId);
// const { data: artistData1, isFetching: isFetchingArtistDetails1 } =
//   useGetBackgroundColorQuery({ firstArtistId });
// console.log(artistData1);

// ---Don't touch this code this for future upgradation in the layout (it create a array of artist id then the further stuff is fucked)----------
// ----------------------------------------------------------------
// const topFiveArtistId = topFiveArtist.map((obj) => {
//   if (obj?.artists === undefined) {
//     return "000000";
//   } else {
//     const newObj = obj?.artists[0]?.adamid;
//     return newObj;
//   }
// });
// console.log(topFiveArtist);
// console.log(topFiveArtistId);
// const filteredArray = topFiveArtistId.filter((val) => val !== "000000");
// console.log(filteredArray);

// const [artistId, setArtistId] = useState("");
// useEffect(() => {
//   if (data?.tracks && data?.tracks.length > 0) {
//     setArtistId(data.tracks[0].artists[0]?.adamid);
//   }
// }, [data]);
// const { data: artistData2, isFetching: isFetchingArtistDetails2 } =
//   useGetBackgroundColorQuery(artistId);
// const [gradientColor, setGradient] = useState("");
// useEffect(() => {
//   if (artistData2)
//     setGradient((prevColor) => {
//       return artistData2?.data[0]?.attributes?.artwork?.bgColor;
//     });
// }, [artistData2]);

// const dispatch = useDispatch();
// useEffect(() => {
//   const color = artistData2?.data[0]?.attributes?.artwork?.bgColor;
//   console.log(color);
//   dispatch(setGradientColor(color));
// }, [artistData2, dispatch]);
// -----------------------------------------------

// import React, { useEffect, useState } from "react";

// import { useGetTopArtistsQuery } from "../redux/services/shazamCore";

// const TopArtists = () => {
//   const { data, isFetching, error } = useGetTopArtistsQuery();

//   //

//   return (
//     <>
//       <div className="flex flex-row justify-around space-x-[40%] font-poppins container mx-auto p-6 mt-[40px]">
//         <div className="border ">
//           <div className="text-[90px] font-[600] tracking-wide mb-[20px] leading-[135px]">
//             Top Artists
//           </div>
//           <div className="flex flex-col justify-center  items-center border m-2 ">
//             {artists}
//           </div>
//         </div>
//         <div className="border w-[200px] ">
//           {}
//           {/* <ArtistImage image={artistRank} /> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopArtists;
// // const artists = data?.map((song, i) => {
//   //   // let opatcityValue = {
//   //   //   opacity: 1.3 - artist.rank / 5,
//   //   // };
//   //   return (
//   //     // <div
//   //     //   key={artist.rank}
//   //     //   style={opatcityValue}
//   //     //   className={`flex flex-row w-full items-center ${
//   //     //     artist.rank === 1
//   //     //       ? "text-3xl font-semibold tracking-wider"
//   //     //       : "text-xl font-medium tracking-wide"
//   //     //   }`}
//   //     // >
//   //     //   {artist.rank}. {artist.artist}{" "}
//   //     //   {artist.rank === 1 ? pointerImage(true) : pointerImage(false)}{" "}
//   //     // </div>
//   //     <div key={song.key}>song {i} </div>
//   //   );
//   // });
//   // // const ArtistImage = ({ image }) => {
//   // //   return <img src={image} alt="" />;
//   // // };
//   // // const artistRank = data?.map((artist) => {
//   // //   if (artist.rank === 1) {
//   // //     return artist.image;
//   // //   }
//   // })
//
// import React, { useEffect, useState } from "react";

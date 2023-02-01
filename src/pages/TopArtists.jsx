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
import pointer from "../assets/pointer.png";
import { useGetTopArtistsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import { Error, Loader } from "../Components/index";
import { BiShuffle } from "react-icons/bi";

const TopArtists = ({ gradientColor }) => {
  const { data, isFetching, error } = useGetTopArtistsQuery();
  const pointerImage = (props) => {
    return (
      <img
        className={`${props ? "block" : "hidden"} w-7 h-7 ml-2`}
        src={pointer}
        alt=""
      />
    );
  };
  console.log(gradientColor);
  if (error) {
    return <Error />;
  }
  if (isFetching) {
    return <Loader />;
  }
  const topFiveArtist = data?.tracks?.slice(0, 5);
  console.log(topFiveArtist);
  const artists = topFiveArtist?.map((artist, i) => {
    let opacityValue = {
      opacity: 1 - i / 5,
    };
    return (
      <div key={artist.key} className="flex flex-row w-full items-center z-20">
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
            <Link
              to={
                artist.artists ? `/artists/${artist?.artists[0]?.adamid}` : "/"
              }
            >
              {artist.subtitle}
            </Link>
          </p>
          {i === 0 ? pointerImage(true) : pointerImage(false)}
        </div>
      </div>
    );
  });
  // const figradient
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
            className="w-[400px] h-[400px] z-20 artistImage"
            src={data?.tracks[0].images?.background}
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
        <div
          className="absolute top-[-120px] mix-blend-screen right-[-100px] z-10 blur-[60px]"
          style={EllipseColor(gradientColor)}
        ></div>
        <div
          className="absolute  top-[-120px] mix-blend-screen left-[-120px] z-10 blur-[60px]"
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

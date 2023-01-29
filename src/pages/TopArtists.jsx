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
import React, { useEffect, useState } from "react";
import pointer from "../assets/pointer.png";
import { useGetTopArtistsQuery } from "../redux/services/shazamCore";
import { Link } from "react-router-dom";
import { Error, Loader } from "../Components/index";

const TopArtists = () => {
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

  if (error) {
    return <Error />;
  }
  if (isFetching) {
    return <Loader />;
  }

  const artists = data?.tracks?.slice(0, 5)?.map((artist, i) => {
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
          }text-xl font-medium tracking-wide flex flex-row items-center w-full  px-1`}
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

  return (
    <div className="container flex flex-col mx-auto p-6  font-poppins bg-[#040404]  text-white h-[1000px]">
      <div className="flex flex-row justify-around ">
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
            className="w-[400px] z-20"
            src={data?.tracks[0].images?.background}
            alt=""
          />
        </div>
      </div>
      <div
        className={`border-2 border-solid ml-[200px] justify-center items-center border-white rounded-2xl p-3 flex w-[25%]  `}
      >
        <span className="font-semibold text-xl font-poppins text-center">
          Play Something
        </span>
      </div>
    </div>
  );
};

export default TopArtists;

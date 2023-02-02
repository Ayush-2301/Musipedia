import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";
const links = [
  { name: "Top Artists", to: "/", icon: HiOutlineUserGroup },
  { name: "Explore", to: "/explore", icon: HiOutlineMenu },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
];

const NavBar = () => {
  const gradientColor = useSelector((state) => state.color.gradientColor);
  const accentColor = (gradientColor) => ({
    position: `absolute`,
    width: `1516px`,
    height: `1052px`,
    left: `0px`,
    top: "-900px",
    background: `#${gradientColor}`,
    filter: `blur(100px)`,
    zIndex: `-99999`,
  });

  const NavLinks = ({ handleClick }) => (
    <div className={` flex flex-row  `}>
      {links.map((item) => {
        return (
          <NavLink
            key={item.name}
            to={item.to}
            className={`flex flex-row  items-center text-white  mx-8 text-lg tracking-wider font-medium`}
            onClick={() => handleClick && handleClick()}
          >
            <div>{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
  return (
    <div
      className="flex flex-row justify-between container mx-auto px-6 h-[80px] w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-400 text-white items-center font-poppins z-20 rounded-b-[20px] 
"
    >
      <div style={accentColor(gradientColor)}></div>
      <div className="flex flex-row items-center">
        <img
          src={logo}
          alt=""
          className="w-[80px] px-3 border border-gray-500 border-solid border-l-0 border-t-0 border-b-0"
        />
        <div className="px-3 text-2xl tracking-wider uppercase leading-9 font-semibold">
          {" "}
          MusiPedia
        </div>
      </div>
      <div className="flex flex-row items-center w-full justify-end">
        <NavLinks />
        <div>
          <input
            type="text"
            className="p-2 py-1 rounded-3xl w-full bg-gray-700 text-gray-300 outline-none"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

// <>
//   <div className="flex flex-row w-[240px] py-10 px-4 bg-[#191624]">
//     {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
//     <NavLinks />
//   </div>
//   Mobile sidebar
//   <div className="absolute md:hidden block top-6 right-3">
//     {!mobileMenuOpen ? (
//       <HiOutlineMenu
//         className="w-6 h-6 mr-2 text-white"
//         onClick={() => setMobileMenuOpen(true)}
//       />
//     ) : (
//       <RiCloseLine
//         className="w-6 h-6 mr-2 text-white"
//         onClick={() => setMobileMenuOpen(false)}
//       />
//     )}
//   </div>
//   <div
//     className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition -left-full`}
//   >
//     {/* <img src={logo} alt="logo" className="w-full h-14 object-contain" /> */}
//     {/* <NavLinks handleClick={() => setMobileMenuOpen(false)} /> */}
//   </div>
// </>

// const [artistId, setArtistId] = useState("");
// const { data, loading, error } = useGetTopArtistsQuery();
// useEffect(() => {
//   if (data?.tracks && data?.tracks.length > 0) {
//     setArtistId(data.tracks[0].artists[0]?.adamid);
//   }
// }, [data]);
// if (error) {
//   return <div className="text-white">Error</div>;
// }
// if (loading) {
//   return <div className="text-white">Loading...</div>;
// }
// console.log(artistId);
// const { data: artistData, isFetching: isFetchingArtistDetails } =
//   useGetBackgroundColorQuery({ artistId });
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

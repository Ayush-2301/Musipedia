import React from "react";
import logo from "../assets/logo.png";

const Loader = () => {
  return (
    <div className=" container flex flex-col justify-center items-center mx-auto p-6  font-poppins bg-[#040404]  text-white h-screen ">
      <img src={logo} alt="" className=" w-[60px]" id="logo-animation" />
      <div className="px-3 text-2xl tracking-wider uppercase leading-9 font-semibold mt-4">
        Musipedia
      </div>
    </div>
  );
};

export default Loader;

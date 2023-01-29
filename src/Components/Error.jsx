import React from "react";
import logo from "../assets/logo.png";

const Error = () => {
  return (
    <div className="container flex justify-center items-center mx-auto p-6  font-poppins bg-[#040404]  text-white h-screen ">
      <div className="w-[350px] h-[250px] flex flex-col  justify-center items-center  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ">
        <img src={logo} alt="" className=" w-[60px]" id="logo-animation" />
        <p className=" text-xl tracking-wider uppercase leading-9 font-semibold mt-2">
          Error
        </p>
        <p className="text-gray-400 w-[200px] text-center font-poppins">
          Please wait a few minutes before you try again
        </p>
      </div>
    </div>
  );
};

export default Error;

import React from "react";
import Skeleton from "react-loading-skeleton";
const CardSkelton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className="flex  w-full h-[80px] font-poppins items-center z-20  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 p-2 hover:bg-gray-500 hover:bg-opacity-20">
        <div className="flex space-x-3 justify-center items-center">
          <Skeleton className="w-[60px] h-[60px]" />
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-[120px] h-[15px]" />
            <Skeleton className="w-[120px] h-[15px]" />
          </div>
        </div>
      </div>
    ));
};

export default CardSkelton;

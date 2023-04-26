import React from "react";
import Skeleton from "react-loading-skeleton";
const CircleCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className="flex flex-col justify-center w-full h-full font-poppins items-center z-20  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm  bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-20 ">
        <div className="flex flex-col">
          <Skeleton circle width={100} height={100} />
          <div className="flex flex-col justify-center items-center">
            <Skeleton className="w-[80px] h-[15px]" />
            <Skeleton className="w-[80px] h-[15px]" />
          </div>
        </div>
      </div>
    ));
};

export default CircleCardSkeleton;

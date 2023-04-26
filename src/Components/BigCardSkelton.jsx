import React from "react";
import Skeleton from "react-loading-skeleton";
const BigCardSkelton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div
        className="flex flex-col justify-start space-y-3 p-3
              w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10
          hover:bg-gray-500 hover:bg-opacity-20"
      >
        <div className="flex flex-col space-y-4">
          <Skeleton className="w-[200px] h-[200px]" />
          <Skeleton className="w-[120px] h-[20px]" />
          <Skeleton className="w-[120px] h-[20px]" />
        </div>
      </div>
    ));
};

export default BigCardSkelton;

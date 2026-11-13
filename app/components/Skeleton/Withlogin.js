import React from "react";

export default function SkeletonL() {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md mb-8" />
      <div className="flex gap-8">
        <div className="w-[300px] h-[500px] bg-gray-200 animate-pulse rounded-xl" />
        <div className="flex-1 h-[500px] bg-gray-200 animate-pulse rounded-md" />
      </div>
    </div>
  );
}

//LoadingListing.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingListing() {
  return (
    <>
      <div
        className="pt-14 lg:ml-60 h-full block gap-2 flex-col lg:flex-row translate-all
    duration-300"
      >
        <div className="px-4" style={{ minWidth: "1200px" }}>
        <div className="flex justify-between items-center px-5 p-9">
          <div className="w-full">
            {/* Skeleton for title */}
            <Skeleton className="h-8 w-1/4 mb-4"/>
            {/* Skeleton for subtitle */}
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="relative w-96">
          <Skeleton className="h-10 w-96" />
          </div>
        </div>
          <Skeleton className="grid p-4 gap-6 grid-cols-6 grid-rows-subgrid max-w-full h-screen mx-auto"/>
        </div>
      </div>
    </>
  );
}

export default LoadingListing;

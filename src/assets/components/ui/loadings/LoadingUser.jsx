//LoadingDashboard.jsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingUser() {
  return (
    <>
      <div
        className="pt-14 lg:ml-60 h-full block gap-2 flex-col lg:flex-row translate-all
    duration-300"
      >
        <div className="px-4" style={{ minWidth: "1200px" }}>
          <div className="justify-between items-center px-5 p-9">
            {/* Skeleton for title */}
            <Skeleton className="h-8 w-1/5 mb-4" />
            {/* Skeleton for subtitle */}
            <Skeleton className="h-5 w-3/6 " />
          </div>
          <div className="grid gap-4 p-4 grid-cols-6 max-w-full mx-auto">
            <Skeleton className="h-48 w-full rounded-md"/>
            <Skeleton className="h-screen w-full rounded-md col-start-2 col-end-7 row-start-1 row-end-3"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoadingUser;

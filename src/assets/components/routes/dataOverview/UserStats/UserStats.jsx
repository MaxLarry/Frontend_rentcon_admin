import * as React from "react";
import UserCount from "./UserCount";
import NewlyRegistered from "./NewlyRegistered"
import ActiveuserHistogram from "./ActiveuserHistogram";

function UserStats() {
  return (
    <>
      <div className="flex justify-between items-center px-5 mt-5">
        <h1 className="font-bold text-lg pb-5">User Statistics</h1>
      </div>
      <div className="grid p-4 gap-6 grid-cols-9 grid-rows-subgrid max-w-full mx-auto">
        <UserCount />
        <NewlyRegistered/>
        <ActiveuserHistogram/>
      </div>
    </>
  );
}

export default UserStats;

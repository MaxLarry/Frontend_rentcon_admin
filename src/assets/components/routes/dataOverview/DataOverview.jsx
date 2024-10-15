import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserStats from "./UserStats/UserStats";
import PropertyStats from "./Property_listing/PropertyStats"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function DataOverview() {
  return (
    <ScrollArea className="px-4 pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300" style={{ minWidth: "1200px", overflowX: 'auto' }}>
      <div className="justify-between items-center px-5 py-9">
        <h1 className="font-bold text-2xl">Data Overview</h1>
        <p className="font-thin text-sm">Access insights into rental trends and user activity through clear visuals.</p>
      </div>
      <div className=" max-w-full mx-auto">
        <UserStats />
        <PropertyStats/>
      </div>
    </ScrollArea>
  );
}

export default DataOverview;

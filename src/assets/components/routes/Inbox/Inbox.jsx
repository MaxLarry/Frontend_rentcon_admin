import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "@/components/ui/input";
import { HiMiniPencilSquare } from "react-icons/hi2";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Inbox() {
  const [searchQuery, setSearchQuery] = useState("");

  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <ScrollArea className="pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300">
      <div className="px-4" style={{ minWidth: "1200px" }}>
        <div className="justify-between items-center px-5 p-9">
          <h1 className="font-bold text-2xl">Inbox</h1>
          <p className="font-thin text-sm">
            Handle communication and inquiries from fellow admins and users
            efficiently.
          </p>
        </div>
        <div className="px-4 h-auto">
          <ResizablePanelGroup
            className="min-h-[250px] w-full rounded-lg border md:min-w-[450px]"
            direction="horizontal"
          >
            <ResizablePanel className="min-w-80 max-w-xl">
              <div className="relative p-4 flex items-center gap-2">
                <div className="relative w-full">
                  <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 pl-10 w-full border rounded-md"
                  />
                  <HiMiniPencilSquare className="absolute top-1/2 transform -translate-y-1/2 right-3 text-2xl text-gray-500 cursor-pointer" />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel></ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </ScrollArea>
  );
}

export default Inbox;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

function Inbox() {
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <ScrollArea className="px-4 pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300 overflow-x-auto">
      <div className="justify-between items-center px-5 p-9">
        <h1 className="font-bold text-2xl">Inbox</h1>
        <p className="font-thin text-sm">
          Quickly view key performance metrics and platform status at a glance.
        </p>
      </div>
    </ScrollArea>
  );
}

export default Inbox;

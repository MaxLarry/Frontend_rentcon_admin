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
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Alice",
      text: "Hey, can we schedule a meeting?",
      time: "10:30 AM",
      timestamp: new Date('2024-10-18T10:30:00').getTime(),
    },
    {
      id: 2,
      name: "Bob",
      text: "I have some updates regarding the project.",
      time: "11:15 AM",
      timestamp: new Date('2024-10-18T11:15:00').getTime(),
    },
    {
      id: 3,
      name: "Charlie",
      text: "Please send me the latest report.",
      time: "12:00 PM",
      timestamp: new Date('2024-11-18T12:00:00').getTime(),
    },
  ]);

  // Filter and sort messages based on the search query and by timestamp (newest to oldest)
  const filteredMessages = messages
    .filter((message) =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp (newest to oldest)

  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <ScrollArea className="pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300">
      <div className="px-4 pb-4" style={{ minWidth: "1200px" }}>
        <div className="justify-between items-center px-5 p-9">
          <h1 className="font-bold text-2xl">Inbox</h1>
          <p className="font-thin text-sm">
            Handle communication and inquiries from fellow admins and users
            efficiently.
          </p>
        </div>
        <div className="px-4 pb-4 h-[600px]">
          <ResizablePanelGroup
            className="min-h-[250px]  w-full rounded-lg border md:min-w-[450px]"
            direction="horizontal"
          >
            <ResizablePanel className="min-w-80 max-w-lg">
              <div className="relative flex items-center gap-2 p-4">
                <div className="flex-grow">
                  <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 pl-10 h-8"
                  />
                </div>
                <HiMiniPencilSquare className="cursor-pointer text-2xl" 
                style={{ opacity: 0.8 }} />
              </div>
              <div className="px-4 text-xs">
              {filteredMessages.length > 0 ? (
                  <div className="space-y-2">
                    {filteredMessages.map((message) => (
                      <div className="border rounded-md p-3" key={message.id}>
                        <div className="flex pb-1 justify-between items-center">
                          <span className="font-semibold">{message.name}</span>
                          <span>{message.time}</span>
                        </div>
                        <p>{message.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No messages found.</p>
                )}
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

//Dashboard.jsx
import React from "react";
import Header from "../../ui/Header";
import Sidebar from "../../ui/Sidebar";
import ActiveUsercard from "./ActiveUser";
import { FiUsers } from "react-icons/fi";
import GraphV from "./GraphV";
import PropertyListedGraph from "./PropertyListedGraph";
import PendingRequestdash from "./PendingRequestdash";
import PropertylistingStatus from "./PARdataGraph";
import ActivityLogs from "./ActivityLogsDash";
import MostVisited from "./MostVisited";
import { ScrollArea } from "@/components/ui/scroll-area";

function Dashboard() {
  return (
    <>
      <ScrollArea
        className=" px-4 pt-14 lg:ml-60 h-full block gap-2 flex-col lg:flex-row translate-all
    duration-300"
      >
        <div className="justify-between items-center px-5 p-9">
          <h1 className="font-bold text-2xl">Dashboard</h1>
          <p className="font-thin text-sm">Quickly view key performance metrics and platform status at a glance.</p>
        </div>
        <div className="grid p-4 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-6 grid-rows-subgrid max-w-full mx-auto">
          <ActiveUsercard />
          <PropertyListedGraph />
          <PendingRequestdash />
          <GraphV />
          <MostVisited />
          <PropertylistingStatus />
          <ActivityLogs />
        </div>
      </ScrollArea>
    </>
  );
}

export default Dashboard;

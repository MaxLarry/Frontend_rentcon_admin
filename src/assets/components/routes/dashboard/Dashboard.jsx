//Dashboard.jsx
import React, { useState, useEffect } from "react";
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
import LoadingDashboard from "@/assets/components/ui/loadings/LoadingDashboard";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // 3-second delay
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingDashboard />
      ) : (
        <ScrollArea
          className="pt-14 lg:ml-60 h-full block gap-2 flex-col lg:flex-row translate-all
    duration-300"
        >
          <div className="px-4" style={{ minWidth: "1200px" }}>
            <div className="justify-between items-center px-5 p-9">
              <h1 className="font-bold text-2xl">Dashboard</h1>
              <p className="font-thin text-sm">
                Quickly view key performance metrics and platform status at a
                glance.
              </p>
            </div>
            <div className="grid p-4 gap-6 grid-cols-6 grid-rows-subgrid max-w-full mx-auto">
              <ActiveUsercard />
              <PropertyListedGraph />
              <PendingRequestdash />
              <GraphV />
              <MostVisited />
              <PropertylistingStatus />
              <ActivityLogs />
            </div>
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default Dashboard;

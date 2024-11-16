import React, { useState, useEffect } from "react";
import Pending from "./Pending";
import Rejected from "./Rejected";
import Approved from "./Approved";
import TabsButton from "./TabsButton";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchInput } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingListing from "@/assets/components/ui/loadings/LoadingListing";

function ListingManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get tab name from URL
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("listing") || "Pending";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // 3-second delay
  }, []);

  useEffect(() => {
    const currentTab = queryParams.get("listing");
    if (currentTab !== activeTab) {
      navigate(`?listing=${activeTab}`, { replace: true }); // Update URL without reloading
    }
  }, [activeTab, queryParams, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "Pending":
        return <Pending searchQuery={searchQuery} />;
      case "Approved":
        return <Approved searchQuery={searchQuery} />;
      case "Rejected":
        return <Rejected searchQuery={searchQuery} />;
      default:
        return null;
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingListing />
      ) : (
        <ScrollArea className="pt-14 lg:ml-60 h-full block gap-2 flex-col lg:flex-row translate-all duration-300">
          <div className="px-4" style={{ minWidth: "1200px" }}>
            <div className="flex justify-between items-center px-5 p-9">
              <div>
                <h1 className="font-bold text-2xl">Listing Management</h1>
                <p className="font-thin text-sm">
                  Easily oversee pending, approved, and rejected property and
                  organize property listings for better visibility.
                </p>
              </div>
              <div className="relative w-96">
                <SearchInput
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 pl-10 w-full"
                />
              </div>
            </div>
            <div>
              <TabsButton activeTab={activeTab} setActiveTab={setActiveTab} />
              {renderContent()}
            </div>
          </div>
        </ScrollArea>
      )}
    </>
  );
}

export default ListingManagement;

import React from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { FiCheckSquare, FiTrash2 } from "react-icons/fi";

function TabsButton({ activeTab, setActiveTab }) {
  const tabs = [
    {
      name: "Pending",
      icon: <MdOutlinePendingActions size={14} />,
    },
    {
      name: "Approved",
      icon: <FiCheckSquare size={14} />,
    },
    {
      name: "Rejected",
      icon: <FiTrash2 size={14} />,
    },
  ];

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-wrap justify-center items-center py-5 lg:gap-40 gap-20">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleClick(tab.name)}
          className={`flex flex-col items-center p-2 rounded-lg px-4 dark:text-gray-200 relative ${
            activeTab === tab.name
              ? "text-teal-400"
              : "text-gray-500 hover:text-teal-400"
          }`}
        >
          {tab.icon}
          <span className="mt-1 text-sm">{tab.name}</span>
          {activeTab === tab.name && (
            <span className="relative bottom-0 left-0 w-full h-1 rounded-t-xl bg-teal-400 "></span>
          )}
        </button>
      ))}
    </div>
  );
}

export default TabsButton;

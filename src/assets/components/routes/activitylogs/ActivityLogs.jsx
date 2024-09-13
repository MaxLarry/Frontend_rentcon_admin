import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../ui/Pagination";

function ActivityLogs() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const logs = [
    {
      id: "09876w543210987654d321",
      adminName: "John Doe",
      action: "Added a listing",
      timestamp: "2024-09-12 10:23:45",
      ipAddress: "192.168.0.1",
      target: "Listings",
      role: "Super-Admin",
    },
    {
      id: "09876w54321s0987654321",
      adminName: "Jane Smith",
      action: "Updated user info",
      timestamp: "2024-09-12 11:05:22",
      ipAddress: "192.168.0.2",
      target: "User Management",
      role: "Admin",
    },
    // More log entries
  ];
  const req_column = [
    "Log ID",
    "Admin Name",
    "Action",
    "Timestamp",
    "IP Address",
    "Entity Affected",
    "Role",
  ];

  const truncateId = (id) => `${id.slice(0, 5)}...`;

  // Pagination logic
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

  return (
    <div className="p-4 sm:ml-64 min-h-screen block gap-2 flex-col lg:flex-row translate-all duration-300 mt-14">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl p-4 text-gray-700 dark:text-gray-200">
          Activity Logs
        </h1>
      </div>
      <div className="overflow-auto rounded-md py-3">
        <table className="min-w-full bg-white text-center text-sm">
          <thead className="bg-gray-200">
            <tr className="border-b">
              {req_column.map((column) => (
                <th key={column} className="px-6 py-2 text-gray-700 font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="py-2 px-4">{truncateId(log.id)}</td>
                <td className="py-2 px-4">{log.adminName}</td>
                <td className="py-2 px-4">{log.action}</td>
                <td className="py-2 px-4">{log.timestamp}</td>
                <td className="py-2 px-4">{log.ipAddress}</td>
                <td className="py-2 px-4">{log.target}</td>
                <td className="py-2 px-4">{log.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalItems={logs.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ActivityLogs;

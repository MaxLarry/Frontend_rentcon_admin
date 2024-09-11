import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function PendingRequestdash() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for pending requests (you can replace this with actual data later)
  const pendingRequests = [
    { id: 1, requesterName: "John Doe", date: "2024-09-01", status: "Under Review" },
    { id: 2, requesterName: "Jane Smith", date: "2024-09-02", status: "Pending" },
    { id: 3, requesterName: "Michael Brown", date: "2024-09-03", status: "Pending" },
  ];

  const filteredRequests = pendingRequests.filter((request) =>
    request.requesterName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200 p-5 rounded-md shadow-md block items-center lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-4 md:col-start-1 md:col-end-3 relative">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-medium text-zinc-900">
          Pending Requests
        </span>
        <div className="relative w-auto h-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 p-2 pl-10 w-full rounded-md h-8 focus:outline-none focus:ring-blue-500"
          />
          <FiSearch className="absolute left-3 top-2 text-gray-500" />
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 text-center text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-2 text-gray-700">ID</th>
            <th className="px-6 py-2 text-gray-700">Requester Name</th>
            <th className="px-6 py-2 text-gray-700">Date</th>
            <th className="px-6 py-2 text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <tr key={request.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
                <td className="px-6 py-2 text-gray-700">{request.id}</td>
                <td className="px-6 py-2 text-gray-700">{request.requesterName}</td>
                <td className="px-6 py-2 text-gray-700">{request.date}</td>
                <td className={`px-6 py-2 text-gray-700${
                  request.status === 'Under Review'
                    ? 'text-green-500'
                    : request.status === 'Pending'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}>{request.status}</td>
              </tr>
              
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PendingRequestdash;

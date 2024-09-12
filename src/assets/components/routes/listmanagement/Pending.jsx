import React, { useState } from "react";
import { IoCopy } from "react-icons/io5";
import Pagination from "../../ui/Pagination";

function Pending({ searchQuery }) {
  const listingRequests = [
    {
    id: "12345678901234567890",
    name: "Alice Johnson",
    status: "",
    date: "2024-09-05",
  },
  {
    id: "09876543210987oio654321",
    name: "Bob Smith",
    status: "",
    date: "2024-09-04",
  },
  { id: "0987d6543210987654321", name: 'Fred Murphy', status: '', date: '2024-09-05' },
  { id: "0987ds6543210987654321", name: 'Gina Bell', status: '', date: '2024-09-04' },
  { id: "09876w543210987654321", name: 'Henry Collins', status: '', date: '2024-09-03' },
  { id: "098765j43210987654321", name: 'Isabella Cooper', status: '', date: '2024-09-03' },
  { id: "098765r43210987654321", name: 'Jacob Foster', status: '', date: '2024-09-03' },
  { id: "09876543210987k654321", name: 'Katherine Turner', status: '', date: '2024-09-03' },
  { id: "09876543210f987654321", name: 'Leo Parker', status: '', date: '2024-09-05' },
  { id: "0987654x3210987654321", name: 'Megan Brooks', status: '', date: '2024-09-04' },
  { id: "0987654321v0987654321", name: 'Nathan Wood', status: '', date: '2024-09-03' },
  { id: "0987654cv3210987654321", name: 'Olivia Reed', status: '', date: '2024-09-03' },
  { id: "09876543210987654321", name: 'Patrick Bell', status: '', date: '2024-09-03' },
  { id: "0vc9876543210987654321", name: 'Quincy Ward', status: '', date: '2024-09-03' },
  { id: "098765432109876vc54321", name: 'Ruby Brooks', status: '', date: '2024-09-05' },
  { id: "09876vc543210987654321", name: 'Samuel Cook', status: '', date: '2024-09-04' },
  { id: "098vc76543210987654321", name: 'Tessa Rogers', status: '', date: '2024-09-03' },
  { id: "098765432109dh87654321", name: 'Ulysses Campbell', status: '', date: '2024-09-03' },
  { id: "09876543210h987654321", name: 'Vivian Powell', status: '', date: '2024-09-03' },
  { id: "09876543210d987654321", name: 'Walter Edwards', status: '', date: '2024-09-03' },
  { id: "09876543210o987654321", name: 'Xenia Simmons', status: '', date: '2024-09-05' },
  { id: "09876543210u987654321", name: 'Yvonne Jenkins', status: '', date: '2024-09-04' }
  ];
  const req_column = ["ID", "Requester Name", "Status", "Requested Date", "Action"];

  const handleReview = (id) => {
    console.log(`Review request with ID: ${id}`);
  };

  const handleApprove = (id) => {
    console.log(`Approve request with ID: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Decline request with ID: ${id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    });
  };

  const truncateId = (id) => `${id.slice(0, 5)}...`;

  const filteredRequests = listingRequests.filter((request) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      request.id.toLowerCase().includes(lowerCaseQuery) ||
      request.name.toLowerCase().includes(lowerCaseQuery) ||
      request.status.toLowerCase().includes(lowerCaseQuery) ||
      request.date.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center text-sm">
          <thead>
            <tr className="border-b">
              {req_column.map((column) => (
                <th key={column} className="px-6 py-2 text-gray-600 font-bold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((request, index) => (
                <tr
                  key={request.id}
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-6 py-2 text-gray-700 relative">
                    <div className="group relative inline-block">
                      <span
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => handleCopy(request.id)}
                      >
                        {truncateId(request.id)}
                      </span>
                      <div
                        className={`absolute bottom-3 left-0 bg-gray-700 text-white text-xs rounded-lg p-2 mb-2 w-auto shadow-lg z-10 items-center cursor-pointer ${copiedId === request.id ? 'flex' : 'hidden group-hover:flex'}`}
                        onClick={() => handleCopy(request.id)}
                      >
                        {copiedId === request.id ? (
                          <p className="font-thin">Copied</p>
                        ) : (
                          <>
                            <IoCopy className="text-md text-gray-300 hover:text-white mr-2" />
                            <p className="font-thin">{request.id}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-gray-700">{request.name}</td>
                  <td className={`px-6 py-2 font-medium ${request.status === "Approved" ? "text-green-500" : request.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}>
                    {request.status}
                  </td>
                  <td className="px-6 py-2 text-gray-700">{request.date}</td>
                  <td className="px-6 py-2">
                    <div className="flex justify-center space-x-2">
                      <span
                        onClick={() => handleReview(request.id)}
                        className="cursor-pointer text-blue-500 hover:underline"
                      >
                        Review
                      </span>
                      <span className="text-gray-400">|</span>
                      <span
                        onClick={() => handleApprove(request.id)}
                        className="cursor-pointer text-green-500 hover:underline"
                      >
                        Approve
                      </span>
                      <span className="text-gray-400">|</span>
                      <span
                        onClick={() => handleDecline(request.id)}
                        className="cursor-pointer text-red-500 hover:underline"
                      >
                        Decline
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={filteredRequests.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Pending;

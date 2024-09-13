import React, { useState, useEffect } from "react";
import { IoCopy } from "react-icons/io5";
import Pagination from "../../ui/Pagination";

function Rejected({ searchQuery }) {
  const listingRejected = [
    { id: "12345678901234567890", name: "Alice Johnson", date: "2024-09-05", rejected_date: '2024-09-06', note:'meow meow meow'},
    { id: "09876543210987oio654321", name: "Bob Smith", date: "2024-09-04", rejected_date: '2024-09-05', note:'meow meow meow'},
    { id: "0987d6543210987654321", name: 'Fred Murphy', date: '2024-09-05', rejected_date: '2024-09-06', note:'meow meow meow' },
    { id: "0987ds6543210987654321", name: 'Gina Bell', date: '2024-09-04', rejected_date: '2024-09-05' , note:'meow meow meow'},
    { id: "09876w543210987654321", name: 'Henry Collins', date: '2024-09-03', rejected_date: '2024-09-03' , note:'meow meow meow'},
    { id: "098765j43210987654321", name: 'Isabella Cooper', date: '2024-09-03', rejected_date: '2024-09-03' , note:'meow meow meow'},
    { id: "098765r43210987654321", name: 'Jacob Foster', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876543210987k654321", name: 'Katherine Turner', date: '2024-09-03', rejected_date: '2024-09-03' , note:'meow meow meow'},
    { id: "09876543210f987654321", name: 'Leo Parker', date: '2024-09-05', rejected_date: '2024-09-06' , note:'meow meow meow'},
    { id: "0987654x3210987654321", name: 'Megan Brooks', date: '2024-09-04', rejected_date: '2024-09-05' , note:'meow meow meow'},
    { id: "0987654321v0987654321", name: 'Nathan Wood', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "0987654cv3210987654321", name: 'Olivia reed', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876543210987654321", name: 'Patrick Bell', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "0vc9876543210987654321", name: 'Quincy Ward', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "098765432109876vc54321", name: 'Ruby Brooks', date: '2024-09-05', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876vc543210987654321", name: 'Samuel Cook', date: '2024-09-04', rejected_date: '2024-09-06' , note:'meow meow meow'},
    { id: "098vc76543210987654321", name: 'Tessa Rogers', date: '2024-09-03', rejected_date: '2024-09-05' , note:'meow meow meow'},
    { id: "098765432109dh87654321", name: 'Ulysses Campbell', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876543210h987654321", name: 'Vivian Powell', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876543210d987654321", name: 'Walter Edwards', date: '2024-09-03', rejected_date: '2024-09-04' , note:'meow meow meow'},
    { id: "09876543210o987654321", name: 'Xenia Simmons', date: '2024-09-05', rejected_date: '2024-09-06' , note:'meow meow meow'},
    { id: "09876543210u987654321", name: 'Yvonne Jenkins', date: '2024-09-04', rejected_date: '2024-09-05' , note:'meow meow meow'}
    ];

  const req_column = [
    "Select",
    "ID",
    "Requester Name",
    "Requested Date",
    "Rejected Date",
    "Note",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequests, setSelectedRequests] = useState([]); // List of selected requests
  const [selectAll, setSelectAll] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const itemsPerPage = 20;

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId(null);
      }, 3000);
    });
  };

  const truncateId = (id) => `${id.slice(0, 5)}...`;

  const filteredRequests = listingRejected.filter((request) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      request.id.toLowerCase().includes(lowerCaseQuery) ||
      request.name.toLowerCase().includes(lowerCaseQuery) ||
      request.date.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle select/unselect individual requests
  const handleSelectRequest = (id) => {
    setSelectedRequests(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id) // Unselect
          : [...prevSelected, id] // Select
    );
  };

  // Handle select/unselect all requests
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRequests([]); // Unselect all
    } else {
      setSelectedRequests(currentItems.map((request) => request.id)); // Select all visible requests
    }
    setSelectAll(!selectAll);
  };

  // Uncheck "Select All" if any individual checkbox is unselected
  useEffect(() => {
    if (selectedRequests.length !== currentItems.length) {
      setSelectAll(false);
    } else if (
      selectedRequests.length === currentItems.length &&
      currentItems.length > 0
    ) {
      setSelectAll(true);
    }
  }, [selectedRequests, currentItems]);

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-center text-sm">
          <thead>
            <tr className="border-b">
              <th>
                <input
                  className="rounded-md focus:outline-none focus:ring-transparent"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              {req_column.slice(1).map((column) => (
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
                  <td className="px-6 py-2">
                    <input
                      className="rounded-md focus:outline-none focus:ring-transparent"
                      type="checkbox"
                      checked={selectedRequests.includes(request.id)}
                      onChange={() => handleSelectRequest(request.id)}
                    />
                  </td>
                  <td className="px-6 py-2 text-gray-700 relative">
                    <div className="group relative inline-block">
                      <span
                        className="cursor-pointer hover:text-blue-600"
                        onClick={() => handleCopy(request.id)}
                      >
                        {truncateId(request.id)}
                      </span>
                      <div
                        className={`absolute bottom-3 left-0 bg-gray-700 text-white text-xs rounded-lg p-2 mb-2 w-auto shadow-lg z-10 items-center cursor-pointer ${
                          copiedId === request.id
                            ? "flex"
                            : "hidden group-hover:flex"
                        }`}
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
                  <td className="px-6 py-2 text-gray-700">{request.date}</td>
                  <td className="px-6 py-2 text-gray-700">
                    {request.rejected_date}
                  </td>
                  <td className="px-6 py-2 text-gray-700">{request.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No requests found.
                </td>
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

      {/* Popup Effect for Selected Items */}
      {selectedRequests.length > 0 && (
        <div className="fixed bottom-5 max-w-fit border rounded-lg text-sm shadow-md bg-gray-800 text-white p-4 flex justify-between gap-10 items-center transition-transform transform translate-y-0 animate-slide-up">
          <div>
          <p>{selectedRequests.length} Rejected Request(s) Selected</p>
          </div>
          <div>
            <button
              className= "px-4 py-2 mr-2 rounded- text-white hover:text-gray-400"
              onClick={() => setSelectedRequests([])}
            >
              Cancel
            </button>
            <button
              className=" px-4 py-2 rounded-md border border-gray-500 hover:border-white"
              onClick={() => console.log("Delete selected requests")}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rejected;

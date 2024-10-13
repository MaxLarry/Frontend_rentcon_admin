import React, { useState } from "react";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import CopyableText from "../../../ui/CopyableText";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Assuming Button component exists

const occupants_column = [
  "Name",
  "ID",
  "Property ID",
  "Room ID",
  "Leased Date",
  "Date Register",
];

const occupants = [
  {
    _id: "ocp1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "",
    propertyId: "prop1",
    roomId: "room1",
    leasedDate: "2024-01-15",
    dateRegister: "2024-01-10",
    created_at: "2024-01-10T08:30:00Z",
  },
  {
    _id: "ocp2",
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    profilePicture: "",
    propertyId: "prop2",
    roomId: "room2",
    leasedDate: "2024-02-01",
    dateRegister: "2024-01-25",
    created_at: "2024-01-25T10:15:00Z",
  },
  {
    _id: "ocp3",
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    profilePicture: "",
    propertyId: "prop3",
    roomId: "room3",
    leasedDate: "2024-03-05",
    dateRegister: "2024-02-28",
    created_at: "2024-02-28T14:45:00Z",
  },
  {
    _id: "ocp4",
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    profilePicture: "",
    propertyId: "prop4",
    roomId: "room4",
    leasedDate: "2024-04-12",
    dateRegister: "2024-04-05",
    created_at: "2024-04-05T09:10:00Z",
  },
];

function ViewLandlordModal({ landlordToView, title, closeModal }) {
  const [listOccupant, setListOccupant] = useState(occupants); // Assuming `occupants` is passed
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOccupant = listOccupant.sort((a, b) => {
    // Sort by created_at in descending order (new to old)
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOccupant.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(listOccupant.length / itemsPerPage);

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent className="max-w-md md:max-w-2xl lg:max-w-3xl absolute p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <div className="p-5" style={{ maxHeight: "600px" }}>
            <div className="flex items-center space-x-10 border-b pb-6">
              <div>
                <Avatar className="w-24 h-24 lg:w-36 lg:h-36 rounded-full">
                  {landlordToView?.profilePicture ? (
                    <AvatarImage
                      src={landlordToView.profilePicture}
                      alt="user_photo"
                    />
                  ) : (
                    <AvatarFallback>
                      <FaUserCircle className="text-9xl" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                  <div className="space-y-3">
                    <p>
                      <strong>Name: </strong>
                      {landlordToView.fullName}
                    </p>
                    <p>
                      <strong>Gender: </strong>
                      {landlordToView.gender}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {landlordToView.email}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <p>
                      <strong>Phone Number: </strong>
                      {landlordToView.contactDetails.phone}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {landlordToView.contactDetails.address}
                    </p>
                    <p>
                      <strong>Registered Date: </strong>
                      {format(
                        new Date(landlordToView.created_at),
                        "MMMM dd, yyyy"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-6">
              <h2>
                <strong>Listed Properties:</strong>
              </h2>
              <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {landlordToView.properties.length > 0 ? (
                  landlordToView.properties.map((property, index) => (
                    <div key={index} className="relative">
                      {property.property_photo &&
                      property.property_photo.length > 0 ? (
                        <div className="mb-4 space-y-2">
                          <Carousel>
                            <CarouselContent>
                              {property.property_photo.map((photo, index) => (
                                <CarouselItem
                                  key={index}
                                  className="flex justify-center items-center"
                                >
                                  <img
                                    src={photo}
                                    alt={`property ${index + 1}`}
                                    className="w-full h-40 object-cover rounded-lg"
                                    style={{ objectFit: "cover" }}
                                  />
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                          </Carousel>
                          <p className="text-sm">
                            <strong>Property Id: </strong>{" "}
                            {property.property_id}
                          </p>
                          <p className="text-sm">
                            <strong>No. of Room/Unit: </strong>{" "}
                            {property.roomCount}
                          </p>
                        </div>
                      ) : (
                        <p>No property photos available</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No property available</p>
                )}
              </div>
            </div>
            <div>
              <h1>
                <strong>Occupants: {listOccupant.length}</strong>
              </h1>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <Table className="min-w-full dark:border-zinc-600">
                <TableHeader>
                  <TableRow className="border-b dark:border-zinc-600">
                    {occupants_column.map((column, index) => (
                      <TableHead
                        key={index}
                        className="text-zinc-900 dark:text-gray-200 font-bold"
                      >
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {currentItems.length > 0 ? (
                    currentItems.map((occupant) => (
                      <TableRow key={occupant._id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar>
                              {occupant?.profilePicture ? (
                                <AvatarImage
                                  src={occupant.profilePicture}
                                  alt="occupant_photo"
                                />
                              ) : (
                                <AvatarFallback>
                                  <FaUserCircle className="text-9xl" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="p-2 flex flex-col">
                              <span>{occupant?.fullName}</span>
                              <span>{occupant?.email}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <CopyableText
                            text={occupant._id}
                            onCopy={() => setCopiedId(occupant._id)}
                          />
                        </TableCell>
                        <TableCell>
                          <CopyableText
                            text={occupant.propertyId}
                            onCopy={() => setCopiedId(occupant.propertyId)}
                          />
                        </TableCell>
                        <TableCell>
                          <CopyableText
                            text={occupant.roomId}
                            onCopy={() => setCopiedId(occupant.roomId)}
                          />
                        </TableCell>
                        <TableCell>
                          {occupant?.leasedDate
                            ? format(
                                new Date(occupant.leasedDate),
                                "MMMM dd, yyyy"
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {occupant?.dateRegister
                            ? format(
                                new Date(occupant.dateRegister),
                                "MMMM dd, yyyy"
                              )
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={occupants_column.length + 1}
                        className="text-center"
                      >
                        No Occupants Available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </ScrollArea>

        {totalPages > 1 && (
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewLandlordModal;

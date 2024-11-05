import React, { useState, useEffect } from "react";
import axios from "axios";
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
  "Rented Date",
];
const occupantnonuser_column = ["Name", "ID", "Property ID", "Room ID"];

function ViewLandlordModal({ landlordToView, title, closeModal }) {
  const [occupantUsers, setOccupantUsers] = useState([]);
  const [occupantsNonUsers, setOccupantsNonUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOccupantList = async () => {
      try {
        const response = await axios.get(
          `/user/occupants-list/${landlordToView._id}`
        );
        const users = [];
        const nonUsers = [];

        // Separate occupants into user and non-user lists
        response.data.forEach((property) => {
          property.rooms.forEach((room) => {
            if (room.occupantUser) {
              users.push({
                ...room.occupantUser,
                propertyId: property.propertyId,
                roomId: room.roomId,
                rentedDate: room.rentedDate,
              });
            }
            room.occupantsNonUser.forEach((nonUser) => {
              nonUsers.push({
                ...nonUser,
                propertyId: property.propertyId,
                roomId: room.roomId,
              });
            });
          });
        });

        setOccupantUsers(users);
        setOccupantsNonUsers(nonUsers);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the Occupants List!", error);
        setError("Failed to fetch Occupants List");
        setLoading(false);
      }
    };

    fetchOccupantList();
  }, [landlordToView._id]);
  console.log("ito ang user", occupantUsers);
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
            {/* Occupant Users Table */}
            <div className="space-y-5">
              <h1>
                <strong>Occupant User: {occupantUsers.length}</strong>
              </h1>
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
                    {occupantUsers.length > 0 ? (
                      occupantUsers.map((occupant, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar>
                                {occupant.profilePicture ? (
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
                                <span>{occupant.name}</span>
                                <span>{occupant.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {occupant.userId ? (
                              <CopyableText
                                text={occupant.userId}
                                onCopy={() => setCopiedId(occupant.userId)}
                              />
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            {occupant.propertyId ? (
                              <CopyableText
                                text={occupant.propertyId}
                                onCopy={() => setCopiedId(occupant.propertyId)}
                              />
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            {occupant.roomId ? (
                              <CopyableText
                                text={occupant.roomId}
                                onCopy={() => setCopiedId(occupant.roomId)}
                              />
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>N/A</TableCell>
                          <TableCell>
                            {occupant.rentedDate
                              ? format(
                                  new Date(occupant.rentedDate),
                                  "MMMM dd, yyyy"
                                )
                              : "N/A"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={occupants_column.length}
                          className="text-center"
                        >
                          No Occupants Available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Occupant Non-Users Table */}
              <h1>
                <strong>Occupant Non-User: {occupantsNonUsers.length}</strong>
              </h1>
              <div className="flex justify-center overflow-x-auto">
                <Table className="min-w-full dark:border-zinc-600">
                  <TableHeader>
                    <TableRow className="border-b dark:border-zinc-600">
                      {occupantnonuser_column.map((column, index) => (
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
                    {occupantsNonUsers.length > 0 ? (
                      occupantsNonUsers.map((occupant, index) => (
                        <TableRow key={index}>
                          <TableCell>{occupant.name}</TableCell>
                          <TableCell>
                            {occupant._id ? (
                              <CopyableText
                                text={occupant._id}
                                onCopy={() => setCopiedId(occupant._id)}
                              />
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            {occupant.propertyId ? (
                              <CopyableText
                                text={occupant.propertyId}
                                onCopy={() => setCopiedId(occupant.propertyId)}
                              />
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            {occupant.roomId ? (
                              <CopyableText
                                text={occupant.roomId}
                                onCopy={() => setCopiedId(occupant.roomId)}
                              />
                            ) : (
                              "N/A"
                            )}
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
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewLandlordModal;

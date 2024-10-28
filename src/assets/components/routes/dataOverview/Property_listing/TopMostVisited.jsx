import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

function TopMostVisited() {
  const [listMostVisited, setListMostVisited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandlords = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/data/property-most-viewed");
        setListMostVisited(response.data.length > 0 ? response.data : []);
      } catch (error) {
        console.error(
          "There was an error fetching the Top Viewed List!",
          error
        );
        setError("Failed to fetch Top Viewed List");
        setListMostVisited([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLandlords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 shadow-md block items-center col-start-4 col-end-10 noselect">
      <div className="text-xl font-bold">Top 3 Most Visited Properties</div>
      <div className="grid py-4 px-20 gap-6 grid-cols-3 grid-rows-subgrid max-w-full mx-auto">
        {listMostVisited.length > 0 ? (
          listMostVisited.map((property) => (
            <div key={property._id} className="relative">
              {property.property_photos &&
              property.property_photos.length > 0 ? (
                <div className="mb-4 space-y-2">
                  <Carousel>
                    <CarouselContent>
                      {property.property_photos.map((photo, index) => (
                        <CarouselItem
                          key={index}
                          className="flex justify-center items-center"
                        >
                          <img
                            src={photo}
                            alt={`Property ${index + 1}`}
                            className="w-full h-52 object-cover rounded-lg"
                            style={{ objectFit: "cover" }}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  <p className="text-xs">
                    <strong>Owner:</strong> {property.fullName}
                  </p>
                  <p className="text-xs">
                    <strong>No. of Rooms:</strong> {property.roomCount}
                  </p>
                  <p className="text-xs">
                    <strong>Visited:</strong> {property.visited} times
                  </p>
                  <p className="text-xs">
                    <strong>Listed Date:</strong>{" "}
                    {property?.approved_date
                      ? format(
                          new Date(property.approved_date),
                          "MMMM dd, yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>
              ) : (
                <p>No room photos available</p>
              )}
            </div>
          ))
        ) : (
          <p>No properties available</p>
        )}
      </div>
    </div>
  );
}

export default TopMostVisited;

import * as React from "react";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown} from "lucide-react";
import axios from "axios";
import {
  CartesianGrid,
  Line,
  Area,
  AreaChart,
  LineChart,
  XAxis,
  Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DropdownFilter from "./Dropdownfilterdash";

function GraphV() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [percentageChange, setPercentageChange] = useState(null);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("30d");
  const [todaysRequestCount, setTodaysRequestCount] = useState(0);

  const chartConfig = {
    request: {
      label: "request",
      color: "hsl(var(--chart-1))",
    },
  };

  const opt = [
    { value: "24h", label: "24h" },
    { value: "30d", label: "30d" },
    { value: "90d", label: "90d" },
    { value: "1y", label: "1y" },
    { value: "all", label: "All time" },
  ];

  useEffect(() => {
    const fetchListingRequest = async () => {
      setLoading(true);

      try {
        // Fetching data from your backend with the selected timeframe
        const response = await axios.get(`/data/request-listing-status`, {
          params: { timeframe: selectedValue },
        });

        if (
          response.data &&
          response.data.counts &&
          response.data.counts.length > 0
        ) {
          const formattedData = response.data.counts.map((item) => ({
            time: item.days || item.hours || item.date || item.month,
            request: item.request_count,
            fullDate: item.date,
          }));
          const percentageChange = response.data.percentageChange;

          setChartData(formattedData);
          setPercentageChange(percentageChange);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching newly registered users:", error);
        setError("Failed to fetch Newly Register data");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchTodaysRequest = async () => {
      try {
        const response = await axios.get(`/data/request-listing-status`, {
          params: { timeframe: "24h" },
          //count just the request
        });

        const todayCount = response.data.counts.reduce(
          (acc, curr) => acc + curr.request_count,
          0
        );
        setTodaysRequestCount(todayCount);
      } catch (error) {
        console.error("Error fetching today's listing request:", error);
        setTodaysRequestCount(0);
      }
    };

    fetchListingRequest();
    fetchTodaysRequest();
  }, [selectedValue]); // Re-fetch when selected timeframe changes

  const isUp = percentageChange > 0;
  const changeText =
    percentageChange === 0
      ? `Listing Request percentage is unchanged this month`
      : isUp
      ? `Listing Request is up by ${Math.abs(percentageChange).toFixed(
          1
        )}% this month`
      : `Listing Request is down by ${Math.abs(percentageChange).toFixed(
          1
        )}% this month`;

  return (
    <Card className="px-10 py-8 rounded-md shadow-md block items-center col-start-4 col-end-7 row-start-1 row-end-3 relative">
      <CardHeader className="flex flex-row justify-between p-0 pb-6">
        <div>
          <CardTitle className="text-xl font-bold">Listing Request</CardTitle>
          <CardDescription>
            Showing Listing Request over {selectedValue}
          </CardDescription>
        </div>
        <div>
          <DropdownFilter
            options={opt}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full pb-6"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 30,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              fontSize={10}
              // Show only month and day for 30d timeframe
              tickFormatter={(time) => {
                if (selectedValue === "90d") {
                  const [startDate, endDate] = time.split(" - ");
                  return new Date(startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                } else if (selectedValue === "30d") {
                  return new Date(time).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                } else if (selectedValue === "24h") {
                  // Format for 24h
                  const [startTime] = time.split(" - ");
                  return startTime;
                }
                return time;
              }}
            />
            <Tooltip
              cursor={{
                stroke: "gray",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              content={<ChartTooltipContent indicator="line" />}
              labelFormatter={(time) => {
                // For 30d, display full date in tooltip
                if (selectedValue === "30d") {
                  return new Date(time).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                }
                return time;
              }}
            />
            <Line
              dataKey="request"
              type="monotone"
              strokeWidth={2}
              stroke="var(--color-request)"
              fillOpacity={0.4}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0">
        <div className="flex gap-2 font-medium leading-none">
          {changeText}
          {percentageChange === 0 ? (
            "" 
          ) : isUp ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Today's listing request: {todaysRequestCount}
        </div>
      </CardFooter>
    </Card>
  );
}

export default GraphV;

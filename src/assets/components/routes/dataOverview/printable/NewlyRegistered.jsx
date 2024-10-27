import * as React from "react";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import axios from "axios";
import DropdownFilter from "../DropdownFilter";
import {
  CartesianGrid,
  Line,
  Area,
  AreaChart,
  LineChart,
  XAxis,
  Tooltip,
  LabelList
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  register: {
    label: "Register",
    color: "hsl(var(--chart-1))",
  },
};

function NewlyRegistered({onRegisterUpdate}) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState("30d");
  const [todaysRegisterCount, setTodaysRegisterCount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(null);


  useEffect(() => {
    const fetchNewRegister = async () => {
      setLoading(true);

      try {
        // Fetching data from your backend with the selected timeframe
        const response = await axios.get(`/data/user-register-count`, {
          params: { timeframe: selectedValue },
        });

        if (
          response.data &&
          response.data.counts &&
          response.data.counts.length > 0
        ) {
          // Map response data to the chart structure
          const formattedData = response.data.counts.map((item) => ({
            time: item.days || item.hours || item.date || item.month,
            userCount: item.count,
            fullDate: item.date, // Keeping the full date for tooltip
          }));

          setChartData(formattedData);
          const totalNewReg30day = response.data.totalCurrent30Days;
          const percentageChange = response.data.percentageChange;
          setPercentageChange(percentageChange);
          onRegisterUpdate({
            totalNewReg30day:totalNewReg30day,
            percentageChange:percentageChange,
          });
          
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

    const fetchTodaysRegisterCount = async () => {
      try {
        const response = await axios.get(`/data/user-register-count`, {
          params: { timeframe: "24h" },
        });

        const todayCount = response.data.counts.reduce((acc, curr) => acc + curr.count, 0);
        setTodaysRegisterCount(todayCount);
      } catch (error) {
        console.error("Error fetching today's registered users:", error);
        setTodaysRegisterCount(0);
      }
    };

    fetchNewRegister();
    fetchTodaysRegisterCount();
  }, [selectedValue, onRegisterUpdate]); // Re-fetch when selected timeframe changes

  


  if (error) {
    return <div>{error}</div>;
  }

  const isUp = percentageChange > 0;
  const changeText =
    percentageChange === 0
      ? `Listed Property percentage is unchanged this month`
      : isUp
      ? `Listed Property is up by ${Math.abs(percentageChange).toFixed(
          1
        )}% this month`
      : `Listed Property is down by ${Math.abs(percentageChange).toFixed(
          1
        )}% this month`;

  return (
    <Card className="rounded-md shadow-md block items-center col-start-4 col-end-10 noselect h-80">
      <CardHeader style={{ paddingBottom: '0' }}>
          <CardTitle className="text-sm font-bold">Newly Registered Users</CardTitle>
          <CardDescription className="text-xs">
            Showing user registrations over {selectedValue}
          </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[290px] w-full"
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
              cursor={{ stroke: 'gray', strokeWidth: 1, strokeDasharray: '5 5' }} 
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
              dataKey="userCount"
              type="monotone"
              strokeWidth={2}
              stroke= "var(--color-register)"
              fillOpacity={0.4}
              dot= {false}
            ><LabelList     dataKey="userCount"
            position="top"
            offset={12}
            fill="black" // Ensure the text color is set to black
            fontSize={12}/></Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      {/* <div className="flex items-center gap-2 font-medium leading-none">
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
          Today's registered users: {todaysRegisterCount}
        </div> */}
      </CardFooter>
    </Card>
  );
}

export default NewlyRegistered;

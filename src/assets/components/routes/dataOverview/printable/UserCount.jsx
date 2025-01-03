import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function UserCount({ onUserCountUpdate }) {
  const [chartData, setChartData] = useState([]);
  const [percentageChange, setPercentageChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {

      try {
        const response = await axios.get("/data/user-count");

        if (response.data && response.data.length > 0) {
          const {
            LandlordCount,
            OccupantCount,
            UnverifiedCount,
            percentageChange,
          } = response.data[0];

          // Map the response to the expected chartData format
          const fetchedData = [
            {
              category: "Landlords",
              user: LandlordCount,
              fill: "var(--color-landlord)",
            },
            {
              category: "Occupants",
              user: OccupantCount,
              fill: "var(--color-occupant)",
            },
            {
              category: "Unverified Users",
              user: UnverifiedCount,
              fill: "var(--color-unverified)",
            },
          ];

          setChartData(fetchedData);
          setPercentageChange(percentageChange);
          onUserCountUpdate({
            totalLandlords: LandlordCount,
            totalOccupants: OccupantCount,
            totalUnverifiedUsers: UnverifiedCount,
          });
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("There was an error fetching the User Count!", error);
        setError("Failed to fetch User Count");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();
  }, [onUserCountUpdate]);

  const totalUser = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.user, 0);
  }, [chartData]);


  if (error) {
    return <div>{error}</div>;
  }

  const chartConfig = {
    user: {
      label: "User",
    },
    landlord: {
      label: "Landlords",
      color: "hsl(var(--chart-1))",
    },
    occupant: {
      label: "Occupants",
      color: "hsl(var(--chart-2))",
    },
    unverified: {
      label: "Unverified Users",
      color: "hsl(var(--chart-3))",
    },
  };
  const isUp = percentageChange > 0;
  const changeText = isUp
    ? `Number of users up by ${Math.abs(percentageChange).toFixed(
        1
      )}% this month`
    : `Number of users down by ${Math.abs(percentageChange).toFixed(
        1
      )}% this month`;

  return (
    <Card className="rounded-md shadow-md block items-center col-start-1 col-end-4 noselect h-80">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-bold">
          Total Number of User
        </CardTitle>
        <CardDescription className="text-xs">
          Current Total of Registered User
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="user"
              label
              nameKey="category"
              innerRadius={50}
              outerRadius={85}
              stroke="none" // Set stroke to none to remove line between slices
              strokeWidth={1} // Adjusted stroke width
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalUser.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          All users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-xs">
        <div className="leading-none text-muted-foreground text-center">
          Showing the total of user who Registered
        </div>
      </CardFooter>
    </Card>
  );
}

export default UserCount;

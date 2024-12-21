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

function PropertyListedCount() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentageChange, setPercentageChange] = useState(null);

  useEffect(() => {
    const fetchListedPropertiesCount = async () => {
      setLoading(true);

      try {
        const response = await axios.get("/data/property-count");

        if (response.data && response.data.countByType.length > 0) {
          const boardingHouseCount =
            response.data.countByType.find(
              (item) => item.type === "Boarding House"
            )?.count || 0;
          const apartmentCount =
            response.data.countByType.find((item) => item.type === "Apartment")
              ?.count || 0;
          const percentageChange = response.data.percentageChange;
          setPercentageChange(percentageChange);
          setChartData([
            {
              category: "Boarding House",
              count: boardingHouseCount,
              fill: "var(--color-boardinghouse)",
            },
            {
              category: "Apartment",
              count: apartmentCount,
              fill: "var(--color-apartment)",
            },
          ]);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error(
          "There was an error fetching the listed Properties Count!",
          error
        );
        setError("Failed to fetch Properties Count");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListedPropertiesCount();
  }, []);

  const totalProperty = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0); // Sum the count
  }, [chartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const chartConfig = {
    count: {
      label: "count",
    },
    boardinghouse: {
      label: "Boarding House",
      color: "hsl(var(--chart-1))",
    },
    apartment: {
      label: "Apartmentt",
      color: "hsl(var(--chart-2))",
    },
  };
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
    <Card className="px-10 py-5 rounded-md shadow-md block items-center col-start-4 col-end-7 relative no-select">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-bold">Listed Property</CardTitle>
        <CardDescription>Current Total of Listed Properties</CardDescription>
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
              dataKey="count"
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
                          {totalProperty.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
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
          Showing the total of properties listed in the app
        </div>
      </CardFooter>
    </Card>
  );
}

export default PropertyListedCount;

import * as React from "react";
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import axios from "axios";
import {
  CartesianGrid,
  LabelList,
  Bar,
  BarChart,
  XAxis,
  Tooltip,
} from "recharts";
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
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with labels";

const chartConfig = {
  apartment: {
    label: "Apartment",
    color: "hsl(var(--chart-1))",
  },
  boardinghouse: {
    label: "Boarding House",
    color: "hsl(var(--chart-2))",
  },
};

function PropertyCountBarangay() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyCountBarangay = async () => {
      try {
        // Fetching data from your backend API
        const response = await axios.get("/data/property-count-barangay");
        setChartData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPropertyCountBarangay();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="rounded-md shadow-md block items-center col-start-1 col-end-10 noselect">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Number of Listed Properties per Barangay</CardTitle>
        <CardDescription >Showing the number of properties and their types by Barangay</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
            stackOffset="sign"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="barangay"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="apartment"
              stackId="a"
              fill="var(--color-apartment)"
              radius={[0, 0, 4, 4]}
            >
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey="boardinghouse"
              stackId="a"
              fill="var(--color-boardinghouse)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                position="top"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}

export default PropertyCountBarangay;

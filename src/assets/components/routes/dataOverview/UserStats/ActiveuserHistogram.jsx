import * as React from "react";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import FilterMonth from "../Filtering";''
import {
  CartesianGrid,
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  LabelList,
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
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { month: "January", count: 186 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
  { month: "February", count: 305 },
  { month: "March", count: 237 },
  { month: "April", count: 73 },
  { month: "May", count: 209 },
  { month: "June", count: 214 },
];

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
};

function ActiveuserHistogram() {
  const currentYear = format(new Date(), "yyyy");
  const currentMonth = format(new Date(), "MMMM").toLowerCase(); // Convert to lowercase for consistency with SelectItem values
  const [selectedValue, setSelectedValue] = useState({ year: currentYear, month: currentMonth });
  
  return (
    <Card className="rounded-md shadow-md block items-center col-start-1 col-end-10 noselect">
      <CardHeader className="flex flex-row justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold">Active User</CardTitle>
          <CardDescription>Showing the numbers of user login activity</CardDescription>
        </div>
        <div>
          <FilterMonth
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip content={<ChartTooltipContent indicator="bar" />} cursor={false} />
            <Bar dataKey="count" fill="var(--color-count)">
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total
        </div> */}
      </CardFooter>
    </Card>
  );
}

export default ActiveuserHistogram;
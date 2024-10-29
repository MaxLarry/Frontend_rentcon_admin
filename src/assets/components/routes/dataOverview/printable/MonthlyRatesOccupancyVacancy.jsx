import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
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
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";


const chartConfig = {
  occupancy: {
    label: "Occupancy Rate",
    color: "hsl(var(--chart-1))",
  },
  vacancy: {
    label: "Vacancy Rate",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

function OccupancyVacancyChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );


  useEffect(() => {
    const fetchMonthlyRates = async () => {
      setLoading(true);
  
      try {
        // Fetching data from your backend with the selected year
        const response = await axios.get(`/data/monthly-rates`, {
          params: { year: currentYear }, // Change 'timeframe' to 'year' to match your API
        });
  
        if (response.data && response.data.length > 0) {
          // Format the data for charting
          const formattedData = response.data.map((item) => ({
            month: item.month,
            vacancyRate: item.vacancyRate,
            occupancyRate: item.occupancyRate,
          }));
  
          setChartData(formattedData);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching Monthly Rates:", error);
        setError("Failed to fetch Monthly Rates");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMonthlyRates();
  }, [currentYear]);
  
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className="rounded-md shadow-md block items-center col-start-1 col-end-7 noselect">
      <CardHeader className="flex flex-row justify-between pb-6">
        <div>
          <CardTitle className="text-xl font-bold">
            Occupancy Rate vs Vacancy Rate
          </CardTitle>
          <CardDescription>
            Showing occupancy and vacancy rates for {currentYear}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent >
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <BarChart
            data={chartData}
            layout="horizontal"
            margin={{
              right: 30,
              top:10,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              type="category"
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="occupancyRate"
              name="Occupancy Rate"
              fill="var(--color-occupancy)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="occupancyRate"
                position="top"
                className="fill-[--color-label]"
                fontSize={12}
                formatter={(value) => `${value}%`}
              />
            </Bar>
            <Bar
              dataKey="vacancyRate"
              name="Vacancy Rate"
              fill="var(--color-vacancy)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="vacancyRate"
                position="top"
                className="fill-[--color-label]"
                fontSize={12}
                formatter={(value) => `${value}%`}
              />
            </Bar>
            <ChartLegend />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}

export default OccupancyVacancyChart;

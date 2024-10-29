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
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );

  const handleYearChange = (year) => {
    setSelectedYear(year);
    // Optionally: fetch data based on the selected year
  };

  useEffect(() => {
    const fetchMonthlyRates = async () => {
      setLoading(true);
  
      try {
        // Fetching data from your backend with the selected year
        const response = await axios.get(`/data/monthly-rates`, {
          params: { year: selectedYear }, // Change 'timeframe' to 'year' to match your API
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
  }, [selectedYear]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
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
            Showing occupancy and vacancy rates for {selectedYear}
          </CardDescription>
        </div>
        <div>
          <Select onValueChange={handleYearChange} value={selectedYear.toString()}>
            <SelectTrigger className="w-[150px] mt-2">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Years</SelectLabel>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
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
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  );
}

export default OccupancyVacancyChart;

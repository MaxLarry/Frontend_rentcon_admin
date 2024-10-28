import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function FilterMonth({ selectedValue, setSelectedValue }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2024 + 1 },
    (_, i) => 2024 + i
  );

  const handleMonthChange = (value) => {
    console.log("Month selected:", value); // Debugging
    setSelectedValue((prev) => ({ ...prev, month: value }));
  };

  const handleYearChange = (value) => {
    console.log("Year selected:", value); // Debugging
    setSelectedValue((prev) => ({ ...prev, year: value }));
  };

  return (
    <Tabs defaultValue="month" className="w-auto flex justify-center items-end gap-2">
      <TabsList>
        <TabsTrigger value="month">Month</TabsTrigger>
        <TabsTrigger value="year">Year</TabsTrigger>
      </TabsList>
      <TabsContent value="month">
        <div className="flex gap-2 justify-center items-end">
          <Select onValueChange={handleYearChange} value={selectedValue.year}>
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
          <Select onValueChange={handleMonthChange} value={selectedValue.month}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                  <SelectItem key={month} value={month.toLowerCase()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
      <TabsContent value="year">
        <Select onValueChange={handleYearChange} value={selectedValue.year}>
          <SelectTrigger className="w-[150px]">
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
      </TabsContent>
    </Tabs>
  );
}

export default FilterMonth;

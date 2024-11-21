import * as React from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropdownBarangayFilter({ selectedBarangay, onBarangayChange }) {
  const barangay_list = [
    "San Jose",
    "Admin",
    "Tiniguiban",
    "User Manager",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-xs space-x-2" variant="outline">
          <ListFilter className="w-5" />
          <span>Filters</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 max-h-80 p-0">
        <DropdownMenuLabel className="text-xs px-3 py-2">
          Barangay Filter
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-64">
          <div className="py-2">
            {barangay_list.map((barangay) => (
              <DropdownMenuCheckboxItem
                className="text-xs"
                key={barangay}
                checked={selectedBarangay.includes(barangay)}
                onCheckedChange={() => onBarangayChange(barangay)}
              >
                {barangay}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

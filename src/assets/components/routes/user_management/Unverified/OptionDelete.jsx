import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // import dropdown from shadcn

function OptionDelete({ unverifiedToDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2">
          <EllipsisVertical className="w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {/* <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onSuspend}>Suspend</DropdownMenuItem> */}
        <DropdownMenuItem onClick={unverifiedToDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionDelete;
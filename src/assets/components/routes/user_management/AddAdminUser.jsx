import { Plus } from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
function AddAdminUser() {

  return (
    <Button 
    className="text-xs space-x-1" variant="outline"
  ><Plus className="w-5"/>
    <span>Add Admin</span>
  </Button>
  );
}

export default AddAdminUser;

import React, { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useReactToPrint } from "react-to-print";
import UserStats from "./UserStats/UserStats";
import PropertyStats from "./Property_listing/PropertyStats";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import PrintableContent from "./PrintableContent";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DataOverview() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const printRef = useRef(null);

  const handlePrint = () => {
    setShowPrintModal(true);
  };

  const handleCloseDialog = () => {
    setShowPrintModal(false);
  };

  const handlePrintAction = useReactToPrint({
    content: () => printRef.current,
    contentRef: printRef, 
    documentTitle: "Data Overview Report",
    onAfterPrint: () => setShowPrintModal(false),
  });
   console.log(printRef.current); // This should not be null

  return (
    <>
      <ScrollArea className="pt-14 h-full lg:ml-60 block gap-2 flex-col lg:flex-row translate-all duration-300">
        <div className="px-4" style={{ minWidth: "1200px" }}>
          <div className="flex flex-row justify-between px-5 py-9">
            <div className="justify-between items-center">
              <h1 className="font-bold text-2xl">Data Overview</h1>
              <p className="font-thin text-sm">
                Access insights into rental trends and user activity through
                clear visuals.
              </p>
            </div>
            <div className="mr-6">
              <Button onClick={handlePrint} className="gap-1"><Printer className="w-4"/><p>Print Report</p></Button>
            </div>
          </div>
          <div className="max-w-full mx-auto">
            <UserStats />
            <PropertyStats />
          </div>
        </div>      
 <PrintableContent  ref={printRef}/>
      </ScrollArea>

        {/* Render PrintableContent with ref */}
     

      {/* Print Confirmation Dialog */}
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-3">Print Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to print this report?{" "}
              <strong>This action cannot be undone.</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-end space-x-2">
            <Button
              className="px-4 py-2 rounded-md bg-green-500 text-white"
              onClick={handlePrintAction} // Trigger print action
            >
              Print Report
            </Button>
            <Button
              className="px-4 py-2 rounded-md text-gray-600"
              onClick={handleCloseDialog}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DataOverview;

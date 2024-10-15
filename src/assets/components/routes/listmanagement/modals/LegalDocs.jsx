import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the X icon
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

function LegalDocuments({ selectedRequest }) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const openImageModal = (doc) => {
    setSelectedImage(doc); 
    setIsImageOpen(true); // Open the image modal
  };

  const closeImageModal = () => {
    setIsImageOpen(false); // Close the image modal
    setSelectedImage(null);
  };

  return (
    <div className="mt-2 py-5">
      <h2 className="py-5">
        <strong>III. Legal Documents</strong>
      </h2>
      <div className="py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedRequest.legal_docs && selectedRequest.legal_docs.length > 0 ? (
          selectedRequest.legal_docs.map((doc, index) => (
            <img
              key={index}
              src={doc}
              alt={`Legal Document ${index + 1}`}
              className="w-full h-auto rounded-lg cursor-pointer" // Add pointer cursor for clickable effect
              onClick={() => openImageModal(doc)} // Handle click event
            />
          ))
        ) : (
          <p>No legal documents available</p>
        )}
      </div>

      <Dialog open={isImageOpen} onOpenChange={closeImageModal}>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className="p-0 max-h-screen-sm rounded-lg overflow-hidden">
          <img
            src={selectedImage}
            alt="legal_docs"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default LegalDocuments;

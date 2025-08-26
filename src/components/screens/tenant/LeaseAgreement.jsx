import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LeaseAgreement = ({ open = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleAccept = () => {
    // Handle accept logic here
    console.log("Lease agreement accepted");
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lease Agreement</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600 space-y-4">
          <p>
            This Lease Agreement is made between the landlord and tenant for the rental
            of the listed property. The tenant agrees to pay rent monthly and abide by the
            terms of the property.
          </p>
          <p>
            Please read carefully before signing. Both parties agree to the terms outlined herein.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept}>Accept & Sign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaseAgreement;

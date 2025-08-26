import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const BookingModal = ({ open, onClose, room }) => {
  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book {room.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Price: <span className="font-semibold">R{room.price}</span>
          </p>
          <p>Do you want to confirm this booking?</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Confirm Booking</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;

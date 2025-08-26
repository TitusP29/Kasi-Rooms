import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LandlordProfileModal = ({ open, onClose, landlord }) => {
  if (!landlord) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{landlord.name}'s Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-gray-700">
          <p><strong>Contact:</strong> {landlord.contact}</p>
          <p><strong>Email:</strong> {landlord.email}</p>
          <p><strong>Rooms Listed:</strong> {landlord.rooms?.length || 0}</p>
          <p><strong>Verification Status:</strong> {landlord.verified ? "Verified ✅" : "Not Verified ❌"}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LandlordProfileModal;

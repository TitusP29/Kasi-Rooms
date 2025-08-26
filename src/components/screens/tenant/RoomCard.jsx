import React, { useState } from "react";
import BookingModal from "./BookingModal";
import ReportButton from "./ReportButton";
import LandlordProfileModal from "./LandlordProfileModal";

const RoomCard = ({ room, landlord }) => {
  const [openBooking, setOpenBooking] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{room.title}</h3>
      <p className="text-gray-700">Price: {room.price}</p>
      <p className="text-gray-600">Contact: {room.contact}</p>
      {room.verified && <span className="text-green-600 font-bold">✔ Verified</span>}

      <div className="flex gap-2 mt-3">
        <button onClick={() => setOpenBooking(true)} className="bg-blue-500 text-white px-3 py-1 rounded">
          Book Viewing
        </button>
        <button onClick={() => setOpenProfile(true)} className="bg-gray-700 text-white px-3 py-1 rounded">
          View Landlord
        </button>
        <ReportButton />
      </div>

      {/* Modals */}
      {openBooking && <BookingModal room={room} setOpen={setOpenBooking} />}
      {openProfile && <LandlordProfileModal landlord={landlord} setOpen={setOpenProfile} />}
    </div>
  );
};

export default RoomCard;

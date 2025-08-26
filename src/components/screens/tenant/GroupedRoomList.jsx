import React from "react";
import RoomCard from "./RoomCard";

const landlords = [
  {
    id: 1,
    name: "Mr. Dlamini",
    rooms: [
      { id: 101, title: "Backroom 1", price: "R1500", verified: true, contact: "082 123 4567" },
      { id: 102, title: "Backroom 2", price: "R1800", verified: false, contact: "082 123 4567" }
    ]
  },
  {
    id: 2,
    name: "Mrs. Khumalo",
    rooms: [
      { id: 201, title: "Backroom A", price: "R1200", verified: true, contact: "083 765 4321" }
    ]
  }
];

const GroupedRoomList = ({ landlordId }) => {
  const landlord = landlords.find((l) => l.id === landlordId) || landlords[0];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{landlord.name}'s Rooms</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {landlord.rooms.map((room) => (
          <RoomCard key={room.id} room={room} landlord={landlord} />
        ))}
      </div>
    </div>
  );
};

export default GroupedRoomList;

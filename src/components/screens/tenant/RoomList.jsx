import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoomList = ({ rooms = [], onSelectRoom = () => {} }) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No rooms available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <Card key={room.id} className="shadow-md rounded-2xl">
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold text-lg">{room.name}</h3>
              <p className="text-sm text-gray-500">R{room.price}</p>
              {room.verified && (
                <p className="text-green-600 font-medium">✔ Verified</p>
              )}
            </div>
            <Button onClick={() => onSelectRoom(room)}>View</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RoomList;

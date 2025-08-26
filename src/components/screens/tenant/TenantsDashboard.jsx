import React, { useState } from "react";
import TenantSidebar from "./TenantsSidebar";
import GroupedRoomList from "./GroupedRoomList";
import ChatWindow from "./ChatWindow";
import LeaseAgreement from "./LeaseAgreement";

const TenantDashboard = () => {
  const [selectedLandlord, setSelectedLandlord] = useState(null);
  const [showLeaseAgreement, setShowLeaseAgreement] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "landlord" },
    { id: 2, text: "I have a question about my rent payment.", sender: "me" }
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "me"
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <TenantSidebar setSelectedLandlord={setSelectedLandlord} />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tenant Dashboard</h1>
          <button
            onClick={() => setShowLeaseAgreement(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Lease Agreement
          </button>
        </div>

        {/* Rooms grouped by landlord */}
        <GroupedRoomList landlordId={selectedLandlord} />

        {/* Chat section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Chat with Landlord</h2>
          <ChatWindow 
            messages={messages} 
            onSend={handleSendMessage} 
          />
        </div>

        {/* Lease Agreement */}
        <LeaseAgreement 
          open={showLeaseAgreement} 
          onClose={() => setShowLeaseAgreement(false)} 
        />
      </div>
    </div>
  );
};

export default TenantDashboard;

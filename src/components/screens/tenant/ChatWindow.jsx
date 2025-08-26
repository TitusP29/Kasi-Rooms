import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ChatWindow = ({ messages = [], onSend = () => {} }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="border rounded-2xl shadow-md flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {Array.isArray(messages) && messages.length > 0 ? messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl max-w-xs ${
              msg.sender === "me"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        )) : (
          <div className="text-gray-500 text-center py-4">
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
      <div className="flex items-center border-t p-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 mr-2"
          placeholder="Type a message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatWindow;

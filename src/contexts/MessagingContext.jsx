import React, { createContext, useContext, useState } from 'react';

const MessagingContext = createContext();

export const MessagingProvider = ({ children }) => {
  // messages: { id, from, to, text, timestamp }
  const [messages, setMessages] = useState([]);

  const sendMessage = (from, to, text) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        from,
        to,
        text,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <MessagingContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => useContext(MessagingContext);

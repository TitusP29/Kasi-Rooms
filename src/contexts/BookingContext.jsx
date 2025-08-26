import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === null) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Bookings: { id, roomId, tenant, status: 'pending'|'accepted'|'rejected' }
  const [bookings, setBookings] = useState([]);

  // Simulate current tenant
  const currentTenant = 'tenant1';

  const requestBooking = (roomId) => {
    const id = Date.now();
    setBookings(prev => [
      ...prev,
      { id, roomId, tenant: currentTenant, status: 'pending' }
    ]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, requestBooking, updateBookingStatus, currentTenant }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);

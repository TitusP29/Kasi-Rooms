import React, { createContext, useContext, useState } from 'react';

const AnalyticsContext = createContext(null);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === null) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  // Room views: { [roomId]: count }
  const [roomViews, setRoomViews] = useState({});
  // Applications: { [roomId]: count }
  const [roomApplications, setRoomApplications] = useState({});
  // Bookings: { [roomId]: count }
  const [roomBookings, setRoomBookings] = useState({});

  // Global stats
  const [totalListings, setTotalListings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeBookings, setActiveBookings] = useState(0);

  // Increment functions
  const incrementRoomView = (roomId) => {
    setRoomViews(prev => ({ ...prev, [roomId]: (prev[roomId] || 0) + 1 }));
  };

  const incrementRoomApplication = (roomId) => {
    setRoomApplications(prev => ({ ...prev, [roomId]: (prev[roomId] || 0) + 1 }));
  };

  const incrementRoomBooking = (roomId) => {
    setRoomBookings(prev => ({ ...prev, [roomId]: (prev[roomId] || 0) + 1 }));
  };

  // Admin stat setters
  const setStats = ({ listings, users, bookings }) => {
    if (listings !== undefined) setTotalListings(listings);
    if (users !== undefined) setTotalUsers(users);
    if (bookings !== undefined) setActiveBookings(bookings);
  };

  const value = {
    roomViews,
    roomApplications,
    roomBookings,
    totalListings,
    totalUsers,
    activeBookings,
    incrementRoomView,
    incrementRoomApplication,
    incrementRoomBooking,
    setStats
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContext;

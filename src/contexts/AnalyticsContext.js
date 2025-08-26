import React, { createContext, useState, useContext } from 'react';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [stats, setStatsState] = useState({
    listings: 0,
    users: 0,
    bookings: 0,
    revenue: 0,
    popularLocations: [],
    recentActivity: []
  });

  const setStats = (newStats) => {
    setStatsState(prev => ({
      ...prev,
      ...newStats,
      updatedAt: new Date().toISOString()
    }));
  };

  const value = {
    stats,
    setStats
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export default AnalyticsContext;
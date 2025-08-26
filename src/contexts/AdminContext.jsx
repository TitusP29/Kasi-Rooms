import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const { currentUser } = useAuth();
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [spamReports, setSpamReports] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLandlords: 0,
    totalRooms: 0,
    activeSubscriptions: 0,
    pendingVerifications: 0,
    spamReports: 0,
  });

  // Mock data fetch - replace with actual API calls
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API calls
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        
        // Mock data
        const mockData = {
          pendingVerifications: [],
          spamReports: [],
          subscribers: [],
          stats: {
            totalLandlords: 124,
            totalRooms: 356,
            activeSubscriptions: 89,
            pendingVerifications: 12,
            spamReports: 5,
          }
        };
        
        setPendingVerifications(mockData.pendingVerifications);
        setSpamReports(mockData.spamReports);
        setSubscribers(mockData.subscribers);
        setStats(mockData.stats);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser?.role === 'admin') {
      fetchAdminData();
    }
  }, [currentUser]);

  // Verify landlord
  const verifyLandlord = async (landlordId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/verify/landlord/${landlordId}`, { method: 'POST' });
      setPendingVerifications(prev => prev.filter(id => id !== landlordId));
      setStats(prev => ({
        ...prev,
        pendingVerifications: Math.max(0, prev.pendingVerifications - 1)
      }));
      return true;
    } catch (error) {
      console.error('Error verifying landlord:', error);
      return false;
    }
  };

  // Verify room
  const verifyRoom = async (roomId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/verify/room/${roomId}`, { method: 'POST' });
      return true;
    } catch (error) {
      console.error('Error verifying room:', error);
      return false;
    }
  };

  // Handle spam report
  const handleSpamReport = async (reportId, action) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/spam/${reportId}`, { 
      //   method: 'POST',
      //   body: JSON.stringify({ action })
      // });
      
      if (action === 'remove') {
        // Remove the reported content
      }
      
      setSpamReports(prev => prev.filter(report => report.id !== reportId));
      setStats(prev => ({
        ...prev,
        spamReports: Math.max(0, prev.spamReports - 1)
      }));
      
      return true;
    } catch (error) {
      console.error('Error handling spam report:', error);
      return false;
    }
  };

  // Update subscription status
  const updateSubscription = async (userId, status) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/subscriptions/${userId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify({ status })
      // });
      
      setSubscribers(prev => 
        prev.map(sub => 
          sub.id === userId ? { ...sub, status } : sub
        )
      );
      
      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      return false;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        pendingVerifications,
        spamReports,
        subscribers,
        stats,
        isLoading,
        verifyLandlord,
        verifyRoom,
        handleSpamReport,
        updateSubscription,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

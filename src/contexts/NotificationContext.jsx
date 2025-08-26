import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

// Mock API functions - replace with actual API calls in production
const fetchNotifications = async (userId) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const notifications = JSON.parse(localStorage.getItem(`notifications_${userId}`)) || [];
      resolve(notifications);
    }, 500);
  });
};

const saveNotifications = async (userId, notifications) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications));
      resolve(true);
    }, 300);
  });
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load notifications on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
    }
  }, [user]);

  // Update unread count when notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      const unread = notifications.filter(n => !n.read).length;
      setUnreadCount(unread);
      
      // Update browser tab title with unread count
      document.title = unread > 0 
        ? `(${unread}) Kasi-Rooms` 
        : 'Kasi-Rooms';
    } else {
      setUnreadCount(0);
      document.title = 'Kasi-Rooms';
    }
  }, [notifications]);

  const loadNotifications = useCallback(async () => {
    if (!user?.id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchNotifications(user.id);
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications:', err);
      setError('Failed to load notifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addNotification = useCallback(async (notification) => {
    if (!user?.id) return;
    
    const newNotification = {
      id: uuidv4(),
      userId: user.id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      read: false,
      createdAt: new Date().toISOString(),
      metadata: notification.metadata || {},
      action: notification.action,
      actionLabel: notification.actionLabel
    };

    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    
    try {
      await saveNotifications(user.id, updatedNotifications);
    } catch (err) {
      console.error('Failed to save notification:', err);
      // Revert on error
      setNotifications(notifications);
    }
  }, [user, notifications]);

  const markAsRead = useCallback(async (notificationId) => {
    if (!user?.id) return;
    
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    
    setNotifications(updatedNotifications);
    
    try {
      await saveNotifications(user.id, updatedNotifications);
    } catch (err) {
      console.error('Failed to update notification:', err);
      // Revert on error
      setNotifications(notifications);
    }
  }, [user, notifications]);

  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    
    const updatedNotifications = notifications.map(n => ({
      ...n,
      read: true
    }));
    
    setNotifications(updatedNotifications);
    
    try {
      await saveNotifications(user.id, updatedNotifications);
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      // Revert on error
      setNotifications(notifications);
    }
  }, [user, notifications]);

  const removeNotification = useCallback(async (notificationId) => {
    if (!user?.id) return;
    
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    
    try {
      await saveNotifications(user.id, updatedNotifications);
    } catch (err) {
      console.error('Failed to remove notification:', err);
      // Revert on error
      setNotifications(notifications);
    }
  }, [user, notifications]);

  const clearAll = useCallback(async () => {
    if (!user?.id) return;
    
    setNotifications([]);
    
    try {
      await saveNotifications(user.id, []);
    } catch (err) {
      console.error('Failed to clear notifications:', err);
      // Revert on error
      loadNotifications();
    }
  }, [user, loadNotifications]);

  // Create a WebSocket connection for real-time notifications
  useEffect(() => {
    // In a real app, you would set up a WebSocket connection here
    // For example:
    // const socket = new WebSocket('wss://your-api.com/notifications');
    // socket.onmessage = (event) => {
    //   const notification = JSON.parse(event.data);
    //   if (notification.userId === user?.id) {
    //     addNotification(notification);
    //   }
    // };
    // return () => socket.close();
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        error,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll,
        refresh: loadNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;

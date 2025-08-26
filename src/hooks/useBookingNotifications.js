import { useCallback, useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import { useToast } from '../components/ui/ToastContainer';

/**
 * Hook to handle booking-related notifications
 * @param {Object} options - Configuration options
 * @param {boolean} [options.enabled=true] - Whether notifications are enabled
 * @param {Function} [options.onBookingRequest] - Callback when a booking request is clicked
 * @param {Function} [options.onMessage] - Callback when a message notification is clicked
 * @returns {Object} - Methods to trigger notifications
 */
const useBookingNotifications = ({
  enabled = true,
  onBookingRequest = () => {},
  onMessage = () => {},
} = {}) => {
  const { addNotification } = useNotifications();
  const { success, error, info } = useToast();

  // Notify about a new booking request
  const notifyNewBookingRequest = useCallback((booking) => {
    if (!enabled) return;
    
    const notification = {
      type: 'info',
      title: 'New Booking Request',
      message: `${booking.tenantName} has requested to book ${booking.propertyName}`,
      metadata: { bookingId: booking.id },
      action: () => onBookingRequest(booking.id),
      actionLabel: 'View Request'
    };

    // Add to notification center
    addNotification(notification);
    
    // Show toast
    info({
      title: 'New Booking Request',
      message: `From: ${booking.tenantName}`,
      action: () => onBookingRequest(booking.id),
      actionLabel: 'Review'
    });
  }, [addNotification, enabled, info, onBookingRequest]);

  // Notify about booking status updates
  const notifyBookingStatusUpdate = useCallback((booking) => {
    if (!enabled) return;
    
    const statusMessages = {
      confirmed: {
        title: 'Booking Confirmed',
        message: `Your booking for ${booking.propertyName} has been confirmed!`,
        type: 'success'
      },
      cancelled: {
        title: 'Booking Cancelled',
        message: `Your booking for ${booking.propertyName} has been cancelled.`,
        type: 'error'
      },
      rejected: {
        title: 'Booking Declined',
        message: `Your booking request for ${booking.propertyName} has been declined.`,
        type: 'error'
      },
      pending_payment: {
        title: 'Payment Required',
        message: `Please complete payment for your booking at ${booking.propertyName}.`,
        type: 'warning'
      },
      default: {
        title: 'Booking Updated',
        message: `Your booking for ${booking.propertyName} has been updated.`,
        type: 'info'
      }
    };

    const { title, message, type } = statusMessages[booking.status] || statusMessages.default;
    
    // Add to notification center
    addNotification({
      type,
      title,
      message,
      metadata: { bookingId: booking.id },
      action: () => onBookingRequest(booking.id),
      actionLabel: 'View Booking'
    });
    
    // Show toast
    const toastMethod = {
      success: success,
      error: error,
      warning: info,
      info: info
    }[type] || info;
    
    toastMethod({
      title,
      message,
      action: () => onBookingRequest(booking.id),
      actionLabel: 'View'
    });
  }, [addNotification, enabled, success, error, info, onBookingRequest]);

  // Notify about new messages
  const notifyNewMessage = useCallback((message) => {
    if (!enabled) return;
    
    const notification = {
      type: 'info',
      title: `New message from ${message.senderName}`,
      message: message.content.length > 50 
        ? `${message.content.substring(0, 50)}...` 
        : message.content,
      metadata: { 
        messageId: message.id,
        conversationId: message.conversationId 
      },
      action: () => onMessage(message.conversationId),
      actionLabel: 'Reply'
    };

    // Add to notification center
    addNotification(notification);
    
    // Only show toast if not on the conversation page
    if (!window.location.pathname.includes(`/messages/${message.conversationId}`)) {
      info({
        title: `New message from ${message.senderName}`,
        message: notification.message,
        action: () => onMessage(message.conversationId),
        actionLabel: 'View'
      });
    }
  }, [addNotification, enabled, info, onMessage]);

  // Notify about upcoming check-ins/check-outs
  const notifyUpcomingStay = useCallback((booking) => {
    if (!enabled) return;
    
    const today = new Date();
    const checkInDate = new Date(booking.checkInDate);
    const checkOutDate = new Date(booking.checkOutDate);
    
    // Check if check-in is tomorrow
    const checkInTomorrow = new Date(today);
    checkInTomorrow.setDate(today.getDate() + 1);
    
    if (checkInTomorrow.toDateString() === checkInDate.toDateString()) {
      info({
        title: 'Check-in Tomorrow',
        message: `Check-in for ${booking.propertyName} is scheduled for tomorrow.`,
        action: () => onBookingRequest(booking.id),
        actionLabel: 'View Details'
      });
    }
    
    // Check if check-out is tomorrow
    const checkOutTomorrow = new Date(today);
    checkOutTomorrow.setDate(today.getDate() + 1);
    
    if (checkOutTomorrow.toDateString() === checkOutDate.toDateString()) {
      info({
        title: 'Check-out Tomorrow',
        message: `Check-out for ${booking.propertyName} is scheduled for tomorrow.`,
        action: () => onBookingRequest(booking.id),
        actionLabel: 'View Details'
      });
    }
  }, [enabled, info, onBookingRequest]);

  // Notify about review reminders
  const notifyReviewReminder = useCallback((booking) => {
    if (!enabled) return;
    
    const checkOutDate = new Date(booking.checkOutDate);
    const today = new Date();
    const daysSinceCheckOut = Math.floor((today - checkOutDate) / (1000 * 60 * 60 * 24));
    
    if (daysSinceCheckOut === 1) {
      info({
        title: 'How was your stay?',
        message: `We'd love to hear about your experience at ${booking.propertyName}.`,
        action: () => {
          // Navigate to review page
          window.location.href = `/bookings/${booking.id}/review`;
        },
        actionLabel: 'Write a Review'
      });
    }
  }, [enabled, info]);

  // Set up WebSocket or polling for real-time updates
  useEffect(() => {
    if (!enabled) return;
    
    // In a real app, you would set up WebSocket connection here
    // For example:
    // const socket = new WebSocket('wss://your-api.com/notifications');
    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   
    //   // Handle different notification types
    //   switch (data.type) {
    //     case 'new_booking':
    //       notifyNewBookingRequest(data.booking);
    //       break;
    //     case 'booking_status_update':
    //       notifyBookingStatusUpdate(data.booking);
    //       break;
    //     case 'new_message':
    //       notifyNewMessage(data.message);
    //       break;
    //     // Other notification types...
    //   }
    // };
    // 
    // return () => socket.close();
    
    // For demo purposes, we'll use a simple interval to check for updates
    const interval = setInterval(() => {
      // This is where you would check for new notifications from your API
      // For now, we'll just log to the console
      console.log('Checking for new notifications...');
    }, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, [enabled]);

  return {
    notifyNewBookingRequest,
    notifyBookingStatusUpdate,
    notifyNewMessage,
    notifyUpcomingStay,
    notifyReviewReminder
  };
};

export default useBookingNotifications;

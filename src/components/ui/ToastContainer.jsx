import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Toast from './Toast';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [paused, setPaused] = useState(false);

  // Pause toasts when hovering over the container
  const handleMouseEnter = useCallback(() => {
    setPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPaused(false);
  }, []);

  const addToast = useCallback(({ type = 'info', title, message, duration = 5000, action, actionLabel }) => {
    const id = uuidv4();
    setToasts((currentToasts) => [
      ...currentToasts,
      { id, type, title, message, duration, action, actionLabel, timestamp: Date.now() },
    ]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  // Auto-remove toasts after their duration
  useEffect(() => {
    if (paused || toasts.length === 0) return;

    const now = Date.now();
    const nextTimeout = Math.min(
      ...toasts.map((toast) => {
        const elapsed = now - toast.timestamp;
        return Math.max(0, toast.duration - elapsed);
      })
    );

    if (nextTimeout === Infinity) return;

    const timer = setTimeout(() => {
      const now = Date.now();
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => {
          const elapsed = now - toast.timestamp;
          return elapsed < toast.duration;
        })
      );
    }, nextTimeout);

    return () => clearTimeout(timer);
  }, [toasts, paused]);

  // Add a method to update an existing toast
  const updateToast = useCallback((id, updates) => {
    setToasts((currentToasts) =>
      currentToasts.map((toast) =>
        toast.id === id ? { ...toast, ...updates, timestamp: Date.now() } : toast
      )
    );
  }, []);

  // Add a method to show a success toast
  const success = useCallback(({ title, message, duration, action, actionLabel }) => {
    return addToast({ type: 'success', title, message, duration, action, actionLabel });
  }, [addToast]);

  // Add a method to show an error toast
  const error = useCallback(({ title, message, duration, action, actionLabel }) => {
    return addToast({ type: 'error', title, message, duration, action, actionLabel });
  }, [addToast]);

  // Add a method to show a warning toast
  const warning = useCallback(({ title, message, duration, action, actionLabel }) => {
    return addToast({ type: 'warning', title, message, duration, action, actionLabel });
  }, [addToast]);

  // Add a method to show an info toast
  const info = useCallback(({ title, message, duration, action, actionLabel }) => {
    return addToast({ type: 'info', title, message, duration, action, actionLabel });
  }, [addToast]);

  // Create the context value
  const contextValue = {
    toasts,
    addToast,
    removeToast,
    updateToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className="fixed top-4 right-4 w-80 z-50 space-y-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            notification={toast}
            onDismiss={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;

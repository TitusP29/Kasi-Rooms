import React, { useEffect, useState } from 'react';
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const Toast = ({ notification, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);
  const autoDismissTime = notification.duration || 5000; // Default 5 seconds

  useEffect(() => {
    // Start exit animation 100ms before auto-dismiss
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, autoDismissTime - 100);

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      onDismiss(notification.id);
    }, autoDismissTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [notification.id, autoDismissTime, onDismiss]);

  const getIcon = () => {
    const iconClass = 'h-6 w-6';
    
    switch (notification.type) {
      case 'success':
        return <CheckCircleIcon className={`${iconClass} text-green-400`} />;
      case 'error':
        return <ExclamationCircleIcon className={`${iconClass} text-red-400`} />;
      case 'warning':
        return <ExclamationTriangleIcon className={`${iconClass} text-yellow-400`} />;
      case 'info':
      default:
        return <InformationCircleIcon className={`${iconClass} text-blue-400`} />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50';
      case 'error':
        return 'bg-red-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'info':
      default:
        return 'bg-blue-50';
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
      default:
        return 'text-blue-800';
    }
  };

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(notification.id), 150); // Match CSS transition time
  };

  return (
    <div
      className={`${getBackgroundColor()} rounded-lg shadow-lg overflow-hidden transition-all duration-150 transform ${
        isExiting ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <h3 className={`text-sm font-medium ${getTextColor()}`}>
              {notification.title}
            </h3>
            {notification.message && (
              <p className="mt-1 text-sm text-gray-700">
                {notification.message}
              </p>
            )}
            {notification.action && (
              <div className="mt-3 flex">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    notification.action();
                    handleDismiss();
                  }}
                  className="rounded-md text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {notification.actionLabel || 'View'}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              onClick={handleDismiss}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="bg-gray-200 h-1 w-full">
        <div 
          className={`h-full ${getTextColor().replace('text-', 'bg-')}`}
          style={{
            width: isExiting ? '0%' : '100%',
            transition: `width ${autoDismissTime}ms linear`,
            transitionTimingFunction: 'linear'
          }}
        />
      </div>
    </div>
  );
};

export default Toast;

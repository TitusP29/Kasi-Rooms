import React, { useState, useEffect, useRef } from 'react';

// Simple dialog implementation without external dependencies
const Dialog = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = useState(open);
  const dialogRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div 
        ref={dialogRef}
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ children, className = '', ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const DialogHeader = ({ className = '', ...props }) => (
  <div className={`flex flex-col space-y-2 ${className}`} {...props} />
);

const DialogTitle = ({ className = '', ...props }) => (
  <h2 className={`text-xl font-semibold ${className}`} {...props} />
);

const DialogDescription = ({ className = '', ...props }) => (
  <p className={`text-gray-600 text-sm ${className}`} {...props} />
);

const DialogFooter = ({ className = '', ...props }) => (
  <div className={`flex justify-end space-x-2 mt-6 ${className}`} {...props} />
);

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

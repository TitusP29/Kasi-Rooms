import React from 'react';

const Card = ({ className, children, ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div 
      className={`p-4 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardContent };

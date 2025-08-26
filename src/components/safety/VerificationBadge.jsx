import React from 'react';
import { CheckBadgeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '../ui/Tooltip';

const VerificationBadge = ({ verificationLevel, size = 'md' }) => {
  const getVerificationDetails = () => {
    switch (verificationLevel) {
      case 4:
        return {
          text: 'Fully Verified',
          color: 'bg-green-100 text-green-800',
          icon: CheckBadgeIcon,
          tooltip: 'This user has completed all verification steps'
        };
      case 3:
        return {
          text: 'Mostly Verified',
          color: 'bg-blue-100 text-blue-800',
          icon: CheckBadgeIcon,
          tooltip: 'This user has completed most verification steps'
        };
      case 2:
        return {
          text: 'Partially Verified',
          color: 'bg-yellow-100 text-yellow-800',
          icon: ExclamationTriangleIcon,
          tooltip: 'This user has completed some verification steps'
        };
      case 1:
        return {
          text: 'Minimally Verified',
          color: 'bg-orange-100 text-orange-800',
          icon: ExclamationTriangleIcon,
          tooltip: 'This user has completed minimal verification'
        };
      default:
        return {
          text: 'Not Verified',
          color: 'bg-red-100 text-red-800',
          icon: ExclamationTriangleIcon,
          tooltip: 'This user has not completed verification'
        };
    }
  };

  const { text, color, icon: Icon, tooltip } = getVerificationDetails();
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <Tooltip content={tooltip}>
      <span className={`inline-flex items-center rounded-full font-medium ${color} ${sizeClasses[size]}`}>
        <Icon className={`${size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-1.5'}`} />
        {text}
      </span>
    </Tooltip>
  );
};

export default VerificationBadge;

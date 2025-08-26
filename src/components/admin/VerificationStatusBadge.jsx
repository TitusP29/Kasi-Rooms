import React from 'react';
import { Chip, Tooltip } from '@mui/material';
import {
  CheckCircle as VerifiedIcon,
  Pending as PendingIcon,
  Warning as WarningIcon,
  Block as BlockedIcon
} from '@mui/icons-material';

const VerificationStatusBadge = ({ status, type = 'landlord' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          label: 'Verified',
          icon: <VerifiedIcon fontSize="small" />,
          color: 'success',
          tooltip: `This ${type} has been verified by our team`
        };
      case 'pending':
        return {
          label: 'Pending Review',
          icon: <PendingIcon fontSize="small" />,
          color: 'warning',
          tooltip: `This ${type} is pending verification`
        };
      case 'rejected':
        return {
          label: 'Verification Rejected',
          icon: <BlockedIcon fontSize="small" />,
          color: 'error',
          tooltip: `This ${type} was rejected during verification`
        };
      case 'unverified':
      default:
        return {
          label: 'Not Verified',
          icon: <WarningIcon fontSize="small" />,
          color: 'default',
          tooltip: `This ${type} has not been verified yet`
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Tooltip title={config.tooltip} arrow>
      <Chip
        size="small"
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant="outlined"
        sx={{ 
          '& .MuiChip-icon': { 
            color: `${config.color}.main`,
            fontSize: '1rem'
          },
          '& .MuiChip-label': {
            fontWeight: 500
          }
        }}
      />
    </Tooltip>
  );
};

export default VerificationStatusBadge;

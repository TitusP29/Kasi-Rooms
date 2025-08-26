import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Avatar,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as RoomsIcon,
  BookOnline as BookingsIcon,
  Analytics as AnalyticsIcon,
  Add as PostRoomIcon,
  Message as MessagesIcon,
  Person as ProfileIcon,
  Security as SafetyIcon,
  Logout as LogoutIcon,
  Language as LanguageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

const LandlordSidebar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: t('dashboard', { defaultValue: 'Dashboard' }), 
      icon: <DashboardIcon />,
      path: '/dashboard',
      color: '#1976d2'
    },
    { 
      id: 'rooms', 
      label: t('my_rooms', { defaultValue: 'My Rooms' }), 
      icon: <RoomsIcon />,
      path: '/dashboard',
      color: '#388e3c'
    },
    { 
      id: 'bookings', 
      label: t('bookings', { defaultValue: 'Bookings' }), 
      icon: <BookingsIcon />,
      path: '/dashboard',
      color: '#f57c00'
    },
    { 
      id: 'analytics', 
      label: t('analytics', { defaultValue: 'Analytics' }), 
      icon: <AnalyticsIcon />,
      path: '/dashboard',
      color: '#7b1fa2'
    },
    { 
      id: 'post-room', 
      label: t('post_room', { defaultValue: 'Post Room' }), 
      icon: <PostRoomIcon />,
      path: '/dashboard/post-room',
      color: '#d32f2f'
    },
    { 
      id: 'messages', 
      label: t('messages', { defaultValue: 'Messages' }), 
      icon: <MessagesIcon />,
      path: '/dashboard',
      color: '#0288d1'
    },
    { 
      id: 'profile', 
      label: t('profile', { defaultValue: 'Profile' }), 
      icon: <ProfileIcon />,
      path: '/dashboard',
      color: '#5d4037'
    },
    { 
      id: 'safety', 
      label: t('safety_verification', { defaultValue: 'Safety & Verification' }), 
      icon: <SafetyIcon />,
      path: '/safety',
      color: '#9c27b0'
    }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
    { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
    { code: 'ts', name: 'Xitsonga', flag: '🇿🇦' },
    { code: 've', name: 'Tshivenda', flag: '🇿🇦' }
  ];

  const handleNavigation = (item) => {
    if (item.path !== location.pathname) {
      navigate(item.path);
    }
    if (onSectionChange) {
      onSectionChange(item.id);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (itemId) => {
    return activeSection === itemId;
  };

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setLanguageAnchorEl(null);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageAnchorEl(null);
  };

  const drawerWidth = isCollapsed ? 70 : 280;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1565c0 0%, #0d47a1 100%)',
          color: 'white',
          transition: 'width 0.3s ease',
          boxShadow: '4px 0 20px rgba(13, 71, 161, 0.3)'
        },
      }}
    >
      {/* Header */}
      <Box className="p-4 border-b border-blue-400/30">
        <Box className="flex items-center justify-between">
          {!isCollapsed && (
            <Typography 
              variant="h6" 
              className="font-bold text-white flex items-center"
              sx={{ fontWeight: 700 }}
            >
              🏠 Kasi Rooms
            </Typography>
          )}
          <Tooltip title={isCollapsed ? 'Expand' : 'Collapse'} arrow>
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-white/10 transition-all duration-200"
              sx={{ color: 'white' }}
            >
              {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Navigation Items */}
      <List className="flex-1 py-2">
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding className="mb-1">
            <Tooltip title={isCollapsed ? item.label : ''} placement="right" arrow>
              <ListItemButton
                selected={isActive(item.id)}
                onClick={() => handleNavigation(item)}
                className={`mx-2 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  isActive(item.id) 
                    ? 'bg-white/20 shadow-lg transform scale-105' 
                    : 'hover:transform hover:scale-105'
                }`}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  px: isCollapsed ? 1 : 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed ? 'auto' : 40,
                    color: item.color,
                    justifyContent: 'center'
                  }}
                >
                  <Box 
                    className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                    sx={{ backgroundColor: `${item.color}20` }}
                  >
                    {item.icon}
                  </Box>
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive(item.id) ? 600 : 400,
                      fontSize: '0.9rem'
                    }}
                  />
                )}
                {!isCollapsed && isActive(item.id) && (
                  <Chip
                    size="small"
                    label="Active"
                    className="bg-white/20 text-white text-xs"
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: '0.7rem'
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box className="border-t border-blue-400/30 p-2">
        {/* Language Selector */}
        <ListItem disablePadding className="mb-2">
          <Tooltip title={isCollapsed ? getCurrentLanguage().name : 'Change Language'} placement="right" arrow>
            <ListItemButton
              onClick={handleLanguageMenuOpen}
              className="mx-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              sx={{
                borderRadius: 2,
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 1 : 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 40, color: '#90caf9', justifyContent: 'center' }}>
                <LanguageIcon />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={getCurrentLanguage().name}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              )}
              {!isCollapsed && <ExpandMoreIcon />}
            </ListItemButton>
          </Tooltip>
        </ListItem>

        <Menu
          anchorEl={languageAnchorEl}
          open={Boolean(languageAnchorEl)}
          onClose={handleLanguageMenuClose}
          PaperProps={{
            className: 'shadow-xl border border-blue-100',
            sx: {
              borderRadius: 2,
              minWidth: 180
            }
          }}
        >
          {languages.map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              selected={i18n.language === language.code}
              className={`hover:bg-blue-50 transition-colors duration-200 ${
                i18n.language === language.code ? 'bg-blue-100 text-blue-800 font-semibold' : ''
              }`}
            >
              <span className="mr-3 text-lg">{language.flag}</span>
              {language.name}
            </MenuItem>
          ))}
        </Menu>

        {/* Logout Button */}
        <ListItem disablePadding>
          <Tooltip title={isCollapsed ? t('logout', { defaultValue: 'Logout' }) : ''} placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              className="mx-2 rounded-lg hover:bg-red-500/20 transition-all duration-200"
              sx={{
                borderRadius: 2,
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 1 : 2,
                '&:hover': {
                  backgroundColor: 'rgba(244, 67, 54, 0.2)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: isCollapsed ? 'auto' : 40, color: '#f44336', justifyContent: 'center' }}>
                <LogoutIcon />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={t('logout', { defaultValue: 'Logout' })}
                  primaryTypographyProps={{ fontSize: '0.9rem', color: '#ffcdd2' }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default LandlordSidebar;

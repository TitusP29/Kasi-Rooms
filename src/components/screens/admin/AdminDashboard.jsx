import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress,
  Divider,
  Paper,
  Button,
  Tabs,
  Tab,
  Container,
  TextField,
  InputAdornment,
  Chip as MuiChip,
  Badge
} from '@mui/material';
import {
  People as PeopleIcon,
  Home as HomeIcon,
  MonetizationOn as MonetizationOnIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  VerifiedUser as VerifiedUserIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Import admin components
import AdminVerificationList from '@/components/admin/AdminVerificationList';
import SpamReportsManager from '@/components/admin/SpamReportsManager';
import SubscriptionManager from '@/components/admin/SubscriptionManager';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{value === index && children}</Box>
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const StatCard = ({ icon, title, value, color, onClick }) => (
  <Card 
    elevation={3} 
    sx={{ 
      height: '100%',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      }
    }}
    onClick={onClick}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            {value}
          </Typography>
        </Box>
        <Box 
          sx={{ 
            bgcolor: `${color}.light`, 
            color: `${color}.dark`,
            p: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {React.cloneElement(icon, { fontSize: 'large' })}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { stats, isLoading, pendingVerifications, spamReports, subscribers } = useAdmin();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleStatClick = (tabIndex) => {
    setTabValue(tabIndex);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ width: '100%' }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography color="text.secondary">
            Welcome back! Here's what's happening with your platform.
          </Typography>
        </Box>
        
        {/* Stats Overview */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={<PeopleIcon />} 
              title="Total Landlords" 
              value={stats.totalLandlords || 0}
              color="primary"
              onClick={() => handleStatClick(0)}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={<HomeIcon />} 
              title="Total Rooms" 
              value={stats.totalRooms || 0}
              color="secondary"
              onClick={() => handleStatClick(0)}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={<MonetizationOnIcon />} 
              title="Active Subscriptions" 
              value={stats.activeSubscriptions || 0}
              color="success"
              onClick={() => handleStatClick(2)}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <StatCard 
              icon={<ReportIcon />} 
              title="Spam Reports" 
              value={stats.spamReports || 0}
              color="error"
              onClick={() => handleStatClick(1)}
            />
          </Grid>
        </Grid>

        {/* Main Content */}
        <Paper sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <Box 
            sx={{ 
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              p: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="admin dashboard tabs"
              sx={{
                '& .MuiTab-root': {
                  minHeight: 48,
                  fontWeight: 600,
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 2,
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <Tab 
                icon={<VerifiedUserIcon fontSize="small" sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Verifications" 
                {...a11yProps(0)} 
              />
              <Tab 
                icon={<ReportIcon fontSize="small" sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label={
                  <Box display="flex" alignItems="center">
                    <Box component="span">Spam Reports</Box>
                    {stats.spamReports > 0 && (
                      <MuiChip 
                        label={stats.spamReports} 
                        size="small" 
                        color="error" 
                        sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                      />
                    )}
                  </Box>
                } 
                {...a11yProps(1)} 
              />
              <Tab 
                icon={<MonetizationOnIcon fontSize="small" sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="Subscriptions" 
                {...a11yProps(2)} 
              />
              <Tab 
                icon={<SettingsIcon fontSize="small" sx={{ mr: 1 }} />} 
                iconPosition="start" 
                label="System Settings" 
                {...a11yProps(3)} 
              />
            </Tabs>
            
            <Box display="flex" gap={1} flexWrap="wrap">
              <TextField
                size="small"
                placeholder={`Search ${tabValue === 0 ? 'verifications' : tabValue === 1 ? 'reports' : 'subscriptions'}...`}
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  sx: { 
                    bgcolor: 'background.paper',
                    '& input': { py: 0.8 }
                  }
                }}
              />
              
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.location.reload()}
                startIcon={<RefreshIcon />}
                sx={{ textTransform: 'none' }}
              >
                Refresh
              </Button>
            </Box>
          </Box>
          
          {/* Tab Panels */}
          <Box sx={{ p: 3 }}>
            {/* Verifications Tab */}
            <TabPanel value={tabValue} index={0}>
              <AdminVerificationList 
                verifications={pendingVerifications} 
                onApprove={(id) => console.log('Approve:', id)}
                onReject={(id) => console.log('Reject:', id)}
                isLoading={isLoading}
              />
            </TabPanel>
            
            {/* Spam Reports Tab */}
            <TabPanel value={tabValue} index={1}>
              <SpamReportsManager 
                reports={spamReports || []}
                onResolve={(id, action) => console.log('Resolve:', id, action)}
                onDelete={(id) => console.log('Delete:', id)}
                isLoading={isLoading}
              />
            </TabPanel>
            
            {/* Subscriptions Tab */}
            <TabPanel value={tabValue} index={2}>
              <SubscriptionManager 
                subscriptions={subscribers || []}
                onUpdateSubscription={(id, data) => console.log('Update:', id, data)}
                onCancelSubscription={(id) => console.log('Cancel:', id)}
                onAddSubscription={(data) => console.log('Add:', data)}
                onEditPlan={(id) => console.log('Edit plan:', id)}
                isLoading={isLoading}
              />
            </TabPanel>
            
            {/* System Settings Tab */}
            <TabPanel value={tabValue} index={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  System Settings
                </Typography>
                <Typography color="text.secondary">
                  Configure system-wide settings and preferences.
                </Typography>
              </Box>
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Screens
import LoginScreen from '../../screens/auth/LoginScreen.jsx';
import SignupScreen from '../../screens/auth/SignupScreen.jsx';

// Tenant Screens
import HomeScreen from '../../screens/tenant/HomeScreen.jsx';
import SearchScreen from '../../screens/tenant/SearchScreen.jsx';
import ContactScreen from '../../screens/tenant/ContactScreen.jsx';
import TenantProfileScreen from '../../screens/tenant/TenantProfileScreen.jsx';
import TenantDashboardScreen from '../../screens/tenant/TenantDashboardScreen.jsx';

// Admin Screens & Components
import AdminPanelScreen from '../screens/admin/AdminPanelScreen.jsx';
import AdminVerificationList from '../admin/AdminVerificationList';
import SpamReportsManager from '../admin/SpamReportsManager';
import SubscriptionManager from '../admin/SubscriptionManager';

// Landlord Screens
import DashboardScreen from '../../screens/landlord/DashboardScreen.jsx';
import RoomPostScreen from '../../screens/landlord/RoomPostScreen.jsx';
import RoomDetailScreen from '../../screens/RoomDetailScreen.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';

const AppNavigator = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const userType = currentUser?.userType;

  // Redirect to the appropriate dashboard based on user type
  const getDefaultRoute = () => {
    console.log('Getting default route for user type:', userType);
    if (!isAuthenticated) return '/auth/login';
    
    switch (userType) {
      case 'admin':
        console.log('Redirecting admin to /admin/verifications');
        return '/admin/verifications';
      case 'landlord':
        console.log('Redirecting landlord to /dashboard');
        return '/dashboard';
      case 'tenant':
      default:
        console.log('Redirecting to tenant home');
        return '/';
    }
  };
  
  // Debug effect to log auth state changes
  React.useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, userType, currentUser });
  }, [isAuthenticated, userType, currentUser]);
  
  // Debug logging
  console.log('Current auth state:', { isAuthenticated, userType, currentUser });

  return (
    <Router>
      <Routes>
        {/* Authentication Routes - Always available when not authenticated */}
        <Route path="/auth/login" element={!isAuthenticated ? <LoginScreen /> : <Navigate to={getDefaultRoute()} replace />} />
        <Route path="/auth/signup" element={!isAuthenticated ? <SignupScreen /> : <Navigate to={getDefaultRoute()} replace />} />
        
        {/* Admin Routes - Accessible only to admin users */}
        <Route 
          path="/admin/*" 
          element={
            isAuthenticated && userType === 'admin' ? (
              <AdminPanelScreen />
            ) : (
              <Navigate to="/auth/login" state={{ from: '/admin' }} replace />
            )}
        >
          <Route index element={<Navigate to="verifications" replace />} />
          <Route path="verifications" element={<AdminVerificationList />} />
          <Route path="reports" element={<SpamReportsManager />} />
          <Route path="subscriptions" element={<SubscriptionManager />} />
          <Route path="*" element={<Navigate to="verifications" replace />} />
        </Route>
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            isAuthenticated ? (
              <Routes>
                {userType === 'tenant' && (
                  <>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/tenant/home" element={<HomeScreen />} />
                    <Route path="/tenant/search" element={<SearchScreen />} />
                    <Route path="/tenant/bookings" element={<TenantDashboardScreen />} />
                    <Route path="/tenant/profile" element={<TenantProfileScreen />} />
                    <Route path="/tenant/contact" element={<ContactScreen />} />
                    <Route path="/dashboard" element={<TenantDashboardScreen />} />
                    <Route path="/profile" element={<TenantProfileScreen />} />
                    <Route path="/room/:id" element={<RoomDetailScreen />} />
                  </>
                )}
                
                {userType === 'landlord' && (
                  <>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardScreen />} />
                    <Route path="/dashboard/post-room" element={<RoomPostScreen />} />
                    <Route path="/room/:id" element={<RoomDetailScreen />} />
                  </>
                )}
                
                {/* Catch-all for authenticated users */}
                <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
              </Routes>
            ) : (
              <Navigate to="/auth/login" state={{ from: window.location.pathname }} replace />
            )}
        />
        
        {/* Catch-all for unauthenticated users */}
        <Route path="*" element={<Navigate to={isAuthenticated ? getDefaultRoute() : "/auth/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;
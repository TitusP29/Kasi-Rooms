import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Lazy load components
const LoginScreen = lazy(() => import('./screens/auth/LoginScreen'));
const SignupScreen = lazy(() => import('./screens/auth/SignupScreen'));
const TenantsDashboard = lazy(() => import('./screens/tenant/TenantsDashboard'));
const AdminDashboard = lazy(() => import('./screens/admin/AdminDashboard'));
const LandlordRoutes = lazy(() => import('./screens/landlord/LandlordRoutes'));
const SafetyVerificationPage = lazy(() => import('./safety/SafetyVerificationPage'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  }}>
    <div className="spinner">Loading...</div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = ['tenant', 'landlord', 'admin'] }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children || <Outlet />;
};

// Admin route component
const AdminRoute = ({ children }) => {
  const { userRole } = useAuth();
  
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppContent = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/auth/signup" element={<SignupScreen />} />
        
        {/* Landlord Routes */}
        <Route path="/landlord/*" element={
          <ProtectedRoute allowedRoles={['landlord', 'admin']}>
            <LandlordRoutes />
          </ProtectedRoute>
        } />
        
        {/* Tenant Routes */}
        <Route path="/tenant/*" element={
          <ProtectedRoute allowedRoles={['tenant', 'admin']}>
            <TenantsDashboard />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Safety Verification */}
        <Route path="/safety" element={
          <ProtectedRoute>
            <SafetyVerificationPage />
          </ProtectedRoute>
        } />
        
        {/* Default route based on user role */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/landlord" replace />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppContent;

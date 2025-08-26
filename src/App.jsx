import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { RoomProvider } from './contexts/RoomContext.jsx';
import { NotificationProvider } from './contexts/NotificationContext';
import { VerificationProvider } from './contexts/VerificationContext';
import { AdminProvider } from './contexts/AdminContext';
import { ToastProvider } from './components/ui/ToastContainer';
import './i18n.js';
import './App.css';

// Import the main app content
import AppContent from './components/AppContent';

// Error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message || 'Please try refreshing the page'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  }}>
    <div className="spinner">Loading...</div>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <RoomProvider>
            <NotificationProvider>
              <VerificationProvider>
                <AdminProvider>
                  <ToastProvider>
                    <Suspense fallback={<LoadingFallback />}>
                      <AppContent />
                    </Suspense>
                  </ToastProvider>
                </AdminProvider>
              </VerificationProvider>
            </NotificationProvider>
          </RoomProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

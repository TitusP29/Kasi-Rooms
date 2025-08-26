import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNavigator from './components/navigation/AppNavigator';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookingProvider } from './contexts/BookingContext';
import { MessagingProvider } from './contexts/MessagingContext';
import { RoomProvider } from './contexts/RoomContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';
import LanguageSelector from './components/LanguageSelector';
import './i18n';
import './index.css';
import { register as registerServiceWorker } from './ServiceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BookingProvider>
        <MessagingProvider>
          <AnalyticsProvider>
            <RoomProvider>
              <LanguageSelector />
              <AppNavigator />
            </RoomProvider>
          </AnalyticsProvider>
        </MessagingProvider>
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Register the service worker for offline support
registerServiceWorker();

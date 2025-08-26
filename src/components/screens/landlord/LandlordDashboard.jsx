import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PropertiesList from './PropertiesList';
import Bookings from './Bookings';
import Messages from './Messages';
import Profile from './Profile';
import DashboardOverview from './DashboardOverview';

const LandlordDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigate = useNavigate();
  
  const navigation = [
    { name: 'Dashboard', path: '/landlord', icon: '🏠', component: <DashboardOverview /> },
    { name: 'Properties', path: '/landlord/properties', icon: '🏢', component: <PropertiesList /> },
    { name: 'Bookings', path: '/landlord/bookings', icon: '📅', component: <Bookings /> },
    { name: 'Messages', path: '/landlord/messages', icon: '💬', component: <Messages /> },
    { name: 'Profile', path: '/landlord/profile', icon: '👤', component: <Profile /> },
  ];
  
  const currentNav = navigation.find(nav => location.pathname.startsWith(nav.path)) || navigation[1];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold text-gray-900">Landlord Portal</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <div className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                    {user?.name?.charAt(0) || '👤'}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user?.name || 'User'}
                  </p>
                  <button
                    onClick={logout}
                    className="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {currentNav.name}
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <Outlet />
                {currentNav.component}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandlordDashboard;

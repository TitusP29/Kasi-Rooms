import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../../admin/AdminHeader';

const AdminPanelScreen = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelScreen;

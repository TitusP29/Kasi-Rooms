import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandlordDashboard from './LandlordDashboard';
import PropertiesList from './PropertiesList';
import PropertyForm from './PropertyForm';
import PropertyDetails from './PropertyDetails';
import Profile from './Profile';
import Messages from './Messages';
import Bookings from './Bookings';

const LandlordRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandlordDashboard />}>
        <Route index element={<Navigate to="properties" replace />} />
        <Route path="properties" element={<PropertiesList />} />
        <Route path="properties/new" element={<PropertyForm />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        <Route path="properties/:id/edit" element={<PropertyForm />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default LandlordRoutes;

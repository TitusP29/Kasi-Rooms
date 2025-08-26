import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from '../screens/auth/LoginScreen';

const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginScreen />} />
    </Routes>
  );
};

export default AuthNavigator;
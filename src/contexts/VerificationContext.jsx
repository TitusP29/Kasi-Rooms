import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const VerificationContext = createContext();

// Mock API functions - replace with actual API calls in production
const fetchVerificationStatus = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = JSON.parse(localStorage.getItem(`verification_${userId}`)) || {
        emailVerified: false,
        phoneVerified: false,
        idVerified: false,
        backgroundCheck: false,
        verificationLevel: 0, // 0-4 (0 = none, 4 = fully verified)
        verificationSteps: [
          { id: 'email', label: 'Verify Email', completed: false },
          { id: 'phone', label: 'Verify Phone', completed: false },
          { id: 'id', label: 'Verify ID', completed: false },
          { id: 'background', label: 'Background Check', completed: false },
        ]
      };
      resolve(status);
    }, 300);
  });
};

const saveVerificationStatus = async (userId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(`verification_${userId}`, JSON.stringify(status));
      resolve(true);
    }, 300);
  });
};

export const VerificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [verification, setVerification] = useState({
    emailVerified: false,
    phoneVerified: false,
    idVerified: false,
    backgroundCheck: false,
    verificationLevel: 0,
    verificationSteps: [],
    isLoading: true,
    error: null
  });

  // Calculate verification level based on completed steps
  const calculateVerificationLevel = useCallback((status) => {
    let level = 0;
    if (status.emailVerified) level++;
    if (status.phoneVerified) level++;
    if (status.idVerified) level++;
    if (status.backgroundCheck) level++;
    return level;
  }, []);

  // Update verification steps based on status
  const updateVerificationSteps = useCallback((status) => {
    return [
      { 
        id: 'email', 
        label: 'Verify Email', 
        completed: status.emailVerified,
        description: 'Confirm your email address',
        icon: '✉️',
        required: true
      },
      { 
        id: 'phone', 
        label: 'Verify Phone', 
        completed: status.phoneVerified,
        description: 'Confirm your phone number',
        icon: '📱',
        required: true
      },
      { 
        id: 'id', 
        label: 'Verify ID', 
        completed: status.idVerified,
        description: 'Upload government-issued ID',
        icon: '🆔',
        required: true
      },
      { 
        id: 'background', 
        label: 'Background Check', 
        completed: status.backgroundCheck,
        description: 'Complete background verification',
        icon: '🔍',
        required: user?.role === 'landlord'
      },
    ];
  }, [user?.role]);

  // Load verification status
  const loadVerificationStatus = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const status = await fetchVerificationStatus(user.id);
      const verificationLevel = calculateVerificationLevel(status);
      const verificationSteps = updateVerificationSteps(status);
      
      setVerification(prev => ({
        ...prev,
        ...status,
        verificationLevel,
        verificationSteps,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error loading verification status:', error);
      setVerification(prev => ({
        ...prev,
        error: 'Failed to load verification status',
        isLoading: false
      }));
    }
  }, [user, calculateVerificationLevel, updateVerificationSteps]);

  // Initialize verification status
  useEffect(() => {
    loadVerificationStatus();
  }, [loadVerificationStatus]);

  // Verify email
  const verifyEmail = useCallback(async (verificationCode) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' };
    
    try {
      // In a real app, you would verify the code with your backend
      // For demo, we'll just mark it as verified
      const updatedStatus = {
        ...verification,
        emailVerified: true
      };
      
      const verificationLevel = calculateVerificationLevel(updatedStatus);
      const verificationSteps = updateVerificationSteps(updatedStatus);
      
      await saveVerificationStatus(user.id, {
        ...updatedStatus,
        verificationLevel
      });
      
      setVerification({
        ...updatedStatus,
        verificationLevel,
        verificationSteps,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error verifying email:', error);
      return { success: false, error: 'Failed to verify email' };
    }
  }, [user, verification, calculateVerificationLevel, updateVerificationSteps]);

  // Send phone verification code
  const sendPhoneVerificationCode = useCallback(async (phoneNumber) => {
    // In a real app, you would send an SMS with a verification code
    console.log(`Sending verification code to ${phoneNumber}`);
    return { success: true };
  }, []);

  // Verify phone
  const verifyPhone = useCallback(async (phoneNumber, verificationCode) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' };
    
    try {
      // In a real app, you would verify the code with your backend
      // For demo, we'll just mark it as verified
      const updatedStatus = {
        ...verification,
        phoneVerified: true
      };
      
      const verificationLevel = calculateVerificationLevel(updatedStatus);
      const verificationSteps = updateVerificationSteps(updatedStatus);
      
      await saveVerificationStatus(user.id, {
        ...updatedStatus,
        verificationLevel
      });
      
      setVerification({
        ...updatedStatus,
        verificationLevel,
        verificationSteps,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error verifying phone:', error);
      return { success: false, error: 'Failed to verify phone number' };
    }
  }, [user, verification, calculateVerificationLevel, updateVerificationSteps]);

  // Upload ID for verification
  const uploadIdForVerification = useCallback(async (idFile, idType) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' };
    
    try {
      // In a real app, you would upload the file to your backend
      // and process it for verification
      console.log(`Uploading ${idType} for verification`, idFile);
      
      // Simulate verification processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedStatus = {
        ...verification,
        idVerified: true
      };
      
      const verificationLevel = calculateVerificationLevel(updatedStatus);
      const verificationSteps = updateVerificationSteps(updatedStatus);
      
      await saveVerificationStatus(user.id, {
        ...updatedStatus,
        verificationLevel
      });
      
      setVerification({
        ...updatedStatus,
        verificationLevel,
        verificationSteps,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error uploading ID:', error);
      return { success: false, error: 'Failed to process ID verification' };
    }
  }, [user, verification, calculateVerificationLevel, updateVerificationSteps]);

  // Request background check
  const requestBackgroundCheck = useCallback(async (consent) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' };
    
    try {
      if (!consent) {
        return { success: false, error: 'You must consent to a background check' };
      }
      
      // In a real app, you would initiate a background check with a service
      console.log('Initiating background check for user:', user.id);
      
      // Simulate background check processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedStatus = {
        ...verification,
        backgroundCheck: true
      };
      
      const verificationLevel = calculateVerificationLevel(updatedStatus);
      const verificationSteps = updateVerificationSteps(updatedStatus);
      
      await saveVerificationStatus(user.id, {
        ...updatedStatus,
        verificationLevel
      });
      
      setVerification({
        ...updatedStatus,
        verificationLevel,
        verificationSteps,
        isLoading: false
      });
      
      return { 
        success: true,
        message: 'Background check completed successfully'
      };
    } catch (error) {
      console.error('Error with background check:', error);
      return { 
        success: false, 
        error: 'Failed to complete background check. Please try again.'
      };
    }
  }, [user, verification, calculateVerificationLevel, updateVerificationSteps]);

  // Get verification status
  const getVerificationStatus = useCallback(() => {
    return {
      isVerified: verification.verificationLevel >= 2, // At least 2 verifications
      isFullyVerified: verification.verificationLevel === 4,
      verificationLevel: verification.verificationLevel,
      verificationSteps: verification.verificationSteps,
      isLoading: verification.isLoading,
      error: verification.error
    };
  }, [verification]);

  const value = {
    ...verification,
    verifyEmail,
    sendPhoneVerificationCode,
    verifyPhone,
    uploadIdForVerification,
    requestBackgroundCheck,
    getVerificationStatus,
    refreshVerification: loadVerificationStatus
  };

  return (
    <VerificationContext.Provider value={value}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};

export default VerificationContext;

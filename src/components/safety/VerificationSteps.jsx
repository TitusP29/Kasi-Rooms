import React, { useState } from 'react';
import { useVerification } from '../../contexts/VerificationContext';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { toast } from '../ui/ToastContainer';

const VerificationStep = ({ step, onAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAction = async () => {
    if (step.completed || isLoading) return;
    
    try {
      setIsLoading(true);
      await onAction(step);
    } catch (error) {
      console.error('Error in verification step:', error);
      toast.error({
        title: 'Verification Error',
        message: error.message || 'Failed to complete verification step'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${
      step.completed 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:bg-gray-50'
    } transition-colors`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
          step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {isLoading ? (
            <ArrowPathIcon className="h-3.5 w-3.5 animate-spin" />
          ) : step.completed ? (
            <CheckCircleIcon className="h-3.5 w-3.5" />
          ) : (
            <span className="text-xs font-medium">{step.id.toUpperCase().charAt(0)}</span>
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-medium ${
            step.completed ? 'text-gray-700' : 'text-gray-900'
          }`}>
            {step.label}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {step.description}
          </p>
          
          {!step.completed && step.action && (
            <div className="mt-2">
              <Button
                size="xs"
                variant="outline"
                onClick={handleAction}
                disabled={isLoading}
                className="text-xs"
              >
                {isLoading ? 'Processing...' : step.actionLabel || 'Verify'}
              </Button>
            </div>
          )}
        </div>
        
        {step.completed && (
          <div className="ml-2 text-green-600">
            <CheckCircleIcon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

const VerificationSteps = ({ onComplete, className = '' }) => {
  const {
    verificationSteps,
    verifyEmail,
    verifyPhone,
    uploadIdForVerification,
    requestBackgroundCheck,
    refreshVerification,
    isLoading
  } = useVerification();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [idType, setIdType] = useState('national_id');
  
  const handleVerifyEmail = async () => {
    // In a real app, you would trigger an email verification flow
    // For demo, we'll just mark it as verified
    await verifyEmail('dummy-code');
    toast.success('Email verified successfully');
    refreshVerification();
  };
  
  const handleSendCode = async () => {
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }
    
    // In a real app, you would send a verification code via SMS
    setShowCodeInput(true);
    toast.success('Verification code sent');
  };
  
  const handleVerifyPhone = async () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }
    
    // In a real app, you would verify the code with your backend
    await verifyPhone(phoneNumber, verificationCode);
    setShowCodeInput(false);
    toast.success('Phone number verified');
    refreshVerification();
  };
  
  const handleUploadId = async () => {
    if (!idFile) {
      toast.error('Please select an ID file');
      return;
    }
    
    await uploadIdForVerification(idFile, idType);
    toast.success('ID submitted for verification');
    refreshVerification();
  };
  
  const handleBackgroundCheck = async () => {
    // In a real app, you would show a consent form
    const consent = window.confirm(
      'By proceeding, you consent to a background check. ' +
      'This may include verification of your identity, criminal record, and other relevant information.'
    );
    
    if (consent) {
      await requestBackgroundCheck(true);
      toast.success('Background check initiated');
      refreshVerification();
    }
  };
  
  const steps = [
    {
      ...verificationSteps.find(s => s.id === 'email'),
      action: handleVerifyEmail,
      actionLabel: 'Send Verification Email'
    },
    {
      ...verificationSteps.find(s => s.id === 'phone'),
      action: handleVerifyPhone,
      actionLabel: 'Verify Phone',
      customContent: (
        <div className="mt-2 space-y-2">
          {!showCodeInput ? (
            <>
              <input
                type="tel"
                placeholder="Enter phone number"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button
                size="xs"
                variant="outline"
                onClick={handleSendCode}
                className="text-xs"
              >
                Send Code
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter verification code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={handleVerifyPhone}
                  className="text-xs"
                >
                  Verify Code
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setShowCodeInput(false)}
                  className="text-xs"
                >
                  Change Number
                </Button>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      ...verificationSteps.find(s => s.id === 'id'),
      action: handleUploadId,
      actionLabel: 'Upload ID',
      customContent: (
        <div className="mt-2 space-y-2">
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
          >
            <option value="national_id">National ID</option>
            <option value="passport">Passport</option>
            <option value="drivers_license">Driver's License</option>
          </select>
          <input
            type="file"
            accept="image/*,.pdf"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setIdFile(e.target.files[0])}
          />
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: JPG, PNG, PDF (max 5MB)
          </p>
        </div>
      )
    },
    ...(verificationSteps.find(s => s.id === 'background' && s.required) ? [{
      ...verificationSteps.find(s => s.id === 'background'),
      action: handleBackgroundCheck,
      actionLabel: 'Start Background Check'
    }] : [])
  ];

  if (isLoading && verificationSteps.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-900">Verify Your Identity</h2>
        <p className="text-sm text-gray-500 mt-1">
          Complete these steps to verify your identity and increase trust in the community.
        </p>
      </div>
      
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id}>
            <VerificationStep step={step} onAction={step.action} />
            {step.customContent && (
              <div className="mt-2 pl-9">
                {step.customContent}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {onComplete && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <Button
            onClick={onComplete}
            variant="outline"
            className="w-full"
          >
            Continue to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerificationSteps;

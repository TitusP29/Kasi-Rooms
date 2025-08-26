import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useVerification } from '../../contexts/VerificationContext';
import VerificationSteps from './VerificationSteps';
import VerificationBadge from './VerificationBadge';
import SafetyTips from './SafetyTips';
import EmergencyContacts from './EmergencyContacts';
import { ShieldCheckIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const SafetyVerificationPage = () => {
  const { user } = useAuth();
  const { verificationLevel, verificationSteps } = useVerification();
  const [activeTab, setActiveTab] = useState('verification');
  
  const completedSteps = verificationSteps.filter(step => step.completed).length;
  const totalSteps = verificationSteps.length;
  const verificationProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  
  const getVerificationStatus = () => {
    if (verificationLevel >= 3) {
      return {
        status: 'Fully Verified',
        description: 'You have completed all verification steps. Your profile shows you are a trusted member of our community.',
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    } else if (verificationLevel >= 1) {
      return {
        status: 'Partially Verified',
        description: 'You have completed some verification steps. Complete all steps to become fully verified.',
        icon: ShieldCheckIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      };
    } else {
      return {
        status: 'Not Verified',
        description: 'Complete the verification steps to build trust in our community and unlock all features.',
        icon: XCircleIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    }
  };
  
  const status = getVerificationStatus();
  const StatusIcon = status.icon;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Safety & Verification
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Complete your profile verification and access safety resources
            </p>
          </div>
          <VerificationBadge verificationLevel={verificationLevel} size="lg" />
        </div>
        
        <div className="border-t border-gray-200">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className={`rounded-md ${status.bgColor} p-4 border ${status.borderColor} mb-6`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <StatusIcon className={`h-5 w-5 ${status.color}`} aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${status.color}`}>
                    {status.status}
                  </h3>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>{status.description}</p>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${verificationProgress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 text-right">
                      {completedSteps} of {totalSteps} steps completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('verification')}
                  className={`${activeTab === 'verification' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Verification
                </button>
                <button
                  onClick={() => setActiveTab('safety')}
                  className={`${activeTab === 'safety' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Safety Resources
                </button>
                <button
                  onClick={() => setActiveTab('emergency')}
                  className={`${activeTab === 'emergency' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Emergency Contacts
                </button>
              </nav>
            </div>
            
            <div className="mt-6">
              {activeTab === 'verification' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Complete Your Verification</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Complete these steps to verify your identity and build trust in our community.
                      Your information is secure and will only be used for verification purposes.
                    </p>
                    <VerificationSteps className="max-w-2xl" />
                  </div>
                </div>
              )}
              
              {activeTab === 'safety' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Tips</h3>
                    <SafetyTips variant={user?.role || 'tenant'} className="max-w-4xl" />
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Safety Guidelines</h3>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-3">General Safety</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                          <li>Always communicate through the Kasi-Rooms platform</li>
                          <li>Never share personal financial information outside our secure payment system</li>
                          <li>Meet in public places for the first time</li>
                          <li>Trust your instincts and report any suspicious activity</li>
                        </ul>
                        
                        <h4 className="text-md font-medium text-gray-900 mt-6 mb-3">For Guests</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                          <li>Carefully review property details and house rules</li>
                          <li>Read reviews from previous guests</li>
                          <li>Check the cancellation policy before booking</li>
                          <li>Keep emergency contact information handy</li>
                        </ul>
                        
                        <h4 className="text-md font-medium text-gray-900 mt-6 mb-3">For Hosts</h4>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                          <li>Screen potential guests by checking their profiles and reviews</li>
                          <li>Set clear house rules and expectations</li>
                          <li>Keep your property secure and well-maintained</li>
                          <li>Be responsive to guest inquiries and concerns</li>
                        </ul>
                        
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                          <h4 className="text-md font-medium text-blue-800 mb-2">Need Help?</h4>
                          <p className="text-sm text-blue-700">
                            If you have any safety concerns or need assistance, our support team is available 24/7.
                          </p>
                          <button className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'emergency' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contacts</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Save these important numbers in case of an emergency. You can also add your own contacts.
                  </p>
                  <EmergencyContacts />
                  
                  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          In case of an emergency, always contact local emergency services first. 
                          The information provided here is for reference only and may not be up to date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyVerificationPage;

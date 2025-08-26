import React from 'react';
import { ShieldCheckIcon, ExclamationTriangleIcon, InformationCircleIcon, ChatBubbleLeftRightIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline';

const SafetyTips = ({ variant = 'tenant', className = '' }) => {
  const tips = {
    tenant: [
      {
        icon: ShieldCheckIcon,
        title: 'Verify Your Host',
        description: 'Always check your host\'s verification status and read reviews from other guests before booking.'
      },
      {
        icon: HomeIcon,
        title: 'Inspect the Property',
        description: 'Check the property upon arrival and report any issues or discrepancies immediately.'
      },
      {
        icon: ChatBubbleLeftRightIcon,
        title: 'Use the Platform for Communication',
        description: 'Keep all communication and payments on the Kasi-Rooms platform for your protection.'
      },
      {
        icon: ExclamationTriangleIcon,
        title: 'Trust Your Instincts',
        description: 'If something feels off, trust your instincts and seek alternative accommodations.'
      },
      {
        icon: InformationCircleIcon,
        title: 'Know the Neighborhood',
        description: 'Research the neighborhood and have emergency contact numbers handy.'
      },
      {
        icon: UserIcon,
        title: 'Meet in Public First',
        description: 'For your first meeting with the host, consider meeting in a public place.'
      }
    ],
    landlord: [
      {
        icon: ShieldCheckIcon,
        title: 'Screen Your Guests',
        description: 'Take advantage of our verification system to screen potential guests before accepting bookings.'
      },
      {
        icon: HomeIcon,
        title: 'Document the Property',
        description: 'Take photos of your property before and after each guest to document its condition.'
      },
      {
        icon: ChatBubbleLeftRightIcon,
        title: 'Set Clear House Rules',
        description: 'Clearly communicate your house rules and expectations to guests before they book.'
      },
      {
        icon: ExclamationTriangleIcon,
        title: 'Trust But Verify',
        description: 'Always verify guest identities and be cautious with last-minute bookings.'
      },
      {
        icon: InformationCircleIcon,
        title: 'Know Your Rights',
        description: 'Familiarize yourself with local landlord-tenant laws and regulations.'
      },
      {
        icon: UserIcon,
        title: 'Meet Your Guests',
        description: 'If possible, meet your guests in person or have someone you trust do it for you.'
      }
    ]
  };

  const safetyTips = tips[variant] || tips.tenant;

  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <ShieldCheckIcon className="h-5 w-5 text-blue-500 mr-2" />
          {variant === 'landlord' ? 'Host Safety Tips' : 'Safety Tips for Guests'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safetyTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-gray-900">{tip.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{tip.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">Need Help?</h4>
              <p className="text-xs text-blue-700 mt-1">
                If you feel unsafe or need assistance, contact our 24/7 support team immediately.
              </p>
              <button className="mt-2 text-xs font-medium text-blue-600 hover:text-blue-800">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyTips;

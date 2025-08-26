import React from 'react';

const PropertyInfoSection = ({ propertyName }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Property</label>
        <div className="mt-1">
          <input
            type="text"
            value={propertyName || 'Loading property...'}
            disabled
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100"
          />
        </div>
      </div>
    </div>
  </div>
);

export default PropertyInfoSection;

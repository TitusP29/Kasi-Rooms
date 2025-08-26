import React from 'react';

// Available utilities that can be included in the lease
const availableUtilities = [
  'Water',
  'Electricity',
  'Gas',
  'Internet',
  'Cable TV',
  'Trash Removal',
  'Parking',
  'Laundry'
];

const UtilitiesSection = ({ lease, onChange }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Included Utilities</h3>
    <p className="text-sm text-gray-500 mb-4">
      Select which utilities are included in the rent. Tenants will be responsible for any utilities not included.
    </p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {availableUtilities.map(util => (
        <div key={util} className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id={`util-${util}`}
              name={util}
              type="checkbox"
              checked={lease.utilitiesIncluded.includes(util)}
              onChange={onChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={`util-${util}`} className="font-medium text-gray-700">
              {util}
            </label>
          </div>
        </div>
      ))}
    </div>
    
    {/* Custom Utility Input */}
    <div className="mt-4">
      <label htmlFor="customUtility" className="block text-sm font-medium text-gray-700 mb-1">
        Add Custom Utility
      </label>
      <div className="flex">
        <input
          type="text"
          id="customUtility"
          name="customUtility"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Gym Access, Storage"
        />
        <button
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Note: Custom utilities will be added to the lease agreement as included in the rent.
      </p>
    </div>
  </div>
);

export default UtilitiesSection;

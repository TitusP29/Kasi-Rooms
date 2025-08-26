import React from 'react';

const TenantInfoSection = ({ lease, errors, onChange }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Tenant Information</h3>
    <div className="space-y-4">
      <div>
        <label htmlFor="tenantName" className="block text-sm font-medium text-gray-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="tenantName"
            name="tenantName"
            value={lease.tenantName}
            onChange={onChange}
            className={`mt-1 block w-full border ${
              errors.tenantName ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.tenantName && <p className="mt-1 text-sm text-red-600">{errors.tenantName}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="tenantEmail" className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="tenantEmail"
            name="tenantEmail"
            value={lease.tenantEmail}
            onChange={onChange}
            className={`mt-1 block w-full border ${
              errors.tenantEmail ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.tenantEmail && <p className="mt-1 text-sm text-red-600">{errors.tenantEmail}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="tenantPhone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1">
          <input
            type="tel"
            id="tenantPhone"
            name="tenantPhone"
            value={lease.tenantPhone}
            onChange={onChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  </div>
);

export default TenantInfoSection;

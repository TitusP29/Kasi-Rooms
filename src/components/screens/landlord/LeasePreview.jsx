import React from 'react';
import { format } from 'date-fns';

const LeasePreview = ({ lease, onBack, onSubmit, isSubmitting }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Get the day with ordinal suffix (1st, 2nd, 3rd, etc.)
  const getOrdinalSuffix = (day) => {
    if (!day) return '';
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return `${day}st`;
    if (j === 2 && k !== 12) return `${day}nd`;
    if (j === 3 && k !== 13) return `${day}rd`;
    return `${day}th`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Lease Agreement Preview</h1>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Edit
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save & Send to Tenant'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Header */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900">LEASE AGREEMENT</h2>
          <p className="mt-1 text-sm text-gray-500 text-center">
            This Lease Agreement is made and entered into on {formatDate(new Date())} between the Landlord and the Tenant.
          </p>
        </div>

        {/* Property Information */}
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">1. PROPERTY</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Property Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{lease.propertyName || 'N/A'}</dd>
            </div>
          </dl>
        </div>

        {/* Tenant Information */}
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">2. TENANT</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Tenant Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{lease.tenantName || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{lease.tenantEmail || 'N/A'}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{lease.tenantPhone || 'N/A'}</dd>
            </div>
          </dl>
        </div>

        {/* Lease Terms */}
        <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">3. LEASE TERMS</h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Lease Start Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(lease.startDate)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Lease End Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(lease.endDate)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Monthly Rent</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCurrency(lease.rentAmount)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Security Deposit</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCurrency(lease.securityDeposit)}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Rent Due Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                The {getOrdinalSuffix(parseInt(lease.paymentDueDay))} of each month
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Late Fee</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(parseFloat(lease.lateFee) || 0)} per day after due date
              </dd>
            </div>
          </dl>
        </div>

        {/* Included Utilities */}
        {lease.utilitiesIncluded?.length > 0 && (
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">4. UTILITIES</h3>
            <p className="text-sm text-gray-900 mb-2">The following utilities are included in the rent:</p>
            <ul className="list-disc pl-5 space-y-1">
              {lease.utilitiesIncluded.map((util, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {util}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-700">
              Tenant is responsible for all other utilities not listed above.
            </p>
          </div>
        )}

        {/* Additional Terms */}
        {lease.additionalTerms && (
          <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">5. ADDITIONAL TERMS</h3>
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
              {lease.additionalTerms}
            </div>
          </div>
        )}

        {/* Signatures */}
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">SIGNATURES</h3>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Landlord Signature */}
            <div>
              <div className="border-t-2 border-gray-300 pt-4 mt-8">
                <p className="text-sm font-medium text-gray-700">Landlord Signature</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700">Printed Name</p>
                <p className="text-sm text-gray-900">[Landlord's Name]</p>
              </div>
            </div>

            {/* Tenant Signature */}
            <div>
              <div className="border-t-2 border-gray-300 pt-4 mt-8">
                <p className="text-sm font-medium text-gray-700">Tenant Signature</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700">Printed Name</p>
                <p className="text-sm text-gray-900">{lease.tenantName || '[Tenant Name]'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Edit
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save & Send to Tenant'}
        </button>
      </div>
    </div>
  );
};

export default LeasePreview;

import React from 'react';

const LeaseTermsSection = ({ lease, errors, onChange }) => {
  // Generate options for payment due day (1st to 28th)
  const dueDayOptions = Array.from({ length: 28 }, (_, i) => {
    const day = i + 1;
    let suffix = 'th';
    if (day === 1 || day === 21) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    return { value: day.toString(), label: `${day}${suffix}` };
  });

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Lease Terms</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={lease.startDate}
              onChange={onChange}
              className={`mt-1 block w-full border ${
                errors.startDate ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={lease.endDate}
              onChange={onChange}
              min={lease.startDate}
              className={`mt-1 block w-full border ${
                errors.endDate ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        {/* Rent Amount */}
        <div>
          <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
            Monthly Rent <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="rentAmount"
              name="rentAmount"
              value={lease.rentAmount}
              onChange={onChange}
              min="0"
              step="0.01"
              className={`mt-1 block w-full pl-7 border ${
                errors.rentAmount ? 'border-red-300' : 'border-gray-300'
              } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
          </div>
          {errors.rentAmount && <p className="mt-1 text-sm text-red-600">{errors.rentAmount}</p>}
        </div>

        {/* Security Deposit */}
        <div>
          <label htmlFor="securityDeposit" className="block text-sm font-medium text-gray-700">
            Security Deposit
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="securityDeposit"
              name="securityDeposit"
              value={lease.securityDeposit}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Payment Due Day */}
        <div>
          <label htmlFor="paymentDueDay" className="block text-sm font-medium text-gray-700">
            Rent Due Day of Month
          </label>
          <div className="mt-1">
            <select
              id="paymentDueDay"
              name="paymentDueDay"
              value={lease.paymentDueDay}
              onChange={onChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {dueDayOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Late Fee */}
        <div>
          <label htmlFor="lateFee" className="block text-sm font-medium text-gray-700">
            Late Fee (per day)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="lateFee"
              name="lateFee"
              value={lease.lateFee}
              onChange={onChange}
              min="0"
              step="0.01"
              className="mt-1 block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseTermsSection;

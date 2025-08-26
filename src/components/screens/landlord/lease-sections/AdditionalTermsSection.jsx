import React from 'react';

const AdditionalTermsSection = ({ additionalTerms, onChange }) => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Terms & Conditions</h3>
    <p className="text-sm text-gray-500 mb-4">
      Add any additional terms, rules, or conditions that apply to this lease agreement.
      These will be included in the final document.
    </p>
    
    <div>
      <label htmlFor="additionalTerms" className="sr-only">
        Additional Terms
      </label>
      <div className="mt-1">
        <textarea
          id="additionalTerms"
          name="additionalTerms"
          rows={6}
          value={additionalTerms}
          onChange={onChange}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full border border-gray-300 rounded-md sm:text-sm p-3"
          placeholder="Example: \n- No smoking inside the property\n- No pets allowed without prior written approval\n- Tenant is responsible for yard maintenance\n- Quiet hours from 10 PM to 7 AM"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Use bullet points or numbered lists for better readability.
      </p>
    </div>
    
    {/* Common Terms Suggestion */}
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Common Terms (click to add):</p>
      <div className="flex flex-wrap gap-2">
        {[
          'No smoking inside the property',
          'No pets allowed',
          'Renters insurance required',
          'No subletting without permission',
          'Tenant responsible for utilities',
          'Landlord entry with 24-hour notice'
        ].map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => {
              const newValue = additionalTerms 
                ? `${additionalTerms}\n- ${term}`
                : `- ${term}`;
              
              const event = {
                target: {
                  name: 'additionalTerms',
                  value: newValue
                }
              };
              
              onChange(event);
            }}
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default AdditionalTermsSection;

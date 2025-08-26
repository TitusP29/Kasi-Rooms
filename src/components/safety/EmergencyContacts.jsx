import React, { useState } from 'react';
import { PhoneIcon, MapPinIcon, ShieldCheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const EmergencyContacts = ({ location = 'South Africa' }) => {
  // Default emergency contacts for South Africa
  const defaultContacts = {
    'South Africa': [
      { name: 'Emergency Services', number: '10111', description: 'South African Police Service (SAPS)' },
      { name: 'Ambulance', number: '10177', description: 'Emergency Medical Services' },
      { name: 'Fire Department', number: '10177', description: 'Fire and Rescue Services' },
      { name: 'Crime Stop', number: '08600 10111', description: 'Anonymous crime reporting' },
      { name: 'Gender-Based Violence', number: '0800 150 150', description: '24-hour GBV helpline' },
      { name: 'Suicide Crisis Line', number: '0800 567 567', description: '24-hour mental health support' },
      { name: 'Childline', number: '0800 055 555', description: 'Child protection and support' },
      { name: 'AIDS Helpline', number: '0800 012 322', description: 'HIV/AIDS support and information' },
    ],
    'United States': [
      { name: 'Emergency Services', number: '911', description: 'Police, Fire, Ambulance' },
      { name: 'Suicide Prevention', number: '988', description: 'Suicide & Crisis Lifeline' },
      { name: 'Poison Control', number: '1-800-222-1222', description: 'Poison help' },
      { name: 'Domestic Violence', number: '1-800-799-7233', description: 'National Domestic Violence Hotline' },
    ],
    'United Kingdom': [
      { name: 'Emergency Services', number: '999', description: 'Police, Fire, Ambulance' },
      { name: 'Non-emergency', number: '101', description: 'Police non-emergency' },
      { name: 'NHS 111', number: '111', description: 'Medical non-emergency' },
    ],
  };

  const [selectedLocation, setSelectedLocation] = useState(location);
  const [customContact, setCustomContact] = useState({ name: '', number: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [contacts, setContacts] = useState(defaultContacts[location] || defaultContacts['South Africa']);
  const [savedLocations, setSavedLocations] = useState(
    Object.keys(defaultContacts).filter(loc => loc !== 'South Africa')
  );

  const handleAddContact = (e) => {
    e.preventDefault();
    if (customContact.name && customContact.number) {
      const newContact = {
        name: customContact.name,
        number: customContact.number,
        description: customContact.description || 'Custom contact'
      };
      
      setContacts([...contacts, newContact]);
      setCustomContact({ name: '', number: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleSaveLocation = () => {
    if (!savedLocations.includes(selectedLocation)) {
      setSavedLocations([...savedLocations, selectedLocation]);
      defaultContacts[selectedLocation] = [...contacts];
    }
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    setContacts(defaultContacts[newLocation] || []);
  };

  const handleCall = (number) => {
    // In a real app, this would initiate a phone call
    console.log(`Calling ${number}`);
    window.open(`tel:${number}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            Emergency Contacts
          </h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedLocation}
              onChange={handleLocationChange}
              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="South Africa">South Africa</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              {savedLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <button
              onClick={handleSaveLocation}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Location
            </button>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{contact.name}</h4>
                  <p className="text-xs text-gray-500">{contact.description}</p>
                </div>
                <div className="flex items-center">
                  <a 
                    href={`tel:${contact.number}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCall(contact.number);
                    }}
                  >
                    <PhoneIcon className="h-3.5 w-3.5 mr-1" />
                    {contact.number}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <ShieldCheckIcon className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No emergency contacts found for this location.</p>
            </div>
          )}
        </div>

        {showAddForm ? (
          <form onSubmit={handleAddContact} className="space-y-3">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">
                Contact Name
              </label>
              <input
                type="text"
                id="contact-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={customContact.name}
                onChange={(e) => setCustomContact({...customContact, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="contact-number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={customContact.number}
                onChange={(e) => setCustomContact({...customContact, number: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="contact-desc" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <input
                type="text"
                id="contact-desc"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                value={customContact.description}
                onChange={(e) => setCustomContact({...customContact, description: e.target.value})}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Contact
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span>+</span>
            <span className="ml-1">Add Custom Contact</span>
          </button>
        )}
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4 text-gray-500 mr-1" />
          <span>Current location: {selectedLocation}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Emergency services may vary by location. Always verify local emergency numbers when traveling.
        </p>
      </div>
    </div>
  );
};

export default EmergencyContacts;

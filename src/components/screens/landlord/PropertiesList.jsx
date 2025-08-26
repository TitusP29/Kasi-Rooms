import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PropertiesList = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Sunny Apartment',
      address: '123 Main St, City',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rooms: 3
    },
    // Add more sample properties as needed
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
        <Link
          to="/landlord/properties/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={property.image}
                alt={property.name}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{property.address}</p>
              <div className="mt-2 flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  property.status === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {property.status}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  {property.rooms} {property.rooms === 1 ? 'room' : 'rooms'}
                </span>
              </div>
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/landlord/properties/${property.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View Details
                </Link>
                <button className="text-sm font-medium text-red-600 hover:text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesList;

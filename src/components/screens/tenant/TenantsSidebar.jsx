import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

const TenantSidebar = ({ setSelectedLandlord }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      id: 'dashboard',
      label: 'Dashboard',
      path: '/tenant',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    { 
      id: 'safety',
      label: 'Safety & Verification',
      path: '/safety',
      icon: <ShieldCheckIcon className="w-5 h-5" />
    },
    // Add more menu items as needed
  ];

  const landlords = [
    { id: 1, name: "Mr. Dlamini" },
    { id: 2, name: "Mrs. Khumalo" }
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Tenant Menu</h2>
      </div>
      
      {/* Main Menu */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Landlords Section */}
      <div className="p-4 border-t">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
          My Landlords
        </h3>
        <ul className="space-y-1">
          {landlords.map((landlord) => (
            <li key={landlord.id}>
              <button
                onClick={() => setSelectedLandlord(landlord.id)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {landlord.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TenantSidebar;

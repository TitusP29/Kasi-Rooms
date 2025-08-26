import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropertyInfoSection from './lease-sections/PropertyInfoSection';
import TenantInfoSection from './lease-sections/TenantInfoSection';
import LeaseTermsSection from './lease-sections/LeaseTermsSection';
import UtilitiesSection from './lease-sections/UtilitiesSection';
import AdditionalTermsSection from './lease-sections/AdditionalTermsSection';
import LeasePreview from './LeasePreview';

const LeaseAgreementBuilder = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  
  // Default lease agreement template
  const defaultLease = {
    id: uuidv4(),
    propertyId: propertyId || '',
    propertyName: 'Sample Property',
    tenantName: '',
    tenantEmail: '',
    tenantPhone: '',
    startDate: '',
    endDate: '',
    rentAmount: '',
    securityDeposit: '',
    paymentDueDay: '1',
    lateFee: '50',
    utilitiesIncluded: [],
    additionalTerms: '',
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const [lease, setLease] = useState({ ...defaultLease });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  // Load lease data if editing
  useEffect(() => {
    if (propertyId) {
      // In a real app, fetch property details here
      setLease(prev => ({
        ...prev,
        propertyId,
        propertyName: 'Sample Property' // Replace with actual property name from API
      }));
    }
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setLease(prev => ({
        ...prev,
        utilitiesIncluded: checked
          ? [...prev.utilitiesIncluded, name]
          : prev.utilitiesIncluded.filter(util => util !== name)
      }));
    } else {
      setLease(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!lease.tenantName.trim()) newErrors.tenantName = 'Tenant name is required';
    if (!lease.tenantEmail) newErrors.tenantEmail = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(lease.tenantEmail)) newErrors.tenantEmail = 'Email is invalid';
    if (!lease.startDate) newErrors.startDate = 'Start date is required';
    if (!lease.endDate) newErrors.endDate = 'End date is required';
    if (!lease.rentAmount) newErrors.rentAmount = 'Rent amount is required';
    if (lease.startDate && lease.endDate && new Date(lease.startDate) >= new Date(lease.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, save the lease to your backend here
    console.log('Saving lease:', lease);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/landlord/properties');
    }, 1000);
  };

  const handlePreview = () => {
    if (validateForm()) {
      setPreviewMode(true);
    }
  };

  if (previewMode) {
    return <LeasePreview lease={lease} onBack={() => setPreviewMode(false)} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Lease Agreement</h1>
        <p className="mt-1 text-sm text-gray-500">Fill out the form below to create a new lease agreement.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PropertyInfoSection propertyName={lease.propertyName} />
        
        <TenantInfoSection 
          lease={lease} 
          errors={errors} 
          onChange={handleChange} 
        />
        
        <LeaseTermsSection 
          lease={lease} 
          errors={errors} 
          onChange={handleChange} 
        />
        
        <UtilitiesSection 
          lease={lease} 
          onChange={handleChange} 
        />
        
        <AdditionalTermsSection 
          additionalTerms={lease.additionalTerms} 
          onChange={handleChange} 
        />
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Preview
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Lease Agreement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaseAgreementBuilder;

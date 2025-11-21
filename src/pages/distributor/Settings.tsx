import React, { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { useReduxUser } from '../../hooks/useReduxUser';
import Session from '../../utils/Session';
import { toast } from 'sonner';
import { Save, X, Edit, CheckCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useReduxUser();
  const { updateDistributorProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    businessEmail: user?.businessEmail || '',
    businessPhone: user?.businessPhone || '',
    website: user?.website || '',
    address: user?.address || {
      street: '',
      zipcode: '',
      city: '',
      state: '',
      country: '',
    },
  });

  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    // Get business data from session storage
    const businessData = Session.get('business');
    
    if (businessData) {
      // Populate from business model (primary source)
      const userData = {
        businessName: businessData.businessName || '',
        businessEmail: businessData.email || '',
        businessPhone: businessData.phone || '',
        website: businessData.website || '',
        address: businessData.address || {
          street: '',
          zipcode: '',
          city: '',
          state: '',
          country: '',
        },
      };
      setFormData(userData);
      setOriginalData(userData);
    } else if (user) {
      // Fallback to user model if business data not available
      const userData = {
        businessName: user.businessName || '',
        businessEmail: user.businessEmail || '',
        businessPhone: user.businessPhone || '',
        website: user.website || '',
        address: user.address || {
          street: '',
          zipcode: '',
          city: '',
          state: '',
          country: '',
        },
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateDistributorProfile.mutateAsync(formData);
      toast.success('Business profile updated successfully');
      setIsEditing(false);
      setOriginalData(formData);
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to update business profile';
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-slate-900 mb-6">
        Distributor Settings
      </h1>

      {/* Status Banner */}
      {!isEditing && (
        <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <p className="text-sm text-emerald-900">Your settings are up to date.</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Settings
          </button>
        </div>
      )}

      {/* Business Information Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Business Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter business name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="businessPhone" className="block text-sm font-medium text-slate-700">
              Business Phone
            </label>
            <input
              type="tel"
              id="businessPhone"
              value={formData.businessPhone}
              onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="businessEmail" className="block text-sm font-medium text-slate-700">
              Business Email
            </label>
            <input
              type="email"
              id="businessEmail"
              value={formData.businessEmail}
              onChange={(e) => handleInputChange('businessEmail', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="business@example.com"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="website" className="block text-sm font-medium text-slate-700">
              Website
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Address Information Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Address Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="street" className="block text-sm font-medium text-slate-700">
              Street Address
            </label>
            <input
              type="text"
              id="street"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="123 Business St"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus: ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-medium text-slate-700">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              value={formData.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter state"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="zipcode" className="block text-sm font-medium text-slate-700">
              ZIP/Postal Code
            </label>
            <input
              type="text"
              id="zipcode"
              value={formData.address.zipcode}
              onChange={(e) => handleAddressChange('zipcode', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter ZIP code"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-medium text-slate-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={formData.address.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:bg-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter country"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={updateDistributorProfile.isPending}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            {updateDistributorProfile.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;

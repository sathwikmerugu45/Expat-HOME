import React, { useState } from 'react';
import { Calendar, User, Mail, Phone, Globe } from 'lucide-react';
import { BookingRequest, Property } from '../types';

interface BookingFormProps {
  property: Property;
  onSubmit: (booking: Omit<BookingRequest, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ property, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    moveInDate: '',
    duration: 1,
    durationType: 'months' as 'days' | 'weeks' | 'months',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Netherlands', 'Singapore', 'Japan', 'South Korea',
    'India', 'China', 'Brazil', 'Mexico', 'Spain', 'Italy',
    'Sweden', 'Norway', 'Denmark', 'Finland', 'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.moveInDate) newErrors.moveInDate = 'Move-in date is required';

    const moveInDate = new Date(formData.moveInDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (moveInDate < today) {
      newErrors.moveInDate = 'Move-in date must be in the future';
    }

    const durationInMonths = formData.durationType === 'months' ? formData.duration :
                            formData.durationType === 'weeks' ? formData.duration / 4.33 :
                            formData.duration / 30.44;
    
    if (durationInMonths < property.minStay) {
      newErrors.duration = `Minimum stay is ${property.minStay} month${property.minStay > 1 ? 's' : ''}`;
    }
    
    if (durationInMonths > property.maxStay) {
      newErrors.duration = `Maximum stay is ${property.maxStay} month${property.maxStay > 1 ? 's' : ''}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const bookingRequest: Omit<BookingRequest, 'id' | 'createdAt'> = {
        propertyId: property.id,
        guestInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          nationality: formData.nationality
        },
        stayDetails: {
          moveInDate: formData.moveInDate,
          duration: formData.duration,
          durationType: formData.durationType
        },
        message: formData.message
      };
      onSubmit(bookingRequest);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Request Booking
              </h2>
              <p className="text-slate-600">{property.title}</p>
              <p className="text-sm text-slate-500">{property.location.district}, {property.location.city}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-2xl p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg mr-2">
                  <User className="h-4 w-4 text-white" />
                </div>
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    <Globe className="inline h-4 w-4 mr-1 text-orange-500" />
                    Nationality *
                  </label>
                  <select
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.nationality ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                  >
                    <option value="">Select your nationality</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    <Mail className="inline h-4 w-4 mr-1 text-orange-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.email ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    <Phone className="inline h-4 w-4 mr-1 text-orange-500" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg mr-2">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
                Stay Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Move-in Date *
                  </label>
                  <input
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.moveInDate ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                  />
                  {errors.moveInDate && <p className="text-red-500 text-xs mt-1">{errors.moveInDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                    className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                      errors.duration ? 'border-red-400 bg-red-50' : 'border-orange-200 bg-white/70'
                    }`}
                  />
                  {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Period
                  </label>
                  <select
                    value={formData.durationType}
                    onChange={(e) => handleInputChange('durationType', e.target.value)}
                    className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/70"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-teal-50 rounded-xl">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Minimum stay:</span> {property.minStay} month{property.minStay > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Maximum stay:</span> {property.maxStay} month{property.maxStay > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Additional Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full border border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/70"
                placeholder="Tell the host about yourself, your reason for moving, or any special requirements..."
              />
            </div>

            {/* Pricing Info */}
            <div className="bg-gradient-to-r from-slate-50 to-orange-50 rounded-xl p-4 border border-orange-200">
              <h4 className="font-semibold text-slate-900 mb-2">Pricing Information</h4>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly Rate:</span>
                <span className="font-bold text-xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ${property.price} USD
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Final pricing and availability will be confirmed by the host
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-orange-200 rounded-xl text-slate-700 hover:bg-orange-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Send Booking Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
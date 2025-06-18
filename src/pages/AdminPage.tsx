import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Property } from '../types';
import { API_BASE_URL } from "../api";

const AdminPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    currency: 'USD',
    city: '',
    district: '',
    address: '',
    type: 'Studio',
    bedrooms: 0,
    bathrooms: 1,
    area: 0,
    amenities: [] as string[],
    images: [''],
    hostName: '',
    hostRating: 4.5,
    hostReviews: 0,
    hostLanguages: ['English'],
    hostResponseTime: 'within 1 hour',
    hostAvatar: '',
    minStay: 1,
    maxStay: 12
  });

  const amenityOptions = [
    'WiFi', 'Air Conditioning', 'Kitchen', 'Washing Machine', 'Balcony',
    'Security', 'Elevator', 'Pool', 'Gym', 'Parking', 'Workspace',
    'City View', 'Ocean View', 'Garden', 'Private Pool', 'Beach Access',
    'Concierge'
  ];

  const propertyTypes = ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', 'Villa'];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`);
    const data = await response.json();
    setProperties(data);
  } catch (error) {
    console.error('Error fetching properties:', error);
  }
};

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      currency: 'USD',
      city: '',
      district: '',
      address: '',
      type: 'Studio',
      bedrooms: 0,
      bathrooms: 1,
      area: 0,
      amenities: [],
      images: [''],
      hostName: '',
      hostRating: 4.5,
      hostReviews: 0,
      hostLanguages: ['English'],
      hostResponseTime: 'within 1 hour',
      hostAvatar: '',
      minStay: 1,
      maxStay: 12
    });
    setEditingProperty(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (property: Property) => {
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      currency: property.currency,
      city: property.location.city,
      district: property.location.district,
      address: property.location.address,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      amenities: property.amenities,
      images: property.images,
      hostName: property.host.name,
      hostRating: property.host.rating,
      hostReviews: property.host.reviews,
      hostLanguages: property.host.languages,
      hostResponseTime: property.host.responseTime,
      hostAvatar: property.host.avatar,
      minStay: property.minStay,
      maxStay: property.maxStay
    });
    setEditingProperty(property);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData: Omit<Property, 'id'> = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      currency: formData.currency,
      location: {
        city: formData.city,
        district: formData.district,
        address: formData.address
      },
      type: formData.type,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      area: formData.area,
      amenities: formData.amenities,
      images: formData.images.filter(img => img.trim() !== ''),
      host: {
        name: formData.hostName,
        rating: formData.hostRating,
        reviews: formData.hostReviews,
        languages: formData.hostLanguages,
        responseTime: formData.hostResponseTime,
        avatar: formData.hostAvatar
      },
      available: true,
      minStay: formData.minStay,
      maxStay: formData.maxStay
    };

    try {
      let response;
      if (isEditing && editingProperty) {
        response = await fetch(
          `${API_BASE_URL}/properties/${editingProperty.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...propertyData, id: editingProperty.id }),
          }
        );
      } else {
        response = await fetch(`${API_BASE_URL}/properties`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyData),
        });
      }
      
      if (response.ok) {
        fetchProperties();
        resetForm();
        alert(isEditing ? 'Property updated successfully!' : 'Property added successfully!');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchProperties();
          alert('Property deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property. Please try again.');
      }
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Property Management
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-teal-600 hover:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Property List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map(property => (
            <div key={property.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-orange-200 dark:border-slate-600 overflow-hidden hover:shadow-lg transition-all duration-200">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">{property.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-2 flex items-center">
                  <span className="w-2 h-2 bg-orange-400 dark:bg-orange-500 rounded-full mr-2"></span>
                  {property.location.city}
                </p>
                <p className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
                  ${property.price}/month
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(property)}
                    className="flex-1 bg-gradient-to-r from-slate-100 to-orange-100 dark:from-slate-700 dark:to-orange-900/30 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl hover:from-slate-200 hover:to-orange-200 dark:hover:from-slate-600 dark:hover:to-orange-900/50 transition-all duration-200 flex items-center justify-center space-x-1 font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="flex-1 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-400 px-3 py-2 rounded-xl hover:from-red-200 hover:to-red-300 dark:hover:from-red-900/50 dark:hover:to-red-800/50 transition-all duration-200 flex items-center justify-center space-x-1 font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                    {isEditing ? 'Edit Property' : 'Add New Property'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Property Title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100"
                      >
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Price (USD/month)"
                        value={formData.price || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Area (m²)"
                        value={formData.area || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, area: parseInt(e.target.value) || 0 }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                    </div>
                    <textarea
                      placeholder="Property Description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full mt-4 border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="District"
                        value={formData.district}
                        onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Property Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bedrooms</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.bedrooms}
                          onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) || 0 }))}
                          className="w-full border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bathrooms</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.bathrooms}
                          onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: parseInt(e.target.value) || 1 }))}
                          className="w-full border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Min Stay (months)</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.minStay}
                          onChange={(e) => setFormData(prev => ({ ...prev, minStay: parseInt(e.target.value) || 1 }))}
                          className="w-full border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Max Stay (months)</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.maxStay}
                          onChange={(e) => setFormData(prev => ({ ...prev, maxStay: parseInt(e.target.value) || 12 }))}
                          className="w-full border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Images</h3>
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex space-x-2 mb-2">
                        <input
                          type="url"
                          placeholder="Image URL"
                          value={image}
                          onChange={(e) => updateImage(index, e.target.value)}
                          className="flex-1 border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImageField}
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-medium"
                    >
                      + Add another image
                    </button>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {amenityOptions.map(amenity => (
                        <label key={amenity} className="flex items-center space-x-2 p-3 bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl border border-orange-100 dark:border-slate-600 hover:from-orange-100 hover:to-teal-100 dark:hover:from-orange-900/30 dark:hover:to-teal-900/30 transition-all duration-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="rounded border-orange-300 dark:border-slate-500 text-teal-600 dark:text-teal-400 focus:ring-teal-500 dark:focus:ring-teal-400 bg-white dark:bg-slate-700"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Host Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Host Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Host Name"
                        value={formData.hostName}
                        onChange={(e) => setFormData(prev => ({ ...prev, hostName: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                        required
                      />
                      <input
                        type="url"
                        placeholder="Host Avatar URL (optional)"
                        value={formData.hostAvatar}
                        onChange={(e) => setFormData(prev => ({ ...prev, hostAvatar: e.target.value }))}
                        className="border border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent bg-white/70 dark:bg-slate-700/70 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 px-6 py-3 border border-orange-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
                    >
                      <Save className="h-5 w-5" />
                      <span>{isEditing ? 'Update Property' : 'Add Property'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
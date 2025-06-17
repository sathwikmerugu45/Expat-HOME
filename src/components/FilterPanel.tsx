import React, { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Home, Calendar } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, onSearch }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    priceRange: [0, 2000],
    propertyType: '',
    minDuration: 1,
    amenities: []
  });

  const cities = [
    'Ho Chi Minh City',
    'Bangkok',
    'Kuala Lumpur',
    'Da Nang',
    'Singapore',
    'Manila'
  ];

  const propertyTypes = [
    'Studio',
    '1 Bedroom',
    '2 Bedroom',
    '3 Bedroom',
    'Villa'
  ];

  const popularAmenities = [
    'WiFi',
    'Air Conditioning',
    'Kitchen',
    'Pool',
    'Gym',
    'Security',
    'Parking',
    'Workspace'
  ];

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      city: '',
      priceRange: [0, 2000],
      propertyType: '',
      minDuration: 1,
      amenities: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by location, property name, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/70 backdrop-blur-sm text-slate-700 placeholder-slate-500"
            />
          </div>
        </form>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-3 border border-orange-200 rounded-xl hover:bg-orange-50 transition-all duration-200 bg-white/70 backdrop-blur-sm"
          >
            <Filter className="h-4 w-4 text-teal-600" />
            <span className="text-slate-700 font-medium">Filters</span>
          </button>
          
          <button
            onClick={clearFilters}
            className="text-sm text-teal-600 hover:text-teal-700 transition-colors font-medium"
          >
            Clear all filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-orange-50 to-teal-50 rounded-2xl border border-orange-200">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1 text-orange-500" />
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange({ city: e.target.value })}
                className="w-full border border-orange-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Home className="inline h-4 w-4 mr-1 text-orange-500" />
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => handleFilterChange({ propertyType: e.target.value })}
                className="w-full border border-orange-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1 text-orange-500" />
                Max Price (USD/month)
              </label>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                })}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$0</span>
                <span className="font-medium text-teal-600">${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Minimum Stay */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1 text-orange-500" />
                Min Stay (months)
              </label>
              <select
                value={filters.minDuration}
                onChange={(e) => handleFilterChange({ minDuration: parseInt(e.target.value) })}
                className="w-full border border-orange-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white/80"
              >
                <option value={1}>1 month</option>
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
              </select>
            </div>

            {/* Amenities */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Popular Amenities
              </label>
              <div className="flex flex-wrap gap-2">
                {popularAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => {
                      const newAmenities = filters.amenities.includes(amenity)
                        ? filters.amenities.filter(a => a !== amenity)
                        : [...filters.amenities, amenity];
                      handleFilterChange({ amenities: newAmenities });
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      filters.amenities.includes(amenity)
                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md'
                        : 'bg-white/80 border border-orange-200 text-slate-700 hover:bg-orange-50'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
import React, { useState, useEffect, useRef } from 'react';
// import X from 'lucide-react/dist/esm/icons/x';
import { 
  Search, 
  Filter as FilterIcon, 
  MapPin, 
  DollarSign, 
  Home, 
  Calendar, 
  X, 
  Sparkles,
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSearch: (query: string) => void;
  variant?: 'panel' | 'sidebar' | 'modal';
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onSearch, variant = 'panel' }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    priceRange: [0, 2000],
    propertyType: '',
    minDuration: 1,
    amenities: [],
    bedrooms: [],
    furnishing: [],
    availability: [],
    hideAlreadySeen: false
  });

  const [expandedSections, setExpandedSections] = useState({
    hideAlreadySeen: true,
    budget: true,
    bedrooms: true,
    propertyType: true,
    amenities: false,
    furnishing: false,
    availability: false
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
    'Flat/Apartment',
    'House/Villa',
    'Serviced Apartment',
    'Plot/Land',
    'Builder Floor',
    '1 RK/Studio Apartment'
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

  const bedroomOptions = [
    { label: '1 RK/1 BHK', value: 1 },
    { label: '2 BHK', value: 2 },
    { label: '3 BHK', value: 3 },
    { label: '4 BHK', value: 4 },
    { label: '5 BHK', value: 5 }
  ];

  const furnishingOptions = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
  const availabilityOptions = ['Immediate', 'Within 15 Days', 'Within 30 Days', 'After 30 Days'];
  const isFirstRender = useRef(true);

  // Count active filters - optimized version
  useEffect(() => {
    const count = [
      Boolean(filters.city),
      filters.priceRange[1] < 2000,
      Boolean(filters.propertyType),
      filters.minDuration > 1,
      filters.amenities.length > 0,
      filters.bedrooms.length > 0,
      filters.furnishing.length > 0,
      filters.availability.length > 0,
      filters.hideAlreadySeen
    ].filter(Boolean).length;

    setActiveFiltersCount(count);
  }, [filters]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Reset isFirstRender when unmounting
  useEffect(() => {
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      city: '',
      priceRange: [0, 2000],
      propertyType: '',
      minDuration: 1,
      amenities: [],
      bedrooms: [],
      furnishing: [],
      availability: [],
      hideAlreadySeen: false
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    onSearch('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBedroomToggle = (value: number) => {
    const newBedrooms = filters.bedrooms.includes(value)
      ? filters.bedrooms.filter(b => b !== value)
      : [...filters.bedrooms, value];
    handleFilterChange({ bedrooms: newBedrooms });
  };

  const handleFurnishingToggle = (value: string) => {
    const newFurnishing = filters.furnishing.includes(value)
      ? filters.furnishing.filter(f => f !== value)
      : [...filters.furnishing, value];
    handleFilterChange({ furnishing: newFurnishing });
  };

  const handleAvailabilityToggle = (value: string) => {
    const newAvailability = filters.availability.includes(value)
      ? filters.availability.filter(a => a !== value)
      : [...filters.availability, value];
    handleFilterChange({ availability: newAvailability });
  };

  const FilterSection: React.FC<{
    title: string;
    sectionKey: keyof typeof expandedSections;
    children: React.ReactNode;
  }> = ({ title, sectionKey, children }) => (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-left font-semibold text-slate-900 dark:text-white mb-3 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
      >
        {title}
        {expandedSections[sectionKey] ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {expandedSections[sectionKey] && children}
    </div>
  );

  // Mobile search bar component
  const MobileSearchBar = () => (
    <div className="md:hidden sticky top-0 z-50 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-700">
      {!isMobileSearchExpanded ? (
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileSearchExpanded(true)}
            className="flex-1 flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-3 text-left"
          >
            <Search className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            <span className="text-slate-500 dark:text-slate-400">Search properties...</span>
          </button>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-2 bg-teal-600 text-white p-2 rounded-lg"
            >
              <FilterIcon className="h-5 w-5" />
              <span className="sr-only">Filters</span>
              <span className="absolute -top-1 -right-1 bg-white text-teal-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Search</h3>
            <button onClick={() => setIsMobileSearchExpanded(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search by location, property name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500 dark:text-slate-400" />
          </form>
          
          {/* Simplified filters for mobile */}
          <div className="space-y-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                placeholder="Add location"
                value={filters.city}
                onChange={(e) => handleFilterChange({ city: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
              />
            </div>
            
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium mb-1">Budget in ₹</label>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="number"
                  placeholder="No Min"
                  value={filters.priceRange[0] || ''}
                  onChange={(e) => handleFilterChange({ 
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                  })}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="No Max"
                  value={filters.priceRange[1] || ''}
                  onChange={(e) => handleFilterChange({ 
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 2000] 
                  })}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                />
              </div>
            </div>
            
            {/* Property Types */}
            <div>
              <label className="block text-sm font-medium mb-1">Property types</label>
              <div className="grid grid-cols-3 gap-2">
                {propertyTypes.slice(0, 6).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterChange({ propertyType: type })}
                    className={`px-2 py-1 text-xs rounded border ${
                      filters.propertyType === type
                        ? 'border-teal-500 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <button className="mt-2 text-sm text-teal-600 dark:text-teal-400">
                Or, See commercial
              </button>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={clearFilters}
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                Clear All
              </button>
              <button
                type="submit"
                onClick={handleSearch}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'sidebar' || variant === 'modal') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 ${variant === 'sidebar' ? 'sticky top-4' : ''}`}>
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
            >
              Clear all ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* Hide Already Seen */}
        <FilterSection title="Hide already seen" sectionKey="hideAlreadySeen">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hideAlreadySeen}
              onChange={(e) => handleFilterChange({ hideAlreadySeen: e.target.checked })}
              className="rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Hide properties I've already viewed</span>
          </label>
        </FilterSection>

        {/* Budget */}
        <FilterSection title="Budget" sectionKey="budget">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="bg-slate-900 dark:bg-slate-700 text-white px-2 py-1 rounded">
                ${filters.priceRange[0]}
              </span>
              <span className="text-slate-600 dark:text-slate-400">to</span>
              <span className="bg-slate-900 dark:bg-slate-700 text-white px-2 py-1 rounded">
                ${filters.priceRange[1]}
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange({ 
                priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
              })}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0] || ''}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]] 
                })}
                className="text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1] || ''}
                onChange={(e) => handleFilterChange({ 
                  priceRange: [filters.priceRange[0], parseInt(e.target.value) || 2000] 
                })}
                className="text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </FilterSection>

        {/* Number of Bedrooms */}
        <FilterSection title="No. of Bedrooms" sectionKey="bedrooms">
          <div className="grid grid-cols-2 gap-2">
            {bedroomOptions.map((bedroom) => (
              <button
                key={bedroom.value}
                onClick={() => handleBedroomToggle(bedroom.value)}
                className={`text-xs border rounded px-2 py-1 transition-colors ${
                  filters.bedrooms.includes(bedroom.value)
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300'
                    : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {bedroom.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* City Filter */}
        <FilterSection title="City" sectionKey="propertyType">
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange({ city: e.target.value })}
            className="w-full text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </FilterSection>

        {/* Type of Property */}
        <FilterSection title="Type of property" sectionKey="propertyType">
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={filters.propertyType === type}
                  onChange={(e) => handleFilterChange({ propertyType: e.target.value })}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{type}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities" sectionKey="amenities">
          <div className="space-y-2">
            {popularAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...filters.amenities, amenity]
                      : filters.amenities.filter(a => a !== amenity);
                    handleFilterChange({ amenities: newAmenities });
                  }}
                  className="rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{amenity}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Furnishing */}
        <FilterSection title="Furnishing" sectionKey="furnishing">
          <div className="space-y-2">
            {furnishingOptions.map((furnishing) => (
              <label key={furnishing} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.furnishing.includes(furnishing)}
                  onChange={() => handleFurnishingToggle(furnishing)}
                  className="rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{furnishing}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability" sectionKey="availability">
          <div className="space-y-2">
            {availabilityOptions.map((availability) => (
              <label key={availability} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(availability)}
                  onChange={() => handleAvailabilityToggle(availability)}
                  className="rounded border-slate-300 dark:border-slate-600 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">{availability}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Minimum Stay Duration */}
        <FilterSection title="Minimum Stay" sectionKey="availability">
          <select
            value={filters.minDuration}
            onChange={(e) => handleFilterChange({ minDuration: parseInt(e.target.value) })}
            className="w-full text-sm border border-slate-300 dark:border-slate-600 rounded px-2 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          >
            <option value={1}>1 month</option>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </select>
        </FilterSection>
      </div>
    );
  }

  // Panel variant (for top of page)
  return (
    <>
      <MobileSearchBar />
      
      <div className="hidden md:block bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-orange-100 dark:border-slate-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
                <Search className={`h-5 w-5 ${isSearchFocused ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search by location, property name, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 shadow-lg ${
                  isSearchFocused ? 'border-teal-500 dark:border-teal-400 shadow-xl' : 'border-orange-200 dark:border-slate-600'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>

          {/* Filter Toggle with Active Count */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 border-2 rounded-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl ${
                showFilters 
                  ? 'border-teal-500 dark:border-teal-400 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 text-teal-700 dark:text-teal-300' 
                  : 'border-orange-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-teal-50 dark:hover:from-orange-900/30 dark:hover:to-teal-900/30'
              }`}
            >
              <FilterIcon className={`h-4 w-4 ${showFilters ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400'}`} />
              <span className="font-semibold">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-1 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors font-semibold bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
              >
                <X className="h-4 w-4" />
                <span>Clear all filters</span>
              </button>
            )}
          </div>

          {/* Enhanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-br from-orange-50 via-white to-teal-50 dark:from-orange-900/20 dark:via-slate-800 dark:to-teal-900/20 rounded-2xl border-2 border-orange-200 dark:border-slate-600 shadow-xl animate-in slide-in-from-top-4 duration-500">
              {/* City Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-lg">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <span>City</span>
                  </div>
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange({ city: e.target.value })}
                  className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 rounded-lg">
                      <Home className="h-4 w-4 text-white" />
                    </div>
                    <span>Property Type</span>
                  </div>
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange({ propertyType: e.target.value })}
                  className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 rounded-lg">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <span>Max Price (USD/month)</span>
                  </div>
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange({ 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                    })}
                    className="w-full h-2 bg-gradient-to-r from-orange-200 to-teal-200 dark:from-orange-800 dark:to-teal-800 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">$0</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-lg">
                      ${filters.priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Minimum Stay */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-lg">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <span>Min Stay (months)</span>
                  </div>
                </label>
                <select
                  value={filters.minDuration}
                  onChange={(e) => handleFilterChange({ minDuration: parseInt(e.target.value) })}
                  className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
                >
                  <option value={1}>1 month</option>
                  <option value={3}>3 months</option>
                  <option value={6}>6 months</option>
                  <option value={12}>12 months</option>
                </select>
              </div>

              {/* Enhanced Amenities */}
              <div className="lg:col-span-4 space-y-4">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-lg">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <span>Popular Amenities</span>
                  </div>
                </label>
                <div className="flex flex-wrap gap-3">
                  {popularAmenities.map((amenity, index) => (
                    <button
                      key={amenity}
                      onClick={() => {
                        const newAmenities = filters.amenities.includes(amenity)
                          ? filters.amenities.filter(a => a !== amenity)
                          : [...filters.amenities, amenity];
                        handleFilterChange({ amenities: newAmenities });
                      }}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                        filters.amenities.includes(amenity)
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white shadow-lg border-2 border-teal-400 dark:border-teal-500'
                          : 'bg-white/90 dark:bg-slate-800/90 border-2 border-orange-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-teal-50 dark:hover:from-orange-900/30 dark:hover:to-teal-900/30'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
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
    </>
  );
};

export default Filter;
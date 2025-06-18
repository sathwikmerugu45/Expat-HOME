import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import { Property, FilterOptions } from '../types';
import { API_BASE_URL } from '../api';
import { TrendingUp, Users, Shield, Star, MapPin } from 'lucide-react';

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`);
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...properties];

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.city) {
      filtered = filtered.filter(property => property.location.city === filters.city);
    }

    filtered = filtered.filter(property => property.price <= filters.priceRange[1]);

    if (filters.propertyType) {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }

    if (filters.minDuration > 1) {
      filtered = filtered.filter(property => property.minStay <= filters.minDuration);
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity =>
          property.amenities.some(propAmenity =>
            propAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    handleFilterChange({
      city: '',
      priceRange: [0, 2000],
      propertyType: '',
      minDuration: 1,
      amenities: []
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-orange-200 dark:border-orange-800 border-b-orange-500 dark:border-b-orange-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">Discovering amazing properties...</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-teal-500 dark:bg-teal-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-orange-500 dark:from-teal-800 dark:via-emerald-800 dark:to-orange-700 text-white overflow-hidden transition-colors duration-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 dark:bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-400/20 dark:bg-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 dark:from-teal-800/90 via-transparent to-orange-500/90 dark:to-orange-700/90"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="animate-in slide-in-from-top-8 duration-1000">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Find Your Home Away From
                <span className="block bg-gradient-to-r from-orange-300 to-amber-300 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent animate-pulse">
                  Home
                </span>
              </h1>
            </div>
            
            <div className="animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              <p className="text-xl md:text-2xl text-teal-100 dark:text-teal-200 mb-10 max-w-4xl mx-auto leading-relaxed">
                Discover verified, expat-friendly housing in Southeast Asia. 
                From studios to villas, we help international professionals find their perfect stay.
              </p>
            </div>

            {/* Enhanced Feature Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm mb-12">
              {[
                { icon: Shield, text: 'Verified Properties', delay: '0.5s' },
                { icon: Users, text: 'English-Speaking Hosts', delay: '0.7s' },
                { icon: MapPin, text: 'Expat-Friendly Areas', delay: '0.9s' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 bg-white/15 dark:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="p-1 bg-emerald-400/30 dark:bg-emerald-400/20 rounded-full">
                    <feature.icon className="w-4 h-4 text-emerald-200 dark:text-emerald-300" />
                  </div>
                  <span className="font-semibold">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-1000 delay-1000">
              {[
                { icon: TrendingUp, number: '500+', label: 'Properties Listed' },
                { icon: Users, number: '2,000+', label: 'Happy Expats' },
                { icon: Star, number: '4.8', label: 'Average Rating' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-xl mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-teal-100 dark:text-teal-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterPanel onFilterChange={handleFilterChange} onSearch={handleSearch} />

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="animate-in slide-in-from-left-4 duration-700">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-2">
              {filteredProperties.length} Properties Available
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Discover your perfect home in Southeast Asia</p>
          </div>
          {searchQuery && (
            <div className="animate-in slide-in-from-right-4 duration-700">
              <p className="text-slate-600 dark:text-slate-400 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 px-4 py-2 rounded-xl border border-teal-200 dark:border-teal-700">
                Results for "<span className="font-semibold text-teal-600 dark:text-teal-400">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 animate-in fade-in duration-1000">
            <div className="text-slate-400 dark:text-slate-600 mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-slate-100 to-orange-100 dark:from-slate-800 dark:to-orange-900/30 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">No properties found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto text-lg">
              Try adjusting your search criteria or clearing filters to discover more amazing properties.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleFilterChange({
                  city: '',
                  priceRange: [0, 2000],
                  propertyType: '',
                  minDuration: 1,
                  amenities: []
                });
              }}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white rounded-xl hover:from-teal-600 hover:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
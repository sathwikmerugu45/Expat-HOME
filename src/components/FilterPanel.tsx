// import React, { useState, useEffect } from 'react';
// import { Search, Filter, MapPin, DollarSign, Home, Calendar, X, Sparkles } from 'lucide-react';
// import { FilterOptions } from '../types';

// interface FilterPanelProps {
//   onFilterChange: (filters: FilterOptions) => void;
//   onSearch: (query: string) => void;
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, onSearch }) => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [activeFiltersCount, setActiveFiltersCount] = useState(0);
//   const [filters, setFilters] = useState<FilterOptions>({
//     city: '',
//     priceRange: [0, 2000],
//     propertyType: '',
//     minDuration: 1,
//     amenities: [],
//     bedrooms: [],
//     furnishing: '',
//     availability: '',
//     hideAlreadySeen: false
//   });

//   const cities = [
//     'Ho Chi Minh City',
//     'Bangkok',
//     'Kuala Lumpur',
//     'Da Nang',
//     'Singapore',
//     'Manila'
//   ];

//   const propertyTypes = [
//     'Studio',
//     '1 Bedroom',
//     '2 Bedroom',
//     '3 Bedroom',
//     'Villa'
//   ];

//   const popularAmenities = [
//     'WiFi',
//     'Air Conditioning',
//     'Kitchen',
//     'Pool',
//     'Gym',
//     'Security',
//     'Parking',
//     'Workspace'
//   ];

//   // Count active filters
//   useEffect(() => {
//     let count = 0;
//     if (filters.city) count++;
//     if (filters.priceRange[1] < 2000) count++;
//     if (filters.propertyType) count++;
//     if (filters.minDuration > 1) count++;
//     if (filters.amenities.length > 0) count++;
//     setActiveFiltersCount(count);
//   }, [filters]);

//   const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
//     const updatedFilters = { ...filters, ...newFilters };
//     setFilters(updatedFilters);
//     onFilterChange(updatedFilters);
//   };

//   const handleSearch = (e: React.FormEvent) => {
//   const clearFilters = () => {
//     const clearedFilters: FilterOptions = {
//       city: '',
//       priceRange: [0, 2000],
//       propertyType: '',
//       minDuration: 1,
//       amenities: [],
//       bedrooms: 0,
//       furnishing: '',
//       availability: '',
//       hideAlreadySeen: false
//     };
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters);
//     setSearchQuery('');
//     onSearch('');
//   };
//     onFilterChange(clearedFilters);
//     setSearchQuery('');
//     onSearch('');
//   };

//   return (
//     <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-orange-100 dark:border-slate-700 sticky top-0 z-40 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Enhanced Search Bar */}
//         <form onSubmit={handleSearch} className="mb-6">
//           <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
//             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300">
//               <Search className={`h-5 w-5 ${isSearchFocused ? 'text-teal-500 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}`} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search by location, property name, or description..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//               className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400 shadow-lg ${
//                 isSearchFocused ? 'border-teal-500 dark:border-teal-400 shadow-xl' : 'border-orange-200 dark:border-slate-600'
//               }`}
//             />
//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchQuery('');
//                   onSearch('');
//                 }}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             )}
//           </div>
//         </form>

//         {/* Filter Toggle with Active Count */}
//         <div className="flex items-center justify-between mb-4">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className={`flex items-center space-x-2 px-6 py-3 border-2 rounded-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl ${
//               showFilters 
//                 ? 'border-teal-500 dark:border-teal-400 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 text-teal-700 dark:text-teal-300' 
//                 : 'border-orange-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-teal-50 dark:hover:from-orange-900/30 dark:hover:to-teal-900/30'
//             }`}
//           >
//             <Filter className={`h-4 w-4 ${showFilters ? 'text-teal-600 dark:text-teal-400' : 'text-slate-600 dark:text-slate-400'}`} />
//             <span className="font-semibold">Filters</span>
//             {activeFiltersCount > 0 && (
//               <span className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
//                 {activeFiltersCount}
//               </span>
//             )}
//           </button>
          
//           {activeFiltersCount > 0 && (
//             <button
//               onClick={clearFilters}
//               className="flex items-center space-x-1 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors font-semibold bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50"
//             >
//               <X className="h-4 w-4" />
//               <span>Clear all filters</span>
//             </button>
//           )}
//         </div>

//         {/* Enhanced Filters */}
//         {showFilters && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gradient-to-br from-orange-50 via-white to-teal-50 dark:from-orange-900/20 dark:via-slate-800 dark:to-teal-900/20 rounded-2xl border-2 border-orange-200 dark:border-slate-600 shadow-xl animate-in slide-in-from-top-4 duration-500">
//             {/* City Filter */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="p-1.5 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-lg">
//                     <MapPin className="h-4 w-4 text-white" />
//                   </div>
//                   <span>City</span>
//                 </div>
//               </label>
//               <select
//                 value={filters.city}
//                 onChange={(e) => handleFilterChange({ city: e.target.value })}
//                 className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
//               >
//                 <option value="">All Cities</option>
//                 {cities.map(city => (
//                   <option key={city} value={city}>{city}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Property Type Filter */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="p-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 rounded-lg">
//                     <Home className="h-4 w-4 text-white" />
//                   </div>
//                   <span>Property Type</span>
//                 </div>
//               </label>
//               <select
//                 value={filters.propertyType}
//                 onChange={(e) => handleFilterChange({ propertyType: e.target.value })}
//                 className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
//               >
//                 <option value="">All Types</option>
//                 {propertyTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Price Range */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="p-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 rounded-lg">
//                     <DollarSign className="h-4 w-4 text-white" />
//                   </div>
//                   <span>Max Price (USD/month)</span>
//                 </div>
//               </label>
//               <div className="space-y-3">
//                 <input
//                   type="range"
//                   min="0"
//                   max="2000"
//                   step="100"
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handleFilterChange({ 
//                     priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
//                   })}
//                   className="w-full h-2 bg-gradient-to-r from-orange-200 to-teal-200 dark:from-orange-800 dark:to-teal-800 rounded-lg appearance-none cursor-pointer slider"
//                 />
//                 <div className="flex justify-between text-sm">
//                   <span className="text-slate-500 dark:text-slate-400 font-medium">$0</span>
//                   <span className="font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded-lg">
//                     ${filters.priceRange[1]}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Minimum Stay */}
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 rounded-lg">
//                     <Calendar className="h-4 w-4 text-white" />
//                   </div>
//                   <span>Min Stay (months)</span>
//                 </div>
//               </label>
//               <select
//                 value={filters.minDuration}
//                 onChange={(e) => handleFilterChange({ minDuration: parseInt(e.target.value) })}
//                 className="w-full border-2 border-orange-200 dark:border-slate-600 rounded-xl px-4 py-3 focus:ring-4 focus:ring-teal-500/20 dark:focus:ring-teal-400/20 focus:border-teal-500 dark:focus:border-teal-400 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm transition-all duration-300 font-medium text-slate-700 dark:text-slate-300"
//               >
//                 <option value={1}>1 month</option>
//                 <option value={3}>3 months</option>
//                 <option value={6}>6 months</option>
//                 <option value={12}>12 months</option>
//               </select>
//             </div>

//             {/* Enhanced Amenities */}
//             <div className="lg:col-span-4 space-y-4">
//               <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 rounded-lg">
//                     <Sparkles className="h-4 w-4 text-white" />
//                   </div>
//                   <span>Popular Amenities</span>
//                 </div>
//               </label>
//               <div className="flex flex-wrap gap-3">
//                 {popularAmenities.map((amenity, index) => (
//                   <button
//                     key={amenity}
//                     onClick={() => {
//                       const newAmenities = filters.amenities.includes(amenity)
//                         ? filters.amenities.filter(a => a !== amenity)
//                         : [...filters.amenities, amenity];
//                       handleFilterChange({ amenities: newAmenities });
//                     }}
//                     className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
//                       filters.amenities.includes(amenity)
//                         ? 'bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white shadow-lg border-2 border-teal-400 dark:border-teal-500'
//                         : 'bg-white/90 dark:bg-slate-800/90 border-2 border-orange-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-teal-50 dark:hover:from-orange-900/30 dark:hover:to-teal-900/30'
//                     }`}
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     {amenity}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterPanel;
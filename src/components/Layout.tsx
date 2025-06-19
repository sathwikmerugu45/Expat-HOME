// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, Building, User, Globe, CalendarCheck, Moon, Sun } from 'lucide-react';
// import { useTheme } from '../contexts/ThemeContext';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const location = useLocation();
//   const { isDarkMode, toggleTheme } = useTheme();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
//       {/* Header */}
//       <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-orange-100 dark:border-slate-700 transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <Link to="/" className="flex items-center space-x-2 group">
//               <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
//                 <Globe className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
//                 ExpatHome
//               </span>
//             </Link>
            
//             <nav className="hidden md:flex space-x-8">
//               <Link
//                 to="/"
//                 className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
//                   location.pathname === '/' 
//                     ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
//                     : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
//                 }`}
//               >
//                 <Home className="h-4 w-4" />
//                 <span>Find Homes</span>
//               </Link>
//               <Link
//                 to="/bookings"
//                 className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
//                   location.pathname === '/bookings' 
//                     ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
//                     : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
//                 }`}
//               >
//                 <CalendarCheck className="h-4 w-4" />
//                 <span>My Bookings</span>
//               </Link>
//               <Link
//                 to="/admin"
//                 className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
//                   location.pathname === '/admin' 
//                     ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
//                     : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
//                 }`}
//               >
//                 <Building className="h-4 w-4" />
//                 <span>List Property</span>
//               </Link>
//             </nav>

//             <div className="flex items-center space-x-4">
//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-300 hover:scale-110"
//                 aria-label="Toggle theme"
//               >
//                 {isDarkMode ? (
//                   <Sun className="h-5 w-5" />
//                 ) : (
//                   <Moon className="h-5 w-5" />
//                 )}
//               </button>
              
//               <button className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-300 hover:scale-110">
//                 <User className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1">
//         {children}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
//                   <Globe className="h-5 w-5 text-white" />
//                 </div>
//                 <span className="text-lg font-bold">ExpatHome</span>
//               </div>
//               <p className="text-slate-400 dark:text-slate-500 text-sm">
//                 Helping international expats find their perfect home away from home.
//               </p>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">For Guests</h3>
//               <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
//                 <li><Link to="/" className="hover:text-white dark:hover:text-slate-300 transition-colors">Find Properties</Link></li>
//                 <li><Link to="/bookings" className="hover:text-white dark:hover:text-slate-300 transition-colors">My Bookings</Link></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">How It Works</a></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Support</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">For Hosts</h3>
//               <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
//                 <li><Link to="/admin" className="hover:text-white dark:hover:text-slate-300 transition-colors">List Your Property</Link></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Host Resources</a></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Host Community</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">Company</h3>
//               <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">About</a></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Careers</a></li>
//                 <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Contact</a></li>
//               </ul>
//             </div>
//           </div>
          
//           <div className="border-t border-slate-700 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400 dark:text-slate-500">
//             <p>&copy; 2024 ExpatHome. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, User, Globe, Moon, Sun, Menu, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Foreign location data
  const locationData = {
    southeastAsia: {
      countries: [
        'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 
        'Vietnam', 'Philippines', 'Myanmar', 'Cambodia',
        'Laos', 'Brunei', 'Timor-Leste'
      ],
      popularCities: [
        'Bangkok', 'Singapore', 'Kuala Lumpur', 'Jakarta',
        'Ho Chi Minh City', 'Manila', 'Hanoi', 'Yangon',
        'Phnom Penh', 'Vientiane', 'Bandar Seri Begawan',
        'Penang', 'Bali', 'Cebu', 'Chiang Mai', 'Da Nang'
      ]
    },
    international: [
      { 
        region: 'North America', 
        countries: ['USA', 'Canada', 'Mexico'],
        cities: ['New York', 'Los Angeles', 'Toronto', 'Vancouver', 'Mexico City']
      },
      { 
        region: 'Europe', 
        countries: ['UK', 'Germany', 'France', 'Spain', 'Italy'],
        cities: ['London', 'Berlin', 'Paris', 'Barcelona', 'Rome']
      },
      { 
        region: 'Middle East', 
        countries: ['UAE', 'Qatar', 'Saudi Arabia'],
        cities: ['Dubai', 'Abu Dhabi', 'Doha', 'Riyadh']
      },
      { 
        region: 'East Asia', 
        countries: ['Japan', 'South Korea', 'China'],
        cities: ['Tokyo', 'Osaka', 'Seoul', 'Shanghai', 'Beijing']
      },
      { 
        region: 'Oceania', 
        countries: ['Australia', 'New Zealand'],
        cities: ['Sydney', 'Melbourne', 'Auckland', 'Wellington']
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Location */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  ExpatHome
                </span>
              </Link>
              
              {/* Location Selector */}
              <div className="hidden md:block relative">
                <button 
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                >
                  <span className="text-sm">All Southeast Asia</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute left-0 mt-2 w-[32rem] bg-white dark:bg-slate-800 rounded-lg shadow-xl z-50 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700">
                      {/* Left Column - Southeast Asia */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">SOUTHEAST ASIA</h3>
                        
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Countries</h4>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {locationData.southeastAsia.countries.map((country, index) => (
                            <button 
                              key={index}
                              className="text-left text-sm text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 truncate px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                        
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Popular Cities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {locationData.southeastAsia.popularCities.map((city, index) => (
                            <button 
                              key={index}
                              className="text-left text-sm text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 truncate px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              {city}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column - International */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">INTERNATIONAL</h3>
                        
                        {locationData.international.map((region, index) => (
                          <div key={index} className="mb-4">
                            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">{region.region}</h4>
                            
                            <div className="mb-2">
                              <h5 className="text-xs text-slate-500 dark:text-slate-400 mb-1">Countries</h5>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {region.countries.map((country, idx) => (
                                  <button 
                                    key={idx}
                                    className="text-xs text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                                  >
                                    {country}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cities</h5>
                              <div className="flex flex-wrap gap-1">
                                {region.cities.map((city, idx) => (
                                  <button 
                                    key={idx}
                                    className="text-xs text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                                  >
                                    {city}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Links - Hidden on mobile */}
            <nav className="hidden lg:flex space-x-8">
              <Link
                to="/for-guests"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors"
              >
                For Guests
              </Link>
              <Link
                to="/for-hosts"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors"
              >
                For Hosts
              </Link>
              <Link
                to="/for-owners"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors"
              >
                For Owners
              </Link>
              <Link
                to="/insights"
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 text-sm font-medium transition-colors relative"
              >
                Insights
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded">NEW</span>
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Post Property Button */}
              <Link
                to="/admin"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl relative"
              >
                Post property
                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs px-1 rounded">FREE</span>
              </Link>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-1 p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline text-sm">Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-300">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 z-50">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center space-y-1 ${
              location.pathname === '/' 
                ? 'text-teal-600 dark:text-teal-400' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            to="/insights"
            className={`flex flex-col items-center justify-center space-y-1 ${
              location.pathname === '/insights' 
                ? 'text-teal-600 dark:text-teal-400' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Building className="h-5 w-5" />
            <span className="text-xs">Insights</span>
          </Link>
          
          {/* Central Add Button */}
          <Link
            to="/admin"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white rounded-full mx-2 my-2 shadow-lg"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
          
          <Link
            to="/bookings"
            className={`flex flex-col items-center justify-center space-y-1 ${
              location.pathname === '/bookings' 
                ? 'text-teal-600 dark:text-teal-400' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs">Shortlisted</span>
          </Link>
          
          <button className="flex flex-col items-center justify-center space-y-1 text-slate-600 dark:text-slate-400">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>

      {/* Footer - Only show on desktop */}
      <footer className="hidden lg:block bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">ExpatHome</span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-sm">
                Helping international expats find their perfect home away from home.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">For Guests</h3>
              <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
                <li><Link to="/" className="hover:text-white dark:hover:text-slate-300 transition-colors">Find Properties</Link></li>
                <li><Link to="/bookings" className="hover:text-white dark:hover:text-slate-300 transition-colors">My Bookings</Link></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">For Hosts</h3>
              <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
                <li><Link to="/admin" className="hover:text-white dark:hover:text-slate-300 transition-colors">List Your Property</Link></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Host Resources</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Host Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-orange-300 dark:text-orange-400">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white dark:hover:text-slate-300 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 dark:border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400 dark:text-slate-500">
            <p>&copy; 2024 ExpatHome. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
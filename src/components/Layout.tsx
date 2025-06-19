import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Building,
  User,
  Globe,
  Moon,
  Sun,
  Menu,
  Heart,
  X,
  Bell,
  Settings,
  MapPin,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locationData = {
    southeastAsia: {
      countries: [
        "Thailand",
        "Singapore",
        "Malaysia",
        "Indonesia",
        "Vietnam",
        "Philippines",
        "Myanmar",
        "Cambodia",
        "Laos",
        "Brunei",
        "Timor-Leste",
      ],
      popularCities: [
        "Bangkok",
        "Singapore",
        "Kuala Lumpur",
        "Jakarta",
        "Ho Chi Minh City",
        "Manila",
        "Hanoi",
        "Yangon",
        "Phnom Penh",
        "Vientiane",
        "Bandar Seri Begawan",
        "Penang",
        "Bali",
        "Cebu",
        "Chiang Mai",
        "Da Nang",
      ],
    },
    international: [
      {
        region: "North America",
        countries: ["USA", "Canada", "Mexico"],
        cities: [
          "New York",
          "Los Angeles",
          "Toronto",
          "Vancouver",
          "Mexico City",
        ],
      },
      {
        region: "Europe",
        countries: ["UK", "Germany", "France", "Spain", "Italy"],
        cities: ["London", "Berlin", "Paris", "Barcelona", "Rome"],
      },
      {
        region: "Middle East",
        countries: ["UAE", "Qatar", "Saudi Arabia"],
        cities: ["Dubai", "Abu Dhabi", "Doha", "Riyadh"],
      },
      {
        region: "East Asia",
        countries: ["Japan", "South Korea", "China"],
        cities: ["Tokyo", "Osaka", "Seoul", "Shanghai", "Beijing"],
      },
      {
        region: "Oceania",
        countries: ["Australia", "New Zealand"],
        cities: ["Sydney", "Melbourne", "Auckland", "Wellington"],
      },
    ],
  };

  const navLinks = [
    { name: "Buy", href: "#" },
    { name: "Rent", href: "#" },
    { name: "Commercial", href: "#" },
    { name: "PG/Co-living", href: "#" },
    { name: "Hostels", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-100 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Location */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Mobile Hamburger (below logo, left aligned) */}
              <div className="xl:hidden mt-2">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>

              <Link to="/" className="flex items-center space-x-2 group">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                    ExpatHome
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                    Premium Properties
                  </div>
                </div>
              </Link>
              {/* Location Selector - Desktop */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 text-sm"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="font-medium">All Southeast Asia</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${
                      showLocationDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="fixed inset-0 top-16 z-50">
                    <div
                      className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
                      onClick={() => setShowLocationDropdown(false)}
                    />
                    <div
                      className="fixed left-1/2 top-16 -translate-x-1/2 w-[95vw] max-w-6xl bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden max-h-[calc(100vh-6rem)]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setShowLocationDropdown(false)}
                        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Southeast Asia */}
                        <div className="p-6 border-r border-gray-200 dark:border-slate-700">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2"></span>
                            SOUTHEAST ASIA
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                                Countries
                              </h4>
                              <div className="space-y-1">
                                {locationData.southeastAsia.countries.map(
                                  (country, index) => (
                                    <button
                                      key={index}
                                      className="w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                    >
                                      {country}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                                Popular Cities
                              </h4>
                              <div className="space-y-1">
                                {locationData.southeastAsia.popularCities.map(
                                  (city, index) => (
                                    <button
                                      key={index}
                                      className="w-full text-left text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1.5 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                    >
                                      {city}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* International */}
                        <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
                            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-2"></span>
                            INTERNATIONAL
                          </h3>

                          <div className="space-y-6">
                            {locationData.international.map((region, index) => (
                              <div key={index}>
                                <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2 uppercase tracking-wide">
                                  {region.region}
                                </h4>

                                <div className="mb-3">
                                  <h5 className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                                    Countries
                                  </h5>
                                  <div className="flex flex-wrap gap-1.5">
                                    {region.countries.map((country, idx) => (
                                      <button
                                        key={idx}
                                        className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
                                      >
                                        {country}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h5 className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                                    Cities
                                  </h5>
                                  <div className="flex flex-wrap gap-1.5">
                                    {region.cities.map((city, idx) => (
                                      <button
                                        key={idx}
                                        className="text-xs text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
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
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Post Property Button - Desktop */}
              <Link
                to="/admin"
                className="hidden md:flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Post Property</span>
                <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-bl-md rounded-tr-lg font-bold">
                  FREE
                </span>
              </Link>
              {/* Desktop Navigation Links */}
              <nav className="hidden xl:flex space-x-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Notifications */}
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
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
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1.5 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    Guest User
                  </span>
                  <svg
                    className="w-3.5 h-3.5 hidden md:inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
                    <a
                      href="#"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      My Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </a>
                    <hr className="my-1 border-gray-200 dark:border-slate-700" />
                    <a
                      href="#"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`fixed top-16 left-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 z-50 transform transition-transform duration-300 ease-in-out ${
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="p-4 space-y-4">
                {/* Close Button */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center ml-auto p-1 text-gray-500 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Post Property Button */}
                <Link
                  to="/admin"
                  className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post Property
                  <span className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-md font-bold">
                    FREE
                  </span>
                </Link>
              </div>
              {/* </div> */}

              {/* Location Selector - Mobile */}
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center justify-center space-x-2 w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 text-sm"
              >
                <MapPin className="h-4 w-4" />
                <span className="font-medium">All Southeast Asia</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showLocationDropdown ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 z-40 shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center transition-all ${
              location.pathname === "/"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-0.5">Home</span>
          </Link>

          <Link
            to="/#"
            className={`flex flex-col items-center justify-center transition-all ${
              location.pathname === "/#"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Building className="h-5 w-5" />
            <span className="text-xs mt-0.5">Insights</span>
          </Link>

          {/* Central Add Button */}
          <Link
            to="/admin"
            className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mx-2 my-1 shadow-lg transform hover:scale-105 transition-transform"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>

          <Link
            to="/#"
            className={`flex flex-col items-center justify-center transition-all ${
              location.pathname === "/bookings"
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs mt-0.5">Saved</span>
          </Link>

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className={`flex flex-col items-center justify-center transition-all ${
              showUserMenu
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-0.5">Profile</span>
          </button>
        </div>
      </div>

      {/* Footer - Your original footer added back */}
      <footer className="hidden lg:block bg-gray-900 dark:bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">ExpatHome</span>
                  <div className="text-sm text-gray-400">
                    Premium Properties
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Connecting international expats with premium housing solutions
                across Southeast Asia and beyond.
              </p>
              <div className="flex space-x-4 mt-6">
                {/* Social links */}
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">For Tenants</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link
                    to="/bookings"
                    className="hover:text-white transition-colors"
                  >
                    Saved Properties
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rental Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tenant Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-6 text-lg">For Owners</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-white transition-colors"
                  >
                    List Property
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Owner Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Property Management
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Market Insights
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2024 ExpatHome. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building, User, Globe, CalendarCheck, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/themecontext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-orange-100 dark:border-slate-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                ExpatHome
              </span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/' 
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Find Homes</span>
              </Link>
              <Link
                to="/bookings"
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/bookings' 
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
                }`}
              >
                <CalendarCheck className="h-4 w-4" />
                <span>My Bookings</span>
              </Link>
              <Link
                to="/admin"
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                  location.pathname === '/admin' 
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-2 rounded-lg' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 px-3 py-2 rounded-lg'
                }`}
              >
                <Building className="h-4 w-4" />
                <span>List Property</span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-300 hover:scale-110"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              
              <button className="p-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-all duration-300 hover:scale-110">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white transition-colors duration-300">
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
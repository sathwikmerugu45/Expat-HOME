import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropertyCard from "../components/PropertyCard";
import Filter from "../components/Filter";
import { Property, FilterOptions } from "../types";
import { API_BASE_URL } from "../api";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  TrendingUp,
  Shield,
  Star,
  X,
  Home as HomeIcon,
  Building,
  DollarSign,
  Users,
  Award,
  Clock,
  Filter as FilterIcon,
} from "lucide-react";

const defaultFilters: FilterOptions = {
  city: "",
  priceRange: [0, 2000],
  propertyType: "",
  minDuration: 1,
  amenities: [],
  bedrooms: [],
  furnishing: [],
  availability: [],
  hideAlreadySeen: false,
};

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Buy");
  const [currentFilters, setCurrentFilters] =
    useState<FilterOptions>(defaultFilters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/properties`);
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    if (!properties.length) return [];

    return properties.filter((property) => {
      const matchesSearch = searchQuery
        ? property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          property.location.city
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          property.location.district
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      const matchesCity = currentFilters.city
        ? property.location.city === currentFilters.city
        : true;

      const matchesPrice =
        property.price >= currentFilters.priceRange[0] &&
        property.price <= currentFilters.priceRange[1];

      const matchesPropertyType = currentFilters.propertyType
        ? property.type === currentFilters.propertyType
        : true;

      const matchesMinDuration =
        currentFilters.minDuration > 1
          ? property.minStay <= currentFilters.minDuration
          : true;

      const matchesAmenities =
        currentFilters.amenities.length > 0
          ? currentFilters.amenities.every((amenity) =>
              property.amenities.some((propAmenity) =>
                propAmenity.toLowerCase().includes(amenity.toLowerCase())
              )
            )
          : true;

      const matchesBedrooms =
        currentFilters.bedrooms.length > 0
          ? currentFilters.bedrooms.includes(property.bedrooms)
          : true;

      return (
        matchesSearch &&
        matchesCity &&
        matchesPrice &&
        matchesPropertyType &&
        matchesMinDuration &&
        matchesAmenities &&
        matchesBedrooms
      );
    });
  }, [properties, searchQuery, currentFilters]);

  const handleFilterChange = useCallback((filters: FilterOptions) => {
    setCurrentFilters(filters);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleMainSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <HomeIcon className="w-10 h-10 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Finding Perfect Properties
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discovering amazing homes for expats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 dark:from-blue-800 dark:via-purple-900 dark:to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Expat Home
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover verified, expat-friendly housing in Southeast Asia. From
              studios to villas, we help international professionals find their
              perfect stay.
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Verified Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Expat Community</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Secure Booking</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-sm border border-white/20 max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 dark:bg-slate-700 rounded-2xl p-2">
              {["Buy", "Rent", "Commercial", "PG/Co-living", "Hostels"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-lg transform scale-105"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-600/50"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <form onSubmit={handleMainSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <select className="md:col-span-2 px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villas</option>
                </select>

                <div className="md:col-span-8 relative">
                  <input
                    type="text"
                    placeholder="Search by location, property name, or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-lg"
                  />
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
                </div>

                <button
                  type="submit"
                  className="md:col-span-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Search
                </button>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-4">
                <span className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
                  Popular:
                </span>
                {[
                  "Bangkok",
                  "Singapore",
                  "Kuala Lumpur",
                  "Jakarta",
                  "Ho Chi Minh",
                ].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSearchQuery(city)}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-all text-sm"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Housing Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need to find, secure, and settle into your perfect
              expat home
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              {
                icon: HomeIcon,
                title: "Buy Properties",
                description: "Find your dream home",
                badge: null,
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: Building,
                title: "Rental Homes",
                description: "Flexible rental options",
                badge: null,
                color: "from-green-500 to-green-600",
              },
              {
                icon: TrendingUp,
                title: "Investment",
                description: "Real estate opportunities",
                badge: "HOT",
                color: "from-purple-500 to-purple-600",
              },
              {
                icon: DollarSign,
                title: "Sell/Rent",
                description: "List your property",
                badge: "FREE",
                color: "from-orange-500 to-orange-600",
              },
              {
                icon: Star,
                title: "Premium Plots",
                description: "Land investments",
                badge: null,
                color: "from-indigo-500 to-indigo-600",
              },
              {
                icon: Shield,
                title: "Market Insights",
                description: "Data-driven decisions",
                badge: "NEW",
                color: "from-teal-500 to-teal-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-4 sm:p-6 hover:bg-white dark:hover:bg-slate-600 transition-all duration-300 cursor-pointer group hover:shadow-lg border border-gray-200 dark:border-slate-600"
              >
                <div className="relative">
                  <div
                    className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <item.icon className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-xs sm:text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="py-12 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {filteredProperties.length} Premium Properties
                <span className="text-blue-600 dark:text-blue-400">
                  {" "}
                  in Southeast Asia
                </span>
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
                  <span className="text-sm sm:text-base">
                    Verified locations across the region
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base">Updated daily</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="hidden lg:flex space-x-2">
                {["Verified", "Furnished", "With Photos", "Instant Book"].map(
                  (filter) => (
                    <button
                      key={filter}
                      className="px-4 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-all"
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                <FilterIcon className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <select className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm">
                <option>Latest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-24">
                <Filter
                  onFilterChange={handleFilterChange}
                  onSearch={handleSearch}
                  variant="sidebar"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              {filteredProperties.length === 0 ? (
                <div className="text-center py-16 sm:py-24">
                  <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-blue-100 dark:from-slate-800 dark:to-blue-900/30 rounded-3xl flex items-center justify-center">
                    <HomeIcon className="w-12 sm:w-16 h-12 sm:h-16 text-gray-400 dark:text-slate-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No Properties Found
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria or browse our featured
                    properties below.
                  </p>
                  <button
                    onClick={() => {
                      setCurrentFilters(defaultFilters);
                      setSearchQuery("");
                    }}
                    className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-6 sm:space-y-8">
                  {filteredProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-700"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <PropertyCard property={property} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expat Lifestyle Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  A lifestyle tailor-made for you
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  With diverse housing options, you're not just choosing a home;
                  you're crafting a lifestyle that reflects your individuality.
                  Beyond mere renting, we're here to support your everyday
                  living, hassle-free.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Unmatched Privacy",
                    description:
                      "We're committed to protecting your privacy. Throughout your rental journey, we'll be there for you every step of the way.",
                    iconColor:
                      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                  },
                  {
                    icon: Clock,
                    title: "Instant Move-In",
                    description:
                      "Say goodbye to lengthy waits. Find, finalize, and move into your dream home without any delay.",
                    iconColor:
                      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                  },
                  {
                    icon: DollarSign,
                    title: "Lowest Security Deposit",
                    description:
                      "Ease rental stress by paying a minimal security deposit. Understanding financial challenges, we aim for convenience.",
                    iconColor:
                      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                  },
                  {
                    icon: Users,
                    title: "Nest'n Network",
                    description:
                      "From shared spaces to curated events, we foster a space where you're not just renting a home but building the future.",
                    iconColor:
                      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
                  },
                ].map((feature, index) => (
                  <div key={index} className="space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl ${feature.iconColor} flex items-center justify-center`}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl opacity-20"></div>
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
                    <HomeIcon className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Ready to Find Your Home?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Join thousands of expats who've found their perfect home
                      through our platform.
                    </p>
                    <button className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-2xl font-semibold text-lg hover:from-teal-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Find Your Perfect Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Management Section */}
      <div className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-3xl p-8 shadow-xl">
                <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
                  <Building className="w-full h-full text-blue-600" />
                </div>
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center">
                    <HomeIcon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      List Your Property
                    </h3>
                    <Link to="/admin">
                      <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg">
                        List Your Property
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                  Own a home?
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-2xl sm:text-3xl">
                    Let us help you manage it
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  List your property in a few easy steps and enjoy hassle-free
                  management services, including on-time rent and proactive
                  maintenance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: Users,
                    title: "KYC-Verified Tenants",
                    description:
                      "Our thorough tenant KYC & verification process guarantees the highest quality tenants for your rental property.",
                    iconColor:
                      "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
                  },
                  {
                    icon: DollarSign,
                    title: "On-time Rent Collection",
                    description:
                      "Enjoy hassle-free, on-time rent collection for your property every month.",
                    iconColor:
                      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                  },
                  {
                    icon: Award,
                    title: "Unparalleled Expertise",
                    description:
                      "Having 8+ years of experience in Property and Rental Management, currently overseeing Transactions Worth ₹2000+ Crores.",
                    iconColor:
                      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                  },
                  {
                    icon: Building,
                    title: "Prompt Maintenance",
                    description:
                      "We conduct regular property inspections and provide on-demand services to keep your space forever spick and span.",
                    iconColor:
                      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                  },
                ].map((feature, index) => (
                  <div key={index} className="space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl ${feature.iconColor} flex items-center justify-center`}
                    >
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators Section */}
      <div className="py-12 sm:py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Recognized and featured by top media outlets and industry leaders
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            {[
              "The Straits Times",
              "The Jakarta Post",
              "Bangkok Post",
              "Vietnam News",
              "DealStreetAsia",
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-400">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Happy Customers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
              Real stories from expats who found their perfect home
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thảo",
                location: "Ho Chi Minh City, Vietnam",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                testimonial:
                  "After moving to Ho Chi Minh City for my studies, finding a safe and comfortable home was my biggest concern. I came across this platform and was surprised by the variety and quality of listings. My room is bright, clean, and well-maintained. It's been an easy transition to city life, and I'm really happy with my choice.",
              },
              {
                name: "Nurul Afiqah",
                location: "Kuala Lumpur, Malaysia",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                testimonial:
                  "Relocating to Kuala Lumpur for my job was made much easier thanks to this platform. The verification process gave me peace of mind, and I found a fully-furnished apartment in a great neighborhood. I also appreciate how easy it is to manage everything online — from rent to maintenance requests!",
              },
              {
                name: "Aditya Putra",
                location: "Jakarta, Indonesia",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                testimonial:
                  "As a tech consultant in Jakarta, I needed a home that balanced comfort and location. This platform had plenty of options and the pricing was transparent. The apartment I chose is close to work and well taken care of. The support team was friendly and responsive too. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-slate-600 shadow-lg"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                    <div className="flex mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-700 dark:text-gray-300 italic text-sm sm:text-base leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800 dark:from-blue-800 dark:via-purple-900 dark:to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of expats who've found their perfect home. Start your
            search today and discover your next chapter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Find Properties
            </button>
            <Link
              to="/admin"
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed inset-x-0 bottom-0 bg-white dark:bg-slate-800 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <Filter
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              variant="modal"
            />
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

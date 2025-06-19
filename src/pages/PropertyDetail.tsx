import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Shield,
  Utensils,
  Waves,
  Dumbbell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X as XIcon,
  Home,
  Building as BuildingIcon,
  User,
  Heart,
} from "lucide-react";
import BookingForm from "../components/BookingForm";
import { Property, BookingRequest } from "../types";
import { API_BASE_URL } from "../api";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchProperty(parseInt(id));
    }
  }, [id]);

  const fetchProperty = async (propertyId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`);
      if (!response.ok) throw new Error("Property not found");
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (
    bookingData: Omit<BookingRequest, "id" | "createdAt">
  ) => {
    try {
      const booking: BookingRequest = {
        ...bookingData,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        alert(
          "Booking request sent successfully! The host will contact you soon."
        );
        setShowBookingForm(false);
      } else {
        alert("Error sending booking request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Error sending booking request. Please try again.");
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ReactNode> = {
      wifi: <Wifi className="h-5 w-5" />,
      "air conditioning": (
        <div className="h-5 w-5 bg-current rounded-full"></div>
      ),
      kitchen: <Utensils className="h-5 w-5" />,
      pool: <Waves className="h-5 w-5" />,
      gym: <Dumbbell className="h-5 w-5" />,
      security: <Shield className="h-5 w-5" />,
      parking: <Car className="h-5 w-5" />,
      "private pool": <Waves className="h-5 w-5" />,
    };
    return (
      icons[amenity.toLowerCase()] || (
        <div className="h-5 w-5 bg-current rounded-full"></div>
      )
    );
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">
            Loading property details...
          </p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Property Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex flex-wrap items-center">
          <a href="/" className="hover:text-teal-600 dark:hover:text-teal-400">
            Home
          </a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">
            Property for rent in {property.location.city}
          </a>
          <span className="mx-2">›</span>
          <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400">
            {property.type} for rent in {property.location.district}
          </a>
          <span className="mx-2">›</span>
          <span className="text-slate-700 dark:text-slate-300">
            {property.bedrooms} BHK {property.type} for rent in{" "}
            {property.location.district}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                    VERIFIED
                  </span>
                  <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded text-xs font-semibold">
                    FURNISHED
                  </span>
                </div>
              </div>

              <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1 text-orange-500 dark:text-orange-400" />
                <span>
                  {property.location.district}, {property.location.city}
                </span>
                <span className="mx-2">•</span>
                <span className="text-green-600 dark:text-green-400">
                  Expat-friendly area
                </span>
              </div>

              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated 2 days ago by owner</span>
                <span className="mx-2">•</span>
                <span>Ready to move</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
              <div className="relative h-96 w-full">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Property Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Property Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Configuration
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {property.bedrooms} Bedrooms, {property.bathrooms}{" "}
                        Bathrooms
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 " />
                      <span className="text-slate-700 dark:text-slate-300">
                        1 Balcony with Pooja Room
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-slate-700 dark:text-slate-300">
                        Study Room, Servant Room, Store Room
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    Area Details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-slate-700 dark:text-slate-300">
                        Built-up area: {property.area} sq ft
                      </span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-slate-700 dark:text-slate-300">
                        Carpet area: {Math.round(property.area * 0.9)} sq ft
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Property Details
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Basic Details
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Type
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {property.type}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Furnishing
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          Furnished
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Floor
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          2 (Out of 4)
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Pricing
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Rent
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          ${property.price}/month
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Deposit
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          ${property.price * property.minStay}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Maintenance
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          $1,500/month
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="text-teal-600 dark:text-teal-400">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                About {property.location.district}
              </h2>
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-3">
                  #{property.location.district === "Sriperumbudur" ? "4" : "1"}{" "}
                  in Top 100 in {property.location.city}
                </h3>
                <h4 className="text-teal-600 dark:text-teal-400 font-medium mb-4">
                  What's great here!
                </h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {property.location.district} is an industrial cum
                      residential hub in {property.location.city}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      The locale hosts manufacturing plants of leading
                      automobile firms
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Also an emerging housing hub, the locale offers abundant
                      land parcels
                    </span>
                  </li>
                </ul>

                <h4 className="text-orange-500 dark:text-orange-400 font-medium mb-4">
                  What needs attention!
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Highway in {property.location.district} lacks adequate
                      lighting
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Residents complain about open garbage dumping along public
                      roads
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Power cuts are frequent here, especially during summer
                      months
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Tenant Reviews
              </h2>
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          Sarah M.
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 4
                                  ? "text-amber-400 fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      2 months ago
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    "Great location and the property is well maintained. The
                    landlord is very responsive to any issues. Would definitely
                    recommend!"
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                        <span className="text-white font-bold">J</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                          James K.
                        </h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < 3
                                  ? "text-amber-400 fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      5 months ago
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    "The property is good but the power cuts mentioned in the
                    description are accurate. The area is developing though and
                    has good potential."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Owner Contact Card */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sticky top-8 shadow-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  ${property.price}/month
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  + {property.minStay} months deposit
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                  Contact Owner [FREE]
                </button>
              </div>

              {/* Owner Info */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Property Owner
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-bold">O</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      Owner
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Listed 2 days ago
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg mb-6">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Registration Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    REPA STATUS
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700 dark:text-slate-300">
                    REGISTERED
                  </span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <p>Registration No: ABCD/1234</p>
                  <a
                    href="https://example.com/"
                    className="text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    Website: example.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <Home className="h-4 w-4" />
                    <span>Society</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <User className="h-4 w-4" />
                    <span>Owner Details</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Explore Locality</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <BuildingIcon className="h-4 w-4" />
                    <span>Featured Dealers</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Recommend</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <BookingForm
            property={property}
            onSubmit={handleBookingSubmit}
            onClose={() => setShowBookingForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;

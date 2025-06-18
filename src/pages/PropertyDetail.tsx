import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, Star, Bed, Bath, Square, Wifi, Car, Shield, 
  Utensils, Waves, Dumbbell, Calendar, Clock, 
  MessageCircle,ChevronLeft, ChevronRight
} from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { Property, BookingRequest } from '../types';
import { API_BASE_URL } from '../api';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProperty(parseInt(id));
    }
  }, [id]);

  const fetchProperty = async (propertyId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`);
      if (!response.ok) throw new Error('Property not found');
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (bookingData: Omit<BookingRequest, 'id' | 'createdAt'>) => {
    try {
      const booking: BookingRequest = {
        ...bookingData,
        createdAt: new Date().toISOString()
      };

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        alert('Booking request sent successfully! The host will contact you soon.');
        setShowBookingForm(false);
      } else {
        alert('Error sending booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error sending booking request. Please try again.');
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const icons: Record<string, React.ReactNode> = {
      'wifi': <Wifi className="h-5 w-5" />,
      'air conditioning': <div className="h-5 w-5 bg-current rounded-full"></div>,
      'kitchen': <Utensils className="h-5 w-5" />,
      'pool': <Waves className="h-5 w-5" />,
      'gym': <Dumbbell className="h-5 w-5" />,
      'security': <Shield className="h-5 w-5" />,
      'parking': <Car className="h-5 w-5" />,
      'private pool': <Waves className="h-5 w-5" />
    };
    return icons[amenity.toLowerCase()] || <div className="h-5 w-5 bg-current rounded-full"></div>;
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Property Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
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
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {property.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-6">
              <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1 text-orange-500 dark:text-orange-400" />
                <span>{property.location.address}, {property.location.district}, {property.location.city}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                {property.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 px-3 py-2 rounded-xl">
                  <span className="font-medium text-teal-700 dark:text-teal-300">{property.type}</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                    <Bed className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                    <span className="text-slate-700 dark:text-slate-300">{property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                )}
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                  <Bath className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                  <span className="text-slate-700 dark:text-slate-300">{property.bathrooms} bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                  <Square className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
                  <span className="text-slate-700 dark:text-slate-300">{property.area}m²</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl border border-orange-100 dark:border-slate-600">
                    <div className="text-teal-600 dark:text-teal-400">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stay Requirements */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Stay Requirements</h2>
              <div className="bg-gradient-to-r from-slate-50 to-orange-50 dark:from-slate-800 dark:to-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">Minimum Stay</p>
                      <p className="text-slate-600 dark:text-slate-400">{property.minStay} month{property.minStay > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-600 dark:to-amber-600 rounded-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">Maximum Stay</p>
                      <p className="text-slate-600 dark:text-slate-400">{property.maxStay} month{property.maxStay > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-600 rounded-2xl p-6 sticky top-8 mb-6 shadow-lg">
              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                    ${property.price}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 ml-2">/ month</span>
                </div>
              </div>

              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 text-white py-4 px-4 rounded-xl hover:from-teal-600 hover:to-emerald-600 dark:hover:from-teal-700 dark:hover:to-emerald-700 transition-all duration-200 font-medium mb-4 shadow-lg hover:shadow-xl"
              >
                Request Booking
              </button>

              <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
                You won't be charged yet
              </p>
            </div>

            {/* Host Information */}
            <div className="bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-600 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Meet Your Host</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 dark:from-teal-500 dark:to-emerald-500 flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">
                    {property.host.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">{property.host.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {property.host.rating}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      ({property.host.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl">
                  <MessageCircle className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Response time: {property.host.responseTime}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-teal-50 dark:from-orange-900/20 dark:to-teal-900/20 rounded-xl">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Languages: {property.host.languages.join(', ')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-100 to-orange-100 dark:from-slate-700 dark:to-orange-900/30 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-xl hover:from-slate-200 hover:to-orange-200 dark:hover:from-slate-600 dark:hover:to-orange-900/50 transition-all duration-200 font-medium">
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact Host</span>
                </button>
              </div>
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
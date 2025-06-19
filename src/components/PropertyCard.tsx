import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Heart,
  Phone,
  Star,
  Badge,
  Eye,
  Calendar,
  Users,
  Building,
} from "lucide-react";
import { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-slate-700 group max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Made slightly smaller */}
        <div className="lg:w-72 xl:w-80 h-64 lg:h-auto relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse"></div>
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Image Overlay Elements */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {property.available && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow">
                <Badge className="h-3 w-3" />
                <span>VERIFIED</span>
              </span>
            )}
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
              FURNISHED
            </span>
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow">
              PREMIUM
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow ${
                isLiked
                  ? "bg-red-500 text-white scale-110"
                  : "bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-gray-400 hover:text-red-500 hover:scale-110"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
            <Eye className="h-3 w-3 inline mr-1" />
            32 views
          </div>

          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded">
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  4.8
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - More compact layout */}
        <div className="flex-1 p-4 md:p-6">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {property.title}
              </h3>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-xs font-semibold">
                NEW
              </span>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-2">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-500" />
              <span className="font-medium">
                {property.location.district}, {property.location.city}
              </span>
              <span className="mx-1">•</span>
              <span className="text-green-600 dark:text-green-400 font-medium">
                Expat-friendly area
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <Building className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {property.bedrooms} Bedroom {property.type}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3 md:h-4 md:w-4" />
                <span>Suitable for expats</span>
              </div>
            </div>

            {/* Price and Details Grid - More compact */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 p-3 md:p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div>
                <div className="flex items-baseline space-x-1">
                  <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                    ${property.price.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                    /month
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  + {property.minStay} months deposit
                </div>
              </div>

              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {property.area}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  sqft ({Math.round(property.area * 0.092903)} sqm)
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {property.bedrooms} BHK
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {property.bathrooms} Bathrooms
                </div>
              </div>
            </div>

            {/* Description - Shorter */}
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              {property.description}
            </p>

            {/* Amenities Preview - More compact */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {property.amenities.slice(0, 4).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium"
                >
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Host Info and Actions - More compact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-600 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">O</span>
              </div>
              <div>
                <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white">
                  Property Owner
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <Calendar className="h-2.5 w-2.5" />
                  <span>Listed 4 days ago</span>
                  <span>•</span>
                  <span className="text-green-600 dark:text-green-400">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto">
              <Link
                to={`/property/${property.id}`}
                className="flex-1 sm:flex-none px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium text-xs md:text-sm text-center"
              >
                View Details
              </Link>
              <button className="flex-1 sm:flex-none px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-xs md:text-sm flex items-center justify-center space-x-1 shadow hover:shadow-md">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

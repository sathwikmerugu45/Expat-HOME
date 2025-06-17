import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bed, Bath, Square, Wifi, Car } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-3 w-3" />;
      case 'parking':
        return <Car className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Link to={`/property/${property.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 group-hover:border-teal-200 group-hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              {property.type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              Available
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Location */}
          <div className="flex items-center text-slate-600 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1 text-orange-500" />
            <span>{property.location.district}, {property.location.city}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2 text-lg">
            {property.title}
          </h3>

          {/* Property Details */}
          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center bg-slate-50 px-2 py-1 rounded-lg">
                <Bed className="h-4 w-4 mr-1 text-teal-600" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded-lg">
              <Bath className="h-4 w-4 mr-1 text-teal-600" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded-lg">
              <Square className="h-4 w-4 mr-1 text-teal-600" />
              <span>{property.area}m²</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center space-x-1 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-medium"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-lg text-xs font-medium">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Host Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {property.host.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-slate-600">{property.host.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-amber-400 fill-current" />
              <span className="text-sm font-medium text-slate-700">
                {property.host.rating}
              </span>
              <span className="text-sm text-slate-500">
                ({property.host.reviews})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                ${property.price}
              </span>
              <span className="text-slate-600 text-sm ml-1">/ month</span>
            </div>
            <div className="text-sm text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
              Min {property.minStay} month{property.minStay !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
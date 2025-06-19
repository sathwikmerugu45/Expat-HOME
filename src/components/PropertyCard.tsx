// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { MapPin, Star, Bed, Bath, Square, Wifi, Car, Heart, Eye, Calendar } from 'lucide-react';
// import { Property } from '../types';

// interface PropertyCardProps {
//   property: Property;
// }

// const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const getAmenityIcon = (amenity: string) => {
//     switch (amenity.toLowerCase()) {
//       case 'wifi':
//         return <Wifi className="h-3 w-3" />;
//       case 'parking':
//         return <Car className="h-3 w-3" />;
//       default:
//         return null;
//     }
//   };

//   const handleLikeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLiked(!isLiked);
//   };

//   return (
//     <Link to={`/property/${property.id}`} className="group h-full block">
//       <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-2xl dark:shadow-slate-900/50 transition-all duration-500 overflow-hidden border border-orange-100 dark:border-slate-700 group-hover:border-teal-200 dark:group-hover:border-teal-600 group-hover:-translate-y-2 h-full flex flex-col relative">
//         {/* Image with Loading Animation */}
//         <div className="relative h-48 w-full overflow-hidden">
//           {!imageLoaded && (
//             <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse"></div>
//           )}
//           <img
//             src={property.images[0]}
//             alt={property.title}
//             className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
//               imageLoaded ? 'opacity-100' : 'opacity-0'
//             }`}
//             onLoad={() => setImageLoaded(true)}
//           />
          
//           {/* Floating Labels */}
//           <div className="absolute top-3 left-3">
//             <span className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-lg border border-white/20 dark:border-slate-600/20">
//               {property.type}
//             </span>
//           </div>
          
//           <div className="absolute top-3 right-3 flex space-x-2">
//             <span className="bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-600 dark:to-teal-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-pulse">
//               Available
//             </span>
//             <button
//               onClick={handleLikeClick}
//               className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
//                 isLiked 
//                   ? 'bg-red-500 text-white shadow-lg scale-110' 
//                   : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-red-500 hover:scale-110'
//               }`}
//             >
//               <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
//             </button>
//           </div>
          
//           {/* Hover Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
//             <div className="absolute bottom-4 left-4 right-4">
//               <div className="flex items-center justify-between text-white">
//                 <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                   <Eye className="h-4 w-4" />
//                   <span className="text-sm font-medium">View Details</span>
//                 </div>
//                 <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                   <Star className="h-4 w-4 text-amber-400 fill-current" />
//                   <span className="text-sm font-medium">{property.host.rating}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 flex-1 flex flex-col">
//           {/* Location with Animation */}
//           <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
//             <div className="p-1 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg mr-2 group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-900/30 dark:group-hover:to-teal-800/30 transition-all duration-300">
//               <MapPin className="h-3 w-3 text-orange-600 dark:text-orange-400 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
//             </div>
//             <span className="truncate font-medium">{property.location.district}, {property.location.city}</span>
//           </div>

//           {/* Title with Gradient Animation */}
//           <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 dark:group-hover:from-teal-400 dark:group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 text-lg min-h-[56px] leading-tight">
//             {property.title}
//           </h3>

//           {/* Property Details with Enhanced Styling */}
//           <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4 flex-wrap">
//             {property.bedrooms > 0 && (
//               <div className="flex items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 px-3 py-2 rounded-xl mb-1 border border-slate-200 dark:border-slate-600 group-hover:from-teal-50 group-hover:to-teal-100 dark:group-hover:from-teal-900/30 dark:group-hover:to-teal-800/30 group-hover:border-teal-200 dark:group-hover:border-teal-600 transition-all duration-300">
//                 <Bed className="h-4 w-4 mr-1.5 text-teal-600 dark:text-teal-400" />
//                 <span className="font-medium">{property.bedrooms}</span>
//               </div>
//             )}
//             <div className="flex items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 px-3 py-2 rounded-xl mb-1 border border-slate-200 dark:border-slate-600 group-hover:from-teal-50 group-hover:to-teal-100 dark:group-hover:from-teal-900/30 dark:group-hover:to-teal-800/30 group-hover:border-teal-200 dark:group-hover:border-teal-600 transition-all duration-300">
//               <Bath className="h-4 w-4 mr-1.5 text-teal-600 dark:text-teal-400" />
//               <span className="font-medium">{property.bathrooms}</span>
//             </div>
//             <div className="flex items-center bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 px-3 py-2 rounded-xl mb-1 border border-slate-200 dark:border-slate-600 group-hover:from-teal-50 group-hover:to-teal-100 dark:group-hover:from-teal-900/30 dark:group-hover:to-teal-800/30 group-hover:border-teal-200 dark:group-hover:border-teal-600 transition-all duration-300">
//               <Square className="h-4 w-4 mr-1.5 text-teal-600 dark:text-teal-400" />
//               <span className="font-medium">{property.area}m²</span>
//             </div>
//           </div>

//           {/* Amenities with Stagger Animation */}
//           <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
//             {property.amenities.slice(0, 3).map((amenity, index) => (
//               <span
//                 key={amenity}
//                 className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-xl text-xs font-semibold border border-orange-200 dark:border-orange-700 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all duration-300 hover:scale-105"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {getAmenityIcon(amenity)}
//                 <span>{amenity}</span>
//               </span>
//             ))}
//             {property.amenities.length > 3 && (
//               <span className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300">
//                 +{property.amenities.length - 3} more
//               </span>
//             )}
//           </div>

//           {/* Host Info with Enhanced Design */}
//           <div className="flex items-center justify-between mb-4 mt-auto p-3 bg-gradient-to-r from-slate-50 to-orange-50 dark:from-slate-700 dark:to-orange-900/30 rounded-xl border border-orange-100 dark:border-slate-600">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 dark:from-teal-500 dark:to-emerald-500 flex items-center justify-center shadow-lg">
//                   <span className="text-white text-sm font-bold">
//                     {property.host.name.charAt(0)}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 dark:bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
//               </div>
//               <div>
//                 <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">
//                   {property.host.name}
//                 </span>
//                 <span className="text-xs text-slate-500 dark:text-slate-400">
//                   {property.host.responseTime}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-center space-x-1 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-lg">
//               <Star className="h-4 w-4 text-amber-400 fill-current" />
//               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
//                 {property.host.rating}
//               </span>
//               <span className="text-xs text-slate-500 dark:text-slate-400">
//                 ({property.host.reviews})
//               </span>
//             </div>
//           </div>

//           {/* Price with Enhanced Styling */}
//           <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
//             <div>
//               <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
//                 ${property.price}
//               </span>
//               <span className="text-slate-600 dark:text-slate-400 text-sm ml-1 font-medium">/ month</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="text-sm text-slate-500 dark:text-slate-400 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-700">
//                 <Calendar className="h-3 w-3 inline mr-1" />
//                 Min {property.minStay}m
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default PropertyCard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bed, Bath, Square, Heart, Eye, Phone, MessageCircle } from 'lucide-react';
import { Property } from '../types';

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
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-80 h-64 lg:h-auto relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse"></div>
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Image Overlay Elements */}
          <div className="absolute top-3 left-3 flex space-x-2">
            {property.available && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                ✓ VERIFIED
              </span>
            )}
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
              FURNISHED
            </span>
          </div>
          
          <div className="absolute top-3 right-3">
            <button
              onClick={handleLikeClick}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            32
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {property.title}
              </h3>
              
              <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location.district}, {property.location.city}</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <div className="flex items-center">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {property.bedrooms} Bedroom {property.type}
                  </span>
                </div>
                <span>for rent in</span>
                <span>{property.location.district}</span>
              </div>

              {/* Price and Details */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                      ₹{property.price.toLocaleString()}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400">/month</span>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">
                    + Deposit {property.minStay} months rent
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">
                    {property.area} sqft
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">
                    ({Math.round(property.area * 0.092903)} sqm)
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">
                    {property.bedrooms} BHK
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">
                    {property.bathrooms} Baths
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                {property.description}
              </p>

              {/* Host Info and Actions */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500 dark:text-slate-500">
                  <span>4d ago</span>
                  <span className="mx-2">•</span>
                  <span>Owner</span>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/property/${property.id}`}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm font-medium"
                  >
                    View Number
                  </Link>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
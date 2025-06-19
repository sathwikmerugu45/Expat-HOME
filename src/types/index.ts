export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  host: {
    name: string;
    rating: number;
    reviews: number;
    languages: string[];
    responseTime: string;
    avatar: string;
  };
  available: boolean;
  minStay: number;
  maxStay: number;
}

export interface BookingRequest {
  id?: number;
  propertyId: number;
  guestInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
  };
  stayDetails: {
    moveInDate: string;
    duration: number;
    durationType: 'days' | 'weeks' | 'months';
  };
  message?: string;
  createdAt: string;
}

export interface FilterOptions {
  city: string;
  priceRange: [number, number];
  propertyType: string;
  minDuration: number;
  amenities: string[];
  bedrooms: number[];
  furnishing: string[];
  availability: string[];
  hideAlreadySeen: boolean;
}
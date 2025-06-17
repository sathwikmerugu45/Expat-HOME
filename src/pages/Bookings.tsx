import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../api";

interface Booking {
  id: number;
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
    durationType: string;
  };
  message: string;
  createdAt: string;
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:3001/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Booking Requests</h1>

      {bookings.length === 0 ? (
        <p className="text-slate-500">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow-md rounded-xl p-6 border border-orange-100">
              <h2 className="text-lg font-semibold text-slate-700 mb-2">#{booking.id} — Property ID: {booking.propertyId}</h2>
              
              <div className="text-slate-600 text-sm space-y-1">
                <p><span className="font-medium text-slate-700">Name:</span> {booking.guestInfo.name}</p>
                <p><span className="font-medium text-slate-700">Email:</span> {booking.guestInfo.email}</p>
                <p><span className="font-medium text-slate-700">Phone:</span> {booking.guestInfo.phone}</p>
                <p><span className="font-medium text-slate-700">Nationality:</span> {booking.guestInfo.nationality}</p>
                <p><span className="font-medium text-slate-700">Move-in Date:</span> {booking.stayDetails.moveInDate}</p>
                <p><span className="font-medium text-slate-700">Duration:</span> {booking.stayDetails.duration} {booking.stayDetails.durationType}</p>
                <p><span className="font-medium text-slate-700">Message:</span> <span className="italic text-orange-700">{booking.message}</span></p>
                <p className="text-slate-400 text-xs">Requested on: {new Date(booking.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;

import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../api";
import { CalendarCheck, User, Mail, Phone, Flag, Calendar, Clock, MessageSquare } from 'lucide-react';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/bookings`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center">
          <CalendarCheck className="mr-2 h-8 w-8 text-teal-600 dark:text-teal-400" />
          Booking Requests
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 text-center border border-orange-100 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No booking requests yet. When you receive bookings, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-slate-800 shadow-md rounded-xl p-6 border border-orange-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                    Booking #{booking.id}
                  </h2>
                  <span className="text-xs bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-2 py-1 rounded-full">
                    Property ID: {booking.propertyId}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Guest</p>
                      <p className="text-slate-600 dark:text-slate-400">{booking.guestInfo.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</p>
                      <p className="text-slate-600 dark:text-slate-400">{booking.guestInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</p>
                      <p className="text-slate-600 dark:text-slate-400">{booking.guestInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Flag className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Nationality</p>
                      <p className="text-slate-600 dark:text-slate-400">{booking.guestInfo.nationality}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Move-in Date</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {new Date(booking.stayDetails.moveInDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Duration</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {booking.stayDetails.duration} {booking.stayDetails.durationType}
                      </p>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mt-1 mr-2 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</p>
                        <p className="text-slate-600 dark:text-slate-400 italic">
                          "{booking.message}"
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Requested on: {new Date(booking.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
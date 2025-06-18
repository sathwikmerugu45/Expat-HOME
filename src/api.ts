/* eslint-disable @typescript-eslint/no-explicit-any */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const getBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
};

export const getProperties = async () => {
  const response = await fetch(`${API_BASE_URL}/properties`);
  if (!response.ok) throw new Error('Failed to fetch properties');
  return response.json();
};

export const getPropertyById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`);
  if (!response.ok) throw new Error('Failed to fetch property');
  return response.json();
};

export const updatePropertyById = async (id: number, data: any) => {
  const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update property');
  return response.json();
};

export const createBooking = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
};
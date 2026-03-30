'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, DollarSign } from 'lucide-react';

interface Booking {
  id: string;
  customerId: string;
  villaName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  ratePerNight: number;
  totalAmount: number;
  currency: string;
  status: string;
  source: string;
  gclid?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  enquiry: 'bg-blue-100 text-blue-700',
  quoted: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-gray-100 text-gray-600',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) setBookings(await res.json());
    } catch { /* empty */ }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif text-navy">Bookings & Enquiries</h1>
        <p className="text-gray-500 text-sm">{bookings.length} total</p>
      </div>

      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Villa</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Guests</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Rate</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Source</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                  No bookings yet. When customers submit enquiries, they appear here.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono text-xs text-gray-500">{b.id}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-navy">{b.villaName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs">
                      <CalendarDays className="w-3 h-3 text-gray-400" />
                      {b.checkIn} → {b.checkOut}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {b.adults}A {b.children > 0 ? `+ ${b.children}C` : ''}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-gold" />
                      <span className="font-medium">{formatCurrency(b.ratePerNight)}</span>
                      <span className="text-xs text-gray-400">/night</span>
                    </div>
                    <div className="text-xs text-gray-400">Total: {formatCurrency(b.totalAmount)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-medium ${statusColors[b.status] || statusColors.enquiry}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {b.source}
                    {b.gclid && <span className="ml-1 text-cyan-500">📍 Ads</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

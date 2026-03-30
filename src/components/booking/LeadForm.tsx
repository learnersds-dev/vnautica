'use client';

import { useState, useEffect } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { LeadFormData } from '@/types';
import { villas } from '@/lib/villas-data';

interface LeadFormProps {
  preselectedVilla?: string;
  compact?: boolean;
  source?: string;
}

export default function LeadForm({ preselectedVilla, compact = false, source = 'website' }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState<Partial<LeadFormData>>({
    villaPreference: preselectedVilla || '',
    adults: 2,
    children: 0,
    marketingConsent: false,
  });

  // Capture Google Ads UTM params
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setForm((prev) => ({
      ...prev,
      gclid: params.get('gclid') || undefined,
      utm_source: params.get('utm_source') || source,
      utm_medium: params.get('utm_medium') || undefined,
      utm_campaign: params.get('utm_campaign') || undefined,
      utm_term: params.get('utm_term') || undefined,
    }));
  }, [source]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // POST to backend CRM
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      // Fire Google Ads conversion tracking
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const w = window as unknown as { gtag: (...args: unknown[]) => void };
        w.gtag('event', 'conversion', {
          send_to: 'AW-XXXXXXXXX/XXXXXXXX',
          value: 1.0,
          currency: 'USD',
        });
      }

      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Lead submission error:', err);
      setSubmitting(false);
      setError(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="font-serif text-2xl text-navy mb-2">Thank You</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Your enquiry has been received. Our dedicated reservation team will contact you within 2 hours with personalized rates and availability.
        </p>
        <p className="text-gold text-sm mt-4 font-medium">
          For immediate assistance: +960 664 1010
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!compact && (
        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl text-navy mb-1">Request Exclusive Rates</h3>
          <p className="text-gray-500 text-sm">Our team will craft a personalized proposal within 2 hours</p>
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-firstName" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">First Name *</label>
          <input
            id="lead-firstName"
            type="text"
            name="firstName"
            required
            value={form.firstName || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
            placeholder="Your first name"
          />
        </div>
        <div>
          <label htmlFor="lead-lastName" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Last Name *</label>
          <input
            id="lead-lastName"
            type="text"
            name="lastName"
            required
            value={form.lastName || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
            placeholder="Your last name"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-email" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email *</label>
          <input
            id="lead-email"
            type="email"
            name="email"
            required
            value={form.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            value={form.phone || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="lead-checkIn" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Check-in Date *</label>
          <input
            id="lead-checkIn"
            type="date"
            name="checkIn"
            required
            value={form.checkIn || ''}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lead-checkOut" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Check-out Date *</label>
          <input
            id="lead-checkOut"
            type="date"
            name="checkOut"
            required
            value={form.checkOut || ''}
            onChange={handleChange}
            min={form.checkIn || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
          />
        </div>
      </div>

      {/* Villa & Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <label htmlFor="lead-villa" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Villa Preference</label>
          <select
            id="lead-villa"
            name="villaPreference"
            value={form.villaPreference || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
          >
            <option value="">Any villa</option>
            {villas.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-adults" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Adults</label>
          <select
            id="lead-adults"
            name="adults"
            value={form.adults}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lead-children" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Children</label>
          <select
            id="lead-children"
            name="children"
            value={form.children}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors bg-white"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} Child{n !== 1 ? 'ren' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Special Requests */}
      {!compact && (
        <div>
          <label htmlFor="lead-requests" className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Special Requests</label>
          <textarea
            id="lead-requests"
            name="specialRequests"
            value={form.specialRequests || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
            placeholder="Honeymoon celebration, dietary requirements, transfer preferences..."
          />
        </div>
      )}

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="marketingConsent"
          checked={form.marketingConsent}
          onChange={handleChange}
          className="mt-1 w-4 h-4 accent-gold"
        />
        <span className="text-xs text-gray-400 leading-relaxed">
          I agree to receive exclusive offers and travel updates from Reservations & Sales regarding Villa Nautica. You can unsubscribe at any time.
        </span>
      </label>

      {/* Submit */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        fullWidth
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Enquiry...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Get Your Exclusive Quote
          </>
        )}
      </Button>

      {error && (
        <p className="text-sm text-red-500 text-center">
          Something went wrong. Please try again or call +960 664 1010 directly.
        </p>
      )}

      <p className="text-[10px] text-gray-400 text-center">
        No payment required. Free cancellation. Our team responds within 2 hours.
      </p>
    </form>
  );
}

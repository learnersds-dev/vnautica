'use client';

import { useEffect, useState } from 'react';
import { Anchor, Star, Phone, Shield, Clock, Plane, Check, RefreshCw } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import { useRates } from '@/hooks/useRates';
import RateDisplay from '@/components/ui/RateDisplay';
import LeadForm from '@/components/booking/LeadForm';
import Button from '@/components/ui/Button';

/**
 * Google Ads Search Landing Page
 *
 * This page is optimized for Google Ads search campaigns:
 * - Minimal navigation (no header/footer distractions)
 * - Above-the-fold CTA and trust signals
 * - UTM parameter capture (gclid, utm_source, etc.)
 * - Conversion tracking via gtag
 * - Fast load with minimal JS
 * - Mobile-first responsive design
 * - Live rates create urgency
 */

const trustSignals = [
  'Best Rate Guaranteed — Save 9%',
  'Free Cancellation up to 14 Days',
  'Complimentary Speedboat Transfer',
  'Dedicated Reservation Specialist',
  '20 Minutes from Malé Airport',
];

const villaImages: Record<string, string> = {
  'one-bed-ocean-suite-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Royal-Island-Two-Bedroom-Beach-Pool-Residence-Aerial-Large.jpg?w=600&q=70&auto=format',
  'sunset-deluxe-beach-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Deluxe-Beach-Pool-Villa-Bedroom-Large.jpg?w=600&q=70&auto=format',
  'water-villa-whirlpool': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=600&q=70&auto=format',
  'beach-villa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/01/Villa-Park-0115_1600x900.jpg?w=600&q=70&auto=format',
};

// Show top 4 most popular villas for the ads page
const featuredVillaIds = [
  'one-bed-ocean-suite-pool',
  'sunset-deluxe-beach-pool',
  'water-villa-whirlpool',
  'beach-villa',
];

export default function AdsVillasPage() {
  const [loaded, setLoaded] = useState(false);
  const { loading, getRateForVilla, lastUpdated, refetch } = useRates();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const featuredVillas = villas.filter((v) => featuredVillaIds.includes(v.id));

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Ads Header — no navigation links (reduces bounce) */}
      <header className="bg-navy py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-gold" />
            <span className="font-serif text-white text-lg">Villa Nautica</span>
            <span className="text-white/40 text-xs ml-1">Maldives</span>
          </div>
          <a
            href="tel:+9606641010"
            className="flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-light transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+960 664 1010</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* Hero — Compact, conversion-focused */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=1600&q=75&auto=format')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-navy-dark/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Value proposition */}
            <div
              className={`text-white transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
                <span className="text-white/60 text-xs ml-2">5-Star Luxury</span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                Exclusive 9% Off<br />
                <span className="text-gold">Every Villa</span>
              </h1>

              <p className="text-white/70 text-lg mb-6 leading-relaxed max-w-lg">
                Luxury overwater and beach villas at Villa Nautica, Paradise Island.
                Live rates, instant confirmation, complimentary transfers.
              </p>

              {/* Trust signals */}
              <ul className="space-y-2 mb-8">
                {trustSignals.map((signal) => (
                  <li key={signal} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {signal}
                  </li>
                ))}
              </ul>

              {/* Social proof */}
              <div className="flex items-center gap-4 text-xs text-white/40 border-t border-white/10 pt-4">
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-gold" />
                  Best Rate Guaranteed
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  Reply within 2 Hours
                </div>
                <div className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-gold" />
                  Free Transfer
                </div>
              </div>
            </div>

            {/* Right — Lead Form (above the fold) */}
            <div
              id="enquiry-form"
              className={`bg-white rounded-sm shadow-2xl p-6 lg:p-8 transition-all duration-700 delay-300 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <LeadForm compact source="google-ads-search" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas with Live Rates */}
      <section className="py-12 lg:py-16 bg-sand-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl text-navy mb-2">Featured Villas — Live Rates</h2>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString()}`
                : 'Loading live rates...'}
              <button onClick={refetch} className="ml-1 hover:text-gold transition-colors">
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVillas.map((villa) => {
              const rate = getRateForVilla(villa.id);
              return (
                <div
                  key={villa.id}
                  className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${villaImages[villa.id] || 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=600&q=70&auto=format'}')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="font-serif text-xl text-white">{villa.name}</h3>
                      <p className="text-white/70 text-xs">{villa.size} • Up to {villa.maxGuests} guests</p>
                    </div>
                  </div>

                  <div className="p-5 flex items-end justify-between">
                    <RateDisplay rate={rate} loading={loading} compact />
                    <a href="#enquiry-form">
                      <Button variant="gold" size="sm">
                        Enquire
                      </Button>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl text-navy">Get Your Exclusive Rate</h2>
            <p className="text-gray-500 text-sm">Personal response within 2 hours</p>
          </div>
          <LeadForm compact source="google-ads-bottom-cta" />
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-navy py-6 px-6 text-center">
        <div className="text-white/40 text-xs space-y-1">
          <p>Villa Nautica Maldives • Paradise Island, North Malé Atoll</p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

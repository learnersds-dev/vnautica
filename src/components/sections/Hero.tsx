'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Star } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-[60px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[3000ms]"
          style={{
            backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=1920&q=80&auto=format')`,
            transform: loaded ? 'scale(1)' : 'scale(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/60 via-navy-dark/30 to-navy-dark/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        {/* Pre-headline */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-medium">
              Paradise Island, Maldives
            </span>
            <div className="h-px w-8 bg-gold" />
          </div>
        </div>

        {/* Main Headline — Apple-style large type */}
        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] mb-6 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Villa Nautica
        </h1>

        {/* Tagline */}
        <p
          className={`text-xl md:text-2xl font-light text-white/80 mb-3 transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Celebrate the glamour of cosmopolitan quayside living
        </p>

        {/* Rating */}
        <div
          className={`flex items-center justify-center gap-1 mb-8 transition-all duration-1000 delay-800 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gold fill-gold" />
          ))}
          <span className="text-white/60 text-sm ml-2">5-Star Luxury Resort</span>
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link href="/villas">
            <Button variant="gold" size="lg">
              View Exclusive Rates
            </Button>
          </Link>
          <Link href="/#villas">
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              Explore Villas
            </Button>
          </Link>
        </div>

        {/* Trust signals */}
        <div
          className={`mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50 uppercase tracking-wider transition-all duration-1000 delay-[1200ms] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>20 Min from Airport</span>
          <span className="hidden sm:inline">•</span>
          <span>10 Villa Categories</span>
          <span className="hidden sm:inline">•</span>
          <span>9 Dining Venues</span>
          <span className="hidden sm:inline">•</span>
          <span>Best Rate Guaranteed</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}

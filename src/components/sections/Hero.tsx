'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden pt-[60px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[3000ms]"
          style={{
            backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=1920&q=80&auto=format')`,
            transform: loaded ? 'scale(1)' : 'scale(1.05)',
          }}
        />
        {/* Aurora overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a3a4a]/50 via-transparent to-[#0a2a3c]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d4a5a]/30 via-transparent to-[#3a1a6a]/20" />
      </div>

      {/* Content — glass container */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div
          className={`glass px-10 py-12 md:px-16 md:py-16 rounded-2xl transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Location Label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs uppercase tracking-[0.4em] font-medium">
              Paradise Island, Maldives
            </span>
            <div className="h-px w-10 bg-gold/50" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-semibold leading-[0.95] mb-4">
            Villa Nautica, Maldives
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-light text-white/70 mb-8 max-w-lg mx-auto">
            Experience the liquid glass elegance of the Indian Ocean
          </p>

          {/* CTA */}
          <Link
            href="/villas"
            className="inline-block btn-gold-gradient px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold"
          >
            Discover Your Paradise
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}

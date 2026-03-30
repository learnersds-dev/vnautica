'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=1920&q=80&auto=format')`,
          }}
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
        <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Limited Time Offer</span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
          Save 9% on Every Villa
        </h2>
        <p className="text-white/70 text-lg mb-4 leading-relaxed">
          Book directly with us and enjoy exclusive rates not available on any other platform.
          Our dedicated reservation team is ready to craft your perfect Maldivian escape.
        </p>
        <p className="text-gold text-sm mb-8">
          Includes complimentary breakfast, speedboat transfers, and a sunset champagne experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/villas">
            <Button variant="gold" size="lg">
              View Live Rates
            </Button>
          </Link>
          <a href="tel:+9606641010">
            <Button
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              Call +960 664 1010
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

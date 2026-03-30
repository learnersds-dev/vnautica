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

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="glass rounded-sm px-8 py-12 lg:px-12 lg:py-16 glass-shimmer">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Reservations & Sales</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mt-4 mb-6">
            Exclusive Rates Through Us
          </h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Book Villa Nautica through Reservations & Sales for guaranteed best rates on every villa.
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
      </div>
    </section>
  );
}

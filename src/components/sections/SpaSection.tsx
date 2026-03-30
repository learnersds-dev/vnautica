'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

const treatments = [
  { name: 'Ayurvedic Journeys', desc: 'Traditional Ayurvedic treatments for deep relaxation' },
  { name: 'Thai Massage', desc: 'Ancient stretching and pressure-point therapy' },
  { name: 'Couples Retreat', desc: 'Side-by-side treatments in the overwater pavilion' },
];

export default function SpaSection({ teaser }: { teaser?: boolean }) {
  return (
    <section className="aurora-bg-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=900&q=80&auto=format')`,
                }}
              />
            </div>
            {/* Floating glass quote */}
            <div className="absolute -bottom-6 -right-6 glass-light p-6 rounded-xl shadow-xl max-w-xs hidden lg:block animate-float">
              <p className="font-serif text-navy text-lg italic">
                &ldquo;A tranquil sanctuary where time slows and the soul replenishes.&rdquo;
              </p>
              <p className="text-gold text-sm mt-2">— Araamu Spa</p>
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:pl-8">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Wellness</span>
            <h2 className="font-serif text-4xl md:text-5xl text-navy mt-3 mb-6">
              Araamu Spa & Wellness Retreat
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A sanctuary for the senses, embraced by the ocean. Holistic treatments that draw from ancient Maldivian healing traditions.
            </p>

            {/* Treatment cards */}
            <div className="space-y-4 mb-8">
              {treatments.map((t) => (
                <div key={t.name} className="glass-card-light rounded-xl p-4">
                  <h3 className="font-serif text-navy font-medium">{t.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{t.desc}</p>
                </div>
              ))}
            </div>

            <Link href={teaser ? '/spa' : '/villas'}>
              <Button variant="primary">
                {teaser ? 'Discover Araamu Spa' : 'Enquire About Spa Packages'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

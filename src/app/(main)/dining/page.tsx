'use client';

import { diningVenues } from '@/lib/villas-data';
import { Clock, Sparkles } from 'lucide-react';
import LeadForm from '@/components/booking/LeadForm';

const diningImages: Record<string, string> = {
  'bageecha': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/10/Villa-Nautica_0018_1350x1080.jpg?w=800&q=75&auto=format',
  'the-lagoon': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=800&q=75&auto=format',
  'al-tramonto': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=800&q=75&auto=format',
  'fukuya': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/10/Villa-Nautica_0018_1350x1080.jpg?w=800&q=75&auto=format&fit=crop&crop=bottom',
  'hook': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=800&q=75&auto=format',
  'captains-bar': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=800&q=75&auto=format',
};

export default function DiningPage() {
  return (
    <div className="pt-32 pb-0">
      {/* Hero — Aurora background matching Stitch screen 3 */}
      <section className="aurora-bg py-20 mb-0">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em]">Culinary</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mt-3 mb-4">Nine Worlds of Flavour</h1>
          <p className="text-white/50 text-lg">An Exquisite Dining Experience</p>
        </div>
      </section>

      {/* Dining Grid — Glass cards on aurora background (matching Stitch) */}
      <section className="aurora-bg py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diningVenues.map((venue) => (
              <div
                key={venue.id}
                className="group glass-card rounded-xl overflow-hidden glass-shimmer"
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${diningImages[venue.id] || diningImages['bageecha']}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                  <div className="absolute top-3 right-3 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {venue.cuisine}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gold transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                    {venue.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {venue.hours}
                    </div>
                    <div className="flex items-center gap-1.5 text-gold/70">
                      <Sparkles className="w-3.5 h-3.5" />
                      {venue.highlight}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Glass form on aurora bg */}
      <section className="aurora-bg py-16">
        <div className="max-w-lg mx-auto px-6">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-2">Reserve Your Table</h2>
            <p className="text-white/50 text-sm mb-6">Indulge in Unforgettable Culinary Journeys</p>
            <div className="glass-light rounded-xl p-6">
              <LeadForm compact source="dining-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

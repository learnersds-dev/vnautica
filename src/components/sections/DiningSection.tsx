'use client';

import { diningVenues } from '@/lib/villas-data';
import { Clock, Sparkles } from 'lucide-react';

const diningImages: Record<string, string> = {
  'bageecha': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/10/Villa-Nautica_0018_1350x1080.jpg?w=600&q=70&auto=format',
  'the-lagoon': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=600&q=70&auto=format',
  'al-tramonto': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=600&q=70&auto=format',
  'fukuya': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/10/Villa-Nautica_0018_1350x1080.jpg?w=600&q=70&auto=format&fit=crop&crop=bottom',
  'hook': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=600&q=70&auto=format',
  'captains-bar': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=600&q=70&auto=format',
};

export default function DiningSection() {
  return (
    <section id="dining" className="py-24 lg:py-32 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Culinary</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-5">
            Nine Worlds of Flavour
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            From teppanyaki theatre to sunset Italian dining, each restaurant tells a story of the sea.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningVenues.map((venue) => (
            <div
              key={venue.id}
              className="group bg-navy-light/50 rounded-sm overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${diningImages[venue.id] || diningImages['bageecha']}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-gold/90 text-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  {venue.cuisine}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl mb-2 group-hover:text-gold transition-colors">
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
  );
}

'use client';

import Link from 'next/link';
import { ArrowRight, Waves, TreePalm, Sun } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import Button from '@/components/ui/Button';

const categoryIcons = {
  'overwater': Waves,
  'beach': TreePalm,
  'ocean-suite': Sun,
};

const categoryLabels = {
  'overwater': 'Overwater',
  'beach': 'Beachfront',
  'ocean-suite': 'Ocean Suite',
};

const villaImages: Record<string, string> = {
  'two-bed-ocean-suite-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/10/Villa-Haven-2-Bedroom-Residence-Render-1958-x-1228.jpg?w=800&q=70&auto=format',
  'one-bed-ocean-suite-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Royal-Island-Two-Bedroom-Beach-Pool-Residence-Aerial-Large.jpg?w=800&q=70&auto=format',
  'oceanfront-pool-villa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=800&q=70&auto=format',
  'water-villa-whirlpool': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=800&q=70&auto=format',
  'two-bed-beach-villa-pools': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/10/Villa-Haven-2-Bedroom-Residence-Render-1958-x-1228.jpg?w=800&q=70&auto=format',
  'sunset-deluxe-beach-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Deluxe-Beach-Pool-Villa-Bedroom-Large.jpg?w=800&q=70&auto=format',
  'sunset-beach-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=800&q=70&auto=format',
  'deluxe-beach-pool': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Deluxe-Beach-Pool-Villa-Bedroom-Large.jpg?w=800&q=70&auto=format',
  'water-villa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=800&q=70&auto=format',
  'beach-villa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/01/Villa-Park-0115_1600x900.jpg?w=800&q=70&auto=format',
};

export default function VillaShowcase({ teaser }: { teaser?: boolean }) {
  const featured = teaser ? villas.slice(0, 3) : villas.slice(0, 6);

  return (
    <section className="aurora-bg-light py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Accommodation</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy mt-3 mb-5">
            Paradise Found
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Explore handpicked villas with crystal-clear transitions
          </p>
        </div>

        {/* Villa Grid — Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((villa) => {
            const Icon = categoryIcons[villa.category];
            return (
              <Link
                key={villa.id}
                href={`/villas#${villa.id}`}
                className="group glass-card-light rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${villaImages[villa.id] || villaImages['beach-villa']}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />

                  {/* Category + Features badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 glass px-3 py-1.5 rounded-full">
                    <Icon className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs font-medium text-white uppercase tracking-wider">
                      {categoryLabels[villa.category]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 flex-wrap">
                    {villa.hasPool && (
                      <span className="text-[10px] bg-gold/90 text-navy font-medium px-2 py-0.5 rounded-full uppercase">
                        Private Pool
                      </span>
                    )}
                    <span className="text-[10px] bg-white/80 text-navy font-medium px-2 py-0.5 rounded-full uppercase">
                      {villa.size}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl text-navy mb-2 group-hover:text-gold transition-colors">
                    {villa.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {villa.tagline}
                  </p>
                  <div className="flex items-center text-gold text-sm font-medium">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link href="/villas">
            <Button variant="primary" size="lg">
              View All Villas & Live Rates
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

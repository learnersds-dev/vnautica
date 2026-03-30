'use client';

import Link from 'next/link';
import { experiences } from '@/lib/villas-data';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const imageUrls: Record<string, string> = {
  'crows-nest': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=800&q=70&auto=format',
  'araamu-spa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=600&q=70&auto=format',
  'diving': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=600&q=70&auto=format',
  'seawall-picnic': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=600&q=70&auto=format',
  'sunset-cruise': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Royal-Island-Two-Bedroom-Beach-Pool-Residence-Aerial-Large.jpg?w=600&q=70&auto=format',
  'captains-class': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/01/Villa-Park-0115_1600x900.jpg?w=600&q=70&auto=format',
};

export default function ExperiencesSection({ teaser }: { teaser?: boolean }) {
  const items = teaser ? experiences.slice(0, 3) : experiences;

  return (
    <section className="aurora-bg py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Experiences</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-5">
            Beyond Extraordinary
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Experience the liquid glass elegance of the Indian Ocean
          </p>
        </div>

        {/* Glass cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((exp) => (
            <div
              key={exp.id}
              className="group glass-card rounded-xl overflow-hidden glass-shimmer"
            >
              <div className="relative h-[220px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${imageUrls[exp.id] || imageUrls['diving']}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-medium">
                    {exp.category}
                  </span>
                  <h3 className="font-serif text-xl text-white mt-1">
                    {exp.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>
                <span className="inline-block btn-gold-gradient px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold cursor-pointer">
                  Book Your {exp.category === 'dining' ? 'Table' : exp.category === 'wellness' ? 'Session' : 'Adventure'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {teaser && (
          <div className="text-center mt-12">
            <Link href="/experiences">
              <Button variant="gold" size="lg">
                Discover All Experiences
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

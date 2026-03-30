'use client';

import { experiences } from '@/lib/villas-data';
import LeadForm from '@/components/booking/LeadForm';

const imageUrls: Record<string, string> = {
  'crows-nest': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=800&q=75&auto=format',
  'araamu-spa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=800&q=75&auto=format',
  'diving': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=800&q=75&auto=format',
  'seawall-picnic': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=800&q=75&auto=format',
  'sunset-cruise': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Royal-Island-Two-Bedroom-Beach-Pool-Residence-Aerial-Large.jpg?w=800&q=75&auto=format',
  'captains-class': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/01/Villa-Park-0115_1600x900.jpg?w=800&q=75&auto=format',
};

const ctaLabels: Record<string, string> = {
  dining: 'Book Your Table',
  wellness: 'Book Your Session',
  water: 'Book Your Dive',
  adventure: 'Book Your Cruise',
  culture: 'Book Your Class',
};

export default function ExperiencesPage() {
  return (
    <div className="pt-32 pb-0">
      {/* Hero */}
      <section className="aurora-bg py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em]">Experiences</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mt-3 mb-4">
            Bespoke Island Experiences
          </h1>
          <p className="text-white/50 text-lg">Moments that become lifelong memories</p>
        </div>
      </section>

      {/* Experiences grid — glass cards per Stitch screen 5 */}
      <section className="aurora-bg py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="group glass-card rounded-xl overflow-hidden glass-shimmer"
              >
                <div className="relative h-56 overflow-hidden">
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
                    {ctaLabels[exp.category] || 'Book Now'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="aurora-bg py-16">
        <div className="max-w-lg mx-auto px-6">
          <div className="glass rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-2">Booking Your Adventure</h2>
            <p className="text-white/50 text-sm mb-6">Tell us what interests you — we&apos;ll arrange the rest</p>
            <div className="glass-light rounded-xl p-6">
              <LeadForm compact source="experiences-page" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

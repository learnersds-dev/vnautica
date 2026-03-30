'use client';

import { experiences } from '@/lib/villas-data';

const imageUrls: Record<string, string> = {
  'crows-nest': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2026/03/%40Rosslongphoto-Villa-Nautica-Drone-6-Large.jpg?w=800&q=70&auto=format',
  'araamu-spa': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=600&q=70&auto=format',
  'diving': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=600&q=70&auto=format',
  'seawall-picnic': 'https://villlaresorts.imgix.net/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Sunset-Large.jpg?w=600&q=70&auto=format',
  'sunset-cruise': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Royal-Island-Two-Bedroom-Beach-Pool-Residence-Aerial-Large.jpg?w=600&q=70&auto=format',
  'captains-class': 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2023/01/Villa-Park-0115_1600x900.jpg?w=600&q=70&auto=format',
};

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Experiences</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy mt-3 mb-5">
            Beyond Extraordinary
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            From the depths of the Indian Ocean to the heights of the Crow&apos;s Nest, discover moments that become lifelong memories.
          </p>
        </div>

        {/* Bento-style grid — Apple-inspired modular layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={`group relative overflow-hidden rounded-sm cursor-pointer ${
                i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              <div
                className={`relative ${i === 0 ? 'h-[500px]' : 'h-[240px]'} overflow-hidden`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${imageUrls[exp.id] || imageUrls['diving']}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-medium">
                    {exp.category}
                  </span>
                  <h3 className={`font-serif text-white mt-1 mb-2 ${i === 0 ? 'text-3xl' : 'text-xl'}`}>
                    {exp.name}
                  </h3>
                  <p className={`text-white/70 leading-relaxed ${i === 0 ? 'text-base max-w-lg' : 'text-sm line-clamp-2'}`}>
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

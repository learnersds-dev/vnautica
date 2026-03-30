'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function SpaSection() {
  return (
    <section id="spa" className="py-24 lg:py-32 bg-sand-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative h-[500px] rounded-sm overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=900&q=80&auto=format')`,
                }}
              />
            </div>
            {/* Floating card accent — Apple-style overlapping element */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-sm shadow-xl max-w-xs hidden lg:block">
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
              Araamu Spa
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              Surrounded by tropical greenery, Araamu Spa is a peaceful hideaway offering holistic treatments that draw from ancient Maldivian healing traditions and modern wellness science.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Signature Maldivian massage rituals',
                'Ayurvedic and Thai treatment menu',
                'Couples overwater spa pavilion',
                'Tropical garden meditation space',
                'Detox and wellness programmes',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/villas">
              <Button variant="primary">
                Enquire About Spa Packages
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

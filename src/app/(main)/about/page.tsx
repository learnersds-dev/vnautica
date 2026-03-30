import { Anchor, MapPin, Plane, Award, Waves } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-0">
      {/* Hero */}
      <section className="aurora-bg py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em]">About the Resort</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mt-3 mb-4">Villa Nautica</h1>
          <p className="text-white/50 text-lg">Paradise Island, North Malé Atoll, Maldives</p>
        </div>
      </section>

      <div className="aurora-bg-light">
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Story */}
        <section>
          <h2 className="font-serif text-3xl text-navy mb-6">The Yacht-Life Experience</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Set on Paradise Island in the North Malé Atoll, just 20 minutes by speedboat from Velana International Airport, Villa Nautica embodies the glamour and excitement of yacht-life living.
            </p>
            <p>
              The resort features 10 distinct villa categories ranging from intimate beach retreats to expansive overwater suites with private pools, along with nine dining venues offering world-class cuisine.
            </p>
            <p>
              Signature experiences include the Crow&apos;s Nest lookout, Captain&apos;s Class nautical training, and the Cocoon Lounge — reflecting a personality that is sophisticated yet playful.
            </p>
          </div>
        </section>

        {/* Key Facts */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Anchor, label: '10 Villa Categories', detail: 'Beach, Overwater & Suites' },
            { icon: Award, label: '9 Dining Venues', detail: 'World-Class Cuisine' },
            { icon: Plane, label: '20 Min Transfer', detail: 'From Malé Airport' },
            { icon: Waves, label: 'Araamu Spa', detail: 'Holistic Wellness' },
          ].map((fact) => (
            <div key={fact.label} className="text-center p-6 glass-card-light rounded-xl">
              <fact.icon className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="text-navy font-semibold text-sm">{fact.label}</div>
              <div className="text-gray-500 text-xs mt-1">{fact.detail}</div>
            </div>
          ))}
        </section>

        {/* Location */}
        <section>
          <h2 className="font-serif text-3xl text-navy mb-6">Location</h2>
          <div className="flex items-start gap-3 text-gray-600">
            <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-navy">Paradise Island (Lankanfinolhu)</p>
              <p>North Malé Atoll, Republic of Maldives</p>
              <p className="text-sm mt-2">
                Just 20 minutes by speedboat from Velana International Airport (MLE).
              </p>
            </div>
          </div>
        </section>

        {/* R&S Disclosure */}
        <section className="glass p-6 rounded-xl bg-navy">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 text-xs font-semibold">Reservations & Sales</span>
            <span className="text-white/30 text-xs">— Official Booking Partner</span>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">
            This website is operated by Reservations & Sales, the official booking partner for Villa Nautica Maldives.
            All rates, availability, and booking services are provided by Reservations & Sales.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}

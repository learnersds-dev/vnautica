import { Anchor, MapPin, Plane, Award, Waves } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Hero */}
      <section className="relative h-[400px] overflow-hidden mb-16">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=1600&q=80&auto=format')`,
          }}
        />
        <div className="absolute inset-0 bg-navy-dark/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-6">
          <div>
            <span className="text-gold text-xs uppercase tracking-[0.3em]">About</span>
            <h1 className="font-serif text-5xl mt-3">Villa Nautica</h1>
            <p className="text-white/70 text-lg mt-3 max-w-lg mx-auto">
              Celebrate the glamour of cosmopolitan quayside living
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 space-y-16">
        {/* Story */}
        <section>
          <h2 className="font-serif text-3xl text-navy mb-6">The Yacht-Life Experience</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Villa Nautica is more than a resort — it&apos;s a celebration of the seafaring spirit. Set on Paradise Island in the
              North Malé Atoll, just 20 minutes by speedboat from Velana International Airport, the resort embodies the glamour
              and excitement of yacht-life living, where every moment is &ldquo;en vogue.&rdquo;
            </p>
            <p>
              With 10 distinct villa categories ranging from intimate beach retreats to expansive overwater suites with private pools,
              Villa Nautica offers a sanctuary for every type of traveller. Nine dining venues — from teppanyaki theatre at Fukuya to
              sunset Italian at Ristorante al Tramonto — ensure culinary adventures rival the ocean views.
            </p>
            <p>
              The resort&apos;s signature experiences — the Crow&apos;s Nest lookout, Captain&apos;s Class nautical training, and the Cocoon
              Lounge — reflect its unique personality: sophisticated yet playful, luxurious yet welcoming.
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
            <div key={fact.label} className="text-center p-6 bg-sand-light rounded-sm">
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
                Complimentary airport meet-and-greet and speedboat transfer included with direct bookings.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

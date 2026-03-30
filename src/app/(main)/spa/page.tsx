'use client';

import LeadForm from '@/components/booking/LeadForm';

const treatments = [
  { name: 'Ayurvedic Journeys', description: 'Traditional Ayurvedic treatments for deep relaxation, energy renewal, and holistic harmony.', features: ['Energy & Uplift', 'Health & Vitality', 'Detox Journey'] },
  { name: 'Thai Massage', description: 'Ancient Thai massage therapy that combines stretching, compression, and acupressure along the body\'s energy lines.' },
  { name: 'Couples Retreat', description: 'Side-by-side treatments in the overwater spa pavilion with champagne and ocean views.' },
  { name: 'Maldivian Healing Ritual', description: 'Ancient island techniques combined with aromatic coconut oil for deep restoration.' },
];

export default function SpaPage() {
  return (
    <div className="pt-32 pb-0">
      {/* Hero — Aurora background matching Stitch screen 4 */}
      <section className="aurora-bg py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em]">Wellness</span>
          <h1 className="font-serif text-5xl md:text-6xl text-white mt-3 mb-4">
            Araamu Spa & Wellness Retreat
          </h1>
          <p className="text-white/50 text-lg">A sanctuary for the senses, embraced by the ocean</p>
        </div>
      </section>

      {/* Split layout — treatments left, form right (per Stitch screen 4) */}
      <section className="aurora-bg py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* About text */}
          <div className="glass rounded-xl p-8 mb-12 max-w-3xl mx-auto">
            <p className="text-white/70 text-center leading-relaxed">
              Our Araamu Spa & Wellness Retreat is a sanctuary for the senses, a philosophy
              rooted in the ancient wisdom that true health encompasses body, mind, spirit,
              creativity, and purpose. Each session is personalised to ease the mind and
              deliver inspired and purposeful encounters with healing, calm, light.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Treatment cards */}
            <div className="space-y-6">
              {treatments.map((t) => (
                <div key={t.name} className="glass-card rounded-xl p-6 glass-shimmer">
                  <div className="flex gap-5">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Main-Pool-Daytime-Large.jpg?w=200&q=60&auto=format')`,
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1">{t.name}</h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-2">{t.description}</p>
                      {t.features && (
                        <div className="flex gap-2 flex-wrap">
                          {t.features.map((f) => (
                            <span key={f} className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="text-gold text-xs font-medium cursor-pointer mt-2 inline-block">
                        Learn More &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Inquiry form in glass panel */}
            <div>
              <div className="glass rounded-xl p-8 sticky top-32">
                <h2 className="font-serif text-2xl text-white mb-2">Inquire About Spa Packages</h2>
                <p className="text-white/40 text-sm mb-6">Our wellness team will personalise your journey</p>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Desired Dates"
                    className="glass-input w-full px-4 py-3 rounded-lg text-sm"
                  />
                  <textarea
                    placeholder="Message/Treatment Interest"
                    rows={3}
                    className="glass-input w-full px-4 py-3 rounded-lg text-sm resize-none"
                  />
                  <button className="btn-gold-gradient w-full py-3 rounded-full text-sm uppercase tracking-widest font-semibold">
                    Submit Inquiry
                  </button>
                </div>
                <p className="text-white/30 text-xs mt-4 text-center">
                  Araamu Spa & Wellness Retreat | +960 664 1010
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Waves, TreePalm, Sun, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import { useRates } from '@/hooks/useRates';
import RateDisplay from '@/components/ui/RateDisplay';
import LeadForm from '@/components/booking/LeadForm';
import Button from '@/components/ui/Button';

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

type FilterCategory = 'all' | 'overwater' | 'beach' | 'ocean-suite';

const filters: { key: FilterCategory; label: string; icon: typeof Waves }[] = [
  { key: 'all', label: 'All Villas', icon: SlidersHorizontal },
  { key: 'overwater', label: 'Overwater', icon: Waves },
  { key: 'beach', label: 'Beach', icon: TreePalm },
  { key: 'ocean-suite', label: 'Ocean Suites', icon: Sun },
];

export default function VillasPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedVilla, setSelectedVilla] = useState<string | null>(null);
  const { rates, loading, lastUpdated, getRateForVilla, refetch } = useRates();

  const filtered = activeFilter === 'all'
    ? villas
    : villas.filter((v) => v.category === activeFilter);

  return (
    <div className="pt-32">
      {/* Page Header */}
      <section className="bg-navy text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em] font-medium">Live Rates</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-3 mb-4">
            Villas & Rates
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-6">
            Real-time pricing with exclusive 9% savings on every villa. Rates update live — what you see is what you get.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            {lastUpdated
              ? `Rates updated ${lastUpdated.toLocaleTimeString()}`
              : 'Connecting to live rates...'}
            <button onClick={refetch} className="ml-2 hover:text-gold transition-colors" title="Refresh rates">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-sand-light border-b border-gray-200 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === f.key
                    ? 'bg-navy text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <f.icon className="w-4 h-4" />
                {f.label}
              </button>
            ))}
            <div className="ml-auto text-xs text-gray-400">
              {filtered.length} villa{filtered.length !== 1 ? 's' : ''} • {rates.length} rates loaded
            </div>
          </div>
        </div>
      </section>

      {/* Villa Listings with Rates */}
      <section className="py-12 lg:py-16 bg-sand-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {filtered.map((villa) => {
              const rate = getRateForVilla(villa.id);
              return (
                <div
                  key={villa.id}
                  id={villa.id}
                  className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    {/* Image */}
                    <div className="lg:col-span-2 relative h-64 lg:h-auto min-h-[280px]">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${villaImages[villa.id] || 'https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/12/Villa-Nautica.jpg?w=800&q=70&auto=format'}')`,
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-gold text-navy text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm">
                        Save {rate?.discountPercent || 9}%
                      </div>
                      {rate?.availability === 'limited' && (
                        <div className="absolute top-4 right-4 bg-coral text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm animate-pulse">
                          Limited
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <h2 className="font-serif text-2xl text-navy mb-2">{villa.name}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                          {villa.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {villa.features.slice(0, 5).map((f) => (
                            <span
                              key={f}
                              className="text-[11px] bg-sand-light text-gray-600 px-2.5 py-1 rounded-sm"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{villa.size}</span>
                        <span>•</span>
                        <span>Up to {villa.maxGuests} guests</span>
                        <span>•</span>
                        <span>{villa.bedrooms} bedroom{villa.bedrooms > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Rate & CTA */}
                    <div className="lg:col-span-1 p-6 lg:p-8 bg-sand-light/50 flex flex-col justify-between border-l border-gray-100">
                      <RateDisplay rate={rate} loading={loading} />
                      <div className="mt-6 space-y-2">
                        <Button
                          variant="gold"
                          fullWidth
                          onClick={() => setSelectedVilla(villa.id)}
                        >
                          Request Quote
                        </Button>
                        <p className="text-[10px] text-gray-400 text-center">
                          No payment required
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" className="py-16 lg:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <LeadForm preselectedVilla={selectedVilla || ''} source="villas-page" />
        </div>
      </section>

      {/* Enquiry Modal — triggered by "Request Quote" buttons */}
      {selectedVilla && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm"
            onClick={() => setSelectedVilla(null)}
          />
          <div className="relative bg-white rounded-sm shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 animate-fade-in-up">
            <button
              onClick={() => setSelectedVilla(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy text-2xl leading-none"
              aria-label="Close enquiry form"
            >
              &times;
            </button>
            <LeadForm
              preselectedVilla={selectedVilla}
              compact
              source="villa-rate-card"
            />
          </div>
        </div>
      )}
    </div>
  );
}

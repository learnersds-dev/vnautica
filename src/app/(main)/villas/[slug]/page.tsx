'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, MapPin, Users, Maximize, Bed } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import { useRates } from '@/hooks/useRates';
import RateDisplay from '@/components/ui/RateDisplay';
import LeadForm from '@/components/booking/LeadForm';
import Button from '@/components/ui/Button';

export default function VillaDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const villa = villas.find((v) => v.slug === slug);
  const { loading, getRateForVilla } = useRates();
  const [showForm, setShowForm] = useState(false);

  if (!villa) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-serif text-3xl text-navy mb-4">Villa Not Found</h1>
        <Link href="/villas" className="text-gold hover:underline">← Back to all villas</Link>
      </div>
    );
  }

  const rate = getRateForVilla(villa.id);

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link href="/villas" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gold transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All Villas & Rates
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative h-[400px] lg:h-[500px] rounded-sm overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://hotelcms-production.imgix.net/villaresorts.com/wp-content/uploads/2022/11/Villa-Nautica-Deluxe-Beach-Pool-Villa-Bedroom-Large.jpg?w=1400&q=80&auto=format')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <span className="text-gold text-xs uppercase tracking-[0.3em]">{villa.category.replace('-', ' ')}</span>
            <h1 className="font-serif text-4xl lg:text-5xl text-white mt-1">{villa.name}</h1>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <p className="text-gold text-sm uppercase tracking-widest mb-3">{villa.tagline}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{villa.description}</p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-6 bg-sand-light rounded-sm">
              <div className="text-center">
                <Maximize className="w-5 h-5 text-gold mx-auto mb-1" />
                <div className="text-navy font-semibold">{villa.size}</div>
                <div className="text-xs text-gray-500">Villa Size</div>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                <div className="text-navy font-semibold">Up to {villa.maxGuests}</div>
                <div className="text-xs text-gray-500">Guests</div>
              </div>
              <div className="text-center">
                <Bed className="w-5 h-5 text-gold mx-auto mb-1" />
                <div className="text-navy font-semibold">{villa.bedrooms}</div>
                <div className="text-xs text-gray-500">Bedroom{villa.bedrooms > 1 ? 's' : ''}</div>
              </div>
              <div className="text-center">
                <MapPin className="w-5 h-5 text-gold mx-auto mb-1" />
                <div className="text-navy font-semibold capitalize">{villa.viewType}</div>
                <div className="text-xs text-gray-500">View</div>
              </div>
            </div>

            {/* Features */}
            <h3 className="font-serif text-2xl text-navy mb-4">Villa Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {villa.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-gold flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — Rate & Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 bg-white border border-gray-100 rounded-sm shadow-lg p-6">
              <h3 className="font-serif text-lg text-navy mb-4">Exclusive Rate</h3>
              <RateDisplay rate={rate} loading={loading} />

              <div className="mt-6 space-y-3">
                <Button variant="gold" fullWidth onClick={() => setShowForm(true)}>
                  Request This Villa
                </Button>
                <a href="tel:+9606641010" className="block text-center text-sm text-gray-500 hover:text-gold transition-colors">
                  or call +960 664 1010
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-1">
                <p>✓ Best Rate Guaranteed — Save 9%</p>
                <p>✓ Free Cancellation (14 days)</p>
                <p>✓ Complimentary Speedboat Transfer</p>
                <p>✓ Personal Reservation Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy-dark/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-white rounded-sm shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8 animate-fade-in-up">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-navy text-2xl" aria-label="Close enquiry form">&times;</button>
            <LeadForm preselectedVilla={villa.id} compact source="villa-detail" />
          </div>
        </div>
      )}
    </div>
  );
}

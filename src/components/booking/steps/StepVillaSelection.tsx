'use client';

import { useRef, useEffect } from 'react';
import { Check, Plus } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import { villaImages, defaultVillaImage } from '@/lib/villa-images';
import { useRates } from '@/hooks/useRates';

interface Props {
  selectedVilla: string;
  onSelect: (villaId: string) => void;
}

export default function StepVillaSelection({ selectedVilla, onSelect }: Props) {
  const { getRateForVilla, loading } = useRates();
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  // Scroll to selected card on mount
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  return (
    <div>
      {/* Horizontal villa slider */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-6 pt-2 px-1 wizard-scroll-hide snap-x snap-mandatory"
      >
        {villas.map((villa) => {
          const rate = getRateForVilla(villa.id);
          const isSelected = selectedVilla === villa.id;

          return (
            <div
              key={villa.id}
              ref={isSelected ? selectedRef : undefined}
              className="min-w-[280px] md:min-w-[320px] snap-center flex-shrink-0"
            >
              <div
                className={`liquid-card rounded-xl overflow-hidden cursor-pointer group ${
                  isSelected ? 'selected' : ''
                }`}
                onClick={() => onSelect(villa.id)}
              >
                {/* Image */}
                <div className="h-44 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${villaImages[villa.id] || defaultVillaImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Popular badge for first villa */}
                  {villa.id === villas[0].id && (
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white uppercase border border-white/10">
                      Popular
                    </div>
                  )}

                  {/* Selected overlay */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                </div>

                {/* Content */}
                <div className={`p-5 ${isSelected ? 'bg-white/5' : ''}`}>
                  <h3 className="font-serif text-lg text-white mb-3 line-clamp-1">{villa.name}</h3>
                  <div className="flex justify-between items-center">
                    {/* Price */}
                    <div>
                      {loading ? (
                        <div className="h-6 w-20 bg-white/10 rounded animate-pulse" />
                      ) : rate ? (
                        <span className="text-xl font-serif text-white">
                          ${rate.discountedRate.toLocaleString()}
                          <span className="text-[10px] font-sans text-white/50 tracking-wider ml-1">/NT</span>
                        </span>
                      ) : (
                        <span className="text-sm text-white/40">Rate on request</span>
                      )}
                    </div>

                    {/* Select button */}
                    {isSelected ? (
                      <div className="bg-white px-4 py-2 rounded-full text-[#00464a] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        Selected
                      </div>
                    ) : (
                      <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#00464a] transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { RateData } from '@/types';

interface RateDisplayProps {
  rate: RateData | undefined;
  loading: boolean;
  compact?: boolean;
}

export default function RateDisplay({ rate, loading, compact = false }: RateDisplayProps) {
  if (loading) {
    return (
      <div className={compact ? 'space-y-1' : 'space-y-2'}>
        <div className="rate-skeleton h-4 w-20" />
        <div className="rate-skeleton h-8 w-32" />
        <div className="rate-skeleton h-3 w-24" />
      </div>
    );
  }

  if (!rate) {
    return (
      <div className="text-gray-400 text-sm italic">
        Rate unavailable — contact us for pricing
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: rate.currency, minimumFractionDigits: 0 }).format(amount);

  const savings = rate.baseRate - rate.discountedRate;

  return (
    <div className={compact ? 'space-y-0.5' : 'space-y-1'}>
      {/* Rack rate (crossed out) */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400 line-through text-sm">
          {formatCurrency(rate.baseRate)}
        </span>
        <span className="bg-coral text-white text-xs font-bold px-2 py-0.5 rounded">
          SAVE {rate.discountPercent}%
        </span>
      </div>

      {/* Our discounted rate */}
      <div className="flex items-baseline gap-1">
        <span className={`font-serif font-bold text-navy ${compact ? 'text-2xl' : 'text-3xl'}`}>
          {formatCurrency(rate.discountedRate)}
        </span>
        <span className="text-gray-500 text-sm">/night</span>
      </div>

      {/* Savings and meta */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span className="text-green-600 font-medium">
          You save {formatCurrency(savings)} per night
        </span>
        <span>•</span>
        <span>{rate.mealPlan}</span>
        {rate.availability === 'limited' && (
          <>
            <span>•</span>
            <span className="text-coral font-semibold animate-pulse">Limited availability</span>
          </>
        )}
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-1.5 mt-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Live rate</span>
      </div>
    </div>
  );
}

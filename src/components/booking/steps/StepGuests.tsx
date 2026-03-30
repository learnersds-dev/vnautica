'use client';

import { Minus, Plus } from 'lucide-react';

interface Props {
  adults: number;
  children: number;
  onChange: (field: string, value: number) => void;
}

function Counter({ label, subtitle, value, min, max, onDecrement, onIncrement }: {
  label: string;
  subtitle: string;
  value: number;
  min: number;
  max: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="liquid-card rounded-xl p-6 flex items-center justify-between">
      <div>
        <h3 className="text-white font-medium text-lg">{label}</h3>
        <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-2xl font-serif text-white w-8 text-center">{value}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function StepGuests({ adults, children, onChange }: Props) {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <p className="text-white/50 text-center text-sm mb-8">
        How many guests will be staying?
      </p>

      <Counter
        label="Adults"
        subtitle="Ages 13+"
        value={adults}
        min={1}
        max={10}
        onDecrement={() => onChange('adults', adults - 1)}
        onIncrement={() => onChange('adults', adults + 1)}
      />
      <Counter
        label="Children"
        subtitle="Ages 0–12"
        value={children}
        min={0}
        max={6}
        onDecrement={() => onChange('children', children - 1)}
        onIncrement={() => onChange('children', children + 1)}
      />
    </div>
  );
}

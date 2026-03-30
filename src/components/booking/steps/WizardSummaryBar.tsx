'use client';

import { Calendar, Users, Home } from 'lucide-react';
import { villas } from '@/lib/villas-data';
import type { WizardStep } from '../BookingWizard';

interface Props {
  step: WizardStep;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  selectedVilla: string;
  onGoToStep: (step: WizardStep) => void;
}

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function WizardSummaryBar({ step, checkIn, checkOut, adults, children, selectedVilla, onGoToStep }: Props) {
  if (step < 2) return null;

  const villa = villas.find((v) => v.id === selectedVilla);
  const guestText = `${adults} Adult${adults > 1 ? 's' : ''}${children > 0 ? `, ${children} Child${children !== 1 ? 'ren' : ''}` : ''}`;

  return (
    <div className="flex flex-col md:flex-row gap-3 mt-6">
      {/* Dates chip */}
      {checkIn && checkOut && (
        <button
          onClick={() => onGoToStep(1)}
          className="liquid-card rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/15 transition-colors text-left"
        >
          <Calendar className="w-4 h-4 text-white/60 flex-shrink-0" />
          <p className="text-sm font-medium text-white">
            {formatDate(checkIn)} — {formatDate(checkOut)}
          </p>
        </button>
      )}

      {/* Guests chip */}
      {step >= 3 && (
        <button
          onClick={() => onGoToStep(2)}
          className="liquid-card rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/15 transition-colors text-left"
        >
          <Users className="w-4 h-4 text-white/60 flex-shrink-0" />
          <p className="text-sm font-medium text-white">{guestText}</p>
        </button>
      )}

      {/* Villa chip */}
      {step >= 4 && villa && (
        <button
          onClick={() => onGoToStep(3)}
          className="liquid-card rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-white/15 transition-colors text-left"
        >
          <Home className="w-4 h-4 text-white/60 flex-shrink-0" />
          <p className="text-sm font-medium text-white">{villa.name}</p>
        </button>
      )}
    </div>
  );
}

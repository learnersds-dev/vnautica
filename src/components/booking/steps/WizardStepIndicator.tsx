'use client';

import { Calendar, Users, Home, Mail, Check } from 'lucide-react';
import type { WizardStep } from '../BookingWizard';

const steps: { step: WizardStep; label: string; icon: typeof Calendar }[] = [
  { step: 1, label: 'Dates', icon: Calendar },
  { step: 2, label: 'Guests', icon: Users },
  { step: 3, label: 'Villa Selection', icon: Home },
  { step: 4, label: 'Contact', icon: Mail },
];

export default function WizardStepIndicator({ currentStep }: { currentStep: WizardStep }) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      {steps.map((s, i) => {
        const isCompleted = s.step < currentStep;
        const isActive = s.step === currentStep;
        const isFuture = s.step > currentStep;

        return (
          <div key={s.step} className="flex items-center gap-2 md:gap-4">
            {i > 0 && <span className="w-4 md:w-8 h-[1px] bg-white/20" />}
            <div className="flex items-center gap-1.5">
              {/* Icon on mobile, hidden on desktop */}
              <span className="md:hidden">
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-gold" />
                ) : (
                  <s.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white/40'}`} />
                )}
              </span>
              {/* Text label */}
              <span
                className={`text-[10px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase ${
                  isCompleted ? 'text-gold' : isActive ? 'text-white' : isFuture ? 'text-white/40' : ''
                }`}
              >
                {/* Short label on mobile */}
                <span className="md:hidden">{isActive ? s.label : ''}</span>
                <span className="hidden md:inline">{s.label}</span>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

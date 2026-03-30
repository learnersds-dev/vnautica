import type { WizardStep } from '../BookingWizard';

export default function WizardProgressBar({ step }: { step: WizardStep }) {
  return (
    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-white/60 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${step * 25}%` }}
      />
    </div>
  );
}

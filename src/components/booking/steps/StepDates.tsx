'use client';

interface Props {
  checkIn: string;
  checkOut: string;
  onChange: (field: string, value: string) => void;
}

export default function StepDates({ checkIn, checkOut, onChange }: Props) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <p className="text-white/50 text-center text-sm mb-8">
        Select your travel dates to begin
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => onChange('checkIn', e.target.value)}
            min={today}
            className="w-full glass-input px-5 py-4 rounded-xl text-base"
          />
        </div>
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => onChange('checkOut', e.target.value)}
            min={checkIn || today}
            className="w-full glass-input px-5 py-4 rounded-xl text-base"
          />
        </div>
      </div>

      {checkIn && checkOut && checkOut > checkIn && (
        <p className="text-center text-gold text-sm font-medium mt-4">
          {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
        </p>
      )}
    </div>
  );
}

'use client';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  marketingConsent: boolean;
  onChange: (field: string, value: string | boolean) => void;
}

export default function StepContact({ firstName, lastName, email, phone, specialRequests, marketingConsent, onChange }: Props) {
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <p className="text-white/50 text-center text-sm mb-6">
        Enter your details and our concierge will prepare your personalized quote
      </p>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            placeholder="Your first name"
            required
            className="w-full glass-input px-5 py-3.5 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            placeholder="Your last name"
            required
            className="w-full glass-input px-5 py-3.5 rounded-xl"
          />
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full glass-input px-5 py-3.5 rounded-xl"
          />
        </div>
        <div>
          <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+1 234 567 8900"
            className="w-full glass-input px-5 py-3.5 rounded-xl"
          />
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label className="block text-[10px] text-white/60 uppercase tracking-widest font-bold mb-2">
          Special Requests
        </label>
        <textarea
          value={specialRequests}
          onChange={(e) => onChange('specialRequests', e.target.value)}
          placeholder="Honeymoon celebration, dietary requirements, transfer preferences..."
          rows={3}
          className="w-full glass-input px-5 py-3.5 rounded-xl resize-none"
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={marketingConsent}
          onChange={(e) => onChange('marketingConsent', e.target.checked)}
          className="mt-1 w-4 h-4 accent-gold"
        />
        <span className="text-xs text-white/40 leading-relaxed">
          I agree to receive exclusive offers and travel updates from Reservations & Sales regarding Villa Nautica. You can unsubscribe at any time.
        </span>
      </label>

      <p className="text-[10px] text-white/30 text-center">
        No payment required. Free cancellation. Our team responds within 2 hours.
      </p>
    </div>
  );
}

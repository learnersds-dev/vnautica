'use client';

import { Plane, Clock, Shield, Award } from 'lucide-react';

const features = [
  { icon: Plane, label: 'Airport Transfer', detail: '20 min speedboat' },
  { icon: Clock, label: 'Check-in', detail: 'From 2:00 PM' },
  { icon: Shield, label: 'Best Rate', detail: 'Guaranteed' },
  { icon: Award, label: '5-Star', detail: 'Luxury Resort' },
];

export default function TransferBanner() {
  return (
    <section className="glass py-6 border-y border-white/5 bg-navy-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 justify-center">
              <f.icon className="w-5 h-5 text-gold" />
              <div>
                <div className="text-white text-sm font-medium">{f.label}</div>
                <div className="text-white/50 text-xs">{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Anchor, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Anchor className="w-6 h-6 text-gold" />
                <span className="font-serif text-xl font-semibold">Reservations & Sales</span>
              </div>
              <p className="text-white/40 text-xs mt-1">Official Booking Partner for Villa Nautica</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Book Villa Nautica at Paradise Island, North Malé Atoll, Maldives. Save 9% on every villa.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                Paradise Island, North Malé Atoll
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+9606641010" className="hover:text-gold transition-colors">+960 664 1010</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:reservations@villanautica.com" className="hover:text-gold transition-colors">
                  reservations@villanautica.com
                </a>
              </div>
            </div>
          </div>

          {/* Accommodation */}
          <div>
            <h4 className="font-serif text-gold text-sm uppercase tracking-wider mb-4">Accommodation</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/villas" className="hover:text-gold transition-colors">Ocean Suites</Link></li>
              <li><Link href="/villas" className="hover:text-gold transition-colors">Water Villas</Link></li>
              <li><Link href="/villas" className="hover:text-gold transition-colors">Beach Villas</Link></li>
              <li><Link href="/villas" className="hover:text-gold transition-colors">All Villas & Rates</Link></li>
            </ul>
          </div>

          {/* Resort */}
          <div>
            <h4 className="font-serif text-gold text-sm uppercase tracking-wider mb-4">Resort</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/dining" className="hover:text-gold transition-colors">Dining</Link></li>
              <li><Link href="/spa" className="hover:text-gold transition-colors">Araamu Spa</Link></li>
              <li><Link href="/experiences" className="hover:text-gold transition-colors">Experiences</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors">About the Resort</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-gold text-sm uppercase tracking-wider mb-4">Newsletter</h4>
            <div className="relative mb-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/10 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-gold/40 placeholder:text-white/30"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-gold-light transition-colors p-1">
                &rarr;
              </button>
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed">
              Join our inner circle for exclusive island secrets and seasonal escapes.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Reservations & Sales. Official booking partner for Villa Nautica Maldives.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gold transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

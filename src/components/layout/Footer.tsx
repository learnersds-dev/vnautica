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
            <div className="flex items-center gap-2">
              <Anchor className="w-6 h-6 text-gold" />
              <span className="font-serif text-xl font-semibold">Villa Nautica</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Celebrate the glamour of cosmopolitan quayside living at Paradise Island, North Malé Atoll, Maldives.
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
              <li><Link href="/#dining" className="hover:text-gold transition-colors">Dining</Link></li>
              <li><Link href="/#spa" className="hover:text-gold transition-colors">Araamu Spa</Link></li>
              <li><Link href="/#experiences" className="hover:text-gold transition-colors">Experiences</Link></li>
              <li><Link href="/#" className="hover:text-gold transition-colors">Weddings</Link></li>
              <li><Link href="/#" className="hover:text-gold transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          {/* Quick Booking */}
          <div>
            <h4 className="font-serif text-gold text-sm uppercase tracking-wider mb-4">Quick Enquiry</h4>
            <p className="text-sm text-white/60 mb-4">
              Get exclusive rates and personalized travel planning from our dedicated reservation team.
            </p>
            <Link
              href="/villas"
              className="inline-block bg-gold text-navy font-semibold px-6 py-3 text-sm tracking-wide hover:bg-gold-dark transition-colors"
            >
              View Rates & Enquire
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Villa Nautica Maldives. All rights reserved.</p>
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

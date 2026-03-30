'use client';

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import LeadForm from '@/components/booking/LeadForm';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      {/* Header */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-gold text-xs uppercase tracking-[0.3em]">Contact</span>
          <h1 className="font-serif text-4xl md:text-5xl mt-3 mb-4">Contact Our Booking Team</h1>
          <p className="text-white/60 text-lg">
            Reservations & Sales — dedicated booking partner for Villa Nautica Maldives.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl text-navy mb-8">Reservations & Enquiries</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-sand-light p-3 rounded-sm">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-navy font-medium mb-1">Phone</h3>
                  <a href="tel:+9606641010" className="text-gray-600 hover:text-gold transition-colors">
                    +960 664 1010
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sand-light p-3 rounded-sm">
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-navy font-medium mb-1">WhatsApp</h3>
                  <a href="https://wa.me/9607730000" className="text-gray-600 hover:text-gold transition-colors">
                    +960 773 0000
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Quick responses during business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sand-light p-3 rounded-sm">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-navy font-medium mb-1">Email</h3>
                  <a href="mailto:reservations@villanautica.com" className="text-gray-600 hover:text-gold transition-colors">
                    reservations@villanautica.com
                  </a>
                  <p className="text-xs text-gray-400 mt-1">We respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-sand-light p-3 rounded-sm">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-navy font-medium mb-1">Resort Location</h3>
                  <p className="text-gray-600">
                    Villa Nautica Maldives<br />
                    Paradise Island (Lankanfinolhu)<br />
                    North Malé Atoll, Maldives
                  </p>
                </div>
              </div>
            </div>

            {/* R&S Disclosure */}
            <div className="mt-10 p-4 bg-navy rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-400 text-xs font-semibold">Reservations & Sales</span>
                <span className="text-white/30 text-xs">— Official Booking Partner</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                All enquiries are managed by Reservations & Sales, the official booking partner for Villa Nautica.
                Enjoy best rate guarantee and personalized service.
              </p>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="bg-white border border-gray-100 rounded-sm shadow-lg p-8">
            <LeadForm source="contact-page" />
          </div>
        </div>
      </div>
    </div>
  );
}

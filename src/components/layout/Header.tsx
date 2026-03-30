'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Anchor } from 'lucide-react';
import Button from '@/components/ui/Button';

const navLinks = [
  { href: '/#villas', label: 'Villas' },
  { href: '/#experiences', label: 'Experiences' },
  { href: '/#dining', label: 'Dining' },
  { href: '/#spa', label: 'Spa' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/villas', label: 'Rates & Booking' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  return (
    <>
      {/* R&S Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled
            ? 'bg-navy py-1'
            : 'bg-navy-dark/80 backdrop-blur-sm py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* R&S Logo — text-based matching their brand */}
            <svg
              viewBox="0 0 20 20"
              className="w-4 h-4 text-cyan-400 flex-shrink-0"
              fill="currentColor"
            >
              <path d="M10 2L2 7v6l8 5 8-5V7l-8-5zM4 8.5l6 3.75L16 8.5v4.25L10 16.5 4 12.75V8.5z" />
            </svg>
            <span className="text-[11px] sm:text-xs font-medium tracking-wide text-white/90">
              <span className="text-cyan-400 font-semibold">Reservations</span>
              <span className="text-white/60 mx-0.5">&</span>
              <span className="text-cyan-400 font-semibold">Sales</span>
            </span>
            <span className="hidden sm:inline text-[9px] text-white/40 ml-1 border-l border-white/10 pl-2">
              Official Booking Partner
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-white/50">
            <span className="hidden md:inline">Best Rate Guaranteed</span>
            <span className="hidden md:inline">•</span>
            <a href="tel:+9606641010" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+960 664 1010</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-[28px] bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'top-[32px] bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Anchor
              className={`w-7 h-7 transition-colors duration-300 ${
                scrolled ? 'text-navy' : 'text-white'
              } group-hover:text-gold`}
            />
            <div>
              <div
                className={`font-serif text-lg sm:text-xl font-semibold tracking-wide transition-colors duration-300 ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}
              >
                Villa Nautica
              </div>
              <div
                className={`text-[8px] sm:text-[9px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  scrolled ? 'text-gray-500' : 'text-white/70'
                }`}
              >
                Maldives
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                  scrolled ? 'text-navy' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/villas">
              <Button variant="gold" size="sm">
                Check Rates
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? 'text-navy' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-100 animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-navy text-lg font-medium py-2 border-b border-gray-100"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="tel:+9606641010"
                  className="flex items-center gap-2 text-navy"
                >
                  <Phone className="w-4 h-4" />
                  +960 664 1010
                </a>
                <Link href="/villas" onClick={() => setMobileOpen(false)}>
                  <Button variant="gold" fullWidth>
                    Check Rates & Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

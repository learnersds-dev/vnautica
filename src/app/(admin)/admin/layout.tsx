'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CalendarDays, BarChart3, Mail, Anchor } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/rates', label: 'Rates & Scraper', icon: BarChart3 },
  { href: '/admin/emails', label: 'Emails', icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Anchor className="w-6 h-6 text-gold" />
            <div>
              <div className="font-serif text-lg font-semibold">Villa Nautica</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest">Admin Portal</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-white/10 text-gold border-r-2 border-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <Link href="/" className="text-xs text-white/40 hover:text-gold transition-colors">
            ← View Live Site
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-navy text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Anchor className="w-5 h-5 text-gold" />
          <span className="font-serif text-sm">Admin</span>
        </div>
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded ${
                pathname === item.href ? 'bg-white/10 text-gold' : 'text-white/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 mt-14 lg:mt-0">
        <div className="p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
}

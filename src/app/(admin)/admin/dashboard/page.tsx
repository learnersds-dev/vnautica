'use client';

import { useState, useEffect } from 'react';
import { Users, CalendarDays, DollarSign, Mail, TrendingUp, MousePointerClick, BarChart3, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface DashboardStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  totalBookings: number;
  confirmedBookings: number;
  pendingEnquiries: number;
  totalRevenue: number;
  emailsSent: number;
  scrapedRatesCount: number;
  googleAdsLeads: number;
  conversionRate: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) setStats(await res.json());
    } catch {
      // Stats API not available yet — show zeros
      setStats({
        totalCustomers: 0, newCustomersThisMonth: 0, totalBookings: 0,
        confirmedBookings: 0, pendingEnquiries: 0, totalRevenue: 0,
        emailsSent: 0, scrapedRatesCount: 0, googleAdsLeads: 0, conversionRate: 0,
      });
    }
  }

  async function triggerScrape() {
    setScraping(true);
    setScrapeResult(null);
    try {
      const res = await fetch('/api/scraper', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const data = await res.json();
      setScrapeResult(`Scraped ${data.ratesCount} rates from ${data.source}`);
      fetchStats();
    } catch {
      setScrapeResult('Scrape failed — check server logs');
    }
    setScraping(false);
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);

  const statCards = stats ? [
    { label: 'Total Leads', value: stats.totalCustomers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Google Ads Leads', value: stats.googleAdsLeads, icon: MousePointerClick, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { label: 'Pending Enquiries', value: stats.pendingEnquiries, icon: CalendarDays, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Confirmed Bookings', value: stats.confirmedBookings, icon: CalendarDays, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-gold', bg: 'bg-sand-light' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Emails Sent', value: stats.emailsSent, icon: Mail, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Scraped Rates', value: stats.scrapedRatesCount.toLocaleString(), icon: BarChart3, color: 'text-teal-500', bg: 'bg-teal-50' },
  ] : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-navy">Dashboard</h1>
          <p className="text-gray-500 text-sm">Reservations & Sales — Villa Nautica Bookings</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={triggerScrape} disabled={scraping}>
            {scraping ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <BarChart3 className="w-4 h-4 mr-1" />}
            {scraping ? 'Scraping...' : 'Scrape Rates'}
          </Button>
        </div>
      </div>

      {scrapeResult && (
        <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-sm text-sm text-green-700">
          {scrapeResult}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-sm p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</span>
              <div className={`${card.bg} p-2 rounded`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
          <h3 className="font-serif text-lg text-navy mb-4">Recent Activity</h3>
          <p className="text-gray-400 text-sm">No recent enquiries yet. Leads from the website and Google Ads campaigns will appear here.</p>
        </div>

        <div className="bg-white rounded-sm p-6 border border-gray-100 shadow-sm">
          <h3 className="font-serif text-lg text-navy mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/rates" className="block px-4 py-3 bg-sand-light rounded-sm text-sm text-navy hover:bg-sand transition-colors">
              View Hummingbird scraped rates →
            </a>
            <a href="/admin/customers" className="block px-4 py-3 bg-sand-light rounded-sm text-sm text-navy hover:bg-sand transition-colors">
              Manage customer CRM →
            </a>
            <a href="/admin/emails" className="block px-4 py-3 bg-sand-light rounded-sm text-sm text-navy hover:bg-sand transition-colors">
              View email logs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

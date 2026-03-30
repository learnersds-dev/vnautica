'use client';

import { useState, useEffect } from 'react';
import { BarChart3, RefreshCw, Loader2, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import { villas } from '@/lib/villas-data';

interface ScrapedRate {
  villaId: string;
  villaName: string;
  date: string;
  rackRate: number;
  currency: string;
  mealPlan: string;
  availability: string;
  source: string;
}

const DISCOUNT = 0.09;

export default function RatesPage() {
  const [rates, setRates] = useState<ScrapedRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [selectedVilla, setSelectedVilla] = useState('all');
  const [scrapeResult, setScrapeResult] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  async function fetchRates() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedVilla !== 'all') params.set('villaId', selectedVilla);
      const res = await fetch(`/api/scraper?${params}`);
      const data = await res.json();
      setRates(data.rates?.slice(0, 200) || []);
      setTotalCount(data.count || 0);
    } catch { /* empty */ }
    setLoading(false);
  }

  async function triggerScrape() {
    setScraping(true);
    setScrapeResult(null);
    try {
      const res = await fetch('/api/scraper', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
      const data = await res.json();
      setScrapeResult(`✓ Scraped ${data.ratesCount.toLocaleString()} rates from ${data.source}${data.error ? ` (warning: ${data.error})` : ''}`);
      fetchRates();
    } catch {
      setScrapeResult('✗ Scrape failed — check server logs');
    }
    setScraping(false);
  }

  useEffect(() => { fetchRates(); }, [selectedVilla]);

  const formatCurrency = (n: number) => `$${n.toLocaleString()}`;
  const getDiscountedRate = (rack: number) => Math.round(rack * (1 - DISCOUNT));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif text-navy">Rates & Hummingbird Scraper</h1>
          <p className="text-gray-500 text-sm">
            {totalCount.toLocaleString()} rates loaded • Wholesale vs. our 9% discounted rates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchRates} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="gold" size="sm" onClick={triggerScrape} disabled={scraping}>
            {scraping ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Download className="w-4 h-4 mr-1" />}
            {scraping ? 'Scraping Year...' : 'Scrape Full Year'}
          </Button>
        </div>
      </div>

      {scrapeResult && (
        <div className={`mb-6 px-4 py-3 rounded-sm text-sm ${scrapeResult.startsWith('✓') ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {scrapeResult}
        </div>
      )}

      {/* Villa Filter */}
      <div className="mb-6">
        <select
          value={selectedVilla}
          onChange={(e) => setSelectedVilla(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-sm text-sm bg-white focus:outline-none focus:border-gold"
        >
          <option value="all">All Villas</option>
          {villas.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>

      {/* Rate Comparison Table */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Villa</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-right px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Hummingbird Rate</th>
              <th className="text-right px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Our Rate (−9%)</th>
              <th className="text-right px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Savings</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Meal Plan</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Availability</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 uppercase tracking-wider">Source</th>
            </tr>
          </thead>
          <tbody>
            {rates.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  {loading ? 'Loading rates...' : 'No rates scraped yet. Click "Scrape Full Year" to fetch rates from Hummingbird.'}
                </td>
              </tr>
            ) : (
              rates.map((r, i) => {
                const discounted = getDiscountedRate(r.rackRate);
                const savings = r.rackRate - discounted;
                return (
                  <tr key={`${r.villaId}-${r.date}-${i}`} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-2.5 text-navy font-medium text-xs">{r.villaName}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{r.date}</td>
                    <td className="px-4 py-2.5 text-right text-gray-400 line-through text-xs">{formatCurrency(r.rackRate)}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-navy">{formatCurrency(discounted)}</td>
                    <td className="px-4 py-2.5 text-right text-green-600 text-xs font-medium">{formatCurrency(savings)}</td>
                    <td className="px-4 py-2.5 text-xs text-gray-500">{r.mealPlan}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        r.availability === 'available' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {r.availability}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-gray-400">{r.source}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {totalCount > 200 && (
          <div className="px-4 py-3 text-xs text-gray-400 bg-gray-50 text-center">
            Showing 200 of {totalCount.toLocaleString()} rates. Use villa filter to narrow results.
          </div>
        )}
      </div>
    </div>
  );
}

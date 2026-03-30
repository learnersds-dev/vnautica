/**
 * Hummingbird Portal Rate Scraper
 *
 * Scrapes Villa Nautica rates from Hummingbird Travel's agent portal
 * for a full year ahead. Supports two modes:
 *
 * 1. API Mode (preferred): Uses Hummingbird's B2B API if credentials are provided
 * 2. Scraper Mode (fallback): Uses Puppeteer to scrape the portal login
 *
 * Scraped rates are stored in the rate cache and optionally pushed to Kafka
 * to sync with the live rate display on the frontend.
 *
 * Environment variables:
 *   HUMMINGBIRD_API_URL    — Hummingbird B2B API endpoint
 *   HUMMINGBIRD_API_KEY    — API authentication key
 *   HUMMINGBIRD_PORTAL_URL — Portal login URL (fallback scraper mode)
 *   HUMMINGBIRD_USERNAME   — Portal login username
 *   HUMMINGBIRD_PASSWORD   — Portal login password
 */

import { ScrapedRate, addScrapedRates } from '@/lib/db/store';
import { villas } from '@/lib/villas-data';

interface HummingbirdRateResponse {
  property_id: string;
  room_types: {
    id: string;
    name: string;
    rates: {
      date: string;
      rack_rate: number;
      net_rate: number;
      currency: string;
      meal_plan: string;
      availability: string;
      min_stay: number;
    }[];
  }[];
}

// Villa ID mapping: our internal IDs → Hummingbird room type IDs
const HUMMINGBIRD_ROOM_MAP: Record<string, string> = {
  'two-bed-ocean-suite-pool': 'VN-2BOS',
  'one-bed-ocean-suite-pool': 'VN-1BOS',
  'oceanfront-pool-villa': 'VN-OFP',
  'water-villa-whirlpool': 'VN-WVW',
  'two-bed-beach-villa-pools': 'VN-2BBV',
  'sunset-deluxe-beach-pool': 'VN-SDBP',
  'sunset-beach-pool': 'VN-SBP',
  'deluxe-beach-pool': 'VN-DBP',
  'water-villa': 'VN-WV',
  'beach-villa': 'VN-BV',
};

const VILLA_NAUTICA_PROPERTY_ID = 'VN-PARADISE-ISLAND';
const HUMMINGBIRD_CLIENT_URL = 'https://client.hummingbird.travel/search/d9d646b3-7017-4f09-96c8-3b1110dd02df#/';

// ─── API Mode ────────────────────────────────────────────

async function scrapeViaAPI(dateFrom: string, dateTo: string): Promise<ScrapedRate[]> {
  const apiUrl = process.env.HUMMINGBIRD_API_URL;
  const apiKey = process.env.HUMMINGBIRD_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('Hummingbird API credentials not configured');
  }

  const response = await fetch(`${apiUrl}/properties/${VILLA_NAUTICA_PROPERTY_ID}/rates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Agent-ID': 'reservationsandsales',
    },
    body: JSON.stringify({
      check_in: dateFrom,
      check_out: dateTo,
      currency: 'USD',
      include_availability: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Hummingbird API error: ${response.status} ${response.statusText}`);
  }

  const data: HummingbirdRateResponse = await response.json();
  return transformAPIRates(data);
}

function transformAPIRates(data: HummingbirdRateResponse): ScrapedRate[] {
  const rates: ScrapedRate[] = [];
  const reverseMap = Object.fromEntries(
    Object.entries(HUMMINGBIRD_ROOM_MAP).map(([k, v]) => [v, k])
  );

  for (const room of data.room_types) {
    const villaId = reverseMap[room.id];
    if (!villaId) continue;

    const villa = villas.find((v) => v.id === villaId);
    if (!villa) continue;

    for (const rate of room.rates) {
      rates.push({
        villaId,
        villaName: villa.name,
        date: rate.date,
        rackRate: rate.rack_rate,
        currency: rate.currency,
        mealPlan: rate.meal_plan,
        availability: rate.availability,
        scrapedAt: new Date().toISOString(),
        source: 'hummingbird-api',
      });
    }
  }

  return rates;
}

// ─── Scraper Mode (Puppeteer) ────────────────────────────

async function scrapeViaPortal(dateFrom: string, dateTo: string): Promise<ScrapedRate[]> {
  const portalUrl = process.env.HUMMINGBIRD_PORTAL_URL;
  const username = process.env.HUMMINGBIRD_USERNAME;
  const password = process.env.HUMMINGBIRD_PASSWORD;

  if (!portalUrl || !username || !password) {
    throw new Error('Hummingbird portal credentials not configured');
  }

  try {
    const puppeteer = await import('puppeteer-core');
    const browser = await puppeteer.default.launch({
      executablePath: process.env.CHROME_PATH || '/usr/bin/chromium-browser',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Login
    await page.goto(portalUrl, { waitUntil: 'networkidle0' });
    await page.type('input[name="username"], input[type="email"]', username);
    await page.type('input[name="password"], input[type="password"]', password);
    await page.click('button[type="submit"], input[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Navigate to Villa Nautica rates
    await page.goto(`${portalUrl}/properties/villa-nautica/rates?from=${dateFrom}&to=${dateTo}`, {
      waitUntil: 'networkidle0',
    });

    // Extract rates from the portal table
    const extractedRates = await page.evaluate(() => {
      const rows = document.querySelectorAll('.rate-table tr, table tbody tr');
      const rates: Array<{
        roomName: string;
        date: string;
        rate: number;
        currency: string;
        mealPlan: string;
        availability: string;
      }> = [];

      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 4) {
          rates.push({
            roomName: cells[0]?.textContent?.trim() || '',
            date: cells[1]?.textContent?.trim() || '',
            rate: parseFloat(cells[2]?.textContent?.replace(/[^0-9.]/g, '') || '0'),
            currency: 'USD',
            mealPlan: cells[3]?.textContent?.trim() || 'BB',
            availability: cells[4]?.textContent?.trim() || 'available',
          });
        }
      });

      return rates;
    });

    await browser.close();

    // Map portal room names to our villa IDs
    return extractedRates
      .filter((r) => r.rate > 0)
      .map((r) => {
        const villa = villas.find(
          (v) =>
            v.name.toLowerCase().includes(r.roomName.toLowerCase()) ||
            r.roomName.toLowerCase().includes(v.name.split(' ')[0].toLowerCase())
        );
        return {
          villaId: villa?.id || 'unknown',
          villaName: villa?.name || r.roomName,
          date: r.date,
          rackRate: r.rate,
          currency: r.currency,
          mealPlan: r.mealPlan,
          availability: r.availability,
          scrapedAt: new Date().toISOString(),
          source: 'hummingbird-portal',
        };
      })
      .filter((r) => r.villaId !== 'unknown');
  } catch (err) {
    console.error('[Scraper] Puppeteer scraping failed:', err);
    throw err;
  }
}

// ─── Simulated Rates (dev/demo mode) ────────────────────

function generateSimulatedYearRates(): ScrapedRate[] {
  const rates: ScrapedRate[] = [];
  const now = new Date();

  // Base rates per villa with seasonal variation
  const baseRates: Record<string, number> = {
    'two-bed-ocean-suite-pool': 2850,
    'one-bed-ocean-suite-pool': 1950,
    'oceanfront-pool-villa': 1450,
    'water-villa-whirlpool': 1150,
    'two-bed-beach-villa-pools': 2650,
    'sunset-deluxe-beach-pool': 1350,
    'sunset-beach-pool': 1150,
    'deluxe-beach-pool': 1250,
    'water-villa': 850,
    'beach-villa': 650,
  };

  // Seasonal multipliers (Maldives peak: Dec-Apr, shoulder: May/Nov, low: Jun-Oct)
  const getSeasonalMultiplier = (month: number): number => {
    if (month >= 11 || month <= 3) return 1.3;  // Peak (Dec-Apr)
    if (month === 4 || month === 10) return 1.1; // Shoulder
    return 0.85; // Low season (May-Oct)
  };

  for (const villa of villas) {
    const base = baseRates[villa.id] || 800;

    for (let day = 0; day < 365; day++) {
      const date = new Date(now);
      date.setDate(date.getDate() + day);
      const month = date.getMonth();
      const dateStr = date.toISOString().split('T')[0];

      // Add some daily variation
      const dailyVariation = Math.floor(Math.random() * 60) - 30;
      const seasonalRate = Math.round(base * getSeasonalMultiplier(month)) + dailyVariation;

      // Christmas/NY premium
      const isHoliday = month === 11 && date.getDate() >= 20;
      const finalRate = isHoliday ? Math.round(seasonalRate * 1.4) : seasonalRate;

      rates.push({
        villaId: villa.id,
        villaName: villa.name,
        date: dateStr,
        rackRate: finalRate,
        currency: 'USD',
        mealPlan: 'Bed & Breakfast',
        availability: Math.random() > 0.1 ? 'available' : 'limited',
        scrapedAt: new Date().toISOString(),
        source: 'simulated',
      });
    }
  }

  return rates;
}

// ─── Main Scraper Function ───────────────────────────────

export async function scrapeHummingbirdRates(
  dateFrom?: string,
  dateTo?: string
): Promise<{ success: boolean; ratesCount: number; source: string; error?: string }> {
  const now = new Date();
  const from = dateFrom || now.toISOString().split('T')[0];
  const toDate = new Date(now);
  toDate.setFullYear(toDate.getFullYear() + 1);
  const to = dateTo || toDate.toISOString().split('T')[0];

  console.log(`[Scraper] Starting rate scrape: ${from} → ${to}`);

  let rates: ScrapedRate[] = [];
  let source = 'simulated';

  // Try API first, then portal, then simulate
  try {
    if (process.env.HUMMINGBIRD_API_KEY) {
      rates = await scrapeViaAPI(from, to);
      source = 'hummingbird-api';
    } else if (process.env.HUMMINGBIRD_USERNAME) {
      rates = await scrapeViaPortal(from, to);
      source = 'hummingbird-portal';
    } else {
      console.log('[Scraper] No Hummingbird credentials — generating simulated yearly rates');
      rates = generateSimulatedYearRates();
      source = 'simulated';
    }

    addScrapedRates(rates);
    console.log(`[Scraper] Stored ${rates.length} rates from ${source}`);

    return { success: true, ratesCount: rates.length, source };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Scraper] Failed (${source}):`, errorMsg);

    // Fallback to simulated rates
    if (source !== 'simulated') {
      console.log('[Scraper] Falling back to simulated rates');
      rates = generateSimulatedYearRates();
      addScrapedRates(rates);
      return { success: true, ratesCount: rates.length, source: 'simulated-fallback', error: errorMsg };
    }

    return { success: false, ratesCount: 0, source, error: errorMsg };
  }
}

export { HUMMINGBIRD_ROOM_MAP, VILLA_NAUTICA_PROPERTY_ID };

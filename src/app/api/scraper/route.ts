import { NextRequest, NextResponse } from 'next/server';
import { scrapeHummingbirdRates } from '@/lib/scraper/hummingbird';
import { getScrapedRates } from '@/lib/db/store';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { dateFrom, dateTo } = body;

  const result = await scrapeHummingbirdRates(dateFrom, dateTo);

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const villaId = searchParams.get('villaId') || undefined;
  const dateFrom = searchParams.get('dateFrom') || undefined;
  const dateTo = searchParams.get('dateTo') || undefined;

  const rates = getScrapedRates(villaId, dateFrom, dateTo);

  return NextResponse.json({
    count: rates.length,
    rates,
  });
}

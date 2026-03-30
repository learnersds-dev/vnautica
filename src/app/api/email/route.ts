import { NextRequest, NextResponse } from 'next/server';
import { getEmailLogs } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId') || undefined;

  const logs = getEmailLogs(customerId);
  return NextResponse.json(logs);
}

import { NextRequest, NextResponse } from 'next/server';
import { getAllBookings, getBooking, updateBooking } from '@/lib/db/store';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const booking = getBooking(id);
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(booking);
  }

  return NextResponse.json(getAllBookings());
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const updated = updateBooking(id, data);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(updated);
}

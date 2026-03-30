import { NextRequest, NextResponse } from 'next/server';
import { getAllCustomers, getCustomer, updateCustomer } from '@/lib/db/store';
import { sendFollowUp } from '@/lib/email/service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const customer = getCustomer(id);
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json(customer);
  }

  return NextResponse.json(getAllCustomers());
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;

  if (!id) return NextResponse.json({ error: 'Missing customer ID' }, { status: 400 });

  const updated = updateCustomer(id, data);
  if (!updated) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });

  return NextResponse.json(updated);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, customerId } = body;

  if (action === 'send-followup') {
    const customer = getCustomer(customerId);
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });

    const sent = await sendFollowUp(customer);
    return NextResponse.json({ success: sent });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

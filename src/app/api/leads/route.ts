import { NextResponse } from 'next/server';
import { createCustomer, createBooking } from '@/lib/db/store';
import { sendEnquiryConfirmation, sendInternalNotification } from '@/lib/email/service';
import { getVillaRate } from '@/lib/kafka-rates';
import { villas } from '@/lib/villas-data';
import { LeadFormData } from '@/types';

export async function POST(request: Request) {
  try {
    const body: LeadFormData = await request.json();

    // Validate required fields
    if (!body.email || !body.firstName || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, email, checkIn, checkOut' },
        { status: 400 }
      );
    }

    // Create or update customer
    const customer = createCustomer({
      ...body,
      source: body.utm_source || 'website',
    });

    // Get current rate for the villa
    const villaId = body.villaPreference || 'beach-villa';
    const villa = villas.find((v) => v.id === villaId);
    const rate = getVillaRate(villaId);

    // Calculate stay details
    const checkInDate = new Date(body.checkIn);
    const checkOutDate = new Date(body.checkOut);
    const nights = Math.max(1, Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    ));

    // Create booking/enquiry
    const booking = createBooking({
      customerId: customer.id,
      villaId,
      villaName: villa?.name || 'Villa (to be confirmed)',
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      adults: body.adults || 2,
      children: body.children || 0,
      ratePerNight: rate?.discountedRate || 0,
      totalAmount: (rate?.discountedRate || 0) * nights,
      currency: rate?.currency || 'USD',
      status: 'enquiry',
      specialRequests: body.specialRequests || '',
      source: body.utm_source || 'website',
      gclid: body.gclid,
      utm_campaign: body.utm_campaign,
    });

    // Send emails (non-blocking)
    Promise.all([
      sendEnquiryConfirmation(customer, booking),
      sendInternalNotification(customer, booking),
    ]).catch((err) => console.error('[Leads API] Email error:', err));

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      customerId: customer.id,
      message: 'Enquiry received — our team will respond within 2 hours',
    });
  } catch (err) {
    console.error('[Leads API] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process enquiry' },
      { status: 500 }
    );
  }
}

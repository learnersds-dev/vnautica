import nodemailer from 'nodemailer';
import { Customer, Booking, logEmail } from '@/lib/db/store';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const FROM_NAME = 'Villa Nautica Reservations';
const FROM_EMAIL = process.env.SMTP_FROM || 'reservations@villanautica.com';

// ─── Email Templates ─────────────────────────────────────

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; font-family: 'Georgia', serif; background: #F5F0E8; }
    .container { max-width: 600px; margin: 0 auto; background: #FFFFFF; }
    .header { background: #0C1B2A; padding: 24px; text-align: center; }
    .header h1 { color: #C9A96E; font-size: 22px; margin: 0; letter-spacing: 2px; }
    .header p { color: rgba(255,255,255,0.5); font-size: 10px; letter-spacing: 3px; margin: 4px 0 0; }
    .body { padding: 32px 24px; color: #333; line-height: 1.7; }
    .body h2 { color: #0C1B2A; font-size: 20px; margin: 0 0 16px; }
    .cta { display: inline-block; background: #C9A96E; color: #0C1B2A; padding: 14px 32px; text-decoration: none; font-weight: bold; letter-spacing: 1px; font-size: 14px; margin: 16px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F0F0F0; }
    .detail-label { color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .detail-value { color: #0C1B2A; font-weight: bold; }
    .footer { background: #0C1B2A; padding: 24px; text-align: center; color: rgba(255,255,255,0.4); font-size: 11px; }
    .footer a { color: #C9A96E; text-decoration: none; }
    .divider { height: 1px; background: #E5E5E5; margin: 24px 0; }
    .rs-bar { background: #0C1B2A; padding: 8px; text-align: center; }
    .rs-bar span { color: #06B6D4; font-size: 10px; letter-spacing: 2px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="rs-bar">
      <span>RESERVATIONS & SALES</span>
    </div>
    <div class="header">
      <h1>Villa Nautica</h1>
      <p>PARADISE ISLAND, MALDIVES</p>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>Villa Nautica Maldives Resort</p>
      <p>Paradise Island, North Malé Atoll, Maldives</p>
      <p><a href="tel:+9606641010">+960 664 1010</a> | <a href="mailto:reservations@villanautica.com">reservations@villanautica.com</a></p>
      <p style="margin-top: 12px; font-size: 9px;">Powered by Reservations & Sales</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Template: Enquiry Confirmation ──────────────────────

function enquiryConfirmationTemplate(customer: Customer, booking: Booking): string {
  return baseTemplate(`
    <h2>Thank You, ${customer.firstName}</h2>
    <p>We're delighted you're considering Villa Nautica for your Maldives escape. Your enquiry has been received and our dedicated reservation specialist will craft a personalized proposal for you.</p>

    <div class="divider"></div>

    <h3 style="color: #C9A96E; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your Enquiry Details</h3>

    <table style="width: 100%; border-collapse: collapse;">
      <tr><td class="detail-label" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">Villa</td><td class="detail-value" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">${booking.villaName}</td></tr>
      <tr><td class="detail-label" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">Check-in</td><td class="detail-value" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">${booking.checkIn}</td></tr>
      <tr><td class="detail-label" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">Check-out</td><td class="detail-value" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">${booking.checkOut}</td></tr>
      <tr><td class="detail-label" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0;">Guests</td><td class="detail-value" style="padding: 8px 0; border-bottom: 1px solid #f0f0f0; text-align: right;">${booking.adults} Adult${booking.adults > 1 ? 's' : ''}${booking.children > 0 ? `, ${booking.children} Child${booking.children > 1 ? 'ren' : ''}` : ''}</td></tr>
      <tr><td class="detail-label" style="padding: 8px 0;">Estimated Rate</td><td class="detail-value" style="padding: 8px 0; text-align: right; color: #C9A96E;">From $${booking.ratePerNight}/night</td></tr>
    </table>

    <div class="divider"></div>

    <p><strong>What happens next?</strong></p>
    <p>Our reservation team will review your request and respond within <strong>2 hours</strong> with:</p>
    <ul style="color: #666; padding-left: 20px;">
      <li>Confirmed availability and best available rate</li>
      <li>Personalized package options</li>
      <li>Complimentary transfer and experience recommendations</li>
    </ul>

    <p style="text-align: center; margin-top: 24px;">
      <a href="tel:+9606641010" class="cta">Call Us: +960 664 1010</a>
    </p>

    <p style="color: #999; font-size: 12px; text-align: center;">
      For immediate assistance, WhatsApp us at +960 773 0000
    </p>
  `);
}

// ─── Template: Follow-Up ─────────────────────────────────

function followUpTemplate(customer: Customer): string {
  return baseTemplate(`
    <h2>Hello ${customer.firstName},</h2>
    <p>We noticed you recently explored Villa Nautica and wanted to make sure we haven't missed your enquiry.</p>
    <p>As a special gesture, we'd like to extend an <strong>exclusive offer</strong>:</p>

    <div style="background: #F5F0E8; padding: 20px; text-align: center; margin: 20px 0;">
      <p style="color: #C9A96E; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin: 0;">Exclusive Direct Booking Offer</p>
      <p style="color: #0C1B2A; font-size: 28px; font-weight: bold; margin: 8px 0;">Save 9% + Free Transfers</p>
      <p style="color: #666; font-size: 13px; margin: 0;">Valid for stays booked within 7 days</p>
    </div>

    <p style="text-align: center;">
      <a href="#" class="cta">View Your Exclusive Rates</a>
    </p>

    <p style="color: #999; font-size: 12px;">
      Simply reply to this email or call us at +960 664 1010 to speak with a reservation specialist.
    </p>
  `);
}

// ─── Template: Internal Notification ─────────────────────

function internalNotificationTemplate(customer: Customer, booking: Booking): string {
  return `
    <h3>New Lead: ${customer.firstName} ${customer.lastName}</h3>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Phone:</strong> ${customer.phone || 'Not provided'}</p>
    <p><strong>Source:</strong> ${customer.source}${customer.tags.includes('google-ads') ? ' (Google Ads)' : ''}</p>
    <p><strong>Villa:</strong> ${booking.villaName}</p>
    <p><strong>Dates:</strong> ${booking.checkIn} — ${booking.checkOut}</p>
    <p><strong>Guests:</strong> ${booking.adults} adults, ${booking.children} children</p>
    <p><strong>Special Requests:</strong> ${booking.specialRequests || 'None'}</p>
    <p><strong>Estimated Rate:</strong> $${booking.ratePerNight}/night</p>
    ${booking.gclid ? `<p><strong>GCLID:</strong> ${booking.gclid}</p>` : ''}
    ${booking.utm_campaign ? `<p><strong>Campaign:</strong> ${booking.utm_campaign}</p>` : ''}
  `;
}

// ─── Send Functions ──────────────────────────────────────

export async function sendEnquiryConfirmation(customer: Customer, booking: Booking): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER) {
      console.log('[Email] SMTP not configured — logging email instead');
      logEmail({
        customerId: customer.id,
        to: customer.email,
        subject: 'Your Villa Nautica Enquiry',
        template: 'enquiry-confirmation',
        status: 'pending',
        sentAt: new Date().toISOString(),
      });
      return true;
    }

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: customer.email,
      subject: `Your Villa Nautica Enquiry — ${booking.villaName}`,
      html: enquiryConfirmationTemplate(customer, booking),
    });

    logEmail({
      customerId: customer.id,
      to: customer.email,
      subject: `Your Villa Nautica Enquiry — ${booking.villaName}`,
      template: 'enquiry-confirmation',
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Email] Failed to send enquiry confirmation:', err);
    logEmail({
      customerId: customer.id,
      to: customer.email,
      subject: 'Your Villa Nautica Enquiry',
      template: 'enquiry-confirmation',
      status: 'failed',
      sentAt: new Date().toISOString(),
    });
    return false;
  }
}

export async function sendFollowUp(customer: Customer): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER) {
      logEmail({
        customerId: customer.id,
        to: customer.email,
        subject: 'Your Exclusive Villa Nautica Offer Awaits',
        template: 'follow-up',
        status: 'pending',
        sentAt: new Date().toISOString(),
      });
      return true;
    }

    await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: customer.email,
      subject: 'Your Exclusive Villa Nautica Offer Awaits',
      html: followUpTemplate(customer),
    });

    logEmail({
      customerId: customer.id,
      to: customer.email,
      subject: 'Your Exclusive Villa Nautica Offer Awaits',
      template: 'follow-up',
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Email] Failed to send follow-up:', err);
    return false;
  }
}

export async function sendInternalNotification(customer: Customer, booking: Booking): Promise<boolean> {
  const internalEmail = process.env.INTERNAL_NOTIFICATION_EMAIL || 'team@villanautica.com';
  try {
    if (!process.env.SMTP_USER) {
      logEmail({
        customerId: customer.id,
        to: internalEmail,
        subject: `[NEW LEAD] ${customer.firstName} ${customer.lastName} — ${booking.villaName}`,
        template: 'internal-notification',
        status: 'pending',
        sentAt: new Date().toISOString(),
      });
      return true;
    }

    await transporter.sendMail({
      from: `"Villa Nautica CRM" <${FROM_EMAIL}>`,
      to: internalEmail,
      subject: `[NEW LEAD] ${customer.firstName} ${customer.lastName} — ${booking.villaName}`,
      html: internalNotificationTemplate(customer, booking),
    });

    logEmail({
      customerId: customer.id,
      to: internalEmail,
      subject: `[NEW LEAD] ${customer.firstName} ${customer.lastName}`,
      template: 'internal-notification',
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
    return true;
  } catch (err) {
    console.error('[Email] Failed to send internal notification:', err);
    return false;
  }
}

/**
 * In-memory data store for leads, customers, bookings, and scraped rates.
 *
 * In production, replace with PostgreSQL/Supabase. This in-memory store
 * provides the full data model and API surface — migration is a drop-in.
 */

import { LeadFormData, RateData } from '@/types';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  source: string;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  totalEnquiries: number;
  lastEnquiry: string;
  status: 'new' | 'contacted' | 'qualified' | 'booked' | 'archived';
}

export interface Booking {
  id: string;
  customerId: string;
  villaId: string;
  villaName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  ratePerNight: number;
  totalAmount: number;
  currency: string;
  status: 'enquiry' | 'quoted' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests: string;
  source: string;
  gclid?: string;
  utm_campaign?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmailLog {
  id: string;
  customerId: string;
  to: string;
  subject: string;
  template: string;
  status: 'sent' | 'failed' | 'pending';
  sentAt: string;
  openedAt?: string;
}

export interface ScrapedRate {
  villaId: string;
  villaName: string;
  date: string;        // YYYY-MM-DD
  rackRate: number;
  currency: string;
  mealPlan: string;
  availability: string;
  scrapedAt: string;
  source: string;      // 'hummingbird' | 'direct'
}

// In-memory stores
const customers = new Map<string, Customer>();
const bookings = new Map<string, Booking>();
const emailLogs: EmailLog[] = [];
const scrapedRates: ScrapedRate[] = [];

let idCounter = 1000;
function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${++idCounter}`;
}

// ─── Customers ───────────────────────────────────────────

export function createCustomer(lead: Partial<LeadFormData> & { source?: string }): Customer {
  const existing = Array.from(customers.values()).find(
    (c) => c.email === lead.email
  );
  if (existing) {
    existing.totalEnquiries += 1;
    existing.lastEnquiry = new Date().toISOString();
    existing.updatedAt = new Date().toISOString();
    if (lead.phone && !existing.phone) existing.phone = lead.phone;
    return existing;
  }

  const customer: Customer = {
    id: generateId('cust'),
    firstName: lead.firstName || '',
    lastName: lead.lastName || '',
    email: lead.email || '',
    phone: lead.phone || '',
    country: lead.country || '',
    source: lead.utm_source || lead.source || 'website',
    tags: lead.gclid ? ['google-ads'] : [],
    notes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalEnquiries: 1,
    lastEnquiry: new Date().toISOString(),
    status: 'new',
  };
  customers.set(customer.id, customer);
  return customer;
}

export function getCustomer(id: string): Customer | undefined {
  return customers.get(id);
}

export function getAllCustomers(): Customer[] {
  return Array.from(customers.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateCustomer(id: string, data: Partial<Customer>): Customer | undefined {
  const customer = customers.get(id);
  if (!customer) return undefined;
  Object.assign(customer, data, { updatedAt: new Date().toISOString() });
  return customer;
}

// ─── Bookings ────────────────────────────────────────────

export function createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
  const booking: Booking = {
    ...data,
    id: generateId('book'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookings.set(booking.id, booking);
  return booking;
}

export function getBooking(id: string): Booking | undefined {
  return bookings.get(id);
}

export function getAllBookings(): Booking[] {
  return Array.from(bookings.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateBooking(id: string, data: Partial<Booking>): Booking | undefined {
  const booking = bookings.get(id);
  if (!booking) return undefined;
  Object.assign(booking, data, { updatedAt: new Date().toISOString() });
  return booking;
}

// ─── Email Logs ──────────────────────────────────────────

export function logEmail(data: Omit<EmailLog, 'id'>): EmailLog {
  const log: EmailLog = { ...data, id: generateId('email') };
  emailLogs.push(log);
  return log;
}

export function getEmailLogs(customerId?: string): EmailLog[] {
  const logs = customerId
    ? emailLogs.filter((l) => l.customerId === customerId)
    : emailLogs;
  return logs.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
}

// ─── Scraped Rates ───────────────────────────────────────

export function addScrapedRates(rates: ScrapedRate[]): void {
  scrapedRates.push(...rates);
}

export function getScrapedRates(villaId?: string, dateFrom?: string, dateTo?: string): ScrapedRate[] {
  let filtered = [...scrapedRates];
  if (villaId) filtered = filtered.filter((r) => r.villaId === villaId);
  if (dateFrom) filtered = filtered.filter((r) => r.date >= dateFrom);
  if (dateTo) filtered = filtered.filter((r) => r.date <= dateTo);
  return filtered.sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Dashboard Stats ─────────────────────────────────────

export function getDashboardStats() {
  const allCustomers = getAllCustomers();
  const allBookings = getAllBookings();
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return {
    totalCustomers: allCustomers.length,
    newCustomersThisMonth: allCustomers.filter(
      (c) => new Date(c.createdAt) >= thirtyDaysAgo
    ).length,
    totalBookings: allBookings.length,
    confirmedBookings: allBookings.filter((b) => b.status === 'confirmed').length,
    pendingEnquiries: allBookings.filter((b) => b.status === 'enquiry').length,
    totalRevenue: allBookings
      .filter((b) => b.status === 'confirmed' || b.status === 'completed')
      .reduce((sum, b) => sum + b.totalAmount, 0),
    emailsSent: emailLogs.filter((e) => e.status === 'sent').length,
    scrapedRatesCount: scrapedRates.length,
    googleAdsLeads: allCustomers.filter((c) => c.tags.includes('google-ads')).length,
    conversionRate: allCustomers.length > 0
      ? Math.round((allBookings.filter((b) => b.status === 'confirmed').length / allCustomers.length) * 100)
      : 0,
  };
}

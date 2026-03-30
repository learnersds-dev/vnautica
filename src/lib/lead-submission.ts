import { LeadFormData } from '@/types';

export function captureUTMParams(source: string): Partial<LeadFormData> {
  if (typeof window === 'undefined') return { utm_source: source };
  const params = new URLSearchParams(window.location.search);
  return {
    gclid: params.get('gclid') || undefined,
    utm_source: params.get('utm_source') || source,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
  };
}

export async function submitLead(
  form: Partial<LeadFormData>
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    return { success: false, error: `Server error: ${res.status}` };
  }

  // Fire Google Ads conversion tracking
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const w = window as unknown as { gtag: (...args: unknown[]) => void };
    w.gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXX/XXXXXXXX',
      value: 1.0,
      currency: 'USD',
    });
  }

  const data = await res.json();
  return { success: true, bookingId: data.bookingId };
}

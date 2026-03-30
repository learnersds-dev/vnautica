import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Villa Nautica Maldives | Save 9% — Exclusive Direct Rates',
  description:
    'Book direct and save 9% on luxury overwater and beach villas at Villa Nautica, Paradise Island, Maldives. Live rates, free cancellation, complimentary speedboat transfer.',
  robots: 'noindex, nofollow',
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Villa Nautica | Save 9% — Reservations & Sales',
  description:
    'Save 9% on luxury villas at Villa Nautica through Reservations & Sales. Live rates, free cancellation, complimentary speedboat transfer.',
  robots: 'noindex, nofollow',
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

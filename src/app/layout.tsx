import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Villa Nautica Maldives | Luxury Resort - Exclusive Rates',
  description:
    'Experience yacht-life luxury at Villa Nautica, Paradise Island, Maldives. 10 villa categories, 9 dining venues, overwater spa. Book direct for exclusive rates — save 9% on all villas.',
  keywords: [
    'Villa Nautica Maldives',
    'Maldives luxury resort',
    'overwater villa Maldives',
    'Paradise Island resort',
    'Maldives honeymoon',
    'private pool villa Maldives',
  ],
  openGraph: {
    title: 'Villa Nautica Maldives | Luxury Resort',
    description: 'Celebrate the glamour of cosmopolitan quayside living. Exclusive rates — save 9% on direct bookings.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Villa Nautica Maldives',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}

        {/* Google Ads gtag.js — replace AW-XXXXXXXXX with your Conversion ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-XXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}

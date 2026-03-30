import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Book Villa Nautica Maldives | Reservations & Sales',
  description:
    'Book luxury villas at Villa Nautica, Paradise Island. Save 9% through Reservations & Sales — official booking partner. Overwater & beach villas, 9 dining venues.',
  keywords: [
    'Villa Nautica Maldives booking',
    'Maldives luxury resort',
    'overwater villa Maldives',
    'Paradise Island resort',
    'Maldives honeymoon',
    'book Villa Nautica',
  ],
  openGraph: {
    title: 'Book Villa Nautica Maldives | Reservations & Sales',
    description: 'Save 9% on luxury villas at Villa Nautica through Reservations & Sales — official booking partner.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Reservations & Sales',
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

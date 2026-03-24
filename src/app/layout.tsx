import type { Metadata } from 'next';
import Script from 'next/script';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/globals.scss';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BootstrapClient } from '@/components/BootstrapClient';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  GOOGLE_ANALYTICS_TRACKING_ID,
} from '@/lib/seo';

// Prevent FontAwesome from adding CSS automatically (we import it above)
config.autoAddCss = false;

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_TRACKING_ID}');
          `}
        </Script>
        <div className="vh-100 d-flex flex-column">
          <Header />
          <main id="main-content" className="flex-grow-1">{children}</main>
          <Footer />
          <BootstrapClient />
          <Script src="https://awesome.bible/manna.js" strategy="afterInteractive" />
        </div>
      </body>
    </html>
  );
}

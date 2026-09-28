import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || 'http://localhost:3000'),
  title: 'Royal Genel Overseas Trading | Trade Beyond Borders',
  description: 'Royal Genel Overseas Trading is an Istanbul-based export trading company connecting opportunities across markets with a people-first approach.',
  applicationName: 'Royal Genel Overseas Trading',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Royal Genel Overseas Trading',
    title: 'Royal Genel Overseas Trading | Trade Beyond Borders',
    description: 'Connecting opportunities across markets from Istanbul, Türkiye.',
    images: [{ url: '/images/hero-ship.png', width: 1942, height: 809, alt: 'Cargo ship at an Istanbul port' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#a7122d', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter /></body></html>;
}

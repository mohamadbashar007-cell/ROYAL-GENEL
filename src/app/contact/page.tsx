import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Eyebrow } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact | Royal Genel Overseas Trading',
  description: 'Start a conversation with Royal Genel Overseas Trading. Tell us about your export trading opportunity or market idea.',
};

// Reflect mail configuration at request time when environment values change.
export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const deliveryConfigured = Boolean(process.env.RESEND_API_KEY?.trim() && process.env.INQUIRY_TO_EMAIL?.trim() && process.env.INQUIRY_FROM_EMAIL?.trim());

  return <main id="top">
    <section className="contact-hero"><div className="container"><span className="breadcrumb breadcrumb--light">HOME <span>/</span> CONTACT</span><Eyebrow light>START THE CONVERSATION</Eyebrow><h1>Let&apos;s make<br /><em>things move.</em></h1><p>Tell us what you are looking to explore. A strong connection can be the start of something important.</p><span className="contact-hero__asterisk" aria-hidden="true">✳</span></div></section>
    <section className="contact-section section-space"><div className="container contact-section__grid"><div className="contact-section__form"><Eyebrow>YOUR NEXT STEP</Eyebrow><h2>Tell us what&apos;s<br /><em>on your mind.</em></h2><p className="contact-section__intro">A few details will help us understand your opportunity and the best next conversation.</p><ContactForm deliveryConfigured={deliveryConfigured} /></div><aside className="contact-aside"><div className="contact-aside__image"><Image src="/images/trade-detail.png" alt="Export packages and shipping documents in a warehouse" fill sizes="(max-width: 900px) 100vw, 35vw" /></div><div className="contact-aside__body"><span>WHERE IT BEGINS</span><div><MapPin size={25} strokeWidth={1.5} /><h3>Istanbul, Türkiye</h3></div><p>A city of connections. A perspective built for the world beyond it.</p><ArrowUpRight size={31} strokeWidth={1.3} /></div></aside></div></section>
    <section className="contact-note"><div className="container"><span>✦</span><p>Great opportunities are built through clear conversations and shared ambition.</p><span>✦</span></div></section>
  </main>;
}

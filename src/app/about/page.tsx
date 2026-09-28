import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Compass, Eye, Handshake, MapPin } from 'lucide-react';
import { CtaSection } from '@/components/cta-section';
import { Eyebrow, PillLink } from '@/components/ui';
import { assetPath } from '@/lib/asset-path';

export const metadata: Metadata = {
  title: 'Our Company | Royal Genel Overseas Trading',
  description: 'Get to know Royal Genel Overseas Trading, an Istanbul-based export trading company built around connection, coordination, and long-term relationships.',
};

const values = [
  { no: '01', title: 'Curiosity', text: 'We listen first, ask better questions, and look for the possibilities others may miss.', Icon: Compass },
  { no: '02', title: 'Clarity', text: 'Straightforward communication makes complex cross-border work easier to navigate.', Icon: Eye },
  { no: '03', title: 'Commitment', text: 'We take the long view and treat relationships as the foundation of meaningful trade.', Icon: Handshake },
];

export default function AboutPage() {
  return <main id="top">
    <section className="interior-hero interior-hero--about"><div className="container interior-hero__inner"><div className="interior-hero__copy"><span className="breadcrumb">HOME <span>/</span> OUR COMPANY</span><Eyebrow>THE COMPANY BEHIND THE CONNECTION</Eyebrow><h1>Rooted here.<br /><em>Reaching further.</em></h1><p>From Istanbul, we help turn shared ambition into new commercial possibilities.</p><PillLink href="#our-story" variant="red">Our story</PillLink></div><div className="interior-hero__image"><Image src={assetPath('/images/istanbul-crossroads.png')} alt="Istanbul skyline and Bosphorus at golden hour" fill priority sizes="(max-width: 900px) 100vw, 52vw" /><span className="interior-hero__image-caption"><MapPin size={16} /> ISTANBUL, TÜRKIYE</span></div></div><div className="interior-hero__accent" aria-hidden="true">RG</div></section>

    <section className="about-story section-space" id="our-story"><div className="container about-story__grid"><div><Eyebrow>WHO WE ARE</Eyebrow><h2>A meeting point<br />for <em>opportunity.</em></h2></div><div className="about-story__text"><p className="lead">Royal Genel Overseas Trading is an export trading company based in Istanbul, a city that has connected people and markets for generations.</p><p>We approach every conversation with an open mind and a practical mindset. By understanding what each business wants to achieve, we can focus on useful connections, sound coordination, and relationships worth building.</p><p>Our name speaks to where we come from. Our outlook is directed toward what comes next.</p></div></div></section>

    <section className="values-section section-space"><div className="container"><div className="section-heading"><div><Eyebrow>WHAT GUIDES US</Eyebrow><h2>Our values are<br /><em>how we work.</em></h2></div><p>Good trade takes more than movement. It takes people who pay attention to the details and to each other.</p></div><div className="values-grid">{values.map(({ no, title, text, Icon }) => <article className="value-card" key={title}><div><span>{no} /</span><Icon size={32} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p><ArrowUpRight size={25} strokeWidth={1.4} className="value-card__arrow" /></article>)}</div></div></section>

    <section className="istanbul-feature"><div className="istanbul-feature__photo"><Image src={assetPath('/images/hero-ship.png')} alt="Cargo ship in Istanbul's port at sunset" fill sizes="(max-width: 900px) 100vw, 58vw" /></div><div className="istanbul-feature__content"><Eyebrow light>OUR HOME BASE</Eyebrow><h2>Istanbul is<br />in our <em>DNA.</em></h2><p>At the crossroads of regions and cultures, Istanbul keeps us close to the energy of international trade. It shapes our perspective: stay open, move thoughtfully, and look ahead.</p><PillLink href="/services" variant="gold">What we do</PillLink></div></section>

    <CtaSection heading={<>Let&apos;s find the<br /><em>next possibility.</em></>} text="A strong connection can be the start of something important. We are ready to hear your idea." />
  </main>;
}

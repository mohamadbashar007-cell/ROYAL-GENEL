import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Boxes, Globe2, Handshake, MessageCircle, PackageCheck, Search, Ship } from 'lucide-react';
import { CtaSection } from '@/components/cta-section';
import { Eyebrow, PillLink } from '@/components/ui';

export const metadata: Metadata = {
  title: 'What We Do | Royal Genel Overseas Trading',
  description: 'Explore how Royal Genel Overseas Trading approaches market connections, export coordination, and long-term business partnerships.',
};

const areas = [
  { no: '01', title: 'Market connections', intro: 'Good opportunities begin with the right introduction.', text: 'We help bring businesses, products, and market needs into the same conversation. Our focus is on understanding the commercial objective before identifying a useful path forward.', Icon: Globe2, tags: ['Market perspective', 'Business introductions', 'Opportunity exploration'] },
  { no: '02', title: 'Export coordination', intro: 'Clarity keeps trade moving.', text: 'International trade involves many moving parts. We support the coordination between stakeholders and keep the conversation focused on the practical steps required to move an opportunity ahead.', Icon: PackageCheck, tags: ['Trade coordination', 'Supplier conversations', 'Shipment planning'] },
  { no: '03', title: 'Partnership development', intro: 'The relationship is the real starting point.', text: 'We believe in building the kind of professional relationships that can grow over time. That means listening closely, communicating clearly, and treating each new project as a chance to earn trust.', Icon: Handshake, tags: ['Long-term thinking', 'Clear communication', 'Shared growth'] },
];

const steps = [
  { no: '01', title: 'Tell us the goal', text: 'Share the product, market, or opportunity you have in mind.', Icon: MessageCircle },
  { no: '02', title: 'Explore the fit', text: 'We discuss the context, requirements, and potential route forward.', Icon: Search },
  { no: '03', title: 'Shape the plan', text: 'The right people and practical details begin to come together.', Icon: Boxes },
  { no: '04', title: 'Move forward', text: 'We keep communication clear as the opportunity develops.', Icon: Ship },
];

export default function ServicesPage() {
  return <main id="top">
    <section className="services-hero"><div className="services-hero__image"><Image src="/images/trade-detail.png" alt="Unbranded export cartons and documents in a warehouse" fill priority sizes="100vw" /></div><div className="services-hero__shade" /><div className="container services-hero__inner"><span className="breadcrumb breadcrumb--light">HOME <span>/</span> WHAT WE DO</span><Eyebrow light>HOW WE MOVE BUSINESS FORWARD</Eyebrow><h1>Trade works better<br /><em>together.</em></h1><p>From first conversation to forward movement, we bring people and possibilities together with care.</p><PillLink href="#our-services" variant="gold">Explore our services</PillLink></div><div className="services-hero__vertical" aria-hidden="true">ROYAL GENEL · OVERSEAS TRADING</div></section>

    <section className="service-intro section-space"><div className="container service-intro__inner"><Eyebrow>OUR FOCUS</Eyebrow><h2>Built for the connections<br />that make <em>trade happen.</em></h2><p>We work at the intersection of commercial opportunity and practical coordination. Our role adapts to the conversation, always with the same goal: to help make the next step clearer.</p></div></section>

    <section className="service-details" id="our-services"><div className="container"><div className="service-details__heading"><Eyebrow>WHAT WE DO</Eyebrow><span>THREE WAYS WE ADD VALUE</span></div>{areas.map(({ no, title, intro, text, Icon, tags }) => <article className="service-detail" key={title}><div className="service-detail__number">{no} <span>/</span></div><div className="service-detail__symbol"><Icon size={66} strokeWidth={1.2} /></div><div className="service-detail__body"><h3>{title}</h3><strong>{intro}</strong><p>{text}</p><div className="service-detail__tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><ArrowUpRight className="service-detail__arrow" size={31} strokeWidth={1.4} /></article>)}</div></section>

    <section className="process-section section-space"><div className="container"><div className="section-heading section-heading--light"><div><Eyebrow light>OUR PROCESS</Eyebrow><h2>Start with a conversation.<br /><em>Build from there.</em></h2></div><p>No two opportunities are identical. A clear, collaborative process helps us understand what matters most.</p></div><div className="process-grid">{steps.map(({ no, title, text, Icon }) => <div className="process-step" key={title}><div className="process-step__top"><span>{no}</span><Icon size={29} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

    <section className="faq-section section-space"><div className="container faq-section__grid"><div><Eyebrow>GOOD TO KNOW</Eyebrow><h2>Questions worth<br /><em>asking.</em></h2></div><div className="faq-list"><details><summary>What kinds of trade opportunities do you consider?</summary><p>We review opportunities case by case. Share the product, target market, and what you want to achieve, and we can discuss whether there is a good fit.</p></details><details><summary>Which markets do you work with?</summary><p>Royal Genel is based in Istanbul with an overseas trading outlook. Tell us which market you have in mind so we can discuss the specific opportunity.</p></details><details><summary>How does a new conversation begin?</summary><p>Start with a short brief about your business and your goal. We will look at the context and identify the most useful next conversation.</p></details></div></div></section>

    <CtaSection heading={<>Have a brief?<br /><em>Let&apos;s talk.</em></>} text="The most useful first step is often a clear conversation about what you want to achieve." />
  </main>;
}

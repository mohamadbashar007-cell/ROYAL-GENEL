import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Compass, Globe2, Handshake, PackageCheck } from 'lucide-react';
import { CtaSection } from '@/components/cta-section';
import { HeroCarousel } from '@/components/hero-carousel';
import { Eyebrow, PillLink, TextLink } from '@/components/ui';

const services = [
  { number: '01', title: 'Market connections', description: 'Finding the right links between businesses, products, and new possibilities across borders.', Icon: Globe2 },
  { number: '02', title: 'Export coordination', description: 'Bringing structure and clarity to the details that help international trade move forward.', Icon: PackageCheck },
  { number: '03', title: 'Lasting partnerships', description: 'Working with a long-term view, because meaningful trade is built on trusted relationships.', Icon: Handshake },
];

export default function HomePage() {
  return <main>
    <HeroCarousel />

    <div className="strength-strip"><div className="container strength-strip__inner"><div><span>✳</span>Istanbul perspective</div><div><span>↗</span>Cross-border thinking</div><div><span>◎</span>Partnership at heart</div></div></div>

    <section className="home-intro section-space" id="introduction">
      <div className="container home-intro__grid">
        <div className="home-intro__aside"><Eyebrow>WHO WE ARE</Eyebrow><div className="round-seal" aria-hidden="true"><strong>RG</strong><small>ISTANBUL<br />TÜRKIYE</small></div></div>
        <div className="home-intro__main"><h2>Great trade starts<br />with a <em>strong connection.</em></h2><div className="home-intro__bottom"><p>Royal Genel Overseas Trading is an Istanbul-based export trading company with a global outlook. We bring commercial curiosity, thoughtful coordination, and a genuine commitment to partnership to every opportunity.</p><TextLink href="/about">Get to know us</TextLink></div></div>
      </div>
    </section>

    <section className="service-preview section-space">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>WHAT WE DO</Eyebrow><h2>Moving ideas.<br /><em>Moving business.</em></h2></div><p>Every market has its own rhythm. We focus on the connections and coordination that help trade move with confidence.</p></div>
        <div className="service-preview__grid">
          {services.map(({ number, title, description, Icon }, index) => <Link href="/services" className={`service-preview__card ${index === 1 ? 'service-preview__card--red' : ''}`} key={title}><div className="service-preview__top"><span>{number} /</span><span>✦</span></div><div className="service-preview__icon"><Icon size={82} strokeWidth={1.15} /></div><h3>{title}</h3><p>{description}</p><div className="service-preview__link"><span>Explore the service</span><ArrowUpRight size={21} /></div></Link>)}
        </div>
        <div className="service-preview__all"><TextLink href="/services">See how we work</TextLink></div>
      </div>
    </section>

    <section className="crossroads">
      <div className="crossroads__image"><Image src="/images/containers.png" alt="Red and cream shipping containers at an international port" fill sizes="(max-width: 900px) 100vw, 52vw" /><span className="crossroads__image-tag">✦ &nbsp; A WORLD OF POSSIBILITIES</span></div>
      <div className="crossroads__copy"><Eyebrow light>OUR APPROACH</Eyebrow><h2>Local roots.<br /><em>Global outlook.</em></h2><p>Istanbul has always been a meeting point for ideas and markets. We carry that spirit into the way we work: listening closely, finding the right connections, and staying focused on what moves your business ahead.</p><div className="crossroads__list"><span><b>01</b> Clear communication</span><span><b>02</b> Thoughtful coordination</span><span><b>03</b> Long-term relationships</span></div><PillLink href="/about" variant="outline">Explore our approach</PillLink></div>
    </section>

    <section className="home-belief section-space"><div className="container"><Eyebrow>WHY ROYAL GENEL</Eyebrow><div className="home-belief__body"><Compass className="home-belief__icon" size={110} strokeWidth={.7} aria-hidden="true" /><h2>Because the best opportunities happen when <em>the right people</em> connect.</h2></div><div className="home-belief__bottom"><span>CURIOSITY. COMMITMENT. CONNECTION.</span><ArrowUpRight size={31} strokeWidth={1.5} /></div></div></section>

    <CtaSection />
  </main>;
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { assetPath } from '@/lib/asset-path';

const slides = [
  {
    image: assetPath('/images/hero-ship.webp'),
    alt: 'Cargo ship and shipping containers at an Istanbul port at sunset',
    label: 'FROM ISTANBUL TO THE WORLD',
    title: <>Trade beyond<br /><em>borders.</em></>,
    text: 'We connect opportunities across markets with a practical, people-first approach to overseas trading.',
    href: '/about',
    action: 'Discover Royal Genel',
  },
  {
    image: assetPath('/images/istanbul-crossroads.webp'),
    alt: 'Istanbul skyline on the Bosphorus with a cargo vessel at golden hour',
    label: 'BUILT AROUND CONNECTION',
    title: <>Good business<br /><em>goes further.</em></>,
    text: 'Rooted in Istanbul, we bring the right people, ideas, and markets together.',
    href: '/services',
    action: 'Explore what we do',
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 7500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const slide = slides[active];
  const change = (direction: number) => setActive(current => (current + direction + slides.length) % slides.length);

  return (
    <section className="hero" id="top" aria-label="Introduction to Royal Genel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="hero__images">
        {slides.map((item, index) => <div className={`hero__image ${active === index ? 'is-active' : ''}`} key={item.image} aria-hidden={active !== index}><Image src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" className="hero__photo" /></div>)}
      </div>
      <div className="hero__overlay" />
      <div className="hero__outline" aria-hidden="true">RG</div>
      <div className="container hero__inner">
        <div className="hero__content" key={active}>
          <div className="eyebrow eyebrow--gold"><i /> {slide.label}</div>
          <h1>{slide.title}</h1>
          <p>{slide.text}</p>
          <Link href={slide.href} className="pill-link pill-link--gold"><span>{slide.action}</span><span className="pill-link__icon"><ArrowUpRight size={19} /></span></Link>
        </div>
        <div className="hero__bottom">
          <div className="hero__counter"><strong>0{active + 1}</strong><span className="hero__counter-track"><span style={{ width: `${((active + 1) / slides.length) * 100}%` }} /></span><span>0{slides.length}</span></div>
          <span className="hero__bottom-label">MOVING POSSIBILITY FORWARD <b>✦</b></span>
          <div className="hero__arrows"><button type="button" onClick={() => change(-1)} aria-label="Previous hero slide"><ArrowLeft size={20} /></button><button type="button" onClick={() => change(1)} aria-label="Next hero slide"><ArrowRight size={20} /></button></div>
        </div>
      </div>
    </section>
  );
}

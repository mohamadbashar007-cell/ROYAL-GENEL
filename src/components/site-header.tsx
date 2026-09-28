'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Brand } from './brand';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Our Company' },
  { href: '/services', label: 'What We Do' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  return (
    <>
      <div className="topline">
        <div className="container topline__inner">
          <span><i aria-hidden="true" /> Based in Istanbul, Türkiye</span>
          <span>Trade is built on connection <b aria-hidden="true">✦</b></span>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <Brand onClick={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(link => <Link key={link.href} href={link.href} className={pathname === link.href ? 'is-active' : ''} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}
          </nav>
          <Link className="header-contact" href="/contact">Start a conversation <ArrowUpRight size={17} strokeWidth={2.3} /></Link>
          <button type="button" className="mobile-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? <X size={25} /> : <Menu size={25} />}</button>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => <Link key={link.href} href={link.href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{link.label}<ArrowUpRight size={22} /></Link>)}
        </nav>
        <p>Royal Genel Overseas Trading<br />Istanbul, Türkiye</p>
      </div>
    </>
  );
}

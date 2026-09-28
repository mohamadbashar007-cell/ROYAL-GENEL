import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Brand } from './brand';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-lead">
        <div><span className="eyebrow eyebrow--gold"><i /> THE NEXT CONVERSATION</span><h2>Let&apos;s make<br /><em>things move.</em></h2></div>
        <Link className="footer-lead__arrow" href="/contact" aria-label="Contact Royal Genel"><ArrowUpRight size={43} strokeWidth={1.5} /></Link>
      </div>
      <div className="container footer-main">
        <div className="footer-brand"><Brand light /><p>Connecting opportunity across borders from the heart of Istanbul.</p></div>
        <div className="footer-column"><span>EXPLORE</span><Link href="/about">Our Company</Link><Link href="/services">What We Do</Link><Link href="/contact">Contact</Link></div>
        <div className="footer-column"><span>WHERE WE ARE</span><p className="footer-location"><MapPin size={18} strokeWidth={1.8} /> Istanbul, Türkiye</p><p>Looking outward.<br />Working together.</p></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Royal Genel Overseas Trading</span><span>Built for connections that last.</span><Link href="#top">Back to top ↑</Link></div>
    </footer>
  );
}

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return <main className="not-found" id="top"><div className="container"><span>404 / PAGE NOT FOUND</span><h1>Looks like this route<br /><em>goes elsewhere.</em></h1><p>The page you are looking for could not be found.</p><Link className="pill-link pill-link--gold" href="/"><span>Return home</span><span className="pill-link__icon"><ArrowUpRight size={20} /></span></Link></div></main>;
}

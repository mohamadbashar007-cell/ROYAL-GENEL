import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow--gold' : ''}`}><i aria-hidden="true" />{children}</span>;
}

export function PillLink({ href, children, variant = 'red', className = '' }: { href: string; children: ReactNode; variant?: 'red' | 'gold' | 'outline' | 'white'; className?: string }) {
  return <Link href={href} className={`pill-link pill-link--${variant} ${className}`}><span>{children}</span><span className="pill-link__icon"><ArrowUpRight size={19} strokeWidth={1.9} /></span></Link>;
}

export function TextLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`text-link ${light ? 'text-link--light' : ''}`}>{children}<ArrowRight size={19} strokeWidth={2} /></Link>;
}

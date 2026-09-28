import Link from 'next/link';

type BrandProps = { light?: boolean; onClick?: () => void };

export function Brand({ light = false, onClick }: BrandProps) {
  return (
    <Link href="/" className={`brand ${light ? 'brand--light' : ''}`} aria-label="Royal Genel Overseas Trading — home" onClick={onClick}>
      <span className="brand__crest" aria-hidden="true">
        <svg viewBox="0 0 60 60" fill="none" role="presentation">
          <path d="M8 20.5 19.2 28 30 13l10.8 15L52 20.5l-4.2 27H12.2L8 20.5Z" fill="currentColor" />
          <path d="M17 52h26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="8" cy="17" r="3" fill="currentColor" /><circle cx="30" cy="9.5" r="3" fill="currentColor" /><circle cx="52" cy="17" r="3" fill="currentColor" />
        </svg>
      </span>
      <span className="brand__wordmark"><strong>ROYAL GENEL</strong><small>OVERSEAS TRADING</small></span>
    </Link>
  );
}

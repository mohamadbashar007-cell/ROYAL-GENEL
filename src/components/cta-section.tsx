import { Eyebrow, PillLink } from './ui';

export function CtaSection({ heading = <>Where could we<br /><em>go together?</em></>, text = 'Every great partnership starts with a conversation. Share your next idea with us.' }: { heading?: React.ReactNode; text?: string }) {
  return <section className="cta-section"><div className="cta-section__ring" aria-hidden="true" /><div className="container cta-section__inner"><div><Eyebrow light>LET&apos;S GET CONNECTED</Eyebrow><h2>{heading}</h2><p>{text}</p><PillLink href="/contact" variant="gold">Start a conversation</PillLink></div><div className="cta-section__stamp" aria-hidden="true"><span>ROYAL GENEL<br /><small>OVERSEAS TRADING</small></span><b>↗</b></div></div></section>;
}

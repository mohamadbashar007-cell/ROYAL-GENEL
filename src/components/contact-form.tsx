'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Copy, Send } from 'lucide-react';

type FormValues = { name: string; company: string; email: string; message: string; website: string };
const initialValues: FormValues = { name: '', company: '', email: '', message: '', website: '' };

export function ContactForm({ deliveryConfigured }: { deliveryConfigured: boolean }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ kind: 'success' | 'error' | 'info'; text: string } | null>(null);

  function update(key: keyof FormValues, value: string) { setValues(current => ({ ...current, [key]: value })); }

  async function copyInquiry() {
    const text = `Royal Genel Overseas Trading — Trade Inquiry\n\nName: ${values.name.trim()}\nCompany: ${values.company.trim() || '—'}\nEmail: ${values.email.trim()}\n\nMessage:\n${values.message.trim()}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus({ kind: 'success', text: 'Your inquiry has been copied. Paste it into your preferred email or message app.' });
    } catch {
      window.prompt('Copy your inquiry:', text);
      setStatus({ kind: 'info', text: 'Your inquiry is ready to copy.' });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (values.website) return;
    if (values.name.trim().length < 2 || values.message.trim().length < 10) {
      setStatus({ kind: 'error', text: 'Please enter your name and a message of at least 10 characters.' });
      return;
    }
    if (!deliveryConfigured) { await copyInquiry(); return; }

    setLoading(true);
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, name: values.name.trim(), company: values.company.trim(), email: values.email.trim(), message: values.message.trim() }) });
      const result: { ok: boolean; error?: string; message?: string } = await response.json();
      if (!response.ok || !result.ok) {
        setStatus({ kind: 'error', text: response.status === 503 ? 'Direct delivery is temporarily unavailable. Please copy your inquiry below.' : (result.error || 'We could not send your inquiry. Please try again.') });
        return;
      }
      setStatus({ kind: 'success', text: 'Thank you. Your inquiry has been sent successfully.' });
      setValues(initialValues);
    } catch {
      setStatus({ kind: 'error', text: 'Connection interrupted. Please try again or copy your inquiry below.' });
    } finally { setLoading(false); }
  }

  return <form className="contact-form" onSubmit={submit}>
    <div className="contact-form__row"><label>Full name <span>*</span><input name="name" autoComplete="name" placeholder="Your name" minLength={2} maxLength={120} value={values.name} onChange={event => update('name', event.target.value)} required /></label><label>Company <input name="company" autoComplete="organization" placeholder="Company name" maxLength={160} value={values.company} onChange={event => update('company', event.target.value)} /></label></div>
    <label>Email address <span>*</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} value={values.email} onChange={event => update('email', event.target.value)} required /></label>
    <label>Your message <span>*</span><textarea name="message" placeholder="Tell us about the opportunity, product, or market you have in mind..." rows={6} minLength={10} maxLength={5000} value={values.message} onChange={event => update('message', event.target.value)} required /></label>
    <label className="contact-form__honeypot" aria-hidden="true">Website <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => update('website', event.target.value)} /></label>
    <div className="contact-form__bottom"><p>{deliveryConfigured ? 'Your details are used only to respond to your inquiry.' : 'Official contact email has not been connected yet. Prepare and copy your inquiry here.'}</p><button className="pill-link pill-link--red" type="submit" disabled={loading}><span>{loading ? 'Sending...' : deliveryConfigured ? 'Send inquiry' : 'Copy inquiry'}</span><span className="pill-link__icon">{deliveryConfigured ? <Send size={18} /> : <Copy size={18} />}</span></button></div>
    {status && <div className={`contact-form__status contact-form__status--${status.kind}`} role="status">{status.kind === 'success' ? <CheckCircle2 size={20} /> : <ArrowUpRight size={20} />}<span>{status.text}</span>{status.kind === 'error' && <button type="button" onClick={copyInquiry}>Copy inquiry</button>}</div>}
  </form>;
}

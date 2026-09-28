import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  return ['/', '/about', '/services', '/contact'].map(path => ({ url: `${base}${path === '/' ? '/' : `${path}/`}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : .7 }));
}

import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabase.from('products').select('slug, created_at').eq('is_active', true);

  const productUrls = (products ?? []).map((p) => ({
    url: `https://dakar-dreamers.vercel.app/boutique/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: 'https://dakar-dreamers.vercel.app', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://dakar-dreamers.vercel.app/boutique', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://dakar-dreamers.vercel.app/a-propos', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
  ];
}
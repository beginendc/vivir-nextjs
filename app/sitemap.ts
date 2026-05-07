import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vivir.travel';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/blog',
    '/plan-my-trip',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch blog posts for dynamic routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, created_at')
      .eq('published', true);

    if (posts) {
      blogRoutes = posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap for blog posts:', error);
  }

  return [...staticRoutes, ...blogRoutes];
}

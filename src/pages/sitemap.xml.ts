import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? 'https://thehenhousecumbria.co.uk';
  const toSlug = (id: string) => id.replace(/\.(md|mdx)$/, '');
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  const pages = [
    { url: siteUrl, priority: '1.0', changefreq: 'monthly' },
    { url: `${siteUrl}/blog`, priority: '0.9', changefreq: 'weekly' },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${toSlug(post.id)}`,
      lastmod: (post.data.updatedDate ?? post.data.publishDate).toISOString().split('T')[0],
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

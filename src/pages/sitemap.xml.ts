import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString().replace(/\/$/, '') ?? 'https://thehenhousecumbria.co.uk';
  const toSlug = (id: string) => id.replace(/\.(md|mdx)$/, '');
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  const escapeXml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
  const latestPostDate = posts[0]
    ? posts.reduce((latest, post) => {
        const postDate = post.data.updatedDate ?? post.data.publishDate;
        return postDate > latest ? postDate : latest;
      }, posts[0].data.updatedDate ?? posts[0].data.publishDate)
    : undefined;

  const pages = [
    { url: `${siteUrl}/`, priority: '1.0', changefreq: 'monthly' },
    {
      url: `${siteUrl}/blog/`,
      lastmod: latestPostDate ? formatDate(latestPostDate) : undefined,
      priority: '0.9',
      changefreq: 'weekly',
    },
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${toSlug(post.id)}/`,
      lastmod: formatDate(post.data.updatedDate ?? post.data.publishDate),
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
    <loc>${escapeXml(page.url)}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
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

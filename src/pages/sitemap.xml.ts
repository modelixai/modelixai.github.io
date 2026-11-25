import type { APIRoute } from 'astro';
import { SUPPORTED_LANGUAGES, getCanonicalUrl } from '../i18n/translations';

const PAGE_PATHS: Array<'' | 'how-to-use/' | 'hire-me/'> = ['', 'how-to-use/', 'hire-me/'];

export const GET: APIRoute = () => {
  const urlEntries: string[] = [];

  for (const pagePath of PAGE_PATHS) {
    const xDefaultHref = getCanonicalUrl('en', pagePath);
    const alternateLinks = [
      ...SUPPORTED_LANGUAGES.map(
        (lang) =>
          `    <xhtml:link rel="alternate" hreflang="${lang.code}" href="${getCanonicalUrl(lang.code, pagePath)}" />`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultHref}" />`,
    ].join('\n');

    for (const lang of SUPPORTED_LANGUAGES) {
      const loc = getCanonicalUrl(lang.code, pagePath);
      urlEntries.push(
        `  <url>\n    <loc>${loc}</loc>\n${alternateLinks}\n  </url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

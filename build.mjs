import fs from 'node:fs';
import path from 'node:path';
import cfg from './src/config.mjs';
import { layout, href, photoPath } from './src/layout.mjs';
import { pages, notFound } from './src/pages.mjs';

const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync('assets', path.join(out, 'assets'), { recursive: true });

const write = (rel, data) => { const f = path.join(out, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const minify = h => h.replace(/\n\s*\n/g, '\n').replace(/>\s+</g, '><').replace(/\n\s+/g, '\n');

for (const p of pages) {
  let html = layout(p);
  // gallery: wire lightbox to real photos when present
  html = html.replace(/data-full="" data-name="([^"]+)"/g, (_, n) => `data-full="${photoPath(n) || ''}"`);
  write(p.slug === '' ? 'index.html' : `${p.slug}/index.html`, minify(html));
}
write('404.html', minify(layout({ ...notFound })));

const base = cfg.url;
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => p.slug !== 'privacy').map(p => `<url><loc>${base}${href(p.slug)}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${base}${cfg.base.replace(/\/$/, '')}/sitemap.xml\n`);
console.log(`Built ${pages.length + 1} pages -> ${out}/`);

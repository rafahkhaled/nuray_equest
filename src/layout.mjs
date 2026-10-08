import fs from 'node:fs';
import cfg from './config.mjs';

export const PREVIEW = !!process.env.PREVIEW; // flat, relative-link build for sandboxed hosting
const b = p => (PREVIEW ? p.slice(1) : cfg.base.replace(/\/$/, '') + p);
export const href = slug => (PREVIEW ? (slug === '' ? 'home.html' : `${slug}.html`) : b(slug === '' ? '/' : `/${slug}/`));

// Photo helper: drop assets/img/photos/<name>.(webp|jpg|jpeg|png) and it is used automatically.
const exts = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
export const photoPath = name => {
  for (const e of exts) if (fs.existsSync(`assets/img/photos/${name}.${e}`)) return b(`/assets/img/photos/${name}.${e}`);
  return null;
};
export const pic = (name, alt, { cls = '', tone = 't1', label, eager = false } = {}) => {
  const src = photoPath(name);
  const inner = src
    ? `<img src="${src}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`
    : `<div class="ph ${tone}" role="img" aria-label="${alt}"><span>${label ?? alt}</span></div>`;
  return `<div class="pic ${cls}">${inner}</div>`;
};
export const bg = (name, alt, tone = 't4') => {
  const src = photoPath(name);
  return src ? `<img src="${src}" alt="" fetchpriority="high" decoding="async">` : `<div class="ph ${tone}"></div>`;
};

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>';
export const btn = (text, to, cls = '') => `<a class="btn ${cls}" href="${to}">${text}${arrow}</a>`;
export const link = (text, to) => `<a class="link" href="${to}">${text}${arrow}</a>`;

export const nav = [
  ['about', 'About'], ['lessons', 'Lessons'], ['training', 'Training'], ['boarding', 'Boarding'],
  ['shop', 'Shop'], ['horses', 'Horses'], ['events', 'Events'], ['contact', 'Contact'],
];
const footerExplore = [['about', 'Our Story'], ['team', 'The Team'], ['horses', 'Our Horses'], ['shop', 'Shop'], ['gallery', 'Gallery'], ['faq', 'FAQ']];
const footerRide = [['lessons', 'Riding Lessons'], ['training', 'Training & Coaching'], ['boarding', 'Livery & Boarding'], ['events', 'Camps & Events'], ['contact', 'Book a Visit']];

const wa = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c0 3 2.500 5.500 5.500 5.500l1.200-1.300-2-1-.9.8a4 4 0 0 1-2-2l.8-.9-1-2z" fill="currentColor" stroke="none"/></svg>';

export function layout({ slug, title, desc, body, hero = false, schema }) {
  const full = slug === '' ? cfg.name + ' — ' + cfg.tagline : `${title} | ${cfg.name}`;
  const canon = cfg.url + href(slug);
  const ldBase = {
    '@context': 'https://schema.org', '@type': 'SportsActivityLocation', name: cfg.name, url: cfg.url,
    telephone: cfg.phone, email: cfg.email, address: cfg.address, image: cfg.url + b('/assets/img/og.jpg'),
    sameAs: [cfg.instagram],
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${full}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#4e2f23">
<link rel="canonical" href="${canon}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${cfg.name}">
<meta property="og:title" content="${full}"><meta property="og:description" content="${desc}">
<meta property="og:url" content="${canon}"><meta property="og:image" content="${cfg.url + b('/assets/img/og.jpg')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${b('/assets/img/favicon.svg')}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Playfair+Display:ital,wght@0,500;1,500&display=swap" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Playfair+Display:ital,wght@0,500;1,500&display=swap"></noscript>
<link rel="stylesheet" href="${b('/assets/css/style.css')}">
<script type="application/ld+json">${JSON.stringify(schema || ldBase)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr${(hero || !['privacy','404'].includes(slug)) ? '' : ' always'}">
  <div class="wrap">
    <a class="logo" href="${b('/')}" aria-label="${cfg.name} — home">
      <img class="light" src="${b('/assets/img/logo-light.svg')}" alt="${cfg.name}" width="88" height="60">
      <img class="dark" src="${b('/assets/img/logo.svg')}" alt="" width="88" height="60">
    </a>
    <nav class="nav" aria-label="Main">${nav.map(([s, t]) => `<a href="${href(s)}"${s === slug ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
    <a class="btn" href="${href('contact')}#book">Book a Ride${arrow}</a>
    <button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span></span></button>
  </div>
</header>
<div class="drawer" id="drawer">
  ${[['', 'Home'], ...nav, ['team', 'Team'], ['faq', 'FAQ']].map(([s, t]) => `<a class="big" href="${href(s)}">${t}</a>`).join('')}
  <div class="meta">${cfg.phone}<br>${cfg.email}</div>
</div>
<main id="main">
${body}
</main>
<footer class="ftr">
  <div class="wrap">
    <div class="cols">
      <div class="brand"><img src="${b('/assets/img/logo-light.svg')}" alt="${cfg.name}" width="140" height="96" loading="lazy"><p>${cfg.tagline}. Refined riding, thoughtful horsemanship and a welcoming community.</p></div>
      <div><h4>Explore</h4><ul>${footerExplore.map(([s, t]) => `<li><a href="${href(s)}">${t}</a></li>`).join('')}</ul></div>
      <div><h4>Ride With Us</h4><ul>${footerRide.map(([s, t]) => `<li><a href="${href(s)}">${t}</a></li>`).join('')}</ul></div>
      <div><h4>Visit</h4><ul><li>${cfg.address}</li><li>${cfg.hours}</li><li><a href="tel:${cfg.phone.replace(/\s/g, '')}">${cfg.phone}</a></li><li><a href="mailto:${cfg.email}">${cfg.email}</a></li><li><a href="${cfg.instagram}" rel="noopener" target="_blank">Instagram</a></li></ul></div>
    </div>
    <div class="bar"><span>© <span data-year>2026</span> ${cfg.name}. All rights reserved.</span><span><a href="${href('privacy')}">Privacy</a></span></div>
  </div>
</footer>
<a class="wa" href="https://wa.me/${cfg.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${wa}</a>
<script src="${b('/assets/js/main.js')}" defer></script>
</body>
</html>`;
}

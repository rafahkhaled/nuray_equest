(() => {
  const d = document, root = d.documentElement, $ = (s, c = d) => c.querySelector(s), $$ = (s, c = d) => [...c.querySelectorAll(s)];
  root.classList.add('js');

  // Header: solid after scroll, hide on scroll down
  const hdr = $('.hdr'); let lastY = 0, tick = false;
  const onScroll = () => {
    const y = scrollY;
    hdr.classList.toggle('solid', y > 40);
    hdr.classList.toggle('hide', y > 400 && y > lastY + 4 && !d.body.classList.contains('menu-open'));
    if (y < lastY - 4) hdr.classList.remove('hide');
    lastY = y; tick = false;
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // Mobile drawer
  const burger = $('.burger');
  const setMenu = on => { d.body.classList.toggle('menu-open', on); burger.setAttribute('aria-expanded', on); burger.setAttribute('aria-label', on ? 'Close menu' : 'Open menu'); };
  burger?.addEventListener('click', () => setMenu(!d.body.classList.contains('menu-open')));
  $$('.drawer a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); closeLb(); } });

  // Scroll reveal
  const rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('in'));

  // Count-up stats
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const step = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }); io.observe(el);
  });

  // Testimonial slider
  $$('.slides').forEach(box => {
    const slides = $$('.slide', box), dots = $('.dots', box.parentNode); let i = 0, timer;
    const go = n => { i = (n + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === i)); $$('button', dots).forEach((b, k) => b.setAttribute('aria-current', k === i)); };
    slides.forEach((_, k) => { const b = d.createElement('button'); b.setAttribute('aria-label', 'Testimonial ' + (k + 1)); b.onclick = () => { go(k); play(); }; dots.append(b); });
    const play = () => { clearTimeout(timer); timer = setTimeout(() => { go(i + 1); play(); }, 7000); };
    go(0); play();
  });

  // Gallery filter + lightbox
  const fl = $$('.filters button'), items = $$('.gal a');
  fl.forEach(b => b.addEventListener('click', () => {
    fl.forEach(x => x.setAttribute('aria-pressed', x === b));
    items.forEach(a => a.hidden = b.dataset.f !== 'all' && a.dataset.cat !== b.dataset.f);
  }));
  const lb = $('.lb');
  const closeLb = () => lb && lb.classList.remove('on');
  items.forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); if (!lb) return;
    const src = a.dataset.full; const holder = $('.lb-in', lb); holder.innerHTML = '';
    if (src) { const im = new Image(); im.src = src; im.alt = a.dataset.alt || ''; holder.append(im); }
    else { const p = d.createElement('div'); p.className = 'ph ' + (a.dataset.tone || 't1'); holder.append(p); }
    lb.classList.add('on');
  }));
  lb?.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'BUTTON') closeLb(); });

  // Forms -> WhatsApp / email (static site, no backend needed)
  $$('form[data-wa]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    if (f.elements.website && f.elements.website.value) return; // honeypot
    const fd = new FormData(f), lines = [];
    fd.forEach((v, k) => { if (k !== 'website' && v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v); });
    const text = encodeURIComponent('Hello Nuray Equestrian,\n\n' + lines.join('\n'));
    if (e.submitter && e.submitter.value === 'email') location.href = 'mailto:' + f.dataset.email + '?subject=' + encodeURIComponent('Enquiry — ' + (fd.get('interest') || 'General')) + '&body=' + text;
    else open('https://wa.me/' + f.dataset.wa + '?text=' + text, '_blank', 'noopener');
  }));

  // Footer year
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();

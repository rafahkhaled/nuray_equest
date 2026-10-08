import cfg from './config.mjs';
import { pic, bg, btn, link, href } from './layout.mjs';
import products, { categories } from './products.mjs';

// ---------- building blocks ----------
const hero = ({ img, tone, eyebrow, h1, lead, ctas = '', full = false, crumb }) => `
<section class="hero${full ? '' : ' page-hero'}">
  <div class="media">${bg(img, '', tone)}</div>
  <div class="wrap inner">
    ${crumb ? `<div class="crumbs rv"><a href="${href('')}">Home</a> &nbsp;/&nbsp; ${crumb}</div>` : ''}
    ${eyebrow ? `<span class="eyebrow rv">${eyebrow}</span>` : ''}
    <h1 class="rv">${h1}</h1>
    ${lead ? `<p class="lead rv" style="--d:.1s">${lead}</p>` : ''}
    ${ctas ? `<div class="row rv" style="--d:.2s">${ctas}</div>` : ''}
  </div>
  ${full ? '<span class="scroll">Scroll</span>' : ''}
</section>`;

const cta = (h = 'Come meet the horses.', p = 'Book an introductory visit and ride — no experience needed.') => `
<section class="section bg-brown cta">
  <span class="arch-deco"></span><span class="arch-deco l"></span>
  <div class="wrap center">
    <span class="eyebrow rv">${cfg.tagline}</span>
    <h2 class="rv">${h}</h2>
    <p class="lead rv">${p}</p>
    <div class="row rv" style="justify-content:center">${btn('Book a Ride', href('contact') + '#book', 'light')}${btn('WhatsApp Us', 'https://wa.me/' + cfg.whatsapp, 'ghost on-dark')}</div>
  </div>
</section>`;

const icons = {
  horse: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40V26c0-8 6-14 14-14h4l6-6 2 8c4 2 6 6 6 10v16"/><circle cx="30" cy="18" r="1" fill="currentColor"/><path d="M8 32c4 0 6 2 8 6"/></svg>',
  shoe: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M14 40c-4-2-6-6-6-12a16 16 0 0 1 32 0c0 6-2 10-6 12"/><path d="M16 38c-2-1.500-3-5-3-10m19 10c2-1.500 3-5 3-10"/></svg>',
  star: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="m24 6 5.500 11.500L42 19l-9 8.500L35 40l-11-6-11 6 2-12.500L6 19l12.500-1.500z"/></svg>',
  shield: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M24 6 8 12v11c0 10 7 17 16 20 9-3 16-10 16-20V12z"/><path d="m17 24 5 5 9-10" stroke-linecap="round"/></svg>',
  heart: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M24 41C10 31 6 24 6 17a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 7-4 14-18 24z"/></svg>',
  sun: '<svg class="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="24" cy="24" r="8"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4"/></svg>',
};
const features = (items, cls = 'g3') => `<div class="grid ${cls}">${items.map(([i, t, p], k) => `<div class="feature rv" style="--d:${k * .08}s">${icons[i]}<h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`;
const faqs = list => `<div class="faq">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
const price = (t, amt, per, list, hi, to = href('contact') + '#book') => `
<div class="price${hi ? ' hi' : ''} rv"><h3>${t}</h3><div class="amt">${amt} <small>${per}</small></div><ul>${list.map(l => `<li>${l}</li>`).join('')}</ul>${btn('Enquire', to, hi ? 'light' : 'ghost')}</div>`;

const FAQ_ALL = [
  ['Do I need any riding experience?', 'Not at all. Our introductory lessons are designed for complete beginners of every age, with calm, well-schooled horses and a qualified instructor beside you.'],
  ['What should I wear to my first lesson?', 'Comfortable long trousers and closed shoes with a small heel. We provide certified helmets and, where needed, body protectors and boots at no extra charge.'],
  ['What ages do you teach?', 'We welcome riders from age 4 upwards, in private, semi-private and small group lessons — including adults who are starting later in life.'],
  ['How do I book or reschedule?', 'Send us a message on WhatsApp or use the booking form. Lessons can be rescheduled with 12 hours’ notice at no cost.'],
  ['Can I board my own horse?', 'Yes. We offer full livery with daily turnout, premium feed programmes and veterinary and farrier coordination. See our Boarding page for options.'],
  ['What about the summer heat?', 'Riding hours move to early morning and evening during the hotter months, and our arena and stables are designed with shade and cooling in mind.'],
];

const prod = (p, k = 0) => `<div class="prod rv" data-cat="${p.cat}" style="--d:${(k % 4) * .06}s">${pic('product-' + p.id, p.name, { tone: 't1', cls: '', label: p.cat })}<small>${p.cat}</small><h3>${p.name}</h3><p class="p">${p.price}</p><a class="link" target="_blank" rel="noopener" href="https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent('Hello, I am interested in: ' + p.name)}">Enquire</a></div>`;

// ---------- pages ----------
export const pages = [];
const add = (slug, o) => pages.push({ slug, ...o });

add('', {
  title: '', desc: 'Nuray Equestrian — elegant riding lessons, training, livery and events in the UAE. A light on every ride.', hero: true,
  body: `
${hero({ full: true, img: 'hero', tone: 't4', eyebrow: 'Equestrian Club · United Arab Emirates', h1: 'A light on <em>every</em> ride.', lead: 'Riding lessons, training, livery and equestrian essentials.', ctas: btn('Book a Ride', href('contact') + '#book', 'light') + btn('Discover Lessons', href('lessons'), 'ghost on-dark') })}

<section class="section">
  <div class="wrap split">
    <div class="rv">
      <span class="eyebrow">Welcome to Nuray</span>
      <h2>Where elegance meets <span class="serif-i">horsemanship.</span></h2>
      <p class="lead">Nuray means <em>“a ray of light”</em>. It is the spirit of our club: calm, bright and welcoming — a place where every rider is guided with care and every horse is treated as a partner.</p>
      <p>From a child’s first pony ride to advanced schooling and competition preparation, our coaches combine classical technique with a modern, rider-first approach.</p>
      ${link('Our story', href('about'))}
    </div>
    <div class="rv" style="--d:.15s">${pic('about', 'Rider and horse at golden hour', { cls: 'arch', tone: 't1' })}</div>
  </div>
</section>

<section class="section bg-cream">
  <div class="wrap">
    <div class="head-row"><div class="head rv"><span class="eyebrow">What we offer</span><h2>Ride, learn, belong.</h2></div>${link('All services', href('lessons'))}</div>
    <div class="grid g4">
      ${[
        ['lessons', 'Riding Lessons', 'Private, semi-private and group lessons for every age and level.', 'lesson', 't1'],
        ['training', 'Training & Coaching', 'Dressage and jumping programmes with competition support.', 'training', 't2'],
        ['boarding', 'Livery & Boarding', 'Full-care stabling with daily turnout and premium nutrition.', 'boarding', 't3'],
        ['events', 'Camps & Events', 'Holiday camps, clinics, shows and private experiences.', 'events', 't4'],
      ].map(([s, t, p, img, tone], k) => `<a class="card rv" style="--d:${k * .08}s" href="${href(s)}">${pic(img, t, { tone, cls: 'r45' })}<div class="body"><h3>${t}</h3><p>${p}</p><span class="link">Explore</span></div></a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head center rv"><span class="eyebrow">The Nuray difference</span><h2>Considered in every detail.</h2></div>
    ${features([
      ['horse', 'Beautifully schooled horses', 'Calm, sound, well-matched mounts for every stage of your journey.'],
      ['shield', 'Safety first', 'Certified instructors, protective gear included and a clear welfare-led approach.'],
      ['heart', 'Rider-first coaching', 'Patient, personal instruction that builds confidence as much as skill.'],
      ['sun', 'Designed for the climate', 'Shaded facilities and flexible timings that keep every session comfortable.'],
      ['star', 'Pathways to compete', 'Structured progression from first trot to ribbons, if that’s your goal.'],
      ['shoe', 'A true community', 'Families, friends and fellow riders — a club you’ll love coming back to.'],
    ])}
  </div>
</section>

<section class="section bg-cream">
  <div class="wrap grid g3">
    ${['ride1:t1:Golden hour hack', 'ride2:t2:Dressage training', 'ride3:t3:First lesson smiles'].map((s, k) => { const [n, t, l] = s.split(':'); return `<div class="rv" style="--d:${k * .1}s">${pic(n, l, { cls: 'round r34', tone: t })}</div>`; }).join('')}
  </div>
  <div class="wrap center" style="margin-top:2.5rem">${link('See the gallery', href('gallery'))}</div>
</section>

<section class="section">
  <div class="wrap">
    <div class="head-row"><div class="head rv"><span class="eyebrow">Shop</span><h2>Riding essentials.</h2></div>${link('View all products', href('shop'))}</div>
    <div class="grid g4">${products.slice(0, 4).map(prod).join('')}</div>
  </div>
</section>
${cta()}`,
});

add('about', {
  title: 'Our Story', desc: 'The story, philosophy and values behind Nuray Equestrian.',
  body: `
${hero({ img: 'about-hero', tone: 't2', crumb: 'About', eyebrow: 'Our Story', h1: 'Born from a love of horses.', lead: 'Nuray Equestrian was founded on a simple belief: riding should feel graceful, safe and joyful.' })}
<section class="section">
  <div class="wrap split rev">
    <div class="rv">${pic('about', 'Riders at Nuray Equestrian', { cls: 'arch', tone: 't3' })}</div>
    <div class="rv">
      <span class="eyebrow">Philosophy</span><h2>A ray of light, on every ride.</h2>
      <p>Our name comes from the Arabic <em>Nuray</em> — “a ray of light”. It guides how we teach: with warmth, clarity and respect for rider and horse.</p>
      <p>We blend classical principles with modern coaching methods, building balanced riders and happy, athletic horses. Whether you ride for wellbeing, for family time or for the show ring, you will find a place here.</p>
      <p>Add your founder story and club history here — it is the heart of this page.</p>
    </div>
  </div>
</section>
<section class="section bg-cream"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Our values</span><h2>What guides us.</h2></div>
  ${features([['heart', 'Horse welfare', 'Fair work, quality feed, turnout and rest. The horse always comes first.'], ['shield', 'Safety & standards', 'Qualified coaches, regular safety reviews and proper equipment for every rider.'], ['star', 'Excellence with ease', 'High standards delivered in a relaxed, encouraging atmosphere.']])}
</div></section>
<section class="section"><div class="wrap">
  <div class="head-row"><div class="head rv"><span class="eyebrow">Facilities</span><h2>Space to ride and breathe.</h2></div></div>
  <div class="grid g3">${[['Floodlit arena', 'facility1', 't1'], ['Shaded stables', 'facility2', 't2'], ['Warm-up & lunging ring', 'facility3', 't3']].map(([t, n, tone], k) => `<div class="rv" style="--d:${k * .1}s">${pic(n, t, { cls: 'round r43', tone })}<h3 style="margin-top:1rem">${t}</h3></div>`).join('')}</div>
</div></section>
${cta()}`,
});

add('lessons', {
  title: 'Riding Lessons', desc: 'Riding lessons for all ages and levels — private, semi-private and group — with calm horses and qualified coaches.',
  body: `
${hero({ img: 'lesson-hero', tone: 't1', crumb: 'Lessons', eyebrow: 'Riding Lessons', h1: 'Your first step — or your next.', lead: 'Calm horses, qualified coaches and a lesson plan shaped around you.', ctas: btn('Book a Lesson', href('contact') + '#book', 'light') })}
<section class="section"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Lesson types</span><h2>Choose your way to ride.</h2></div>
  <div class="grid g3">
    ${[['Beginner', 'Learn to mount, steer, halt and trot with confidence. Perfect for first-timers.', 'lesson-beginner', 't3'], ['Intermediate', 'Develop balance, rhythm and an independent seat; introduction to canter and poles.', 'lesson-inter', 't2'], ['Advanced', 'Dressage, jumping and flatwork refinement for experienced riders.', 'lesson-adv', 't4']].map(([t, p, n, tone], k) => `<div class="card rv" style="--d:${k * .08}s">${pic(n, t, { tone, cls: 'r43' })}<div class="body"><span class="tag">Level ${k + 1}</span><h3>${t}</h3><p>${p}</p></div></div>`).join('')}
  </div>
</div></section>
<section class="section bg-cream"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Pricing</span><h2>Simple, transparent packages.</h2><p class="lead">Placeholder prices — update to your rates.</p></div>
  <div class="grid g3">
    ${price('Introductory', 'AED 250', '/ lesson', ['30-minute private lesson', 'Helmet & boots provided', 'Meet your horse', 'No commitment'])}
    ${price('Regular', 'AED 1,000', '/ 4 lessons', ['45-minute private lessons', 'Priority time slots', 'Progress notes', 'Free rescheduling'], true)}
    ${price('Group', 'AED 180', '/ lesson', ['Up to 4 riders', '45-minute lessons', 'Great for friends & family', 'All levels'])}
  </div>
</div></section>
<section class="section"><div class="wrap split wide">
  <div class="rv"><span class="eyebrow">Good to know</span><h2>Questions, answered.</h2><p>Everything you need to know before your first visit.</p>${link('All FAQs', href('faq'))}</div>
  <div class="rv">${faqs(FAQ_ALL.slice(0, 4))}</div>
</div></section>
${cta()}`,
});

add('training', {
  title: 'Training & Coaching', desc: 'Dressage, jumping and competition coaching programmes at Nuray Equestrian.',
  body: `
${hero({ img: 'training-hero', tone: 't2', crumb: 'Training', eyebrow: 'Training & Coaching', h1: 'Precision, harmony, progress.', lead: 'Structured programmes in dressage and jumping, with the support to compete when you’re ready.' })}
<section class="section"><div class="wrap split">
  <div class="rv"><span class="eyebrow">Disciplines</span><h2>Built on classical foundations.</h2><p class="lead">Every programme starts with the basics — balance, rhythm, contact — and builds toward your goals.</p>
    ${features([['star', 'Dressage', 'Elegant, correct flatwork from training level upward.'], ['horse', 'Show jumping', 'Confident, safe jumping technique from poles to courses.'], ['shield', 'Horse schooling', 'Professional training for your horse, with regular updates.']], 'g2')}
  </div>
  <div class="rv" style="--d:.15s">${pic('training', 'Dressage training', { cls: 'arch', tone: 't2' })}</div>
</div></section>
<section class="section bg-brown"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Your pathway</span><h2>From first canter to the podium.</h2></div>
  <div class="grid g4">
    ${[['Foundation', 'Seat, balance and rhythm.'], ['Develop', 'Transitions, lateral work, jumping basics.'], ['Refine', 'Course work, test riding, fitness.'], ['Compete', 'Show entries, travel and mentoring.']].map(([t, p], k) => `<div class="feature rv" style="--d:${k * .08}s"><div class="num">0${k + 1}</div><h3>${t}</h3><p>${p}</p></div>`).join('')}
  </div>
</div></section>
${cta('Set your goals with us.', 'Book an assessment ride and we’ll design a plan around you and your horse.')}`,
});

add('boarding', {
  title: 'Livery & Boarding', desc: 'Premium full-care livery and boarding for your horse in the UAE — daily turnout, quality feed and expert care.',
  body: `
${hero({ img: 'boarding-hero', tone: 't3', crumb: 'Boarding', eyebrow: 'Livery & Boarding', h1: 'Exceptional care, every day.', lead: 'Spacious stables, tailored feeding and a team that treats your horse like its own.' })}
<section class="section"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Included in full livery</span><h2>Peace of mind, standard.</h2></div>
  ${features([['horse', 'Spacious, shaded stables', 'Airy boxes with quality bedding, cleaned daily.'], ['sun', 'Daily turnout', 'Time outside in a safe, shaded paddock.'], ['heart', 'Tailored nutrition', 'Premium feed and forage matched to your horse’s workload.'], ['shield', 'Health coordination', 'Vet, farrier and dental scheduling handled for you.'], ['star', 'Arena & facilities', 'Full use of our arenas and schooling areas.'], ['shoe', '24/7 monitoring', 'Evening checks and rapid response when it matters.']])}
</div></section>
<section class="section bg-cream"><div class="wrap">
  <div class="head center rv"><span class="eyebrow">Options</span><h2>Choose your livery.</h2><p class="lead">Placeholder prices — update to your rates.</p></div>
  <div class="grid g3">
    ${price('Part Livery', 'AED 2,800', '/ month', ['Stable & bedding', 'Feed & hay', 'Arena access'])}
    ${price('Full Livery', 'AED 4,200', '/ month', ['Everything in Part', 'Daily turnout', 'Grooming & rugging', 'Health coordination'], true)}
    ${price('Training Livery', 'AED 6,500', '/ month', ['Everything in Full', '3 schooling sessions / week', 'Progress reports'])}
  </div>
</div></section>
${cta('Give your horse the best.', 'Visit the stables and meet the team — we’d love to show you around.')}`,
});

const horseList = [
  ['Aurora', 'Arabian mare · 14 yrs', 'Gentle, patient and perfect for first lessons.'],
  ['Zayd', 'Warmblood gelding · 11 yrs', 'Elegant mover and a favourite for dressage riders.'],
  ['Saffron', 'Thoroughbred cross · 9 yrs', 'Sensitive and quick — brilliant for developing riders.'],
  ['Layla', 'Pony · 10 yrs', 'The little star of our young riders’ programme.'],
  ['Noor', 'Arabian stallion · 8 yrs', 'Spirited, athletic and beautifully schooled.'],
  ['Khalid', 'Cob · 16 yrs', 'Rock-solid, kind and unflappable.'],
];
add('shop', {
  title: 'Shop', desc: 'Equestrian essentials — helmets, riding wear, boots and tack — from Nuray Equestrian.',
  body: `
${hero({ img: 'shop-hero', tone: 't4', crumb: 'Shop', eyebrow: 'Shop', h1: 'Equestrian essentials.', lead: 'Carefully selected riding wear, protection and tack. Message us to order.' })}
<section class="section"><div class="wrap">
  <p class="note rv">Sample products — replace with your catalogue in <code>src/products.mjs</code>.</p>
  <div class="filters" role="group" aria-label="Filter products"><button data-f="all" aria-pressed="true">All</button>${categories.map(c => `<button data-f="${c}" aria-pressed="false">${c}</button>`).join('')}</div>
  <div class="grid g4 shop">${products.map(prod).join('')}</div>
</div></section>
${cta('Can’t find what you need?', 'We can source specific brands and sizes — just ask.')}`,
});

add('horses', {
  title: 'Our Horses', desc: 'Meet the horses and ponies of Nuray Equestrian.',
  body: `
${hero({ img: 'horses-hero', tone: 't4', crumb: 'Horses', eyebrow: 'Meet the herd', h1: 'The heart of Nuray.', lead: 'Every horse is chosen for temperament, schooled with care and loved like family.' })}
<section class="section"><div class="wrap">
  <p class="note rv">Sample profiles — replace with your own horses.</p>
  <div class="grid g3">${horseList.map(([n, b, p], k) => `<div class="person rv" style="--d:${(k % 3) * .08}s">${pic('horse-' + n.toLowerCase(), n, { tone: ['t1', 't2', 't3', 't4'][k % 4] })}<h3>${n}</h3><small>${b}</small><p>${p}</p></div>`).join('')}</div>
</div></section>
${cta()}`,
});

add('events', {
  title: 'Camps & Events', desc: 'Holiday camps, clinics, shows and private experiences at Nuray Equestrian.',
  body: `
${hero({ img: 'events-hero', tone: 't3', crumb: 'Events', eyebrow: 'Camps & Events', h1: 'Moments worth riding for.', lead: 'From school-holiday camps to clinics, shows and bespoke private experiences.' })}
<section class="section"><div class="wrap">
  <div class="grid g2">
    ${[['Holiday Camps', 'Fun, safe, hands-on days for children — riding, horse care, crafts and friends.', 'camps', 't1'], ['Clinics & Workshops', 'Guest trainers and focused masterclasses in dressage, jumping and horsemanship.', 'clinics', 't2'], ['Club Shows', 'Friendly in-house competitions for every level — a great first taste of showing.', 'shows', 't3'], ['Private Experiences', 'Birthdays, corporate days, photoshoots and special occasions, tailored to you.', 'private', 't4']].map(([t, p, n, tone], k) => `<div class="card rv" style="--d:${(k % 2) * .08}s">${pic(n, t, { tone, cls: 'r169' })}<div class="body"><h3>${t}</h3><p>${p}</p>${link('Enquire', href('contact') + '#book')}</div></div>`).join('')}
  </div>
</div></section>
<section class="section bg-cream"><div class="wrap">
  <div class="head rv"><span class="eyebrow">Upcoming</span><h2>On the calendar.</h2></div>
  <div class="faq">
    ${[['Summer Riding Camp', 'July · Weekly sessions · Ages 6–14'], ['Dressage Clinic', 'Autumn · Guest trainer · All levels'], ['Nuray Club Show', 'Winter · In-house show · Open to all']].map(([t, d]) => `<details open><summary>${t}</summary><p>${d} — <a class="link" href="${href('contact')}#book">Reserve</a></p></details>`).join('')}
  </div>
</div></section>
${cta()}`,
});

const galItems = [['t1', 'ride1', 'riding'], ['t2', 'ride2', 'training'], ['t3', 'horse-aurora', 'horses'], ['t4', 'facility1', 'facilities'], ['t2', 'ride3', 'riding'], ['t1', 'horse-zayd', 'horses'], ['t3', 'facility2', 'facilities'], ['t4', 'training', 'training'], ['t1', 'events', 'riding']];
add('gallery', {
  title: 'Gallery', desc: 'A look inside Nuray Equestrian — riders, horses and facilities.',
  body: `
${hero({ img: 'gallery-hero', tone: 't2', crumb: 'Gallery', eyebrow: 'Gallery', h1: 'Life at the stables.', lead: 'Riders, horses and golden-hour moments.' })}
<section class="section"><div class="wrap">
  <div class="filters" role="group" aria-label="Filter gallery">${['all', 'riding', 'training', 'horses', 'facilities'].map((f, i) => `<button data-f="${f}" aria-pressed="${i === 0}">${f}</button>`).join('')}</div>
  <div class="gal">${galItems.map(([tone, n, cat], k) => { const h = ['r34', 'r43', 'r11', 'r45'][k % 4]; return `<a href="#" data-cat="${cat}" data-tone="${tone}" data-alt="${n}" data-full="${'' /* set at build */}" data-name="${n}">${pic(n, 'Nuray Equestrian — ' + cat, { tone, cls: h, label: cat })}</a>`; }).join('')}</div>
</div></section>
<div class="lb" role="dialog" aria-modal="true" aria-label="Image viewer"><button aria-label="Close">×</button><div class="lb-in"></div></div>
${cta()}`,
});

add('team', {
  title: 'The Team', desc: 'Meet the coaches and grooms of Nuray Equestrian.',
  body: `
${hero({ img: 'team-hero', tone: 't1', crumb: 'Team', eyebrow: 'The Team', h1: 'People who love horses.', lead: 'Qualified, patient and passionate — the people behind every great ride.' })}
<section class="section"><div class="wrap">
  <p class="note rv">Sample profiles — replace with your team.</p>
  <div class="grid g4">${[['Head Coach', 'Founder & Head Instructor', 'Dressage specialist with over a decade of teaching.'], ['Senior Instructor', 'Jumping & Eventing', 'Calm, clear and brilliant with young riders.'], ['Kids’ Coach', 'Young Rider Programme', 'Makes every first lesson a joyful one.'], ['Stable Manager', 'Horse care & livery', 'Keeps the whole yard running beautifully.']].map(([n, r, p], k) => `<div class="person rv" style="--d:${k * .08}s">${pic('team-' + (k + 1), n, { tone: ['t1', 't2', 't3', 't4'][k] })}<h3>${n}</h3><small>${r}</small><p>${p}</p></div>`).join('')}</div>
</div></section>
${cta()}`,
});

add('faq', {
  title: 'FAQ', desc: 'Frequently asked questions about riding lessons, boarding and visiting Nuray Equestrian.',
  schema: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ALL.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  body: `
${hero({ img: 'faq-hero', tone: 't3', crumb: 'FAQ', eyebrow: 'FAQ', h1: 'Good questions.', lead: 'Everything you might want to know before your first visit.' })}
<section class="section"><div class="wrap" style="max-width:860px"><div class="rv">${faqs(FAQ_ALL)}</div></div></section>
${cta('Still wondering?', 'Message us — we reply quickly.')}`,
});

add('contact', {
  title: 'Contact & Booking', desc: 'Book a ride, ask a question or plan a visit to Nuray Equestrian.',
  body: `
${hero({ img: 'contact-hero', tone: 't4', crumb: 'Contact', eyebrow: 'Contact', h1: 'Let’s get you in the saddle.', lead: 'Tell us a little about what you’re looking for — we’ll take it from there.' })}
<section class="section" id="book"><div class="wrap split wide" style="align-items:start">
  <div class="rv">
    <h2>Book a ride or ask a question</h2>
    <form class="form" data-wa="${cfg.whatsapp}" data-email="${cfg.email}">
      <div class="two"><div class="field"><label for="n">Name</label><input id="n" name="name" required autocomplete="name"></div><div class="field"><label for="p">Phone</label><input id="p" name="phone" type="tel" autocomplete="tel"></div></div>
      <div class="field"><label for="e">Email</label><input id="e" name="email" type="email" autocomplete="email"></div>
      <div class="two"><div class="field"><label for="i">I’m interested in</label><select id="i" name="interest"><option>Riding lessons</option><option>Training & coaching</option><option>Boarding</option><option>Camps & events</option><option>Something else</option></select></div><div class="field"><label for="l">Rider level</label><select id="l" name="level"><option>Complete beginner</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div></div>
      <div class="field"><label for="d">Preferred date / time</label><input id="d" name="when" placeholder="e.g. Saturday morning"></div>
      <div class="field"><label for="m">Message</label><textarea id="m" name="message"></textarea></div>
      <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="row"><button class="btn" type="submit" value="wa">Send via WhatsApp</button><button class="btn ghost" type="submit" value="email">Send by email</button></div>
      <p class="note">Your message opens in WhatsApp or your email app — nothing is stored on this website.</p>
    </form>
  </div>
  <div class="rv" style="--d:.12s">
    <ul class="info">
      <li><b>Visit</b><span>${cfg.address}</span></li>
      <li><b>Hours</b><span>${cfg.hours}</span></li>
      <li><b>Phone</b><a href="tel:${cfg.phone.replace(/\s/g, '')}">${cfg.phone}</a></li>
      <li><b>WhatsApp</b><a href="https://wa.me/${cfg.whatsapp}" target="_blank" rel="noopener">Chat with us</a></li>
      <li><b>Email</b><a href="mailto:${cfg.email}">${cfg.email}</a></li>
      <li><b>Instagram</b><a href="${cfg.instagram}" target="_blank" rel="noopener">@nurayequestrian</a></li>
    </ul>
    <div class="map" style="margin-top:2rem">${pic('map', 'Map placeholder — embed Google Maps here', { tone: 't2', cls: 'r43', label: 'Map — embed Google Maps' })}</div>
  </div>
</div></section>`,
});

add('privacy', {
  title: 'Privacy Policy', desc: 'How Nuray Equestrian handles your information.',
  body: `
<section class="section" style="padding-top:calc(var(--hdr) + 4rem)"><div class="wrap prose">
<h1>Privacy Policy</h1>
<p>This website does not collect personal data on its own servers. Enquiry forms open WhatsApp or your email app so you can send us a message directly; we only receive what you choose to send.</p>
<h2>Fonts</h2><p>This site loads fonts from Google Fonts, which may receive your IP address.</p>
<h2>Contact</h2><p>Questions? Email <a href="mailto:${cfg.email}" class="link">${cfg.email}</a>.</p>
<p class="note">Template text — have it reviewed before launch.</p>
</div></section>`,
});

export const notFound = {
  slug: '404', title: 'Page not found', desc: 'Page not found.',
  body: `<section class="section center" style="min-height:80svh;display:grid;place-items:center;padding-top:calc(var(--hdr) + 3rem)"><div class="wrap"><span class="eyebrow">404</span><h1>Off the trail.</h1><p class="lead">That page has wandered off. Let’s get you back.</p>${btn('Back home', href(''))}</div></section>`,
};

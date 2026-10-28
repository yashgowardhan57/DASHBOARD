'use strict';

const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
  moon: '<path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5a8.7 8.7 0 1 0 10.9 10.9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  'arrow-up-right': '<path d="M7 17 17 7M7 7h10v10"/>',
  'arrow-right': '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  server: '<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/>',
  zap: '<path d="m13 2-3 8h7l-7 12 1-9H5l8-11Z"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  sliders: '<path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M2 14h4m4-6h4m4 8h4"/>',
  chart: '<path d="M4 19V5m0 14h17"/><path d="m7 14 4-4 3 2 5-6"/><path d="M15 6h4v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  history: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5m4-1v5l3 2"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.4-3"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 14"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
  newspaper: '<path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h4"/><path d="M4 8H2v10a2 2 0 0 0 2 2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  trophy: '<path d="M8 21h8m-4-4v4M6 4h12v5a6 6 0 0 1-12 0V4Z"/><path d="M6 7H3v2a4 4 0 0 0 4 4m11-6h3v2a4 4 0 0 1-4 4"/>',
  external: '<path d="M14 3h7v7m0-7L10 14"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'
};
function svgIcon(name, extra = '') { return `<svg aria-hidden="true" viewBox="0 0 24 24" class="${extra}">${iconPaths[name] || iconPaths.code}</svg>`; }
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = svgIcon(el.dataset.icon); });

const practicals = [
  { id: 1, num: 'PRACTICAL 01', title: 'Restaurant Landing Page', short: 'Restaurant Website', category: 'frontend', categoryLabel: 'FRONTEND', type: 'Static website', description: 'A warm, responsive restaurant experience with a menu grid, testimonials, and clean section navigation.', technologies: ['HTML5', 'CSS3', 'Responsive UI'], icon: 'globe', tone: 'icon-peach', folder: 'practical-1-restaurant', path: 'practical-1-restaurant/index.html', pages: 'Single page', features: ['Responsive hero and section navigation', 'Signature menu cards and customer testimonials', 'CSS-only mobile navigation and back-to-top button'], runtime: 'Open in browser', command: null },
  { id: 2, num: 'PRACTICAL 02', title: 'E-commerce Product Catalog', short: 'E-commerce Catalog', category: 'frontend', categoryLabel: 'FRONTEND', type: 'Multi-page website', description: 'A classic luxury storefront with category browsing, product details, and responsive product cards.', technologies: ['HTML5', 'CSS3', 'Multi-page'], icon: 'layers', tone: 'icon-sand', folder: 'practical-2-ecommerce', path: 'practical-2-ecommerce/index.html', pages: '3 pages', features: ['Home, catalog, and product detail pages', 'Size and color selectors using CSS states', 'Responsive product grid and micro-interactions'], runtime: 'Open in browser', command: null },
  { id: 3, num: 'PRACTICAL 03', title: 'Developer Portfolio', short: 'Personal Portfolio', category: 'frontend', categoryLabel: 'FRONTEND', type: 'Interactive website', description: 'A personal developer portfolio with profile, skills, projects, and validated contact form.', technologies: ['HTML5', 'CSS3', 'JavaScript'], icon: 'code', tone: 'icon-lilac', folder: 'practical-3-portfolio', path: 'practical-3-portfolio/index.html', pages: '5 pages', features: ['Home, about, skills, projects, and contact pages', 'Scroll-reveal and responsive navigation', 'Client-side form validation with honest feedback'], runtime: 'Open in browser', command: null },
  { id: 4, num: 'PRACTICAL 04', title: 'Authentication System', short: 'Login & Registration', category: 'backend', categoryLabel: 'FULL-STACK', type: 'Node.js + PostgreSQL', description: 'An animated login and registration system with password hashing and session-based access.', technologies: ['Node.js', 'Express', 'PostgreSQL'], icon: 'lock', tone: 'icon-rose', folder: 'practical-4-authentication', path: 'practical-4-authentication/index.html', pages: 'Full-stack app', features: ['Login, registration, and protected dashboard routes', 'Bcrypt password hashing and Express sessions', 'PostgreSQL user records and session store when configured'], runtime: 'Node.js + PostgreSQL', command: 'cd practical-4-authentication && npm install && npm start', serverPort: 3001, appUrl: 'http://localhost:3001/login', runNote: 'Configure your local database credentials in .env using .env.example before running the authentication app.' },
  { id: 5, num: 'PRACTICAL 05', title: 'Responsive News Portal', short: 'The Daily Chronicle', category: 'backend', categoryLabel: 'FULL-STACK', type: 'Express + EJS', description: 'A digital newspaper with server-rendered stories, category routes, reusable partials, and search.', technologies: ['Node.js', 'Express', 'EJS'], icon: 'newspaper', tone: 'icon-blue', folder: 'practical-5-news-portal', path: 'practical-5-news-portal/index.html', pages: 'Dynamic portal', features: ['EJS templates and reusable header/footer/card partials', 'Category pages and individual article routes', 'Search over a local demonstration article archive'], runtime: 'Node.js + EJS', command: 'cd practical-5-news-portal && npm install && npm start', serverPort: 3002, appUrl: 'http://localhost:3002/', runNote: 'Uses local sample articles and does not require a database.' },
  { id: 6, num: 'PRACTICAL 06', title: 'Student Profile Directory', short: 'ScholarProfile', category: 'react', categoryLabel: 'REACT & API', type: 'React + REST API', description: 'A student directory built with reusable React components, searchable profiles, and an Express API.', technologies: ['React', 'JSX', 'REST API'], icon: 'user', tone: 'icon-lilac', folder: 'practical-6-student-profile', path: 'practical-6-student-profile/index.html', pages: 'React app + API', features: ['Reusable student card, stats bar, and modal components', 'Search and filter by department or academic year', 'Express endpoints for profile records and aggregate stats'], runtime: 'Node.js + Express', command: 'cd practical-6-student-profile && npm install && npm start', serverPort: 3003, appUrl: 'http://localhost:3003/', runNote: 'React and Babel are loaded from a CDN in the browser. An internet connection is needed for those CDN assets.' }
];

const state = { filter: 'all', activeNav: 'overview', search: '', sort: 'default', view: 'grid', favorites: readStore('practicalos:favorites', []), completed: readStore('practicalos:completed', []), recent: readStore('practicalos:recent', []), servers: {}, currentModal: null, dark: readStore('practicalos:dark', false) };
function readStore(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function writeStore(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage may be disabled. */ } }
function getPractical(id) { return practicals.find(p => p.id === Number(id)); }
function safeText(value) { return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c])); }
function cardMarkup(p, index) {
  const done = state.completed.includes(p.id), favorite = state.favorites.includes(p.id);
  return `<article class="project-card" style="animation-delay:${Math.min(index * 45, 270)}ms" data-project="${p.id}">
    <div class="card-top"><div class="project-identity"><span class="project-icon ${p.tone}">${svgIcon(p.icon)}</span><div><div class="project-kicker">${p.num}</div><h3 class="project-title">${p.title}</h3></div></div><button class="favorite-btn ${favorite ? 'is-favorite' : ''}" data-action="favorite" data-id="${p.id}" aria-label="${favorite ? 'Remove favorite' : 'Add favorite'}" title="${favorite ? 'Remove favorite' : 'Add favorite'}">${svgIcon('star')}</button></div>
    <p class="project-description">${p.description}</p>
    <div class="tech-tags">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
    <div class="project-meta"><span>${p.type}</span><span class="meta-dot"></span><span>${p.pages}</span><span class="status-tag ${done ? 'done' : ''}">${done ? 'Completed' : 'In progress'}</span></div>
    <div class="card-bottom"><a class="open-link" href="${p.path}" data-action="open" data-id="${p.id}">${svgIcon('arrow-up-right')} Open project</a><button class="detail-btn" data-action="details" data-id="${p.id}">Details</button><button class="complete-btn ${done ? 'is-done' : ''}" data-action="complete" data-id="${p.id}" aria-label="${done ? 'Mark incomplete' : 'Mark complete'}" title="${done ? 'Mark incomplete' : 'Mark complete'}">${svgIcon('check-circle')}</button></div>
  </article>`;
}
function filteredProjects() {
  let items = practicals.filter(p => {
    if (state.filter === 'favorites' && !state.favorites.includes(p.id)) return false;
    if (state.filter === 'completed' && !state.completed.includes(p.id)) return false;
    if (['frontend','backend','react'].includes(state.filter) && p.category !== state.filter) return false;
    const q = state.search.trim().toLowerCase();
    if (q && ![p.title,p.short,p.description,p.type,p.categoryLabel,...p.technologies].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
  if (state.sort === 'name') items = items.slice().sort((a,b) => a.title.localeCompare(b.title));
  if (state.sort === 'progress') items = items.slice().sort((a,b) => Number(state.completed.includes(a.id)) - Number(state.completed.includes(b.id)) || a.id-b.id);
  return items;
}
function filterLabel() { return ({all:'All practicals',frontend:'Frontend',backend:'Full-stack',react:'React & API',favorites:'Favorites',completed:'Completed'})[state.filter] || 'All practicals'; }
function renderProjects() {
  const grid = document.getElementById('projectGrid'), items = filteredProjects();
  grid.classList.toggle('list-view', state.view === 'list');
  grid.innerHTML = items.map(cardMarkup).join('');
  document.getElementById('visibleCount').textContent = String(items.length).padStart(2,'0');
  document.getElementById('emptyState').hidden = items.length > 0;
  document.querySelectorAll('.filter-pill').forEach(el => el.classList.toggle('active', el.dataset.filter === state.filter));
  document.querySelectorAll('.nav-item[data-filter]').forEach(el => el.classList.toggle('active', el.dataset.filter === state.filter));
  document.querySelectorAll('[data-nav]').forEach(el => el.classList.toggle('active', el.dataset.nav === state.activeNav));
  document.getElementById('favoriteCount').textContent = state.favorites.length;
  document.getElementById('completedCount').textContent = `${state.completed.length}/6`;
  updateProgress();
}
function updateProgress() {
  const n = state.completed.length, pct = Math.round(n / practicals.length * 100);
  document.getElementById('doneMetric').textContent = n;
  document.getElementById('doneBar').style.width = `${pct}%`;
  document.getElementById('progressCaption').textContent = n === 0 ? 'A fresh start' : n === 6 ? 'Everything completed!' : `${6 - n} practical${6 - n === 1 ? '' : 's'} left to go`;
  document.getElementById('progressRing').style.setProperty('--ring-angle', `${pct * 3.6}deg`);
  document.getElementById('progressPercent').innerHTML = `${pct}<span>%</span>`;
  document.getElementById('ringCompleted').textContent = `${n} / 6`;
  document.getElementById('ringMessage').textContent = n === 0 ? 'Ready when you are' : n === 6 ? 'All done — great work' : 'Keep the momentum';
  document.getElementById('legendDone').textContent = n;
  document.getElementById('legendLeft').textContent = 6 - n;
  document.getElementById('recentMetric').textContent = state.recent.length;
}
function renderRecent() {
  const el = document.getElementById('recentList'), items = state.recent.map(getPractical).filter(Boolean).slice(0,3);
  if (!items.length) { el.innerHTML = `<div class="recent-empty">${svgIcon('history')}<p>Your recent projects will show up here.</p></div>`; return; }
  el.innerHTML = items.map(p => `<a href="${p.path}" class="recent-item" data-action="open" data-id="${p.id}"><span class="recent-mini-icon ${p.tone}">${svgIcon(p.icon)}</span><span class="recent-copy"><strong>${p.short}</strong><small>${p.num} · ${p.type}</small></span><span class="recent-go">${svgIcon('arrow-up-right')}</span></a>`).join('');
}
function recordRecent(id) { state.recent = [Number(id), ...state.recent.filter(n => n !== Number(id))].slice(0,3); writeStore('practicalos:recent',state.recent); renderRecent(); updateProgress(); }
function setFilter(filter) { state.filter = filter; state.activeNav = ['favorites','completed','frontend','backend','react'].includes(filter) ? filter : 'all'; renderProjects(); document.getElementById('practicals').scrollIntoView({behavior:'smooth',block:'start'}); }
function openModal(html, key) { document.getElementById('modalContent').innerHTML = html; document.getElementById('detailModal').hidden = false; document.getElementById('overlay').hidden = false; document.body.style.overflow = 'hidden'; state.currentModal = key; const close = document.querySelector('[data-close-modal]'); if(close) close.focus(); }
function closeModal() { document.getElementById('detailModal').hidden = true; document.getElementById('overlay').hidden = true; document.body.style.overflow = ''; state.currentModal = null; }
function detailsHtml(p) {
  const command = p.command ? `<h3 class="modal-section-title">Start this practical</h3><div class="command-box"><code>${safeText(p.command)}</code><button class="copy-command" data-action="copy" data-command="${safeText(p.command)}">Copy command</button></div><p class="modal-note">${safeText(p.runNote || 'Run the command in a terminal from the project folder.')}</p>` : `<h3 class="modal-section-title">How to open</h3><div class="command-box"><code>Open ${safeText(p.path)}</code><button class="copy-command" data-action="copy" data-command="${safeText(p.path)}">Copy path</button></div><p class="modal-note">No server is needed for this practical. Open the project in the browser or through the local workspace server.</p>`;
  return `<div class="modal-eyebrow">${p.num} · ${p.categoryLabel}</div><div class="modal-title-row"><span class="modal-title-icon ${p.tone}">${svgIcon(p.icon)}</span><h2 id="modalTitle">${p.title}</h2></div><p class="modal-subtitle">${p.description}</p><div class="detail-stats"><div class="detail-stat"><strong>${safeText(p.type)}</strong><small>Technology setup</small></div><div class="detail-stat"><strong>${safeText(p.pages)}</strong><small>Project shape</small></div><div class="detail-stat"><strong>${state.completed.includes(p.id) ? 'Completed' : 'In progress'}</strong><small>Your status</small></div></div><div class="tech-tags">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div><h3 class="modal-section-title">What’s included</h3><ul class="feature-list">${p.features.map(f=>`<li>${safeText(f)}</li>`).join('')}</ul>${command}<div class="modal-actions"><a class="modal-primary" href="${p.path}" data-action="open" data-id="${p.id}">${svgIcon('arrow-up-right')} Open project</a>${p.appUrl ? `<a class="modal-secondary" href="${p.appUrl}" target="_blank" rel="noreferrer" data-action="external-app" data-id="${p.id}">${svgIcon('external')} Open running app</a>` : ''}<button class="modal-secondary" data-action="complete" data-id="${p.id}">${svgIcon('check-circle')} ${state.completed.includes(p.id)?'Mark incomplete':'Mark complete'}</button></div>`;
}
function showDetails(id) { const p = getPractical(id); if (!p) return; openModal(detailsHtml(p), `details-${p.id}`); }
function showServerGuide(preferredId = null) {
  const selected = getPractical(preferredId) || practicals.find(p => p.command);
  const commands = practicals.filter(p => p.command).map(p => `<div class="server-guide-item"><div class="modal-title-row"><span class="modal-title-icon ${p.tone}">${svgIcon(p.icon)}</span><div><h2 style="font-size:13px">${p.title}</h2><p style="margin:3px 0 0;color:#8a968b;font-size:9px">Port ${p.serverPort} · ${p.runtime}</p></div></div><div class="command-box"><code>${safeText(p.command)}</code><button class="copy-command" data-action="copy" data-command="${safeText(p.command)}">Copy</button></div><p class="modal-note">${safeText(p.runNote)}</p></div>`).join('<div style="height:13px"></div>');
  openModal(`<div class="modal-eyebrow">LOCAL DEVELOPMENT</div><div class="modal-title-row"><span class="modal-title-icon">${svgIcon('server')}</span><h2 id="modalTitle">Start a practical server</h2></div><p class="modal-subtitle">Open a terminal in the project folder, run the matching command, and keep that terminal open while using the app. The server indicators on the dashboard refresh separately.</p>${commands}<h3 class="modal-section-title">Important for Practical 4</h3><p class="modal-note">The authentication project uses PostgreSQL. Copy <code>.env.example</code> to <code>.env</code> and set your local database credentials before starting. Never share your real <code>.env</code> file.</p><div class="modal-actions"><button class="modal-primary" data-action="refresh-status">${svgIcon('refresh')} Refresh server status</button><button class="modal-secondary" data-close-modal>Close</button></div>`, `servers-${selected.id}`);
}
function showAbout() { openModal(`<div class="modal-eyebrow">ABOUT YOUR WORKSPACE</div><div class="modal-title-row"><span class="modal-title-icon">${svgIcon('trophy')}</span><h2 id="modalTitle">PracticalOS</h2></div><p class="modal-subtitle">A single dashboard for six web-development practicals. It keeps shortcuts, favorite projects, recent activity, completion tracking, and local server checks together in one responsive interface.</p><ul class="feature-list"><li>Search and filter across all six practicals</li><li>Favorite and completion states are saved in this browser</li><li>Backend status checks are served by the local hub server</li><li>Accessible layout, keyboard shortcuts, theme toggle, and reduced-motion support</li></ul><p class="modal-note">Progress and favorites are stored locally in your browser using localStorage. They are not uploaded to a server.</p><div class="modal-actions"><button class="modal-primary" data-close-modal>Sounds good</button></div>`, 'about'); }
function toast(message, icon='check-circle') { const node = document.createElement('div'); node.className='toast'; node.innerHTML=`${svgIcon(icon)}<span>${safeText(message)}</span>`; document.getElementById('toastRegion').appendChild(node); setTimeout(()=>{node.classList.add('out');setTimeout(()=>node.remove(),200)},2800); }
async function copyText(text) { try { await navigator.clipboard.writeText(text); toast('Copied to clipboard'); } catch { const input=document.createElement('textarea'); input.value=text; input.style.position='fixed'; input.style.opacity='0'; document.body.appendChild(input); input.select(); const ok=document.execCommand('copy'); input.remove(); toast(ok?'Copied to clipboard':'Copy failed — please copy manually', ok?'check-circle':'x'); } }
function toggleFavorite(id) { const n=Number(id); state.favorites = state.favorites.includes(n) ? state.favorites.filter(x=>x!==n) : [...state.favorites,n]; writeStore('practicalos:favorites',state.favorites); renderProjects(); toast(state.favorites.includes(n)?'Added to favorites':'Removed from favorites', 'star'); }
function toggleCompleted(id) { const n=Number(id); state.completed = state.completed.includes(n) ? state.completed.filter(x=>x!==n) : [...state.completed,n]; writeStore('practicalos:completed',state.completed); renderProjects(); if(state.currentModal===`details-${n}`) showDetails(n); toast(state.completed.includes(n)?'Practical marked complete':'Practical moved back to in progress'); }
async function refreshStatus() {
  const button = document.getElementById('refreshStatusBtn'); button.classList.add('is-refreshing');
  const serverRows = document.getElementById('serverList'); serverRows.innerHTML = practicals.filter(p=>p.serverPort).map(p=>`<div class="server-row"><span class="server-state checking"></span><div><strong>${p.id===4?'Authentication':p.id===5?'News portal':'Student profiles'}</strong><small>localhost:${p.serverPort}</small></div><span class="server-label">Checking</span></div>`).join('');
  try {
    const res = await fetch('/api/status', {cache:'no-store'}); if (!res.ok) throw new Error('Local status endpoint unavailable');
    const payload = await res.json(); state.servers = payload.servers || {};
    renderServerStatus();
  } catch {
    state.servers = {};
    const labels = ['Authentication','News portal','Student profiles'];
    serverRows.innerHTML = practicals.filter(p=>p.serverPort).map((p,i)=>`<div class="server-row"><span class="server-state offline"></span><div><strong>${labels[i]}</strong><small>localhost:${p.serverPort}</small></div><span class="server-label">Hub offline</span></div>`).join('');
    document.getElementById('serverCaption').textContent = 'Run the local hub for live checks';
  } finally { button.classList.remove('is-refreshing'); }
}
function renderServerStatus() {
  const labels = [{id:4,name:'Authentication'},{id:5,name:'News portal'},{id:6,name:'Student profiles'}];
  document.getElementById('serverList').innerHTML = labels.map(item => { const p=getPractical(item.id), status=state.servers[String(p.serverPort)] || state.servers[p.serverPort] || {}; const online=Boolean(status.online); return `<div class="server-row"><span class="server-state ${online?'online':'offline'}"></span><div><strong>${item.name}</strong><small>localhost:${p.serverPort}</small></div><span class="server-label ${online?'online':''}">${online?'Online':'Offline'}</span></div>`; }).join('');
  const online = Object.values(state.servers).filter(s=>s && s.online).length;
  document.getElementById('serverCaption').textContent = online ? `${online} of 3 servers online` : 'No backend servers running';
}
function setTheme(dark) { state.dark=Boolean(dark); document.body.classList.toggle('dark',state.dark); writeStore('practicalos:dark',state.dark); const btn=document.getElementById('themeBtn'); btn.innerHTML=svgIcon(state.dark?'sun':'moon'); btn.setAttribute('aria-label',state.dark?'Switch to light theme':'Switch to dark theme'); document.querySelector('meta[name="theme-color"]').content=state.dark?'#111915':'#f5f5f1'; }
function setDate() { const now=new Date(); document.getElementById('currentDate').textContent=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).toUpperCase(); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').hidden=true; }
function syncThemeIcon() { document.getElementById('themeBtn').innerHTML=svgIcon(state.dark?'sun':'moon'); }

document.addEventListener('click', event => {
  const nav = event.target.closest('[data-nav]');
  if (nav) {
    event.preventDefault();
    state.filter = 'all'; state.search = ''; state.sort = 'default';
    document.getElementById('searchInput').value = ''; document.getElementById('sortSelect').value = 'default';
    state.activeNav = nav.dataset.nav; renderProjects();
    if (nav.dataset.nav === 'overview') window.scrollTo({top:0,behavior:'smooth'});
    else document.getElementById('practicals').scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }
  const filter = event.target.closest('[data-filter]'); if (filter) { event.preventDefault(); setFilter(filter.dataset.filter); if (document.getElementById('sidebar').classList.contains('open')) closeSidebar(); return; }
  const view = event.target.closest('[data-view]'); if (view) { state.view=view.dataset.view; document.querySelectorAll('[data-view]').forEach(el=>el.classList.toggle('active',el===view)); renderProjects(); return; }
  const actionEl = event.target.closest('[data-action]');
  if (actionEl) {
    const action=actionEl.dataset.action, id=actionEl.dataset.id;
    if (action==='favorite') { event.preventDefault(); toggleFavorite(id); return; }
    if (action==='complete') { event.preventDefault(); toggleCompleted(id); return; }
    if (action==='details') { event.preventDefault(); showDetails(id); return; }
    if (action==='copy') { event.preventDefault(); copyText(actionEl.dataset.command||''); return; }
    if (action==='refresh-status') { event.preventDefault(); refreshStatus(); toast('Server status refreshed'); return; }
    if (action==='open') { recordRecent(id); return; }
    if (action==='external-app') { recordRecent(id); return; }
  }
  if (event.target.closest('[data-close-modal]')) { closeModal(); return; }
  if (event.target.id==='overlay') { closeModal(); closeSidebar(); }
});
document.getElementById('searchInput').addEventListener('input', e=>{state.search=e.target.value; renderProjects(); if(state.search) document.getElementById('practicals').scrollIntoView({behavior:'smooth',block:'start'});});
document.getElementById('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;renderProjects();});
document.getElementById('clearFiltersBtn').addEventListener('click',()=>{state.filter='all';state.activeNav='all';state.search='';document.getElementById('searchInput').value='';renderProjects();});
document.getElementById('themeBtn').addEventListener('click',()=>setTheme(!state.dark));
document.getElementById('menuBtn').addEventListener('click',()=>{document.getElementById('sidebar').classList.add('open');document.getElementById('overlay').hidden=false;});
document.getElementById('focusBtn').addEventListener('click',()=>{setFilter('completed');document.getElementById('practicals').scrollIntoView({behavior:'smooth'});});
document.getElementById('continueBtn').addEventListener('click',()=>{const p=state.recent.map(getPractical).find(Boolean)||practicals.find(p=>!state.completed.includes(p.id))||practicals[0]; recordRecent(p.id); window.location.href=p.path;});
document.getElementById('exploreBtn').addEventListener('click',()=>{state.filter='all';state.activeNav='all';renderProjects();});
document.getElementById('showIncompleteBtn').addEventListener('click',()=>{state.filter='all';state.activeNav='all';state.sort='progress';document.getElementById('sortSelect').value='progress';renderProjects();document.getElementById('practicals').scrollIntoView({behavior:'smooth'});});
document.getElementById('serverGuideBtn').addEventListener('click',()=>showServerGuide());
document.getElementById('refreshStatusBtn').addEventListener('click',refreshStatus);
document.getElementById('aboutBtn').addEventListener('click',showAbout);
document.getElementById('profileBtn').addEventListener('click',showAbout);
document.addEventListener('keydown', e=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('searchInput').focus();} if(e.key==='Escape'){closeModal();closeSidebar();} });

setDate(); setTheme(state.dark); syncThemeIcon(); renderProjects(); renderRecent(); refreshStatus();

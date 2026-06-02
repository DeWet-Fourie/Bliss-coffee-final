const cfg = window.BLISS_CONFIG || {};
const $ = (sel) => document.querySelector(sel);

function csvToRows(csv) {
  const rows = [];
  let row = [], value = '', quote = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i], n = csv[i + 1];
    if (c === '"' && quote && n === '"') { value += '"'; i++; }
    else if (c === '"') quote = !quote;
    else if (c === ',' && !quote) { row.push(value.trim()); value = ''; }
    else if ((c === '\n' || c === '\r') && !quote) {
      if (value || row.length) { row.push(value.trim()); rows.push(row); row = []; value = ''; }
      if (c === '\r' && n === '\n') i++;
    } else value += c;
  }
  if (value || row.length) { row.push(value.trim()); rows.push(row); }
  return rows.filter(r => r.some(Boolean));
}

function normaliseSheet(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.toLowerCase().trim());
  return rows.slice(1).map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] || '']))).filter(item => item.name || item.item || item.product);
}

async function loadSheet(url, fallback) {
  if (!url) return fallback;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Sheet failed');
    return normaliseSheet(csvToRows(await res.text()));
  } catch (err) {
    console.warn('Using fallback data because the sheet could not load:', err);
    return fallback;
  }
}

function isAvailable(item) {
  const raw = String(item.available ?? item.instock ?? item.stock ?? 'yes').toLowerCase();
  return !['no', 'false', '0', 'sold out', 'soldout', 'unavailable'].includes(raw);
}

function card(item, type = 'menu') {
  const name = item.name || item.item || item.product || 'Bliss item';
  const category = item.category || item.roast || item.origin || 'Bliss Coffee';
  const desc = item.description || item.notes || item.detail || 'Freshly prepared by Bliss Coffee.';
  const price = item.price || item.amount || 'Ask';
  const image = item.image || item.imageurl || item.photo || '';
  const extra = type === 'beans' ? [item.roast, item.origin, item.weight].filter(Boolean).join(' • ') : category;
  const initial = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return `
    <article class="product-card reveal" data-category="${category}">
      <div class="product-img">${image ? `<img src="${image}" alt="${name}">` : initial}</div>
      <div class="product-body">
        <span class="product-meta">${extra || 'Bliss Coffee'}</span>
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-row"><strong class="price">${price}</strong><span class="badge">${isAvailable(item) ? 'Available' : 'Sold out'}</span></div>
      </div>
    </article>`;
}

function renderFilters(items) {
  const wrap = $('#menuFilters');
  const cats = ['All', ...new Set(items.map(i => i.category || 'Other').filter(Boolean))];
  wrap.innerHTML = cats.map((cat, i) => `<button class="filter-btn ${i === 0 ? 'active' : ''}" data-filter="${cat}">${cat}</button>`).join('');
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#menuGrid .product-card').forEach(el => {
      el.style.display = filter === 'All' || el.dataset.category === filter ? '' : 'none';
    });
  });
}

function revealOnScroll() {
  const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

async function init() {
  $('#year').textContent = new Date().getFullYear();
  const wa = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent('Hi Bliss Coffee, I would like to order or enquire.')}`;
  $('#whatsappLink').href = wa;
  $('.nav-cta').href = wa;
  $('#mapsLink').href = cfg.googleMapsUrl || '#';

  $('.nav-toggle').addEventListener('click', () => {
    const nav = $('.nav');
    nav.classList.toggle('open');
    $('.nav-toggle').setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  const [menu, beans] = await Promise.all([
    loadSheet(cfg.menuSheetCsvUrl, cfg.fallbackMenu || []),
    loadSheet(cfg.beansSheetCsvUrl, cfg.fallbackBeans || [])
  ]);
  $('#menuGrid').innerHTML = menu.map(i => card(i, 'menu')).join('') || '<p>No menu items loaded yet.</p>';
  $('#beansGrid').innerHTML = beans.map(i => card(i, 'beans')).join('') || '<p>No coffee beans loaded yet.</p>';
  renderFilters(menu);
  revealOnScroll();
}

init();

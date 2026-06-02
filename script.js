const cfg = window.BLISS_CONFIG;
const clean = value => (value || '').toString().trim();

async function loadCsv(url, fallback){
  if(!url) return fallback;
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('Sheet failed');
    const text = await res.text();
    return parseCsv(text);
  }catch(err){
    console.warn('Using fallback data:', err);
    return fallback;
  }
}

function parseCsv(text){
  const rows = [];
  let row = [], cell = '', quote = false;
  for(let i=0;i<text.length;i++){
    const c = text[i], n = text[i+1];
    if(c === '"' && quote && n === '"'){ cell += '"'; i++; }
    else if(c === '"'){ quote = !quote; }
    else if(c === ',' && !quote){ row.push(cell); cell = ''; }
    else if((c === '\n' || c === '\r') && !quote){
      if(cell || row.length){ row.push(cell); rows.push(row); row=[]; cell=''; }
      if(c === '\r' && n === '\n') i++;
    } else cell += c;
  }
  if(cell || row.length){ row.push(cell); rows.push(row); }
  const headers = rows.shift().map(h => clean(h).toLowerCase());
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h,i)=>[h, clean(r[i])]))) ;
}

function wa(text){ return `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text)}`; }

function renderFilters(items){
  const wrap = document.getElementById('menuFilters');
  const cats = ['All', ...new Set(items.map(i => clean(i.category)).filter(Boolean))];
  wrap.innerHTML = cats.map((cat,i)=>`<button class="filter ${i===0?'active':''}" data-cat="${cat}">${cat}</button>`).join('');
  wrap.addEventListener('click', e => {
    if(!e.target.matches('.filter')) return;
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    renderMenu(items, e.target.dataset.cat);
  });
}

function renderMenu(items, cat='All'){
  const grid = document.getElementById('menuGrid');
  const filtered = cat === 'All' ? items : items.filter(i => clean(i.category) === cat);
  grid.innerHTML = filtered.map(item => `
    <article class="menu-card">
      <div>
        <small>${clean(item.category) || 'Menu'} ${clean(item.popular).toLowerCase()==='yes' ? ' • Popular' : ''}</small>
        <h3>${clean(item.name)}</h3>
        <p>${clean(item.description)}</p>
      </div>
      <div class="price-row">
        <span class="price">${clean(item.price)}</span>
        <a class="ask" href="${wa(`Hi Bliss Coffee, I would like to order: ${clean(item.name)}`)}" target="_blank" rel="noopener">Ask / order</a>
      </div>
    </article>`).join('');
}

function renderBeans(items){
  const grid = document.getElementById('beansGrid');
  grid.innerHTML = items.map(bean => `
    <article class="bean-card">
      <small>${clean(bean.roast)}</small>
      <h3>${clean(bean.name)}</h3>
      <p>${clean(bean.notes)}</p>
      <div class="bean-meta">
        <span>Size: <strong>${clean(bean.size)}</strong></span>
        <span>Grind: <strong>${clean(bean.grind)}</strong></span>
      </div>
      <div class="price-row">
        <span class="price">${clean(bean.price)}</span>
        <a class="ask" href="${wa(`Hi Bliss Coffee, I want to buy beans: ${clean(bean.name)}`)}" target="_blank" rel="noopener">Buy beans</a>
      </div>
    </article>`).join('');
}

(async function init(){
  const menu = await loadCsv(cfg.menuSheetCsv, cfg.fallbackMenu);
  const beans = await loadCsv(cfg.beansSheetCsv, cfg.fallbackBeans);
  renderFilters(menu);
  renderMenu(menu);
  renderBeans(beans);
})();

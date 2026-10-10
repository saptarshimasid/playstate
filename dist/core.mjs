export const money = value => new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:0}).format(value);

export function filterProducts(products, {sport='All', query='', sort='featured'}={}) {
  const terms = String(query).trim().toLowerCase().split(/\s+/).filter(Boolean);
  const result = products.filter(p => (sport === 'All' || p.sport === sport) && terms.every(term => `${p.name} ${p.sport} ${p.category} ${p.description}`.toLowerCase().includes(term)));
  if (sort === 'price-low') result.sort((a,b) => a.price-b.price);
  if (sort === 'price-high') result.sort((a,b) => b.price-a.price);
  if (sort === 'name') result.sort((a,b) => a.name.localeCompare(b.name));
  return result;
}

export function normalizeKit(raw, products) {
  if (!Array.isArray(raw)) return [];
  const clean = [];
  for (const item of raw.slice(0,128)) {
    if (!item || typeof item !== 'object') continue;
    const p = products.find(p => p.id === item.productId);
    if (!p || !p.options.includes(item.option) || !Number.isFinite(item.qty) || item.qty < 1) continue;
    const qty = Math.min(99, Math.floor(item.qty));
    const existing = clean.find(e => e.productId === p.id && e.option === item.option);
    if (existing) existing.qty = Math.min(99,existing.qty+qty);
    else clean.push({productId:p.id, option:item.option, qty});
  }
  return clean;
}

export function addToKit(kit, products, productId, option, qty=1) {
  return normalizeKit([...kit, {productId, option, qty}], products);
}

export function changeQuantity(kit, index, delta) {
  return kit.map((item,i) => i === index ? {...item, qty:Math.min(99,item.qty+delta)} : {...item}).filter(item => item.qty>0);
}

export function kitSummary(kit, products) {
  return kit.reduce((sum, item) => {
    const p = products.find(p => p.id === item.productId);
    if (p) {sum.count+=item.qty; sum.total+=p.price*item.qty;}
    return sum;
  }, {count:0,total:0});
}

export function kitText(kit, products) {
  const lines = kit.map(item => {
    const p = products.find(p => p.id === item.productId);
    return `${item.qty} × ${p.name} — ${item.option}\n  Guide price: ${money(p.price)} each | ${money(p.price*item.qty)} total`;
  });
  const summary = kitSummary(kit,products);
  return `PLAYSTATE — YOUR OUTDOOR KIT\nYour game. Your ground.\n\n${lines.join('\n\n')}\n\n${summary.count} items | Guide total: ${money(summary.total)}\n\nSample collection and indicative prices. This is a planning list, not an order. Confirm specifications, price and availability with your chosen supplier.\n`;
}

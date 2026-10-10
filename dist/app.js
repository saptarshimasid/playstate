import {money, filterProducts, normalizeKit, addToKit, changeQuantity, kitSummary, kitText} from './core.mjs';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const products = JSON.parse($('#product-data').textContent);
const productMap = new Map(products.map(p=>[p.id,p]));
const cards = new Map($$('.product-card').map(card=>[card.dataset.product,card]));
const storeKey = 'playstate-kit-v1';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let kit = [], activeSport = 'All', showAll = false, detailProduct = null, toastTimeout;
try {kit = normalizeKit(JSON.parse(localStorage.getItem(storeKey) || '[]'),products);} catch {kit=[];}

const escape = value => String(value).replace(/[&<>"']/g, char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const sprite = p => {
  const cols=p.sheet==='support'?2:4, rows=p.sheet==='support'?2:3;
  return `<div class="product-sprite ${p.sheet==='support'?'support':''}" style="--pos-x:${(p.image%cols)*100/(cols-1)}%;--pos-y:${Math.floor(p.image/cols)*100/(rows-1)}%" role="img" aria-label="${escape(p.category)}"></div>`;
};

function toast(message) {
  clearTimeout(toastTimeout); $('#toast').textContent=message; $('#toast').classList.add('show');
  toastTimeout=setTimeout(()=>$('#toast').classList.remove('show'),2800);
}

function saveKit() {
  kit=normalizeKit(kit,products);
  try {localStorage.setItem(storeKey,JSON.stringify(kit));} catch {toast('Your kit is kept for this visit. Browser saving is unavailable.');}
  updateBadge(); renderKit();
}

function updateBadge() {
  const {count}=kitSummary(kit,products);
  $$('.kit-count').forEach(el=>el.textContent=count);
  $$('.kit-toggle').forEach(el=>el.setAttribute('aria-label',`Open your kit, ${count} ${count===1?'item':'items'}`));
}

function openDialog(id) {
  $$('dialog[open]').forEach(dialog=>dialog.close());
  const dialog=$(`#${id}`);
  dialog.showModal(); document.body.classList.add('modal-open');
}

$$('dialog').forEach(dialog=>{
  dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');});
  dialog.addEventListener('click',event=>{if(event.target===dialog) {const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close();}});
});
$$('[data-close]').forEach(button=>button.addEventListener('click',()=>$(`#${button.dataset.close}`).close()));

function renderCatalog() {
  const query=$('#gear-search').value;
  const found=filterProducts(products,{sport:activeSport,query,sort:$('#gear-sort').value});
  const limit=showAll||activeSport!=='All'||query.trim()?found.length:8;
  cards.forEach(card=>card.hidden=true);
  found.forEach((p,i)=>{const card=cards.get(p.id); $('#product-grid').append(card); card.hidden=i>=limit;});
  const visible=Math.min(found.length,limit);
  $('#result-count').textContent=`Showing ${visible}${visible<found.length?` of ${found.length}`:''} ${found.length===1?'essential':'essentials'}${activeSport!=='All'?` · ${activeSport}`:''}`;
  $('#no-results').hidden=found.length>0;
  $('#show-all').hidden=visible>=found.length;
  $('#show-all').innerHTML=`See all ${found.length} essentials ${icon('plus')}`;
  $$('.filter-chip').forEach(button=>{const selected=button.dataset.filter===activeSport;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});
}

function chooseSport(sport, clearSearch=false, scroll=false) {
  activeSport=sport; showAll=false;
  if(clearSearch) $('#gear-search').value='';
  renderCatalog();
  if(scroll) $('#gear').scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
}

$$('.filter-chip').forEach(button=>button.addEventListener('click',()=>chooseSport(button.dataset.filter)));
$$('[data-sport]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();chooseSport(button.dataset.sport,true,true);}));
$('#gear-search').addEventListener('input',()=>{showAll=false;renderCatalog();});
$('#gear-sort').addEventListener('change',renderCatalog);
$('#show-all').addEventListener('click',()=>{showAll=true;renderCatalog();const next=$$('.product-card').filter(c=>!c.hidden)[8];next?.querySelector('.product-title button')?.focus({preventScroll:true});});
$('#reset-filters').addEventListener('click',()=>{$('#gear-sort').value='featured';chooseSport('All',true);$('#gear-search').focus();});
$$('.search-toggle').forEach(button=>button.addEventListener('click',()=>{$('#gear').scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});$('#gear-search').focus({preventScroll:true});}));

function openProduct(id) {
  const p=productMap.get(id); if(!p) return;
  detailProduct=p;
  $('#product-panel').innerHTML=`<div class="product-panel-grid"><div class="detail-image">${sprite(p)}</div><div class="detail-copy"><p class="eyebrow">${escape(p.sport.toUpperCase())} / THE PLAYSTATE EDIT</p><h2 id="product-detail-title">${escape(p.name)}</h2><p class="detail-price">${money(p.price)} <span>guide price</span></p><p class="detail-description">${escape(p.description)}</p><ul class="detail-specs">${p.details.map(d=>`<li>${escape(d)}</li>`).join('')}</ul><label for="product-option">Choose an option<select id="product-option">${p.options.map(o=>`<option>${escape(o)}</option>`).join('')}</select></label><button id="detail-add-kit" class="button button-dark">Add to your kit ${icon('plus')}</button></div></div>`;
  $('#detail-add-kit').addEventListener('click',()=>{addItem(p.id,$('#product-option').value);$('#product-dialog').close();});
  openDialog('product-dialog');
}

function addItem(id, option) {
  const p=productMap.get(id);if(!p)return;
  kit=addToKit(kit,products,id,option||p.options[0]); saveKit();toast(`${p.name} added to your kit`);
}

$('#product-grid').addEventListener('click',event=>{
  const detail=event.target.closest('[data-detail]');if(detail)openProduct(detail.dataset.detail);
  const add=event.target.closest('[data-add]');if(add)addItem(add.dataset.add);
});

function renderKit() {
  const {count,total}=kitSummary(kit,products);
  if(!kit.length) {
    $('#kit-items').innerHTML=`<div class="kit-empty">${icon('bag')}<h3>YOUR NEXT GAME STARTS HERE.</h3><p>Tap + on any essential to build a list that’s yours.</p><button class="button button-dark" id="empty-explore">Explore the gear ${icon('arrow')}</button></div>`;
    $('#kit-summary').innerHTML='';
    $('#empty-explore').addEventListener('click',()=>{$('#kit-dialog').close();$('#gear').scrollIntoView({behavior:reducedMotion?'auto':'smooth'});});
    return;
  }
  $('#kit-items').innerHTML=kit.map((item,index)=>{
    const p=productMap.get(item.productId);
    return `<div class="kit-item"><div class="kit-item-image">${sprite(p)}</div><div><h3 class="kit-item-name">${escape(p.name)}</h3><p class="kit-item-option">${escape(item.option)}</p><p class="kit-item-price">${money(p.price*item.qty)}</p><div class="kit-item-controls"><div class="quantity-control"><button data-quantity="${index}" data-delta="-1" aria-label="Decrease ${escape(p.name)} quantity">−</button><span aria-label="Quantity">${item.qty}</span><button data-quantity="${index}" data-delta="1" ${item.qty>=99?'disabled':''} aria-label="Increase ${escape(p.name)} quantity">+</button></div><button class="remove-kit" data-remove="${index}" aria-label="Remove ${escape(p.name)}">Remove</button></div></div></div>`;
  }).join('');
  $('#kit-summary').innerHTML=`<div class="kit-total"><span>Guide total</span><span>${money(total)}</span></div><p class="kit-summary-note">${count} ${count===1?'item':'items'} · Confirm final pricing with your supplier.</p><button class="button button-dark kit-download" id="download-kit">Download your kit list ${icon('arrow')}</button><button class="clear-kit" id="clear-kit">Clear kit</button>`;
  $('#download-kit').addEventListener('click',()=>{
    const blob=new Blob([kitText(kit,products)],{type:'text/plain;charset=utf-8'}), url=URL.createObjectURL(blob), a=document.createElement('a');
    a.href=url;a.download='PLAYSTATE-my-outdoor-kit.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Your kit list is ready. See you out there.');
  });
  $('#clear-kit').addEventListener('click',()=>{kit=[];saveKit();toast('Kit cleared. Make room for your next game.');});
}

$('#kit-items').addEventListener('click',event=>{
  const quantity=event.target.closest('[data-quantity]');if(quantity){kit=changeQuantity(kit,Number(quantity.dataset.quantity),Number(quantity.dataset.delta));saveKit();}
  const remove=event.target.closest('[data-remove]');if(remove){kit=kit.filter((_,i)=>i!==Number(remove.dataset.remove));saveKit();}
});
$$('.kit-toggle,.kit-open-link').forEach(button=>button.addEventListener('click',()=>{renderKit();openDialog('kit-dialog');}));
$('#add-cricket-kit').addEventListener('click',()=>{
  for(const id of ['cricket-bat','cricket-ball','cricket-pads','cricket-gloves','cricket-stumps']) {const p=productMap.get(id);kit=addToKit(kit,products,id,p.options[0]);}
  saveKit();openDialog('kit-dialog');toast('Five cricket essentials added to your kit');
});
window.addEventListener('storage',event=>{if(event.key===storeKey){try{kit=normalizeKit(JSON.parse(event.newValue||'[]'),products);updateBadge();renderKit();}catch{}}});

const info = {
  privacy:{title:'YOUR KIT. YOUR DEVICE.',paragraphs:['Your saved kit is stored in this browser on your device. PLAYSTATE does not ask for account details, email addresses or payment information. No analytics or advertising trackers are included in this site.','You can remove your saved kit using “Clear kit” in the kit drawer, or by clearing this site’s data in your browser. Downloaded kit lists stay on your device.']},
  collection:{title:'FOR THE LOVE OF THE GAME.',paragraphs:['PLAYSTATE is an outdoor sports store concept covering cricket, football, field hockey, golf, basketball, volleyball, tennis and badminton. The collection, product options and photography are illustrative.','Prices in Indian rupees are guides for planning. Final specifications, availability and prices should be confirmed with a supplier. The saved kit is a checklist; it does not place an order or take a payment.','Our point of view is simple: good gear should help you get outside and enjoy your game. Start with a fit that feels right and equipment suited to where you play.']}
};
$$('.policy-link').forEach(button=>button.addEventListener('click',()=>{const content=info[button.dataset.policy];$('#info-panel').innerHTML=`<p class="eyebrow">PLAYSTATE / ${button.dataset.policy==='privacy'?'PRIVACY':'OUR COLLECTION'}</p><h2 id="info-title">${content.title}</h2>${content.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}`;openDialog('info-dialog');}));

function closeMenu() {$('#mobile-nav').hidden=true;$('#menu-toggle').setAttribute('aria-expanded','false');$('#menu-toggle').setAttribute('aria-label','Open menu');}
$('#menu-toggle').addEventListener('click',()=>{const open=$('#mobile-nav').hidden;$('#mobile-nav').hidden=!open;$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'Close menu':'Open menu');});
$$('#mobile-nav a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.matchMedia('(min-width: 961px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
$('#year').textContent=new Date().getFullYear();

if('IntersectionObserver' in window && !reducedMotion) {
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  $$('.reveal').forEach(el=>observer.observe(el));
}
let scrollTick=false;
function updateProgress() {const range=document.documentElement.scrollHeight-window.innerHeight;$('.scroll-progress').style.transform=`scaleX(${range>0?Math.min(1,Math.max(0,window.scrollY/range)):0})`;scrollTick=false;}
window.addEventListener('scroll',()=>{if(!scrollTick){scrollTick=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);
renderCatalog();renderKit();updateBadge();updateProgress();

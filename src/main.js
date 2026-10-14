import { BANKS, CATEGORIES, FX_CURRENCIES } from './data.js';
import {
  LANGS, LANG_LABEL, getLang, setLang, LV, tr, t, fxCurName,
  bankDisplayName, tierPrimary, tierSecondary, tierFullName, preloadSimplified
} from './i18n.js';

/* ============ 最後更新 ============ */
const LAST_UPDATED = '2025-12-09T12:00:00+08:00';
function renderLastUpdated() {
  const lang = getLang();
  const locale = lang === 'en' ? 'en-HK' : 'zh-HK';
  const when = new Date(LAST_UPDATED);
  const dateStr = new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Hong_Kong' }).format(when);
  const full = when.toLocaleString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Hong_Kong' }) + t('lastUpdatedSuffix');
  const el = document.getElementById('lastUpdated');
  el.textContent = dateStr;
  el.title = full;
}

/* ============ 語言切換 UI ============ */
function renderLangSwitcher() {
  const el = document.getElementById('langsw');
  el.innerHTML = LANGS.map(l => `<button type="button" class="langbtn${l === getLang() ? ' on' : ''}" data-lang="${l}">${LANG_LABEL[l]}</button>`).join('');
  el.querySelectorAll('.langbtn').forEach(btn => btn.onclick = async () => {
    const lang = btn.dataset.lang;
    if (lang === 'zh-Hans') { btn.textContent = LANG_LABEL[lang] + ' …'; await preloadSimplified(); btn.textContent = LANG_LABEL[lang]; }
    setLang(lang);
    applyStaticI18n();
    renderAll();
  });
}

/* ============ 靜態介面文字（非表格） ============ */
function applyStaticI18n() {
  document.documentElement.lang = getLang() === 'en' ? 'en' : (getLang() === 'zh-Hans' ? 'zh-Hans' : 'zh-Hant');
  renderLangSwitcher();
  document.querySelector('.logo-full').innerHTML = t('appTitleName');
  document.querySelector('.logo-short').innerHTML = t('appTitleShort');
  document.getElementById('pSubtitle').textContent = t('appSubtitle');
  document.getElementById('updatedLabel').textContent = t('lastUpdatedLabel');
  renderLastUpdated();
  document.getElementById('navTdBtn').textContent = t('navTD');
  document.getElementById('navFxBtn').textContent = t('navFX');
  document.getElementById('navFeesBtn').textContent = t('navFees');
  document.querySelectorAll('.tier-notice').forEach(el => { el.innerHTML = t('tierNotice'); });
  document.getElementById('tdNotice').innerHTML = t('tdNotice');
  document.querySelectorAll('#tdType [data-type="all"], #fxType [data-type="all"], #typeChips [data-type="all"]').forEach(elx => elx.textContent = elx.parentElement.id === 'typeChips' ? t('typeChipAllBanks') : t('chipAll'));
  document.querySelectorAll('#tdType [data-type="traditional"], #fxType [data-type="traditional"], #typeChips [data-type="traditional"]').forEach(elx => elx.textContent = elx.parentElement.id === 'typeChips' ? t('typeChipTraditional') : t('chipTraditional'));
  document.querySelectorAll('#tdType [data-type="virtual"], #fxType [data-type="virtual"], #typeChips [data-type="virtual"]').forEach(elx => elx.textContent = elx.parentElement.id === 'typeChips' ? t('typeChipVirtual') : t('chipVirtual'));
  document.getElementById('tdHint').textContent = t('tdHint');
  document.getElementById('calcTdTitle').textContent = t('calcTdTitle');
  document.getElementById('labelAmount').textContent = t('labelAmount');
  document.getElementById('labelCurrency1').textContent = t('labelCurrency');
  document.getElementById('labelTenor').textContent = t('labelTenor');
  document.getElementById('calcTdNote').textContent = t('calcTdNote');
  const tenorOpts = document.querySelectorAll('#tdCalcTenor option');
  const tenorKeys = ['tenorM1', 'tenorM3', 'tenorM6', 'tenorM12'];
  tenorOpts.forEach((o, i) => o.textContent = t(tenorKeys[i]));
  document.getElementById('fxNotice').innerHTML = t('fxNotice');
  document.getElementById('fxHint').textContent = t('fxHintBest');
  document.getElementById('calcFxTitle').textContent = t('calcFxTitle');
  document.getElementById('labelUseHKD').textContent = t('labelUseHKD');
  document.getElementById('labelConvertTo').textContent = t('labelConvertTo');
  document.getElementById('feesNotice').innerHTML = t('feesNotice');
  document.getElementById('search').placeholder = t('searchPlaceholder');
  document.getElementById('legendFree').textContent = t('legendFree');
  document.getElementById('legendCond').textContent = t('legendCond');
  document.getElementById('legendPaid').textContent = t('legendPaid');
  document.getElementById('legendNA').textContent = t('legendNA');
  document.getElementById('legendHover').textContent = t('legendHover');
  document.getElementById('sc1Title').textContent = t('summaryCard1Title');
  document.getElementById('sc1Li1').textContent = t('summaryCard1Li1');
  document.getElementById('sc1Li2').textContent = t('summaryCard1Li2');
  document.getElementById('sc1Li3').textContent = t('summaryCard1Li3');
  document.getElementById('sc2Title').textContent = t('summaryCard2Title');
  document.getElementById('sc2Li1').textContent = t('summaryCard2Li1');
  document.getElementById('sc2Li2').textContent = t('summaryCard2Li2');
  document.getElementById('sc2Li3').textContent = t('summaryCard2Li3');
  document.getElementById('footerLine1').textContent = t('footerLine1');
  document.getElementById('footerLine2').textContent = t('footerLine2');
  document.getElementById('fxMidLabel').innerHTML = t('fxMidLabelPrefix') + '<span id="fxCurLabel">' + fxCur + '</span>' + t('fxMidLabelSuffix');
  if (!fxMid[fxCur]) document.getElementById('fxStatus').textContent = t('loading');
}

/* ============ 導航 ============ */
document.querySelectorAll('.nav button').forEach(b => b.onclick = () => {
  document.querySelectorAll('.nav button').forEach(x => x.classList.toggle('active', x === b));
  document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + b.dataset.page));
});
const byType = ty => b => ty === 'all' || b.type === ty;
const byCode = (a, b) => a.code.localeCompare(b.code);
/* 顯示「全部」時：傳統銀行（按 Bank Code）在上，虛擬銀行（按 Bank Code）緊接在下 */
const typeOrder = ty => ty === 'traditional' ? 0 : 1;
const byTypeThenCode = (a, b) => (typeOrder(a.type) - typeOrder(b.type)) || byCode(a, b);
const rowClass = b => b.type === 'virtual' ? ' class="vbank"' : '';
function copyText(txt, btn) {
  navigator.clipboard?.writeText(txt).then(() => { const o = btn.textContent; btn.textContent = t('copiedBtn'); setTimeout(() => btn.textContent = o, 1200); });
}
window.copyText = copyText;

/* ============ 每間銀行各自所選戶口（bankId → tier index） ============ */
const sel = {}; BANKS.forEach(b => sel[b.id] = 0);
function setTier(id, idx) { sel[id] = +idx; renderAll(); }
function tierIndexForLevel(b, lv) { const avail = b.tiers.map((tt, i) => ({ tt, i })).filter(x => x.tt.level <= lv); return avail.length ? avail[avail.length - 1].i : 0; }
function applyAll(lv) { BANKS.forEach(b => sel[b.id] = tierIndexForLevel(b, lv)); renderAll(); }
function currentGlobalLevel() { for (const lv of [1, 2, 3]) { if (BANKS.every(b => sel[b.id] === tierIndexForLevel(b, lv))) return lv; } return null; }
window.applyAll = applyAll;

function bankTypeFor(page) { return page === 'fx' ? fxType : page === 'fees' ? feeType : tdType; }
function setBankType(page, type) {
  if (page === 'fx') fxType = type;
  else if (page === 'fees') feeType = type;
  else tdType = type;
  if (page === 'fx') renderFX();
  else if (page === 'fees') renderFees();
  else renderTD();
}
const TD_CURS = [['HKD', 'chipHKD'], ['USD', 'chipUSD'], ['CNY', 'chipCNY']];
function segBtn(cls, attrs, label) {
  return `<button type="button" class="segbtn${cls}" ${attrs}>${label}</button>`;
}
function seg(kind, label, inner, scroll) {
  return `<div class="seg ${kind}"><span class="seg-label">${label}</span><div class="segctl${scroll ? ' scroll' : ''}" role="group" aria-label="${label}">${inner}</div></div>`;
}
function revealSeg(btn) {
  const scroller = btn && btn.parentElement;
  if (!scroller || !scroller.classList.contains('scroll')) return;
  const pad = 8;
  const left = btn.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft - pad;
  const right = left + btn.offsetWidth + pad * 2;
  if (left < scroller.scrollLeft) scroller.scrollLeft = Math.max(0, left);
  else if (right > scroller.scrollLeft + scroller.clientWidth) scroller.scrollLeft = right - scroller.clientWidth;
}
function renderFilterBars() {
  const curLv = currentGlobalLevel();
  document.querySelectorAll('.filterbar').forEach(bar => {
    const page = bar.dataset.page;
    const type = bankTypeFor(page);
    const groups = [];
    if (page === 'td') {
      groups.push(seg('cur', t('labelCurrency'), TD_CURS.map(([id, key]) => segBtn(tdCur === id ? ' on' : '', `data-cur="${id}" aria-pressed="${tdCur === id}"`, t(key))).join(''), false));
    } else if (page === 'fx') {
      groups.push(seg('cur', t('labelCurrency'), FX_CURRENCIES.map(x => segBtn(fxCur === x.c ? ' on' : '', `data-cur="${x.c}" aria-pressed="${fxCur === x.c}"`, `${fxCurName(x.n)} ${x.c}`)).join(''), true));
    }
    groups.push(seg('tier', t('lvHint'), [1, 2, 3].map(lv => segBtn(` l${lv}${curLv === lv ? ' on' : ''}`, `data-lv="${lv}" aria-pressed="${curLv === lv}" title="${t('lvBtnTooltip', { level: LV(lv) })}"`, LV(lv))).join(''), false));
    groups.push(seg('type', t('bankTypeHint'), [['all', 'chipAll'], ['traditional', 'chipTraditional'], ['virtual', 'chipVirtual']].map(([id, key]) => segBtn(type === id ? ' on' : '', `data-type="${id}" aria-pressed="${type === id}"`, t(key))).join(''), false));
    bar.innerHTML = groups.join('');
    revealSeg(bar.querySelector('.seg.cur .segbtn.on'));
  });
}
document.querySelectorAll('.filterbar').forEach(bar => bar.addEventListener('click', e => {
  const cur = e.target.closest('[data-cur]');
  const lv = e.target.closest('[data-lv]');
  const ty = e.target.closest('[data-type]');
  const page = bar.dataset.page;
  if (cur) {
    if (page === 'fx') { fxCur = cur.dataset.cur; document.getElementById('fxCalcCur').value = fxCur; renderFX(); }
    else { tdCur = cur.dataset.cur; renderTD(); }
  } else if (lv) applyAll(+lv.dataset.lv);
  else if (ty) setBankType(page, ty.dataset.type);
}));
function updateStuckBars() {
  document.querySelectorAll('.filterbar').forEach(bar => {
    const page = bar.closest('.page');
    const sentinel = bar.previousElementSibling;
    const active = page && page.classList.contains('active');
    const stuck = !!(active && sentinel && sentinel.getBoundingClientRect().top < 0);
    bar.classList.toggle('is-stuck', stuck);
  });
}
document.querySelectorAll('.nav button').forEach(b => b.addEventListener('click', () => requestAnimationFrame(updateStuckBars)));
window.addEventListener('scroll', updateStuckBars, { passive: true });
window.addEventListener('resize', updateStuckBars);
updateStuckBars();

const tierLabelHTML = tt => {
  const primary = tierPrimary(tt), secondary = tierSecondary(tt);
  return `<span class="nm"><span class="n1">${primary}</span>${secondary ? `<span class="n2">${secondary}</span>` : ''}</span>`;
};

/* 回傳該銀行所選戶口套用覆寫後的有效資料 */
function resolve(b) {
  const tt = b.tiers[sel[b.id]] || b.tiers[0], ov = tt.ov || {};
  const fees = { ...b.fees, ...(ov.fees || {}) };
  const td = b.td ? { ...b.td } : null;
  if (td && ov.tdAdd) { ['HKD', 'USD', 'CNY'].forEach(c => { if (td[c]) td[c] = Object.fromEntries(Object.entries(td[c]).map(([k, v]) => [k, v == null ? null : +(v + ov.tdAdd).toFixed(2)])); }); }
  const fx = { ...b.fx, spread: ov.fxSpread ?? b.fx.spread };
  return { tier: tt, fees, td, fx };
}

/* 第一欄：銀行名稱 + 戶口類別 */
function bankCell(b) {
  const r = resolve(b), tt = r.tier;
  const inner = `<span class="lv">${LV(tt.level)}</span>${tierLabelHTML(tt)}`;
  const selector = b.tiers.length > 1
    ? `<button type="button" class="tsel l${tt.level}" onclick="openTierMenu(event,'${b.id}')" title="${t('tierSelectTitle')}">${inner}<span class="arrow">▾</span></button>`
    : `<span class="tsel static l${tt.level}">${inner}</span>`;
  return `<td><div class="bank" onclick="openModal('${b.id}')" title="${t('bankNameTitle')}">${bankDisplayName(b)}</div><div class="tiersel">${selector}</div></td>`;
}

/* ============ 戶口類別下拉選單（全局 popover） ============ */
const tpop = document.getElementById('tpop'); let tpopBank = null;
function openTierMenu(e, id) {
  e.stopPropagation();
  if (tpopBank === id && tpop.classList.contains('show')) { closeTierMenu(); return; }
  const b = BANKS.find(x => x.id === id); tpopBank = id;
  tpop.innerHTML = b.tiers.map((tt, i) => `<div class="topt${i === sel[id] ? ' on' : ''}" onclick="chooseTier('${id}',${i})"><span class="lv l${tt.level}">${LV(tt.level)}</span>${tierLabelHTML(tt)}${i === sel[id] ? '<span class="chk">✓</span>' : ''}</div>`).join('');
  tpop.classList.add('show');
  const r = e.currentTarget.getBoundingClientRect(), h = tpop.offsetHeight, w = tpop.offsetWidth;
  let top = r.bottom + 4; if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 4);
  const left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8));
  tpop.style.top = top + 'px'; tpop.style.left = left + 'px';
}
function chooseTier(id, i) { closeTierMenu(); setTier(id, i); }
function closeTierMenu() { tpop.classList.remove('show'); tpopBank = null; }
window.openTierMenu = openTierMenu;
window.chooseTier = chooseTier;
document.addEventListener('click', e => { if (!tpop.contains(e.target)) closeTierMenu(); });
document.addEventListener('scroll', closeTierMenu, true);
window.addEventListener('resize', closeTierMenu);

/* ============ 定期存款 ============ */
let tdCur = 'HKD', tdType = 'all', tdSort = 'code';
const TENOR_KEYS = [['m1', 'tenorM1'], ['m3', 'tenorM3'], ['m6', 'tenorM6'], ['m12', 'tenorM12']];
document.querySelectorAll('#tdType .chip').forEach(ch => ch.onclick = () => { tdType = ch.dataset.type; document.querySelectorAll('#tdType .chip').forEach(x => x.classList.toggle('active', x === ch)); renderTD(); });
const tdRate = (td, cur, tk) => { const d = td && td[cur]; return d && d[tk] != null ? d[tk] : null; };
function setTdSort(k) { tdSort = k; renderTD(); }
window.setTdSort = setTdSort;

function renderTD() {
  renderFilterBars();
  document.getElementById('tdHead').innerHTML = `<th class="sortable" onclick="setTdSort('code')">${t('colBankTier')}${tdSort === 'code' ? '' : t('resetHint')}</th>` +
    TENOR_KEYS.map(([k, lk]) => `<th class="sortable" onclick="setTdSort('${k}')">${t(lk)}${tdSort === k ? ' ▼' : ''}</th>`).join('') +
    `<th>${t('colMinDeposit')}</th><th>${t('colCondition')}</th>`;
  let rows = BANKS.filter(byType(tdType)).map(b => ({ b, r: resolve(b) }));
  if (tdSort === 'code') rows.sort((a, c) => (tdType === 'all' ? byTypeThenCode(a.b, c.b) : byCode(a.b, c.b))); else rows.sort((a, c) => ((tdRate(c.r.td, tdCur, tdSort) ?? -1) - (tdRate(a.r.td, tdCur, tdSort) ?? -1)) || byCode(a.b, c.b));
  const best = {}; TENOR_KEYS.forEach(([k]) => best[k] = Math.max(...rows.map(x => tdRate(x.r.td, tdCur, k) ?? -1)));
  document.getElementById('tdBody').innerHTML = rows.map(({ b, r }) => `<tr${rowClass(b)}>${bankCell(b)}${TENOR_KEYS.map(([k]) => { const v = tdRate(r.td, tdCur, k); return `<td>${v == null ? `<span class="rate na">${t('rateNotAvailable')}</span>` : `<span class="rate ${v === best[k] ? 'best' : ''}">${v.toFixed(2)}%<span class="approx">≈</span></span>`}</td>`; }).join('')}<td>${tr(r.td?.min) || '—'}</td><td class="sub">${tr(r.td?.note) || ''}${r.tier.ov?.tdAdd ? '<br>' + t('tdAddNote', { tier: tierFullName(r.tier), pct: r.tier.ov.tdAdd }) : ''}</td></tr>`).join('');
  renderTdCalc();
}
['tdAmt', 'tdCalcCur', 'tdCalcTenor'].forEach(id => document.getElementById(id).addEventListener('input', renderTdCalc));
function renderTdCalc() {
  const amt = parseFloat(document.getElementById('tdAmt').value) || 0, cur = document.getElementById('tdCalcCur').value, tk = document.getElementById('tdCalcTenor').value, months = { m1: 1, m3: 3, m6: 6, m12: 12 }[tk];
  const list = BANKS.map(b => { const r = resolve(b); return { b, r, v: tdRate(r.td, cur, tk) }; }).filter(x => x.v != null).sort((a, c) => (c.v - a.v) || byCode(a.b, c.b));
  document.getElementById('tdRank').innerHTML = list.map((x, i) => `<li><b>${i + 1}. ${bankDisplayName(x.b)}</b><span class="sub">${tierFullName(x.r.tier)}</span><br><span class="amt">${cur} ${(amt * x.v / 100 * months / 12).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span><span class="sub">${t('rankYearRate')}${x.v.toFixed(2)}%</span></li>`).join('');
}

/* ============ 外幣兌換 ============ */
let fxCur = 'USD', fxType = 'all';
const fxCalcSel = document.getElementById('fxCalcCur');
function buildFxCalcOptions() {
  fxCalcSel.innerHTML = '';
  FX_CURRENCIES.forEach(x => {
    const o = document.createElement('option'); o.value = x.c; o.textContent = `${fxCurName(x.n)} ${x.c}`; fxCalcSel.appendChild(o);
  });
  fxCalcSel.value = fxCur;
}
document.querySelectorAll('#fxType .chip').forEach(ch => ch.onclick = () => { fxType = ch.dataset.type; document.querySelectorAll('#fxType .chip').forEach(x => x.classList.toggle('active', x === ch)); renderFX(); });
fxCalcSel.addEventListener('change', () => { fxCur = fxCalcSel.value; renderFX(); });
document.getElementById('fxAmt').addEventListener('input', renderFxCalc);
const fxInfo = () => FX_CURRENCIES.find(x => x.c === fxCur);
const fmtRate = (v, unit) => (v * (unit || 1)).toFixed(v < 0.1 ? 5 : 4);
const fxSupported = b => !(b.fx.cur === '3' && !['USD', 'CNY'].includes(fxCur));
let fxMid = {};

function renderFX() {
  const info = fxInfo(), mid = fxMid[fxCur], unit = info.unit || 1;
  renderFilterBars();
  document.getElementById('fxHead').innerHTML = `<th>${t('colBankTier')}</th><th>${t('colBuy')}<div class="sub">${t('colBuySub')}</div></th><th>${t('colSell')}<div class="sub">${t('colSellSub')}</div></th><th>${t('colSpread')}</th><th>${t('colCashSpread')}</th><th>${t('colCurCount')}</th><th>${t('colNotes')}</th>`;
  document.getElementById('fxMidLabel').innerHTML = t('fxMidLabelPrefix') + '<span id="fxCurLabel">' + (unit > 1 ? unit + ' ' : '') + fxCur + '</span>' + t('fxMidLabelSuffix');
  document.getElementById('fxMid').textContent = mid ? fmtRate(mid, unit) : '—';
  const rows = BANKS.filter(byType(fxType)).sort(fxType === 'all' ? byTypeThenCode : byCode).map(b => ({ b, r: resolve(b) }));
  const bestSpread = Math.min(...rows.filter(x => fxSupported(x.b)).map(x => x.r.fx.spread));
  document.getElementById('fxBody').innerHTML = rows.map(({ b, r }) => {
    const s = r.fx.spread, bid = mid * (1 - s / 100), ask = mid * (1 + s / 100);
    return `<tr${rowClass(b)}>${bankCell(b)}${fxSupported(b) ? `<td><span class="rate">${fmtRate(bid, unit)}</span></td><td><span class="rate ${s === bestSpread ? 'best' : ''}">${fmtRate(ask, unit)}</span></td>` : `<td colspan="2"><span class="rate na">${t('notSupportedCur')}</span></td>`}<td>${(s * 2).toFixed(2)}%<span class="approx">≈</span></td><td>${r.fx.notes != null ? (r.fx.notes * 2).toFixed(1) + '%<span class="approx">≈</span>' : `<span class="rate na">${t('noCash')}</span>`}</td><td>${r.fx.cur}${t('curCountSuffix')}</td><td class="sub">${tr(r.fx.note) || ''}</td></tr>`;
  }).join('');
  renderFxCalc();
}
function renderFxCalc() {
  const amt = parseFloat(document.getElementById('fxAmt').value) || 0, mid = fxMid[fxCur]; if (!mid) return;
  const list = BANKS.filter(fxSupported).map(b => { const r = resolve(b); return { b, r, get: amt / (mid * (1 + r.fx.spread / 100)) }; }).sort((a, c) => (c.get - a.get) || byCode(a.b, c.b)); const best = list[0]?.get || 0;
  document.getElementById('fxRank').innerHTML = list.map((x, i) => `<li><b>${i + 1}. ${bankDisplayName(x.b)}</b><span class="sub">${tierFullName(x.r.tier)}</span><br><span class="amt">${fxCur} ${x.get.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span><span class="sub"> ${i === 0 ? t('rankBest') : t('rankLessPrefix') + (best - x.get).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></li>`).join('');
}
async function loadFX() {
  FX_CURRENCIES.forEach(x => fxMid[x.c] = x.fallback);
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/HKD'); const j = await r.json();
    if (j && j.rates) {
      FX_CURRENCIES.forEach(x => { if (j.rates[x.c]) fxMid[x.c] = 1 / j.rates[x.c]; });
      document.getElementById('fxStatus').textContent = t('fxStatusLive') + new Date(j.time_last_update_utc).toLocaleString(getLang() === 'en' ? 'en-HK' : 'zh-HK');
    } else throw 0;
  } catch (e) { document.getElementById('fxStatus').textContent = t('fxStatusError'); }
  renderFX();
}

/* ============ 服務收費 ============ */
let currentCat = CATEGORIES[0].id, feeType = 'all', keyword = '';
function buildTabs() {
  const tabsEl = document.getElementById('tabs');
  tabsEl.innerHTML = '';
  CATEGORIES.forEach(c => {
    const el = document.createElement('div'); el.className = 'tab' + (c.id === currentCat ? ' active' : ''); el.textContent = tr(c.name); el.dataset.id = c.id;
    el.onclick = () => { currentCat = c.id; document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x.dataset.id === c.id)); renderFees(); };
    tabsEl.appendChild(el);
  });
}
document.getElementById('search').addEventListener('input', e => { keyword = e.target.value.trim().toLowerCase(); renderFees(); });
const cellHTML = f => !f ? `<span class="cell na">—</span>` : `<span class="cell ${f.lvl}">${tr(f.v)}${f.approx ? '<span class="approx">≈</span>' : ''}${f.note ? `<span class="tip">${tr(f.note)}</span>` : ''}</span>`;
function renderFees() {
  const cat = CATEGORIES.find(c => c.id === currentCat);
  renderFilterBars();
  document.getElementById('thead').innerHTML = `<th>${t('colBankTier')}</th>` + cat.cols.map(([k, l]) => `<th>${tr(l)}</th>`).join('');
  const rows = BANKS.filter(byType(feeType)).filter(b => !keyword || (b.code + b.swift + b.name + b.nameEn + b.en + b.tiers.map(tierFullName).join()).toLowerCase().includes(keyword)).sort(feeType === 'all' ? byTypeThenCode : byCode);
  document.getElementById('tbody').innerHTML = rows.length ? rows.map(b => { const r = resolve(b); return `<tr${rowClass(b)}>${bankCell(b)}${cat.cols.map(([k]) => `<td>${cellHTML(r.fees[k])}</td>`).join('')}</tr>`; }).join('') : `<tr><td colspan="${cat.cols.length + 1}" style="text-align:center;color:var(--muted)">${t('noMatch')}</td></tr>`;
}

/* ============ 詳情視窗（頂部可切換戶口類別） ============ */
const modalBg = document.getElementById('modalBg'), modal = document.getElementById('modal');
function modalTier(id, i) { setTier(id, i); openModal(id); }
window.modalTier = modalTier;
function openModal(id) {
  const b = BANKS.find(x => x.id === id), r = resolve(b);
  let h = `<button class="close" onclick="closeModal()">×</button><h2>${bankDisplayName(b)}</h2><p style="margin:0 0 6px;color:var(--muted)">${b.en} <span class="type ${b.type}">${b.type === 'virtual' ? t('modalTypeVirtual') : t('modalTypeTraditional')}</span></p>`;
  h += `<div class="mtiers-wrap"><div class="lbl">${b.tiers.length > 1 ? t('modalTierPickerMulti') : t('modalTierPickerSingle')}</div><div class="mtiers">` +
    b.tiers.map((tt, i) => `<button type="button" class="mtier l${tt.level}${i === sel[id] ? ' on' : ''}" onclick="modalTier('${id}',${i})"><span class="lv">${LV(tt.level)}</span>${tierLabelHTML(tt)}</button>`).join('') + `</div></div>`;
  h += `<div class="info"><table><tr><td>${t('infoBankCode')}</td><td><span class="code">${b.code}</span><button class="copy" onclick="copyText('${b.code}',this)">${t('copyBtn')}</button></td></tr>
  <tr><td>${t('infoSwift')}</td><td><span class="code">${b.swift}</span><button class="copy" onclick="copyText('${b.swift}',this)">${t('copyBtn')}</button>${b.swiftNote ? `<div class="sub" style="margin-top:6px">${tr(b.swiftNote)}</div>` : ''}</td></tr>
  <tr><td>${t('infoThreshold')}</td><td>${tr(r.tier.min)}</td></tr>
  <tr><td>${t('infoWebsite')}</td><td><a href="${b.url}" target="_blank" rel="noopener" style="color:var(--primary-2)">${t('infoWebsiteLink')}</a></td></tr></table></div>`;
  h += `<h4 style="margin:16px 0 6px;color:#334155">${t('modalTdTitle')}</h4><table><tr><td>${t('labelCurrency')}</td><td>${t('modalTdColTenors')}</td></tr>`;
  ['HKD', 'USD', 'CNY'].forEach(c => { h += `<tr><td>${c}</td><td>${TENOR_KEYS.map(([k]) => { const v = tdRate(r.td, c, k); return v == null ? '—' : v.toFixed(2) + '%'; }).join(' / ')}</td></tr>`; });
  h += `<tr><td>${t('colMinDeposit')}</td><td>${tr(r.td?.min) || '—'}</td></tr><tr><td>${t('colNotes')}</td><td>${tr(r.td?.note) || '—'}${r.tier.ov?.tdAdd ? `<div class="sub">${t('tdAddNote', { tier: tierFullName(r.tier), pct: r.tier.ov.tdAdd })}</div>` : ''}</td></tr></table>`;
  h += `<h4 style="margin:16px 0 6px;color:#334155">${t('modalFxTitle')}</h4><table><tr><td>${t('modalFxSpread')}</td><td>≈ ${(r.fx.spread * 2).toFixed(2)}%</td></tr><tr><td>${t('modalFxCashSpread')}</td><td>${r.fx.notes != null ? '≈ ' + (r.fx.notes * 2).toFixed(1) + '%' : t('modalFxNoCashService')}</td></tr><tr><td>${t('colCurCount')}</td><td>${r.fx.cur}${t('curCountSuffix')}</td></tr><tr><td>${t('colNotes')}</td><td>${tr(r.fx.note) || '—'}</td></tr></table>`;
  CATEGORIES.forEach(c => {
    h += `<h4 style="margin:16px 0 6px;color:#334155">${tr(c.name)}</h4><table>`;
    c.cols.forEach(([k, label]) => { const f = r.fees[k]; h += `<tr><td>${tr(label)}</td><td>${cellHTML(f)}${f && f.note ? `<div class="sub" style="margin-top:4px">${tr(f.note)}</div>` : ''}</td></tr>`; });
    h += '</table>';
  });
  h += `<p class="sub" style="margin-top:16px">${t('modalFooterNote', { tier: tierFullName(r.tier), level: LV(r.tier.level) })}</p>`;
  const keepScroll = modalBg.classList.contains('show') ? modal.scrollTop : 0;
  modal.innerHTML = h; modalBg.classList.add('show'); modal.scrollTop = keepScroll;
}
window.openModal = openModal;
function closeModal() { modalBg.classList.remove('show'); }
window.closeModal = closeModal;
modalBg.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeTierMenu(); } });

/* ============ 初始化 ============ */
function renderAll() {
  renderLastUpdated();
  buildFxCalcOptions();
  renderTD();
  renderFX();
  buildTabs();
  renderFees();
}
applyStaticI18n();
buildFxCalcOptions();
buildTabs();
renderTD();
loadFX();
renderFees();

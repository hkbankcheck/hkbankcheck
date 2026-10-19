import { BANKS, CATEGORIES, FX_CURRENCIES } from './data.js';
import {
  LANGS, LANG_LABEL, getLang, setLang, LV, tr, t, fxCurName,
  bankDisplayName, tierPrimary, tierSecondary, tierFullName, preloadSimplified
} from './i18n.js';
let tdCur = 'HKD', tdType = 'all', tdSort = 'code'; // 👈 加喺呢度

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
} // 👈 補返呢個大括號！完美閂返 revealSeg 函數

function renderFilterBars() {
  const curLv = currentGlobalLevel();
  document.querySelectorAll('.filterbar').forEach(bar => {
    const page = bar.dataset.page;
    const type = bankTypeFor(page);
    const groups = [];

       // 1. 貨幣掣 + 快速切換月份 (整合喺同一行)
    if (page === 'td') {
      groups.push(`
        <div class="seg cur" style="width: 100%; flex-basis: 100%; display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span class="seg-label">${t('labelCurrency')}</span>
          <div class="segctl" role="group" aria-label="${t('labelCurrency')}">
            ${TD_CURS.map(([id, key]) => {
              const isOn = tdCur === id;
              return `<button type="button" class="segbtn${isOn ? ' on' : ''}" data-cur="${id}" aria-pressed="${isOn}" style="color: ${isOn ? '#082f49' : '#475569'} !important; background: ${isOn ? '#fff' : 'transparent'} !important; border: none; cursor: pointer;">${t(key)}</button>`;
            }).join('')}
          </div>
          <select id="tdQuickMonth" class="quick-select" style="color: #000 !important; background-color: #fff !important; padding: 6px 30px 6px 12px !important; border: 1px solid var(--line) !important; border-radius: 8px !important; font-size: 13px !important; font-weight: 600 !important; display: inline-block !important; margin-left: 10px;">
            <option value="m1" ${tdSort === 'm1' ? 'selected' : ''}>1 個月</option>
            <option value="m3" ${tdSort === 'm3' ? 'selected' : ''}>3 個月</option>
            <option value="m6" ${tdSort === 'm6' ? 'selected' : ''}>6 個月</option>
            <option value="m12" ${tdSort === 'm12' ? 'selected' : ''}>12 個月</option>
          </select>
        </div>
      `);
    } else if (page === 'fx') {
      groups.push(seg('cur', t('labelCurrency'), FX_CURRENCIES.map(x => {
        const isOn = fxCur === x.c;
        return `<button type="button" class="segbtn${isOn ? ' on' : ''}" data-cur="${x.c}" aria-pressed="${isOn}" style="color: ${isOn ? '#082f49' : '#475569'} !important; background: ${isOn ? '#fff' : 'transparent'} !important; border: none; cursor: pointer;">${fxCurName(x.n)} ${x.c}</button>`;
      }).join(''), true));
    }

    // 2. 戶口級別掣
    groups.push(seg('tier', t('lvHint'), [1, 2, 3].map(lv => {
      const isOn = curLv === lv;
      const activeColor = lv === 1 ? '#0369a1' : lv === 2 ? '#b45309' : '#6d28d9';
      return `<button type="button" class="segbtn l${lv}${isOn ? ' on' : ''}" data-lv="${lv}" aria-pressed="${isOn}" title="${t('lvBtnTooltip', { level: LV(lv) })}" style="color: ${isOn ? activeColor : '#475569'} !important; background: ${isOn ? '#fff' : 'transparent'} !important; border: none; cursor: pointer;">${LV(lv)}</button>`;
    }).join(''), false));

    // 3. 銀行類型掣
    groups.push(seg('type', t('bankTypeHint'), [['all', 'chipAll'], ['traditional', 'chipTraditional'], ['virtual', 'chipVirtual']].map(([id, key]) => {
      const isOn = type === id;
      return `<button type="button" class="segbtn${isOn ? ' on' : ''}" data-type="${id}" aria-pressed="${isOn}" style="color: ${isOn ? '#082f49' : '#475569'} !important; background: ${isOn ? '#fff' : 'transparent'} !important; border: none; cursor: pointer;">${t(key)}</button>`;
    }).join(''), false));
    // 一次過畫出所有嘢
    bar.innerHTML = groups.join('');
    revealSeg(bar.querySelector('.seg.cur .segbtn.on'));
  }); // 閂返 forEach
} // 閂返 function
  // 👇 下面係接駁返原本嘅 Click 事件 👇
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
  return `<td><div class="bank" onclick="openModal('${b.id}')" title="${t('bankNameTitle')}">${bankDisplayName(b)} <span class="info-icon">ⓘ</span></div><div class="tiersel">${selector}</div></td>`;
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
const TENOR_KEYS = [['m1', 'tenorM1'], ['m3', 'tenorM3'], ['m6', 'tenorM6'], ['m12', 'tenorM12']];
document.querySelectorAll('#tdType .chip').forEach(ch => ch.onclick = () => { tdType = ch.dataset.type; document.querySelectorAll('#tdType .chip').forEach(x => x.classList.toggle('active', x === ch)); renderTD(); });
const tdRate = (td, cur, tk) => { const d = td && td[cur]; return d && d[tk] != null ? d[tk] : null; };
function setTdSort(k) { tdSort = k; renderTD(); }
window.setTdSort = setTdSort;

function renderTD() {
  renderFilterBars();

  // 👇 新增：根據選擇嘅月份，重新排列欄位順序 👇
  let orderedTenorKeys = [...TENOR_KEYS];
  if (['m1', 'm3', 'm6', 'm12'].includes(tdSort)) {
    const targetKey = TENOR_KEYS.find(x => x[0] === tdSort);
    if (targetKey) {
      // 將選中嘅月份放去最前面，其餘保持原序
      orderedTenorKeys = [targetKey, ...TENOR_KEYS.filter(x => x[0] !== tdSort)];
    }
  }

  // 畫表頭 (使用 orderedTenorKeys)
  document.getElementById('tdHead').innerHTML = `<th class="sortable" onclick="setTdSort('code')">${t('colBankTier')}${tdSort === 'code' ? '' : t('resetHint')}</th>` +
    orderedTenorKeys.map(([k, lk]) => `<th class="sortable" onclick="setTdSort('${k}')">${t(lk)} <span class="sort-icon">${tdSort === k ? '▼' : '↕'}</span></th>`).join('') +
    `<th>${t('colMinDeposit')}</th><th>${t('colCondition')}</th>`;

  let rows = BANKS.filter(byType(tdType)).map(b => ({ b, r: resolve(b) }));
  
  // 排序邏輯：如果係 code 就按銀行排，否則按選中嘅月份息率排
  if (tdSort === 'code') {
    rows.sort((a, c) => (tdType === 'all' ? byTypeThenCode(a.b, c.b) : byCode(a.b, c.b))); 
  } else {
    rows.sort((a, c) => ((tdRate(c.r.td, tdCur, tdSort) ?? -1) - (tdRate(a.r.td, tdCur, tdSort) ?? -1)) || byCode(a.b, c.b));
  }

  const best = {}; 
  TENOR_KEYS.forEach(([k]) => best[k] = Math.max(...rows.map(x => tdRate(x.r.td, tdCur, k) ?? -1)));

  // 畫表格內容 (使用 orderedTenorKeys)
  document.getElementById('tdBody').innerHTML = rows.map(({ b, r }) => `<tr${rowClass(b)}>${bankCell(b)}${orderedTenorKeys.map(([k]) => { const v = tdRate(r.td, tdCur, k); return `<td>${v == null ? `<span class="rate na">${t('rateNotAvailable')}</span>` : `<span class="rate ${v === best[k] ? 'best' : ''}">${v.toFixed(2)}%<span class="approx">≈</span></span>`}</td>`; }).join('')}<td>${tr(r.td?.min) || '—'}</td><td class="sub">${tr(r.td?.note) || ''}${r.tier.ov?.tdAdd ? '<br>' + t('tdAddNote', { tier: tierFullName(r.tier), pct: r.tier.ov.tdAdd }) : ''}</td></tr>`).join('');
  
  renderTdCalc();
}
['tdAmt', 'tdCalcCur', 'tdCalcTenor'].forEach(id => document.getElementById(id).addEventListener('input', renderTdCalc));
// 👇 新增：監聽快速切換月份下拉選單嘅改變 👇
document.addEventListener('change', (e) => {
  if (e.target && e.target.id === 'tdQuickMonth') {
    setTdSort(e.target.value); 
  }
});
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
/* ============ 終極方案：動態固定表頭 ============ */
document.addEventListener('DOMContentLoaded', () => {
  const cloneWrapper = document.createElement('div');
  cloneWrapper.className = 'sticky-thead-clone';
  document.body.appendChild(cloneWrapper);

  let isStuck = false;
  let activeTableWrap = null;
  let activeThead = null;

   function handleStickyHeader() {
    // 每次滾動時，尋找目前顯示中（active）嘅 page 入面嘅 table-wrap
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    const currentTableWrap = activePage.querySelector('.table-wrap');
    const currentThead = currentTableWrap ? currentTableWrap.querySelector('thead') : null;
    const currentFilterBar = activePage.querySelector('.filterbar');

    if (!currentTableWrap || !currentThead || !currentFilterBar) {
      cloneWrapper.style.display = 'none';
      return;
    }

    // 更新當前追蹤嘅元素
    activeTableWrap = currentTableWrap;
    activeThead = currentThead;

    const filterBarHeight = currentFilterBar.offsetHeight;
    const tableRect = currentTableWrap.getBoundingClientRect();
    const theadRect = currentThead.getBoundingClientRect();

    // 判斷條件：表格頂部已經滑過 Filter Bar，而且表格底部仲未滑出畫面
    if (tableRect.top < filterBarHeight && tableRect.bottom > filterBarHeight + theadRect.height) {
      if (!isStuck) {
        isStuck = true;
        
        // 複製當前 thead 嘅 HTML
        const originalTableClass = currentTableWrap.querySelector('table').className;
        cloneWrapper.innerHTML = `<table class="${originalTableClass}" style="width:${currentTableWrap.scrollWidth}px; min-width:980px; border-collapse:separate; border-spacing:0; table-layout:fixed;"><thead>${currentThead.innerHTML}</thead></table>`;
        
        cloneWrapper.style.display = 'block';
        currentTableWrap.classList.add('is-stuck-thead');
      }
  
      // 實時更新位置、寬度同高度
      cloneWrapper.style.top = filterBarHeight + 'px';
      cloneWrapper.style.left = tableRect.left + 'px';
      cloneWrapper.style.width = tableRect.width + 'px';
      
      // 同步左右滑動
      cloneWrapper.scrollLeft = currentTableWrap.scrollLeft;

      // 🌟 暴力對齊法
      setTimeout(() => {
        const originalThs = currentThead.querySelectorAll('th');
        const cloneThs = cloneWrapper.querySelectorAll('th');
        
        originalThs.forEach((th, index) => {
          if (cloneThs[index]) {
            cloneThs[index].style.width = th.offsetWidth + 'px';
            cloneThs[index].style.minWidth = th.offsetWidth + 'px';
            cloneThs[index].style.maxWidth = th.offsetWidth + 'px';
            cloneThs[index].style.height = th.offsetHeight + 'px';
          }
        });
      }, 10);
      
    } else {
      // 當拉返上頂時，收埋個影子表頭
      if (isStuck) {
        isStuck = false;
        cloneWrapper.style.display = 'none';
        currentTableWrap.classList.remove('is-stuck-thead');
      }
    }
  } // 👈 呢度完美閂返 handleStickyHeader，下面唔應該再有 }

  // 綁定各種滾動事件
  window.addEventListener('scroll', handleStickyHeader, { passive: true });
  
  // 當表格內部左右滑動時，同步影子表頭
  document.addEventListener('scroll', (e) => {
    if (e.target.classList && e.target.classList.contains('table-wrap')) {
      if (isStuck) {
        cloneWrapper.scrollLeft = e.target.scrollLeft;
      }
    }
  }, true);

  // 當切換 Tab / Filter 時，等 50ms 讓 DOM 更新後重新計算
  document.querySelectorAll('.nav button, .filterbar, .chip, .tab').forEach(el => {
    el.addEventListener('click', () => setTimeout(handleStickyHeader, 50));
  });
  
  window.addEventListener('resize', handleStickyHeader);
}); // 👈 呢度完美閂返 DOMContentLoaded

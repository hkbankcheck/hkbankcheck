/* 繁體（香港用字）→ 簡體 自動轉換；用於將原有繁體內容即時轉換為簡體，
   不需要為每一個字串另外維護簡體版本。轉換字典按需動態載入，
   避免預設（繁體／英文）使用者下載不必要的資料。 */
let converter = null;
let converterLoading = null;
function ensureConverter() {
  if (converter) return Promise.resolve(converter);
  if (!converterLoading) {
    converterLoading = import('opencc-js').then(OpenCC => {
      converter = OpenCC.Converter({ from: 'hk', to: 'cn' });
      return converter;
    });
  }
  return converterLoading;
}

export const LANGS = ['zh-Hant', 'en', 'zh-Hans'];
export const LANG_LABEL = { 'zh-Hant': '繁體中文', en: 'English', 'zh-Hans': '简体中文' };
export const LANG_HTML = { 'zh-Hant': 'zh-Hant', en: 'en', 'zh-Hans': 'zh-Hans' };

const STORAGE_KEY = 'hkbank_lang';
let currentLang = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.includes(saved)) return saved;
  } catch (e) {}
  return 'zh-Hant';
})();

export function getLang() { return currentLang; }
export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  document.documentElement.lang = LANG_HTML[lang];
}

export function toSimplified(s) {
  if (s == null) return s;
  if (!converter) return String(s); /* 轉換字典仍在載入中，暫時原樣顯示 */
  return converter(String(s));
}

/* 在切換至簡體中文前，先確保轉換字典已載入完成，避免畫面短暫顯示未轉換文字。 */
export function preloadSimplified() {
  return ensureConverter();
}

/* 級別顯示名稱 */
const LEVEL_NAME = { 'zh-Hant': { 1: '基本', 2: '中階', 3: '高階' }, en: { 1: 'Basic', 2: 'Mid', 3: 'Premium' } };
export function LV(level) {
  const lang = currentLang;
  if (lang === 'en') return LEVEL_NAME.en[level] || '';
  const zh = LEVEL_NAME['zh-Hant'][level] || '';
  return lang === 'zh-Hans' ? toSimplified(zh) : zh;
}

/* ============ 資料內容片語辭典（繁體原文 → 英文） ============
   簡體版本一律由上面的 OpenCC 轉換器即時產生，不需要在此另外維護。 */
export const PHRASE_EN = {
'006／CITIHKHX 為 Citibank N.A. 香港分行；零售個人戶口多屬 Citibank (Hong Kong) Limited（編號 250、SWIFT CITIHKAX），匯入前請在 Citi App 核實。':
  "006 / CITIHKHX is Citibank N.A.'s Hong Kong branch; most retail personal accounts are held with Citibank (Hong Kong) Limited (code 250, SWIFT CITIHKAX). Please verify in the Citi app before transferring.",
'11 種貨幣儲蓄。': 'Save in 11 currencies.',
'2025 年 11 月起生效。': 'Effective from November 2025.',
'2025 年 2 月起由 HK$65 加至 HK$70；Global Money 轉海外滙豐豁免。':
  'Raised from HK$65 to HK$70 since February 2025; waived for Global Money transfers to overseas HSBC accounts.',
'2026 年修訂通知。': 'Revised notice effective 2026.',
'Airstar 戶口': 'Airstar Account',
'Ant Bank 戶口': 'Ant Bank Account',
'App 內開立。': 'Opened via the app.',
'Citi Plus 新資金優惠。': 'Citi Plus new-money promotional rate.',
'Citi Plus 網上兌換差價較窄。': 'Citi Plus offers a narrower online FX spread.',
'Citi 環球轉賬免費；其他 HK$100': 'Free via Citi Global Transfer; otherwise HK$100',
'Fusion 戶口': 'Fusion Account',
'Global Money 可持 10+ 種貨幣。': 'Global Money supports 10+ currencies.',
'GoSave 2.0 不時限時加息。': 'GoSave 2.0 occasionally offers limited-time rate boosts.',
'HK$10,000（否則 HK$100／月）': 'HK$10,000 (otherwise HK$100/month)',
'HK$100／月': 'HK$100/month',
'HK$15（經 CHATS）': 'HK$15 (via CHATS)',
'HK$250 + 海外銀行費用': 'HK$250 + overseas bank charges',
'HK$275 + 海外銀行費用': 'HK$275 + overseas bank charges',
'HK$500,000（2026/3 起）': 'HK$500,000 (from Mar 2026)',
'HK$65（匯往星展海外戶口免費）': 'HK$65 (free when transferring to overseas DBS accounts)',
'Mox 戶口': 'Mox Account',
'Mox 方面免手續費': 'Fee waived by Mox',
'Premium 理財': 'Premium Banking',
'SC Mobile 新資金優惠。': 'SC Mobile new-money promotional rate.',
'WeLab 戶口': 'WeLab Account',
'WeLab 方面免手續費': 'Fee waived by WeLab',
'ZA Remit 透明低費用': 'ZA Remit — transparent, low fees',
'ZA 方面免手續費': 'Fee waived by ZA',
'ZA 銀行戶口': 'ZA Bank Account',
'digibank 新資金優惠。': 'digibank new-money promotional rate.',
'livi 戶口': 'livi Account',
'liviSave 定存。': 'liviSave time deposit.',
'一般 HK$260、One HK$230。': 'Generally HK$260; HSBC One HK$230.',
'一般客戶綜合理財': 'Standard Integrated Banking',
'不提供': 'Not offered',
'不提供提款卡': 'No debit/ATM card offered',
'不提供硬幣存入': 'No coin deposit service',
'不時有限時加息。': 'Occasional limited-time rate boosts.',
'不適用': 'Not applicable',
'中小型銀行利率一般較四大行高。': 'Mid-sized banks generally offer higher rates than the big four.',
'中銀理財': 'BOC Wealth Management',
'中銀／銀通網絡免費': 'Free at BOC / JETCO network ATMs',
'人民幣報價具競爭力。': 'Competitive RMB rates.',
'人民幣定存及跨境匯款為賣點。': 'RMB time deposits and cross-border transfers are a key strength.',
'以存款業務為主。': 'Primarily focused on deposit products.',
'以港元／美元／人民幣為主。': 'Mainly HKD / USD / RMB.',
'低於 HK$100 萬收 HK$120／月': 'HK$120/month if below HK$1,000,000',
'低於 HK$100 萬收 HK$300／月': 'HK$300/month if below HK$1,000,000',
'低於 HK$100 萬收 HK$380／月': 'HK$380/month if below HK$1,000,000',
'低於 HK$150 萬收 HK$300／月': 'HK$300/month if below HK$1,500,000',
'低於 HK$50 萬收 HK$300／月': 'HK$300/month if below HK$500,000',
'個人戶口一般用 11 位 HSBCHKHHHKH；總行 8 位為 HSBCHKHH。':
  'Personal accounts generally use the 11-digit HSBCHKHHHKH; the 8-digit head office code is HSBCHKHH.',
'優先理財': 'Priority Banking',
'優越理財': 'Prestige Banking',
'優進理財': 'Preferred Banking',
'免費': 'Free',
'內地網絡廣。': 'Extensive mainland China network.',
'全球任何 ATM 豁免': 'Waived at any ATM worldwide',
'全球渣打 ATM 及他行豁免': 'Waived at Standard Chartered ATMs worldwide and other banks',
'匯往新加坡 DBS/POSB 一般免手續費。': 'Generally fee-free when transferring to DBS/POSB accounts in Singapore.',
'卓越理財': 'Premier',
'卓越理財尊尚': 'Premier Elite',
'只支援 HKD／USD／CNY。': 'Supports HKD / USD / CNY only.',
'外幣提款機免費提取 8 種外幣現鈔。': 'Free withdrawal of 8 foreign currency banknotes at foreign currency ATMs.',
'多貨幣 Mastercard 扣賬卡豁免外幣交易費。': 'Multi-currency Mastercard debit card waives foreign transaction fees.',
'多貨幣錢包直接扣賬。': 'Direct debit from the multi-currency wallet.',
'實體卡 HK$25': 'HK$25 for a physical card',
'差價窄；無現鈔服務。': 'Narrow spread; no cash/banknote service.',
'手機銀行新資金優惠。': 'Mobile banking new-money promotional rate.',
'手續費 HK$50 + 電報費 HK$120': 'HK$50 handling fee + HK$120 cable fee',
'支援 SWIFT 匯入': 'Supports SWIFT incoming transfers',
'支援微信支付跨境。': 'Supports cross-border WeChat Pay.',
'星展免費；其他銀通 ATM HK$20': 'Free at DBS ATMs; HK$20 at other JETCO ATMs',
'智盈理財': 'Enrich Banking',
'東亞／銀通網絡免費': 'Free at BEA / JETCO network ATMs',
'每日 50 枚以上收 2%（最低 HK$100）': '2% for over 50 coins/day (min. HK$100)',
'每日 500 個免費，其後 2%（最低 HK$55）': 'First 500 coins/day free, then 2% (min. HK$55)',
'每日 500 個免費，其後約 2%': 'First 500 coins/day free, then ≈2%',
'海外 Citi ATM 免費；其他 HK$40': 'Free at overseas Citi ATMs; HK$40 elsewhere',
'渣打／銀通網絡免費': 'Free at Standard Chartered / JETCO network ATMs',
'滙豐 One': 'HSBC One',
'滙豐集團免費；其他 HK$20': 'Free within the HSBC Group; HK$20 elsewhere',
'滙豐集團免費；其他 HK$40': 'Free within the HSBC Group; HK$40 elsewhere',
'滙豐／恒生免費；其他 HK$20': 'Free at HSBC / Hang Seng; HK$20 elsewhere',
'滙豐／恒生／銀通 ATM 免費': 'Free at HSBC / Hang Seng / JETCO ATMs',
'無': 'None',
'無外幣交易費': 'No foreign transaction fee',
'無最低結餘': 'No minimum balance',
'無月費': 'No monthly fee',
'無額外外幣手續費': 'No extra foreign currency fee',
'私人財富管理': 'Private Wealth Management',
'約 1.95%': '≈1.95%',
'約 1.95%（多幣種戶口可免）': '≈1.95% (waived for multi-currency accounts)',
'約 1.95%（部分交易有優惠）': '≈1.95% (discounts on some transactions)',
'綜合戶口': 'Integrated Account',
'綜合理財總值低於 HK$10,000 時於下月收取；長者等可豁免（2024 年收費手冊）。':
  'Charged the following month if the total relationship balance falls below HK$10,000; waivers available for seniors etc. (2024 tariff guide).',
'網上兌換較分行優。': 'Better rates online than at branches.',
'網上匯出豁免': 'Waived for online outward transfers',
'網上新資金優惠。': 'Online new-money promotional rate.',
'美元只限 3 個月內。': 'USD available for tenors up to 3 months only.',
'自在理財': 'Free & Easy Banking',
'至尊理財': 'Supreme Banking',
'與 Wise 合作；匯內地 HK$30／筆。': 'Partnered with Wise; HK$30 per transfer to mainland China.',
'與內地招商銀行互通，匯款快線電報費豁免。': 'Linked with China Merchants Bank on the mainland; cable fee waived via Remittance Express.',
'花旗／銀通網絡免費': 'Free at Citibank / JETCO network ATMs',
'請查閱': 'Please check',
'豁免': 'Waived',
'豐盛理財': 'Treasures',
'豐盛私人客戶': 'Treasures Private Client',
'配合 AlipayHK 內地消費。': 'Pairs with AlipayHK for mainland spending.',
'金葵花理財': 'Sunflower Banking',
'銀通 ATM 免費': 'Free at JETCO ATMs',
'銀通網絡免費': 'Free at the JETCO network',
'電子免費': 'Free (e-statement)',
'電子免費；紙本 HK$100': 'Free (e-statement); HK$100 for a paper statement',
'顯卓理財': 'SupremeGold Banking',
'首張免費': 'First card free',
'香港居民免收。': 'Waived for Hong Kong residents.',
'與內地工商銀行網絡連繫緊密，人民幣業務具優勢。': 'Closely linked with the ICBC network on the mainland, giving it an edge in RMB services.',
'建行網絡覆蓋內地，跨境理財產品選擇多。': 'Extensive CCB network on the mainland, offering a wide range of cross-border wealth management products.',

/* ---- 服務收費分類與欄目標題 ---- */
'戶口與月費': 'Account & Monthly Fees',
'轉賬與匯款': 'Transfers & Remittances',
'提款卡與 ATM': 'Debit Card & ATM',
'其他服務': 'Other Services',
'低結餘／月服務費': 'Low-Balance / Monthly Service Fee',
'最低結餘要求': 'Minimum Balance Requirement',
'不動戶口費': 'Dormant Account Fee',
'郵寄月結單': 'Mailed Paper Statement',
'短期內結束戶口': 'Early Account Closure',
'轉數快 FPS 轉出': 'FPS Outward Transfer',
'網上／手機電匯（匯出）': 'Online/Mobile TT (Outward)',
'分行電匯（匯出）': 'Branch TT (Outward)',
'電匯匯入': 'Incoming TT',
'電匯修改／取消': 'TT Amendment/Cancellation',
'本地他行 ATM 提款': 'Local Other-Bank ATM Withdrawal',
'海外 ATM 提款': 'Overseas ATM Withdrawal',
'扣賬卡外幣交易費': 'Debit Card Foreign Transaction Fee',
'補發提款／扣賬卡': 'Card Replacement',
'退票手續費': 'Returned Cheque Fee',
'本票（港元）': "Cashier's Order (HKD)",
'銀行證明信': 'Bank Reference Letter',
'硬幣存入': 'Coin Deposit',
};

export function tr(zh) {
  if (zh == null) return zh;
  const lang = currentLang;
  if (lang === 'zh-Hant') return zh;
  if (lang === 'zh-Hans') return toSimplified(zh);
  if (Object.prototype.hasOwnProperty.call(PHRASE_EN, zh)) return PHRASE_EN[zh];
  return zh;
}

/* ============ 固定介面文字 ============ */
const UI = {
appTitle: { 'zh-Hant': '🏦 香港銀行一站式比較', en: '🏦 Hong Kong Bank Comparison' },
appSubtitle: { 'zh-Hant': '16 間傳統及虛擬銀行 · 每間銀行可自選戶口類別 · 定期存款利率 · 外幣兌換匯率 · 服務收費', en: '16 traditional & virtual banks · Choose an account tier per bank · Time deposit rates · FX rates · Service fees' },
lastUpdatedLabel: { 'zh-Hant': '🕒 最後更新：', en: '🕒 Last updated: ' },
lastUpdatedSuffix: { 'zh-Hant': '（香港時間）', en: ' (Hong Kong Time)' },
navTD: { 'zh-Hant': '📈 定期存款利率', en: '📈 Time Deposit Rates' },
navFX: { 'zh-Hant': '💱 外幣兌換', en: '💱 Foreign Exchange' },
navFees: { 'zh-Hant': '💳 服務收費', en: '💳 Service Fees' },
langLabel: { 'zh-Hant': '語言', en: 'Language' },
tierNotice: { 'zh-Hant': '👤 <strong>戶口類別：</strong>每間銀行名稱下方顯示現時所選戶口；有多個級別的銀行可點擊該戶口標籤個別切換。表格左上角的「基本」「中階」「高階」按鈕可一次把<strong>所有銀行</strong>切換至該級別（沒有該級別的銀行會顯示其最高可用級別；虛擬銀行只有單一戶口）。較高級別的利率加成及收費豁免為參考估算（<span class="approx">≈</span>）。',
  en: '👤 <strong>Account tier:</strong> The tier currently selected for each bank appears below its name; banks with multiple tiers let you switch individually by clicking the tier tag. The "Basic / Mid / Premium" buttons in the top-left of each table switch <strong>all banks</strong> to that tier at once (banks without that tier show their highest available tier; virtual banks have only one account type). Rate boosts and fee waivers for higher tiers are estimated for reference (<span class="approx">≈</span>).' },
tdNotice: { 'zh-Hant': '📌 <strong>利率屬參考值：</strong>定存利率每日或每週更新，並會因「新資金」、起存額、戶口級別及開立渠道而不同。以下為 2025 年 12 月上旬各銀行網上新資金優惠的<strong>參考水平</strong>（標 <span class="approx">≈</span>）。交易前請以銀行 App 即時報價為準。',
  en: '📌 <strong>Rates are for reference only:</strong> Time deposit rates change daily or weekly and vary by "new money" requirement, deposit amount, account tier and channel. Figures below are <strong>reference levels</strong> for each bank\'s online new-money promotions as of early December 2025 (marked <span class="approx">≈</span>). Please confirm the live quote in the bank\'s app before transacting.' },
chipHKD: { 'zh-Hant': '港元 HKD', en: 'HKD' },
chipUSD: { 'zh-Hant': '美元 USD', en: 'USD' },
chipCNY: { 'zh-Hant': '人民幣 CNY', en: 'CNY' },
chipAll: { 'zh-Hant': '全部', en: 'All' },
chipTraditional: { 'zh-Hant': '傳統', en: 'Traditional' },
chipVirtual: { 'zh-Hant': '虛擬', en: 'Virtual' },
tdHint: { 'zh-Hant': '點擊存期欄按利率排序，點「銀行 / 戶口類別」標題回復預設；黃色為該期最高；點銀行名稱查看詳情及 SWIFT',
  en: 'Click a tenor column to sort by rate; click the "Bank / Account Tier" header to reset; yellow marks the best rate for that tenor; click a bank name for details and SWIFT code' },
colBankTier: { 'zh-Hant': '銀行 / 戶口類別', en: 'Bank / Account Tier' },
resetHint: { 'zh-Hant': ' <span class="sub">（回復預設）</span>', en: ' <span class="sub">(reset)</span>' },
tenorM1: { 'zh-Hant': '1 個月', en: '1 month' },
tenorM3: { 'zh-Hant': '3 個月', en: '3 months' },
tenorM6: { 'zh-Hant': '6 個月', en: '6 months' },
tenorM12: { 'zh-Hant': '12 個月', en: '12 months' },
colMinDeposit: { 'zh-Hant': '起存額', en: 'Min. Deposit' },
colCondition: { 'zh-Hant': '條件／備註', en: 'Terms / Notes' },
rateNotAvailable: { 'zh-Hant': '不提供', en: 'N/A' },
calcTdTitle: { 'zh-Hant': '🧮 定存利息計算機', en: '🧮 Time Deposit Interest Calculator' },
labelAmount: { 'zh-Hant': '存款金額', en: 'Deposit Amount' },
labelCurrency: { 'zh-Hant': '貨幣', en: 'Currency' },
labelTenor: { 'zh-Hant': '存期', en: 'Tenor' },
calcTdNote: { 'zh-Hant': '利息 = 本金 × 年利率 × 月數 ÷ 12（單利）；按每間銀行目前所選戶口計算。',
  en: 'Interest = Principal × Annual Rate × Months ÷ 12 (simple interest); calculated using each bank\'s currently selected account tier.' },
rankYearRate: { 'zh-Hant': ' 年利率 ', en: ' annual rate ' },
tdAddNote: { 'zh-Hant': '含 {tier} 加成 +{pct}%（參考）', en: 'Includes a +{pct}% rate boost for {tier} (reference)' },
fxNotice: { 'zh-Hant': '💱 <strong>運作方式：</strong>自動抓取<strong>即時市場中間價</strong>（open.er-api.com），再按各銀行／戶口級別的<strong>典型電匯買賣差價</strong>推算買入／賣出價。差價屬參考估算（<span class="approx">≈</span>），實際以銀行 App 即時報價為準。',
  en: '💱 <strong>How it works:</strong> We fetch the <strong>live market mid-rate</strong> (open.er-api.com) automatically, then estimate buy/sell rates using each bank\'s/tier\'s <strong>typical telegraphic transfer spread</strong>. Spreads are estimated for reference (<span class="approx">≈</span>); always confirm the live quote in the bank\'s app before transacting.' },
fxMidLabelPrefix: { 'zh-Hant': '市場中間價（1 ', en: 'Market mid-rate (1 ' },
fxMidLabelSuffix: { 'zh-Hant': ' = HKD）', en: ' = HKD)' },
loading: { 'zh-Hant': '載入中…', en: 'Loading…' },
fxHintBest: { 'zh-Hant': '黃色為最佳賣出價', en: 'Yellow marks the best sell rate' },
colBuy: { 'zh-Hant': '電匯買入價', en: 'TT Buy Rate' },
colBuySub: { 'zh-Hant': '你賣出外幣', en: 'You sell foreign currency' },
colSell: { 'zh-Hant': '電匯賣出價', en: 'TT Sell Rate' },
colSellSub: { 'zh-Hant': '你買入外幣', en: 'You buy foreign currency' },
colSpread: { 'zh-Hant': '買賣差價 ≈', en: 'Buy/Sell Spread ≈' },
colCashSpread: { 'zh-Hant': '現鈔差價 ≈', en: 'Cash Note Spread ≈' },
colCurCount: { 'zh-Hant': '可兌貨幣', en: 'Currencies Offered' },
colNotes: { 'zh-Hant': '備註', en: 'Notes' },
notSupportedCur: { 'zh-Hant': '不支援此貨幣', en: 'Currency not supported' },
noCash: { 'zh-Hant': '無現鈔', en: 'No cash' },
curCountSuffix: { 'zh-Hant': ' 種', en: ' currencies' },
calcFxTitle: { 'zh-Hant': '🧮 兌換計算機（港元 → 外幣）', en: '🧮 Currency Converter (HKD → Foreign Currency)' },
labelUseHKD: { 'zh-Hant': '用港元', en: 'Amount in HKD' },
labelConvertTo: { 'zh-Hant': '兌換成', en: 'Convert to' },
rankBest: { 'zh-Hant': '最佳', en: 'Best' },
rankLessPrefix: { 'zh-Hant': '少 ', en: '−' },
fxStatusLive: { 'zh-Hant': '✅ 即時中間價 · 更新於 ', en: '✅ Live mid-rate · updated ' },
fxStatusError: { 'zh-Hant': '⚠️ 無法連接匯率 API，顯示參考中間價', en: "⚠️ Couldn't reach the FX rate API — showing reference mid-rates" },
feesNotice: { 'zh-Hant': '⚠️ 收費按每間銀行所選戶口類別顯示；≈ 為參考／推算值。點擊銀行名稱查看詳情、銀行編號、SWIFT code 及官方連結。',
  en: "⚠️ Fees shown reflect each bank's currently selected account tier; ≈ marks reference/estimated values. Click a bank name for details, bank code, SWIFT code and official link." },
typeChipAllBanks: { 'zh-Hant': '全部銀行', en: 'All Banks' },
typeChipTraditional: { 'zh-Hant': '傳統銀行', en: 'Traditional Banks' },
typeChipVirtual: { 'zh-Hant': '虛擬銀行', en: 'Virtual Banks' },
searchPlaceholder: { 'zh-Hant': '搜尋銀行或戶口名稱，例如：滙豐、卓越、Premier、Mox…', en: 'Search bank or account name, e.g. HSBC, Premier, Mox…' },
legendFree: { 'zh-Hant': '免費／豁免', en: 'Free / Waived' },
legendCond: { 'zh-Hant': '有條件免費', en: 'Free with conditions' },
legendPaid: { 'zh-Hant': '收費', en: 'Fee charged' },
legendNA: { 'zh-Hant': '不適用／未提供', en: 'N/A / Not provided' },
legendHover: { 'zh-Hant': '滑鼠移至格內可查看備註', en: 'Hover over a cell to see notes' },
summaryCard1Title: { 'zh-Hant': '💡 零月費、零最低結餘（基本戶口）', en: '💡 Zero Monthly Fee, Zero Minimum Balance (Basic Account)' },
summaryCard1Li1: { 'zh-Hant': '所有虛擬銀行均無月費及最低結餘。', en: 'All virtual banks have no monthly fee or minimum balance.' },
summaryCard1Li2: { 'zh-Hant': '滙豐、恒生、中銀、渣打、東亞、星展、花旗基本戶口已取消低結餘費。', en: 'HSBC, Hang Seng, Bank of China, Standard Chartered, BEA, DBS and Citibank have all removed low-balance fees on basic accounts.' },
summaryCard1Li3: { 'zh-Hant': '中國工商銀行（亞洲）及中國建設銀行（亞洲）基本戶口同樣沒有最低結餘要求。', en: 'ICBC (Asia) and CCB (Asia) also have no minimum balance requirement on their basic accounts.' },
summaryCard2Title: { 'zh-Hant': '🌏 升級戶口最划算的情況', en: '🌏 When Upgrading Your Account Pays Off' },
summaryCard2Li1: { 'zh-Hant': '經常海外匯款：高階戶口大多豁免匯入費及海外 ATM 費，網上匯出亦減免。', en: 'Frequent overseas transfers: premium tiers mostly waive incoming transfer fees and overseas ATM fees, with discounted online outward transfers too.' },
summaryCard2Li2: { 'zh-Hant': '大額定存：中階／高階可享 0.1–0.3 厘加成或議價。', en: 'Large time deposits: mid/premium tiers can enjoy a 0.1–0.3% rate boost or negotiate a better rate.' },
summaryCard2Li3: { 'zh-Hant': '大額兌換：高階戶口差價普遍收窄至 0.3–0.4%。', en: 'Large FX conversions: premium tiers typically narrow spreads to 0.3–0.4%.' },
noMatch: { 'zh-Hant': '找不到符合的銀行', en: 'No matching banks found' },
modalTypeTraditional: { 'zh-Hant': '傳統銀行', en: 'Traditional Bank' },
modalTypeVirtual: { 'zh-Hant': '虛擬銀行', en: 'Virtual Bank' },
modalTierPickerMulti: { 'zh-Hant': '👤 選擇戶口類別（以下資料會即時更新）', en: '👤 Select an account tier (details below update instantly)' },
modalTierPickerSingle: { 'zh-Hant': '👤 戶口類別', en: '👤 Account Tier' },
infoBankCode: { 'zh-Hant': '銀行編號（Bank Code）', en: 'Bank Code' },
infoSwift: { 'zh-Hant': 'SWIFT / BIC', en: 'SWIFT / BIC' },
infoThreshold: { 'zh-Hant': '戶口門檻', en: 'Account Threshold' },
infoWebsite: { 'zh-Hant': '官方網站', en: 'Official Website' },
infoWebsiteLink: { 'zh-Hant': '查閱最新收費表及利率 ↗', en: 'View latest tariff & rates ↗' },
copyBtn: { 'zh-Hant': '複製', en: 'Copy' },
copiedBtn: { 'zh-Hant': '已複製 ✓', en: 'Copied ✓' },
modalTdTitle: { 'zh-Hant': '定期存款年利率（≈ 參考）', en: 'Time Deposit Annual Rates (≈ reference)' },
modalTdColTenors: { 'zh-Hant': '1 / 3 / 6 / 12 個月', en: '1 / 3 / 6 / 12 months' },
modalFxTitle: { 'zh-Hant': '外幣兌換', en: 'Foreign Exchange' },
modalFxSpread: { 'zh-Hant': '電匯買賣差價', en: 'TT Buy/Sell Spread' },
modalFxCashSpread: { 'zh-Hant': '現鈔買賣差價', en: 'Cash Note Buy/Sell Spread' },
modalFxNoCashService: { 'zh-Hant': '無現鈔服務', en: 'No cash/banknote service' },
modalFooterNote: { 'zh-Hant': '以上為「{tier}」（{level}）的資料；可在頂部切換其他戶口類別。≈ 為參考／推算值，請以銀行最新公布為準。',
  en: 'The information above applies to the "{tier}" tier ({level}); you can switch to another tier at the top. ≈ marks reference/estimated values — please verify against the bank\'s latest published figures.' },
footerLine1: { 'zh-Hant': '資料來源：各銀行官方服務收費表及網站、公開媒體報道；匯率中間價來自 open.er-api.com。銀行編號為香港結算銀行編號；SWIFT/BIC 為總行代碼。',
  en: "Data sources: each bank's official tariff guide and website, and public media reports; FX mid-rates from open.er-api.com. Bank codes are HKICL clearing codes; SWIFT/BIC codes are for the head office." },
footerLine2: { 'zh-Hant': '本頁僅供參考，不構成財務建議。所有數據集中於 BANKS 陣列；每個戶口級別以 tiers 內的 level（1 基本／2 中階／3 高階）、n1（第一行）、n2（第二行，可省略）及 ov（覆寫）表達。',
  en: 'This page is for reference only and does not constitute financial advice. All data is centralized in the BANKS array; each account tier is expressed via tiers[].level (1 = Basic, 2 = Mid, 3 = Premium), n1 (primary line), n2 (secondary line, optional) and ov (overrides).' },
lvHint: { 'zh-Hant': '戶口類別：', en: 'Account tier:' },
bankTypeHint: { 'zh-Hant': '銀行類別：', en: 'Bank type:' },
lvBtnTooltip: { 'zh-Hant': '所有銀行切換至{level}戶口', en: 'Switch all banks to the {level} tier' },
tierSelectTitle: { 'zh-Hant': '切換戶口類別', en: 'Switch account tier' },
bankNameTitle: { 'zh-Hant': '查看詳情及 SWIFT', en: 'View details & SWIFT code' },
};

export function t(key, vars) {
  const entry = UI[key];
  if (!entry) return key;
  const lang = currentLang;
  let str;
  if (lang === 'en') str = entry.en ?? entry['zh-Hant'];
  else if (lang === 'zh-Hans') str = toSimplified(entry['zh-Hant']);
  else str = entry['zh-Hant'];
  if (vars) Object.keys(vars).forEach(k => { str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
  return str;
}

/* FX 貨幣名稱 */
const FX_NAME_EN = {
  '美元': 'US Dollar', '人民幣': 'Chinese Yuan', '日圓': 'Japanese Yen', '歐羅': 'Euro', '英鎊': 'British Pound',
  '澳元': 'Australian Dollar', '加元': 'Canadian Dollar', '新加坡元': 'Singapore Dollar', '瑞士法郎': 'Swiss Franc',
  '紐西蘭元': 'New Zealand Dollar', '泰銖': 'Thai Baht', '新台幣': 'Taiwan Dollar', '韓圜': 'Korean Won'
};
export function fxCurName(zh) {
  const lang = currentLang;
  if (lang === 'en') return FX_NAME_EN[zh] || zh;
  if (lang === 'zh-Hans') return toSimplified(zh);
  return zh;
}

/* 銀行顯示名稱（表格 / 標題用簡稱） */
export function bankDisplayName(b) {
  const lang = currentLang;
  if (lang === 'en') return b.nameEn || b.name;
  if (lang === 'zh-Hans') return toSimplified(b.name);
  return b.name;
}

/* 戶口級別名稱（tiers[].n1 / n2），n2 通常已是英文 */
export function tierPrimary(t) {
  const lang = currentLang;
  if (lang === 'en') return t.n2 || tr(t.n1);
  if (lang === 'zh-Hans') return toSimplified(t.n1);
  return t.n1;
}
export function tierSecondary(t) {
  const lang = currentLang;
  if (!t.n2) return '';
  if (lang === 'en') return '';
  if (lang === 'zh-Hans') return toSimplified(t.n2);
  return t.n2;
}
export function tierFullName(t) {
  const lang = currentLang;
  if (lang === 'en') return t.n2 || tr(t.n1);
  const primary = lang === 'zh-Hans' ? toSimplified(t.n1) : t.n1;
  return [primary, t.n2].filter(Boolean).join(' ');
}

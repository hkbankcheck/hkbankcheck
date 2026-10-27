/* ============ 分類（服務收費） ============ */
export const CATEGORIES = [
  { id: 'account', name: '戶口與月費', cols: [['minFee', '低結餘／月服務費'], ['minBal', '最低結餘要求'], ['dormant', '不動戶口費'], ['statement', '郵寄月結單'], ['closeAcc', '短期內結束戶口']] },
  { id: 'transfer', name: '轉賬與匯款', cols: [['fps', '轉數快 FPS 轉出'], ['ttOnline', '網上／手機電匯（匯出）'], ['ttBranch', '分行電匯（匯出）'], ['ttIn', '電匯匯入'], ['ttAmend', '電匯修改／取消']] },
  { id: 'atm', name: '提款卡與 ATM', cols: [['atmLocal', '本地他行 ATM 提款'], ['atmOverseas', '海外 ATM 提款'], ['fxFee', '扣賬卡外幣交易費'], ['cardReplace', '補發提款／扣賬卡']] },
  { id: 'other', name: '其他服務', cols: [['cheque', '退票手續費'], ['cashierOrder', '本票（港元）'], ['refLetter', '銀行證明信'], ['coinDeposit', '硬幣存入']] }
];

/* 常用覆寫片語 */
export const W = {
  free: v => ({ v: v || '豁免', lvl: 'free', approx: true }),
  waivedIn: { v: '豁免', lvl: 'free', approx: true },
  ttFree: { v: '網上匯出豁免', lvl: 'free', approx: true }
};

/* ============ 銀行資料（按 Bank Code 排序）
   tiers[]：level = 1 基本 / 2 中階 / 3 高階；n1 = 第一行（中文），n2 = 第二行（英文，可省略），min = 門檻（只在詳情顯示）
   基本戶口 = 銀行層的 fees / td / fx；較高級別以 ov 覆寫：{fees:{...}, tdAdd:+厘, fxSpread:半邊差價%} ============ */
export const BANKS = [
{id:'scb',code:'003',swift:'SCBLHKHH',name:'渣打銀行',nameEn:'Standard Chartered',en:'Standard Chartered Bank (Hong Kong) Limited',type:'traditional',url:'https://www.sc.com/hk/zh/',
 tiers:[
  {level:1,n1:'Easy Banking',min:'無最低結餘'},
  {level:2,n1:'Premium 理財',n2:'Premium Banking',min:'≈HK$200,000',ov:{tdAdd:0.05,fxSpread:0.45,fees:{ttOnline:{v:'HK$50',lvl:'paid',approx:true}}}},
  {level:3,n1:'優先理財',n2:'Priority Banking',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.35,fees:{ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free('全球渣打 ATM 及他行豁免'),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$100',lvl:'paid',approx:true},ttBranch:{v:'HK$250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'渣打／銀通網絡免費',lvl:'free'},atmOverseas:{v:'HK$40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:2.00,m3:2.50,m6:2.40,m12:2.30},USD:{m1:3.40,m3:3.60,m6:3.50,m12:3.30},CNY:{m1:1.00,m3:1.20,m6:1.20,m12:1.20},min:'HK$10,000',note:'SC Mobile 新資金優惠。'},
 fx:{spread:0.55,notes:1.50,cur:'12+',note:'網上兌換較分行優。'}},

{id:'hsbc',code:'004',swift:'HSBCHKHHHKH',swiftNote:'個人戶口一般用 11 位 HSBCHKHHHKH；總行 8 位為 HSBCHKHH。',name:'滙豐銀行',nameEn:'HSBC',en:'The Hongkong and Shanghai Banking Corporation Limited',type:'traditional',url:'https://www.hsbc.com.hk/zh-hk/',
 tiers:[
  {level:1,n1:'滙豐 One',n2:'HSBC One',min:'無最低結餘'},
  {level:2,n1:'卓越理財',n2:'Premier',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.40,fees:{minFee:{v:'低於 HK$100 萬收 HK$380／月',lvl:'cond'},minBal:{v:'HK$1,000,000',lvl:'cond'},ttBranch:{v:'HK$210',lvl:'paid'},ttIn:W.waivedIn,atmOverseas:W.free('全球任何 ATM 豁免'),cashierOrder:W.free(),refLetter:W.free()}}},
  {level:3,n1:'卓越理財尊尚',n2:'Premier Elite',min:'HK$7,800,000',ov:{tdAdd:0.25,fxSpread:0.30,fees:{minBal:{v:'HK$7,800,000',lvl:'cond'},ttOnline:W.ttFree,ttBranch:{v:'HK$145',lvl:'paid'},ttIn:W.waivedIn,atmOverseas:W.free(),cashierOrder:W.free(),refLetter:W.free(),cheque:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free',note:'香港居民免收。'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free'},statement:{v:'豁免',lvl:'free'},closeAcc:{v:'豁免',lvl:'free'},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$70',lvl:'paid',note:'2025 年 2 月起由 HK$65 加至 HK$70；Global Money 轉海外滙豐豁免。'},ttBranch:{v:'HK$230–260',lvl:'paid',note:'一般 HK$260、One HK$230。'},
  ttIn:{v:'HK$70',lvl:'paid',approx:true},ttAmend:{v:'HK$275 + 海外銀行費用',lvl:'paid'},atmLocal:{v:'滙豐／恒生免費；其他 HK$20',lvl:'cond',approx:true},
  atmOverseas:{v:'滙豐集團免費；其他 HK$40',lvl:'cond'},fxFee:{v:'約 1.95%（多幣種戶口可免）',lvl:'cond',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$300',lvl:'paid',note:'2025 年 11 月起生效。'},coinDeposit:{v:'每日 500 個免費，其後 2%（最低 HK$55）',lvl:'cond'}},
 td:{HKD:{m1:1.90,m3:2.30,m6:2.20,m12:2.10},USD:{m1:3.30,m3:3.40,m6:3.30,m12:3.10},CNY:{m1:1.00,m3:1.20,m6:1.20,m12:1.20},min:'HK$10,000 / US$2,000',note:'網上新資金優惠。'},
 fx:{spread:0.55,notes:1.50,cur:'12+',note:'Global Money 可持 10+ 種貨幣。'}},

{id:'citi',code:'006',swift:'CITIHKHX',swiftNote:'006／CITIHKHX 為 Citibank N.A. 香港分行；零售個人戶口多屬 Citibank (Hong Kong) Limited（編號 250、SWIFT CITIHKAX），匯入前請在 Citi App 核實。',name:'花旗銀行',nameEn:'Citibank',en:'Citibank (Hong Kong) Limited / Citibank N.A.',type:'traditional',url:'https://www.citibank.com.hk/chinese/',
 tiers:[
  {level:1,n1:'Citi Plus',min:'無最低結餘'},
  {level:2,n1:'Citi Priority',min:'HK$500,000',ov:{tdAdd:0.10,fxSpread:0.40,fees:{ttIn:W.waivedIn,atmOverseas:W.free()}}},
  {level:3,n1:'Citigold',min:'HK$1,500,000',ov:{tdAdd:0.20,fxSpread:0.35,fees:{minFee:{v:'低於 HK$150 萬收 HK$300／月',lvl:'cond'},minBal:{v:'HK$1,500,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'Citi 環球轉賬免費；其他 HK$100',lvl:'cond',approx:true},ttBranch:{v:'HK$250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'花旗／銀通網絡免費',lvl:'free'},atmOverseas:{v:'海外 Citi ATM 免費；其他 HK$40',lvl:'cond',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'不提供硬幣存入',lvl:'na',approx:true}},
 td:{HKD:{m1:2.10,m3:2.60,m6:2.40,m12:2.20},USD:{m1:3.50,m3:3.70,m6:3.50,m12:3.30},CNY:{m1:0.90,m3:1.10,m6:1.10,m12:1.10},min:'HK$10,000 / US$1,000',note:'Citi Plus 新資金優惠。'},
 fx:{spread:0.45,notes:1.50,cur:'12',note:'Citi Plus 網上兌換差價較窄。'}},

{id:'bochk',code:'012',swift:'BKCHHKHH',name:'中國銀行 (香港)',nameEn:'Bank of China (HK)',en:'Bank of China (Hong Kong) Limited',type:'traditional',url:'https://www.bochk.com/tc/home.html',
 tiers:[
  {level:1,n1:'自在理財',min:'無最低結餘'},
  {level:2,n1:'智盈理財',n2:'Enrich Banking',min:'HK$200,000',ov:{tdAdd:0.05,fxSpread:0.45,fees:{ttOnline:{v:'HK$50',lvl:'paid',approx:true}}}},
  {level:3,n1:'中銀理財',n2:'Wealth Management',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.35,fees:{minFee:{v:'低於 HK$100 萬收 HK$120／月',lvl:'cond',approx:true},minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65',lvl:'paid',approx:true},ttBranch:{v:'HK$200–250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'中銀／銀通網絡免費',lvl:'free'},atmOverseas:{v:'HK$25–40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$50–60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:2.00,m3:2.40,m6:2.30,m12:2.20},USD:{m1:3.30,m3:3.50,m6:3.40,m12:3.20},CNY:{m1:1.20,m3:1.40,m6:1.40,m12:1.50},min:'HK$10,000',note:'手機銀行新資金優惠。'},
 fx:{spread:0.50,notes:1.40,cur:'20+',note:'人民幣報價具競爭力。'}},

{id:'bea',code:'015',swift:'BEASHKHH',name:'東亞銀行',nameEn:'Bank of East Asia',en:'The Bank of East Asia, Limited',type:'traditional',url:'https://www.hkbea.com/',
 tiers:[
  {level:1,n1:'綜合戶口',n2:'i-Account',min:'無最低結餘'},
  {level:2,n1:'至尊理財',n2:'Supreme',min:'HK$200,000',ov:{tdAdd:0.05,fxSpread:0.45,fees:{ttOnline:{v:'HK$50',lvl:'paid',approx:true}}}},
  {level:3,n1:'顯卓理財',n2:'SupremeGold',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.35,fees:{minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65–100',lvl:'paid',approx:true},ttBranch:{v:'HK$200–250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'東亞／銀通網絡免費',lvl:'free'},atmOverseas:{v:'HK$25–40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:2.10,m3:2.60,m6:2.50,m12:2.40},USD:{m1:3.40,m3:3.60,m6:3.50,m12:3.30},CNY:{m1:1.10,m3:1.30,m6:1.30,m12:1.30},min:'HK$10,000',note:'手機銀行新資金優惠。'},
 fx:{spread:0.55,notes:1.50,cur:'15+',note:'內地網絡廣。'}},

{id:'dbs',code:'016',swift:'DHBKHKHH',name:'星展銀行',nameEn:'DBS Bank',en:'DBS Bank (Hong Kong) Limited',type:'traditional',url:'https://www.dbs.com.hk/personal-zh/',
 tiers:[
  {level:1,n1:'DBS Account',min:'無最低結餘'},
  {level:2,n1:'豐盛理財',n2:'Treasures',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.35,fees:{minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}},
  {level:3,n1:'豐盛私人客戶',n2:'Treasures Private Client',min:'HK$8,000,000',ov:{tdAdd:0.25,fxSpread:0.25,fees:{minBal:{v:'HK$8,000,000',lvl:'cond'},ttOnline:W.ttFree,ttBranch:W.free(),ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65（匯往星展海外戶口免費）',lvl:'cond',approx:true},ttBranch:{v:'HK$250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'星展免費；其他銀通 ATM HK$20',lvl:'cond',approx:true},atmOverseas:{v:'HK$40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'不提供硬幣存入',lvl:'na',approx:true}},
 td:{HKD:{m1:2.10,m3:2.70,m6:2.50,m12:2.30},USD:{m1:3.40,m3:3.60,m6:3.50,m12:3.30},CNY:{m1:1.00,m3:1.20,m6:1.20,m12:1.20},min:'HK$10,000',note:'digibank 新資金優惠。'},
 fx:{spread:0.50,notes:1.50,cur:'12',note:'匯往新加坡 DBS/POSB 一般免手續費。'}},

{id:'hangseng',code:'024',swift:'HASEHKHH',name:'恒生銀行',nameEn:'Hang Seng Bank',en:'Hang Seng Bank Limited',type:'traditional',url:'https://www.hangseng.com/zh-hk/personal/',
 tiers:[
  {level:1,n1:'綜合戶口',n2:'Integrated Account',min:'無最低結餘'},
  {level:2,n1:'優進理財',n2:'Preferred Banking',min:'HK$200,000',ov:{tdAdd:0.05,fxSpread:0.45,fees:{ttOnline:{v:'HK$50',lvl:'paid',approx:true}}}},
  {level:3,n1:'優越理財',n2:'Prestige Banking',min:'HK$1,000,000',ov:{tdAdd:0.15,fxSpread:0.35,fees:{minFee:{v:'低於 HK$100 萬收 HK$300／月',lvl:'cond',approx:true},minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free'},statement:{v:'豁免',lvl:'free'},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65',lvl:'paid',approx:true},ttBranch:{v:'HK$220–260',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'滙豐集團免費；其他 HK$20',lvl:'cond'},atmOverseas:{v:'滙豐集團免費；其他 HK$40',lvl:'cond'},fxFee:{v:'豁免',lvl:'free',note:'多貨幣 Mastercard 扣賬卡豁免外幣交易費。'},cardReplace:{v:'HK$50',lvl:'paid'},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:1.80,m3:2.30,m6:2.20,m12:2.10},USD:{m1:3.20,m3:3.40,m6:3.30,m12:3.10},CNY:{m1:1.00,m3:1.20,m6:1.20,m12:1.20},min:'HK$10,000 / US$2,000',note:'網上新資金優惠。'},
 fx:{spread:0.55,notes:1.50,cur:'24',note:'外幣提款機免費提取 8 種外幣現鈔。'}},

{id:'icbc',code:'072',swift:'UBHKHKHH',name:'中國工商銀行（亞洲）',nameEn:'ICBC (Asia)',en:'Industrial and Commercial Bank of China (Asia) Limited',type:'traditional',url:'https://www.icbcasia.com/',
 tiers:[
  {level:1,n1:'理財通',n2:'e-Fortune Banking',min:'無最低結餘'},
  {level:2,n1:'卓越理財',n2:'Excellence Banking',min:'HK$500,000',ov:{tdAdd:0.10,fxSpread:0.40,fees:{ttOnline:W.ttFree,atmOverseas:W.free()}}},
  {level:3,n1:'私人銀行',n2:'Private Banking',min:'HK$1,000,000',ov:{tdAdd:0.20,fxSpread:0.30,fees:{minFee:W.free(),minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65',lvl:'paid',approx:true},ttBranch:{v:'HK$200–250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'銀通網絡免費',lvl:'free',approx:true},atmOverseas:{v:'HK$25–40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$50–60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:2.00,m3:2.50,m6:2.30,m12:2.20},USD:{m1:3.30,m3:3.50,m6:3.40,m12:3.20},CNY:{m1:1.30,m3:1.50,m6:1.50,m12:1.60},min:'HK$10,000',note:'手機銀行新資金優惠。'},
 fx:{spread:0.50,notes:1.40,cur:'15+',note:'與內地工商銀行網絡連繫緊密，人民幣業務具優勢。'}},

{id:'ccba',code:'809',swift:'CCBQHKAX',name:'中國建設銀行（亞洲）',nameEn:'CCB (Asia)',en:'China Construction Bank (Asia) Corporation Limited',type:'traditional',url:'https://asia.ccb.com/hongkong/',
 tiers:[
  {level:1,n1:'CCB 理財',n2:'CCB Banking',min:'無最低結餘'},
  {level:2,n1:'卓越理財',n2:'Elite Banking',min:'HK$500,000',ov:{tdAdd:0.10,fxSpread:0.40,fees:{ttOnline:W.ttFree,atmOverseas:W.free()}}},
  {level:3,n1:'私人銀行',n2:'Private Banking',min:'HK$1,000,000',ov:{tdAdd:0.20,fxSpread:0.30,fees:{minFee:W.free(),minBal:{v:'HK$1,000,000',lvl:'cond'},ttOnline:W.ttFree,ttIn:W.waivedIn,atmOverseas:W.free(),refLetter:W.free(),cashierOrder:W.free()}}}],
 fees:{minFee:{v:'豁免',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'豁免',lvl:'free',approx:true},statement:{v:'豁免',lvl:'free',approx:true},closeAcc:{v:'豁免',lvl:'free',approx:true},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'HK$65',lvl:'paid',approx:true},ttBranch:{v:'HK$200–250',lvl:'paid',approx:true},ttIn:{v:'HK$65',lvl:'paid',approx:true},ttAmend:{v:'HK$250 + 海外銀行費用',lvl:'paid',approx:true},
  atmLocal:{v:'銀通網絡免費',lvl:'free',approx:true},atmOverseas:{v:'HK$25–40',lvl:'paid',approx:true},fxFee:{v:'約 1.95%',lvl:'paid',approx:true},cardReplace:{v:'HK$50',lvl:'paid',approx:true},
  cheque:{v:'HK$150',lvl:'paid',approx:true},cashierOrder:{v:'HK$50–60',lvl:'paid',approx:true},refLetter:{v:'HK$200',lvl:'paid',approx:true},coinDeposit:{v:'每日 500 個免費，其後約 2%',lvl:'cond',approx:true}},
 td:{HKD:{m1:2.00,m3:2.40,m6:2.30,m12:2.10},USD:{m1:3.30,m3:3.50,m6:3.30,m12:3.10},CNY:{m1:1.20,m3:1.40,m6:1.40,m12:1.50},min:'HK$10,000',note:'網上新資金優惠。'},
 fx:{spread:0.50,notes:1.40,cur:'15+',note:'建行網絡覆蓋內地，跨境理財產品選擇多。'}},

/* ---- 虛擬銀行：單一戶口（基本） ---- */
{id:'za',code:'387',swift:'AABLHKHH',name:'ZA Bank',nameEn:'ZA Bank',en:'ZA Bank Limited',type:'virtual',url:'https://bank.za.group/hk',
 tiers:[{level:1,n1:'ZA 銀行戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費；紙本 HK$100',lvl:'cond'},closeAcc:{v:'免費',lvl:'free'},
  fps:{v:'免費',lvl:'free'},ttOnline:{v:'ZA Remit 透明低費用',lvl:'cond',note:'與 Wise 合作；匯內地 HK$30／筆。'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'支援 SWIFT 匯入',lvl:'cond',approx:true},ttAmend:{v:'請查閱',lvl:'na'},
  atmLocal:{v:'銀通 ATM 免費',lvl:'free',approx:true},atmOverseas:{v:'ZA 方面免手續費',lvl:'cond',approx:true},fxFee:{v:'無額外外幣手續費',lvl:'free',approx:true},cardReplace:{v:'實體卡 HK$25',lvl:'paid'},
  cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.20,m3:2.80,m6:2.60,m12:2.40},USD:{m1:3.60,m3:3.80,m6:3.60,m12:3.40},CNY:{m1:1.30,m3:1.50,m6:1.50,m12:1.50},min:'HK$1 / US$1',note:'不時有限時加息。'},
 fx:{spread:0.30,notes:null,cur:'11',note:'差價窄；無現鈔服務。'}},
{id:'livi',code:'388',swift:'LIVIHKHH',name:'理慧銀行',nameEn:'livi bank',en:'livi bank Limited',type:'virtual',url:'https://www.livibank.com/zh_HK/',
 tiers:[{level:1,n1:'livi 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'銀通 ATM 免費',lvl:'free',approx:true},atmOverseas:{v:'請查閱',lvl:'na'},fxFee:{v:'約 1.95%（部分交易有優惠）',lvl:'cond',approx:true},cardReplace:{v:'請查閱',lvl:'na'},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.10,m3:2.70,m6:2.50,m12:2.40},USD:{m1:3.40,m3:3.60,m6:3.40,m12:3.20},CNY:{m1:1.20,m3:1.40,m6:1.40,m12:1.40},min:'HK$1',note:'liviSave 定存。'},
 fx:{spread:0.35,notes:null,cur:'3',note:'只支援 HKD／USD／CNY。'}},
{id:'mox',code:'389',swift:'MOXBHKHK',name:'Mox Bank',nameEn:'Mox Bank',en:'Mox Bank Limited',type:'virtual',url:'https://mox.com/zh/',
 tiers:[{level:1,n1:'Mox 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'滙豐／恒生／銀通 ATM 免費',lvl:'free'},atmOverseas:{v:'Mox 方面免手續費',lvl:'cond'},fxFee:{v:'無外幣交易費',lvl:'free',approx:true},cardReplace:{v:'首張免費',lvl:'cond',approx:true},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.00,m3:2.60,m6:2.40,m12:2.30},USD:{m1:3.40,m3:3.60,m6:null,m12:null},CNY:null,min:'HK$1 / US$1',note:'美元只限 3 個月內。'},
 fx:{spread:0.25,notes:null,cur:'10',note:'多貨幣錢包直接扣賬。'}},
{id:'welab',code:'390',swift:'WEDIHKHH',name:'WeLab Bank',nameEn:'WeLab Bank',en:'WeLab Bank Limited',type:'virtual',url:'https://www.welab.bank/zh/',
 tiers:[{level:1,n1:'WeLab 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'銀通 ATM 免費',lvl:'free',approx:true},atmOverseas:{v:'WeLab 方面免手續費',lvl:'cond',approx:true},fxFee:{v:'無外幣交易費',lvl:'free',approx:true},cardReplace:{v:'請查閱',lvl:'na'},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.30,m3:3.00,m6:2.70,m12:2.50},USD:{m1:3.50,m3:3.70,m6:3.50,m12:3.30},CNY:null,min:'HK$10',note:'GoSave 2.0 不時限時加息。'},
 fx:{spread:0.30,notes:null,cur:'11',note:'11 種貨幣儲蓄。'}},
{id:'fusion',code:'391',swift:'IFFUHKHH',name:'富融銀行',nameEn:'Fusion Bank',en:'Fusion Bank Limited',type:'virtual',url:'https://www.fusionbank.com/zh-hk/',
 tiers:[{level:1,n1:'Fusion 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'請查閱',lvl:'na'},atmOverseas:{v:'請查閱',lvl:'na'},fxFee:{v:'請查閱',lvl:'na'},cardReplace:{v:'請查閱',lvl:'na'},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.30,m3:2.90,m6:2.60,m12:2.40},USD:{m1:3.50,m3:3.70,m6:3.50,m12:3.30},CNY:{m1:1.30,m3:1.50,m6:1.50,m12:1.50},min:'HK$1',note:'人民幣定存及跨境匯款為賣點。'},
 fx:{spread:0.35,notes:null,cur:'3',note:'支援微信支付跨境。'}},
{id:'ant',code:'393',swift:'ASEHHKHH',name:'螞蟻銀行（香港）',nameEn:'Ant Bank',en:'Ant Bank (Hong Kong) Limited',type:'virtual',url:'https://www.antbank.hk/',
 tiers:[{level:1,n1:'Ant Bank 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'不提供提款卡',lvl:'na',approx:true},atmOverseas:{v:'不適用',lvl:'na'},fxFee:{v:'不適用',lvl:'na'},cardReplace:{v:'不適用',lvl:'na'},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.20,m3:2.80,m6:2.50,m12:2.30},USD:{m1:3.40,m3:3.60,m6:3.40,m12:3.20},CNY:{m1:1.20,m3:1.40,m6:1.40,m12:1.40},min:'HK$1',note:'App 內開立。'},
 fx:{spread:0.30,notes:null,cur:'3',note:'配合 AlipayHK 內地消費。'}},
  /*{id:'airstar',code:'395',swift:'AIRRHKHH',name:'Airstar Bank 天星銀行',nameEn:'Airstar Bank',en:'Airstar Bank Limited（現正易名 EleBank）',type:'virtual',url:'https://www.airstarbank.com/zh-hk/',
 tiers:[{level:1,n1:'Airstar 戶口',min:'無'}],
 fees:{minFee:{v:'無月費',lvl:'free'},minBal:{v:'無',lvl:'free'},dormant:{v:'無',lvl:'free'},statement:{v:'電子免費',lvl:'free'},closeAcc:{v:'免費',lvl:'free'},fps:{v:'免費',lvl:'free'},ttOnline:{v:'請查閱',lvl:'na'},ttBranch:{v:'不適用',lvl:'na'},ttIn:{v:'請查閱',lvl:'na'},ttAmend:{v:'不適用',lvl:'na'},
  atmLocal:{v:'請查閱',lvl:'na'},atmOverseas:{v:'請查閱',lvl:'na'},fxFee:{v:'請查閱',lvl:'na'},cardReplace:{v:'請查閱',lvl:'na'},cheque:{v:'不提供',lvl:'na'},cashierOrder:{v:'不提供',lvl:'na'},refLetter:{v:'請查閱',lvl:'na'},coinDeposit:{v:'不提供',lvl:'na'}},
 td:{HKD:{m1:2.30,m3:2.90,m6:2.70,m12:2.50},USD:{m1:3.60,m3:3.80,m6:3.60,m12:3.40},CNY:{m1:1.30,m3:1.50,m6:1.50,m12:1.50},min:'HK$1',note:'以存款業務為主。'},
 fx:{spread:0.35,notes:null,cur:'3',note:'以港元／美元／人民幣為主。'}}*/
];

export const FX_CURRENCIES=[{c:'USD',n:'美元',fallback:7.78},{c:'CNY',n:'人民幣',fallback:1.10},{c:'JPY',n:'日圓',fallback:0.0500,unit:100},{c:'EUR',n:'歐羅',fallback:9.10},{c:'GBP',n:'英鎊',fallback:10.40},{c:'AUD',n:'澳元',fallback:5.15},{c:'CAD',n:'加元',fallback:5.60},{c:'SGD',n:'新加坡元',fallback:6.00},{c:'CHF',n:'瑞士法郎',fallback:9.75},{c:'NZD',n:'紐西蘭元',fallback:4.45},{c:'THB',n:'泰銖',fallback:0.245},{c:'TWD',n:'新台幣',fallback:0.248},{c:'KRW',n:'韓圜',fallback:0.0053,unit:100}];

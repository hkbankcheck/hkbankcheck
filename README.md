# 香港銀行一站式比較 · HK Bank Comparison

一個比較香港 16 間傳統及虛擬銀行的定期存款利率、外幣兌換匯率及服務收費的網頁工具，支援按戶口類別（基本／中階／高階）切換，並可在**繁體中文／English／简体中文**三種語言之間切換。

A single-page web app comparing time deposit rates, foreign exchange rates and service fees across 16 traditional and virtual banks in Hong Kong. Every bank's account tier (Basic / Mid / Premium) can be switched independently, and the whole UI can be viewed in **Traditional Chinese, English, or Simplified Chinese**.

## 功能 Features

- 📈 **定期存款利率** — 港元／美元／人民幣 1/3/6/12 個月存款利率比較，附利息計算機。
- 💱 **外幣兌換** — 抓取即時市場中間價，按各銀行典型買賣差價推算買入／賣出價，附兌換計算機。
- 💳 **服務收費** — 戶口月費、轉賬匯款、ATM、退票／本票等收費一覽，按分類及戶口類別篩選。
- 👤 **戶口類別切換** — 每間銀行可獨立切換戶口級別，或一次將所有銀行切換至同一級別。
- 🌐 **多語言** — 右上角語言切換器：繁體中文（原文）／English（人手翻譯）／简体中文（自動由繁體轉換）。

## 技術棧 Tech Stack

- [Vite](https://vitejs.dev/)（vanilla JS，無框架）
- [opencc-js](https://github.com/nk2028/opencc-js) 用於繁體 → 簡體自動轉換（按需動態載入，不影響預設語言的載入速度）

## 本機執行 Run locally

```bash
npm install
npm run dev
```

開發伺服器預設運行於 `http://localhost:47291`。

```bash
npm run build      # 產出生產版本至 dist/
npm run preview    # 預覽生產版本
```

## 專案結構 Project Structure

```
index.html        # 頁面骨架，各處靜態文字皆有 id，供 JS 依語言填入
src/
  data.js         # 所有銀行資料（BANKS）、收費分類（CATEGORIES）、外幣清單
  i18n.js         # 語言狀態、UI 文字辭典（繁體／英文）、簡體自動轉換、輔助函式
  main.js         # 渲染邏輯：定存表、外幣表、收費表、詳情視窗、戶口類別切換器
  style.css       # 樣式
```

## 多語言架構說明 i18n Architecture

- **繁體中文**：所有資料以繁體中文原文儲存於 `data.js` / `i18n.js`，此為預設語言，無需轉換。
- **English**：`i18n.js` 內的 `UI` 物件維護固定介面文字的人手英文翻譯；`PHRASE_EN` 辭典則對應 `data.js` 內銀行收費／備註等重複出現的繁體片語的英文翻譯。銀行名稱使用各銀行物件的 `nameEn` 簡稱欄位。
- **简体中文**：不需要另外維護簡體文案 — 改用 `opencc-js` 在畫面渲染時，把既有的繁體字串即時轉換為簡體（香港用字 → 簡體），因此保證與繁體版本內容完全一致，且新增資料時不會遺漏簡體翻譯。轉換字典透過動態 `import()` 按需載入，只有使用者切換至簡體中文時才會下載，避免拖慢預設語言的首次載入。

## 資料來源 Data Sources

各銀行官方服務收費表及網站、公開媒體報道；匯率中間價來自 [open.er-api.com](https://open.er-api.com)。本頁僅供參考，不構成財務建議，實際利率及收費請以銀行最新公布為準。

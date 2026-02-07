# 產品需求文件 (PRD) - 周孟翰醫師個人形象網站建置案

| 文件資訊 | 內容 |
| :--- | :--- |
| **專案名稱** | Dr. Chou Meng-Han Premium Personal Brand Website |
| **版本** | **v4.1** (定案版 - **強化 Astro 架構與 SEO 效能)** |
| **狀態** | v1 已完成 |
| **委託客戶** | 周孟翰 醫師 (新店高美泌尿科診所 院長) |
| **日期** | 2026-02-04 |

## 1. 專案概述 (Project Overview)

### 1.1 背景與目的

本專案旨在為 **新店高美泌尿科診所院長 周孟翰醫師** 打造一個具備「高質感」、「私密安心」與「專業權威」的個人品牌網站。
有別於一般醫療網站的冰冷或傳統診所的制式感，本站參考 **AlleyPin** 等現代醫療美學，以 **醫學藍** 與 **琥珀金** 為基調，強調醫師在微創手術（如 UroLift, Rezūm）的高端專業形象，並透過真實的衛教文章、影音與即時資訊建立醫病信任。

### 1.2 核心目標 (Success Metrics)

1. **品牌質感升級**：透過 Medical Professional Clean (專業潔淨風) 的視覺語彙，傳遞信賴感。

2. **資訊即時性**：整合最新門診異動與影音內容，增加使用者黏著度。

3. **精準資訊傳遞**：完整呈現醫師學經歷、主治專長，並提供強大的站內搜尋功能。

4. **看診導流轉化**：清楚引導病患至「新店高美泌尿科診所」看診，提供明確的地圖與門診時間。

5. **極致效能與 SEO**：利用 Astro 架構達成 **Google Lighthouse 效能 95+ 分**，透過「零 JS」策略確保秒開體驗，極大化 SEO 自然排序優勢。

## 2. 視覺設計規範 (Design Specifications)

**設計風格**：**Medical Professional Clean (專業潔淨風)**。以沈穩的醫學藍為主，搭配琥珀金作為亮點，背景採用極淡冷灰藍，營造層次分明且閱讀舒適的現代醫療氛圍。

### 2.1 配色方案 (Color Palette) 更動

| 色彩角色 | 變數名稱 | HEX 色碼 | 應用範圍與設計意圖 |
| :--- | :--- | :--- | :--- |
| **Background** | `bg` | **`#F0F4F8`** | **極淡冷灰藍**。全站主背景，比純白更有層次，能突顯白色卡片的潔淨感。 |
| **Primary** | `primary` | **`#2A8BC8`** | **醫學藍**。標題文字、主要按鈕、頁尾背景。傳遞專業、冷靜與信賴。 |
| **Accent** | `accent` | **`#D99A46`** | **琥珀金**。裝飾線條、圖標 Highlight、Hover 效果。高對比度且具質感，在冷色調中提供溫暖亮點。 |
| **Text** | `text` | **`#334155`** | **深岩灰**。內文文字，比純黑柔和但對比度足夠，確保閱讀清晰。 |
| **Surface** | `surface` | **`#FFFFFF`** | **純白**。卡片或內容區塊的底色。 |
| **Highlight Blue** | `highlight-blue` | **`#E0F2FE`** | **水彩淺藍**。用於裝飾背景底圖。 |
| **Highlight Gold** | `highlight-gold` | **`#FFFBEB`** | **水彩淺金**。用於次要裝飾或「最新消息」的底色區塊。 |


### 2.2 視覺元素與排版

* **字體策略**：標題使用 **Serif (襯線體)**（如 Noto Serif TC），內文使用 **Sans-serif (黑體)**。

* **大氣排版**：Hero Section 使用巨大的 "UROLOGY" 浮水印作為背景裝飾。

* **圖片處理**：醫師形象照採用 **遮罩 (Masking)** 或 **去背合成** 處理，融入背景，而非生硬的矩形照片。

* **圖標風格**：極簡線條 (Line Icons) 搭配金棕色底塊。

## 3. 網站架構與內容規劃 (Content Architecture)

### 3.0 全站導覽列 (Global Navigation)

* **固定方式**：Sticky Header（頁面捲動後固定於頂部），背景轉為半透明模糊 (Backdrop Blur) 以確保閱讀性。
* **Logo 區域**：
    * 顯示文字：Dr. Chou (上排) / UROLOGY CLINIC (下排小字)。
    * 點擊行為：回到首頁頂部。
* **選單項目 (Menu Items)**：
    1.  關於醫師 (Anchor: `#about`)
    2.  最新消息 (Link: `/news`)
    2.  主治專長 (Anchor: `#expertise`)
    4.  影音專區 (Link: `/video`)
    3.  衛教專欄 (Link: `/blog`)
    4.  門診資訊 (Anchor: `#clinic`)
* **CTA 按鈕**：
    * 文字：「預約掛號」
    * 樣式：醒目的 Primary Color 按鈕。
    * 行為：連結至門診資訊區塊或直接外連掛號系統。
* **Mobile 行為**：
    * 漢堡選單 (Hamburger Menu) 開啟側邊抽屜 (Drawer)。
    * 點擊連結後自動收合選單。

### 3.1 首頁 (Home / Hero Section)

* **背景**：溫暖米白 + "UROLOGY" 大字浮水印。

* **文案**：

  * Headline: "周孟翰 醫師"

  * Sub-headline: "新店高美泌尿科診所 院長"

  * Slogan: "讓難以啟齒的煩惱，變成輕鬆自在的日常"

  * Intro: "在診間，沒有尷尬的提問，只有專業的傾聽。我們致力於透過細膩的溝通與精準的治療，協助您卸下心理負擔，重拾自信與舒適的生活步調。"

* **CTA**：預約門診 (Anchor to Clinic Info)。

* **視覺**：醫師半身專業形象照。

### 3.2 關於醫師 (Resume / Profile)

* **資料來源**：`個人單頁履歷_周孟翰_20260111_更新版.pptx`

* **左欄：經歷與學會**

  * 專業經歷：三總體系完整歷練、教育部部定講師等 9 項經歷。

  * 專業醫學會：TUA, TAASM, TCS 會員。

* **右欄：學歷與證照**

  * 學歷：國防醫學院學士、台科大博士候選人。

  * 證照：外科專科、泌尿科專科、達文西手術認證、性傳染病專家醫師。

### 3.3 主治專長 (Expertise)

* **資料來源**：`主治項目_網站建置.docx`

* **呈現方式**：五大類別卡片，搭配對應 Icon。

  1. **排尿困擾與攝護腺** (頻尿、攝護腺肥大...)
  2. **私密健康與性傳染病** (菜花、HPV、包皮手術...)
  3. **微創治療與手術** (UroLift, Rezūm, 雷射結紮...)

  4. **男性性功能與荷爾蒙** (不舉、早洩、更年期...)

  5. **一般泌尿疾病** (結石、疝氣、感染...)

* **Call** to **Action**：引導不確定症狀的病患預約諮詢。

### 3.4 門診資訊 (Clinic Info)

* **診所名稱**：新店高美泌尿科診所。

* **地理資訊**：

  * 地址：新北市新店區二十張路5號1樓。

  * 功能：Google Maps 導外連結。

* **聯絡資訊**：電話 (待補)、Email。

* **門診時刻表**：以表格呈現早/午/晚診次 (需確認實際診次)。

* **掛號按鈕**：前往線上掛號系統 (External Link)。

### 3.5 衛教專欄 (Blog System)

本模組分為 **首頁預覽區塊**、**文章列表頁** 與 **單篇文章頁** 三個層級，旨在建立專業知識庫並引導 SEO 流量。

#### A. 首頁最新文章 (Home Preview Section)
* **顯示邏輯**：自動抓取發布日期最新的 **3 篇文章**。
* **版面設計**：
  * **Desktop**：三欄式卡片橫向排列。
  * **Mobile**：垂直堆疊或橫向滑動 (Carousel)。
* **卡片元素**：
  * **封面圖**：固定比例 (如 16:9)，若無圖片則顯示帶有品牌色的 Placeholder (Logo 水印)。
  * **分類標籤 (Tags)**：如「攝護腺肥大」、「微創手術」（對應 `主治項目` Word 檔中的分類）。
  * **發布日期**：格式 `YYYY.MM.DD`。
  * **標題**：限制行數（如 2 行），溢出顯示 `...`。
  * **摘要**：自動擷取文章前 60 字。
* **互動**：區塊右上方或下方設有明顯的 **「查看更多文章 (View All)」** 按鈕，連結至 `/blog`。

#### B. 文章列表頁 (Blog Index Page - `/blog`)
* **功能**：展示所有衛教文章的獨立頁面。
* **篩選機制**：頂部設置分類標籤篩選器 (Filter)，例如：`#排尿困擾`、`#私密健康`、`#微創手術`、`#性功能`。
* **分頁/載入**：採用 **Infinite Scroll (無限捲動)** 或 **Load More 按鈕**，每次載入 9-12 篇文章。
* **視覺風格**：延續首頁的卡片設計，保持一致性。

#### C. 單篇文章頁 (Single Post Page - `/blog/[slug]`)
* **資料來源**：Markdown / MDX 檔案 (由 `攝護腺肥大.docx` 等原始檔轉檔)。
* **閱讀體驗**：
  * **側邊欄 (Sidebar)**：顯示「醫師簡介小卡」與「門診預約按鈕」，提升轉換率。
  * **目錄導覽 (TOC)**：文章長度較長時，自動生成側邊錨點目錄 (Table of Contents)。
  * **相關文章**：文末推薦 2-3 篇同分類文章。
* **Call to Action**：文末固定顯示「預約諮詢」區塊。

---

> **技術實作備註 (Technical Implementation):**
> * **路由結構**:
>   * 首頁: `pages/index.astro` (使用 `getCollection` fetch `limit(3)`)
>   * 列表頁: `pages/blog/index.astro`
>   * 內頁: `pages/blog/[...slug].astro`
> * **資料結構 (Content Collections)**:
>   ```typescript
>   const blogCollection = defineCollection({
>     schema: z.object({
>       title: z.string(),
>       date: z.date(),
>       tags: z.array(z.string()),
>       image: z.string().optional(),
>       excerpt: z.string(),
>       draft: z.boolean().default(false),
>     }),
>   });
>   ```




### 3.6 頁尾 (Footer)

* Logo / Brand Name。

* 快速連結 (Quick Links)。

* 聯絡摘要 (Contact)。

* Copyright 宣告。

### 3.7 (新增) 最新消息 (News)
此頁面用於發布診所異動、停診通知或行銷活動。

* **列表頁 (`/news`)**：依時間排序，顯示標題、日期、類別標籤 (如：停診公告、活動快訊)。
* **內容呈現**：強調「易讀性」，以純文字搭配單張重點圖片為主。

### 3.8 (新增) 影音專區 (Video Gallery)
彙整醫師的短影音 (Shorts/Reels) 與長篇衛教影片。

## 4. 功能需求 (Functional Requirements)

### 4.1 前台功能 (Frontend)

| ID | 功能模組 | 描述 | 優先級 |
| :--- | :--- | :--- | :--- |
| **FE-01** | **響應式設計 (RWD)** | 完美適配 Desktop / Tablet / Mobile，手機版選單為側滑抽屜式。 | P0 |
| **FE-02** | **平滑滾動導覽** | 點擊導覽列連結時，平滑滾動至對應區塊 (Smooth Scroll)。 | P0 |
| **FE-03** | **動態效果** | 區塊進入視窗時的淡入 (Fade-in) 與上浮 (Float-up) 效果，增加精緻感。 | P1 |
| **FE-04** | **外部連結處理** | 掛號連結與地圖連結需開新視窗 (`target="_blank"`)。 | P0 |
| **FE-05** | **自訂 404 頁面** | 設計符合全站視覺的「查無此頁」畫面，引導使用者返回首頁或查看門診表，避免品牌體驗斷層。 | P1 |
| **FE-06** | **站內關鍵字搜尋** | **(New)** 使用 **Pagefind** 技術。支援跨單元搜尋 (文章、消息、影音、專長)。點擊 Icon 彈出搜尋 Modal，支援即時預覽結果。 | P1 |
| **FE-07** | **影片燈箱** | **(New)** 整合 `lite-youtube-embed` 或自製 Modal，優化 YouTube 載入效能，點擊縮圖於當前頁面播放。 | P1 |

### 4.2 後台功能 (CMS - Keystatic)

| ID | 功能模組 | 描述 | 優先級 |
| :--- | :--- | :--- | :--- |
| **BE-01** | **文章管理** | 支援 Rich Text 編輯、圖片上傳、SEO Meta 設定、標籤設定。 | P0 |
| **BE-02** | **門診表圖片置換** | 考慮到門診時間可能異動，提供直接上傳圖片或編輯表格的功能。 | P1 |
| **BE-03** | **診所資訊編輯** | 可修改電話、掛號連結等全域資訊。 | P2 |
| **BE-04** | **最新消息管理** | **(New)** 新增 `News` Collection。欄位：標題、日期、類別、內容、**置頂開關 (Pinned)**。 | P0 |
| **BE-05** | **影音專區管理** | **(New)** 新增 `Videos` Collection。欄位：標題、平台 (YT/IG)、**Video ID/Link** (前端自動解析縮圖)、分類。 | P1 |
| **BE-06** | **搜尋索引自動化** | **(New)** 每次發布內容 (Build) 時，自動執行 `npx pagefind` 建立靜態搜尋索引。 | P0 |

### 4.3 SEO 與社群分享設定 (Non-Functional)

| ID | 功能模組 | 描述 | 優先級 |
| :--- | :--- | :--- | :--- |
| **SEO-01** | **全站 Meta Tags** | 每一頁皆須包含 `title` (格式：頁面標題 | 周孟翰醫師), `description`, `canonical URL`。 | P0 |
| **SEO-02** | **Open Graph (OG)** | 設定 FB/LINE 分享時的預覽圖片 (`og:image`)、標題與摘要。首頁使用形象照，文章頁使用該文章封面圖。 | P0 |
| **SEO-03** | **結構化資料 (Schema)** | 首頁埋設 `Physician` Schema，包含醫師姓名、科別、診所地址；文章頁埋設 `MedicalScholarlyArticle` Schema。 | P1 |
| **SEO-04** | **Sitemap & Robots** | 自動生成 `sitemap-index.xml` 與 `robots.txt` 以利 Google 爬蟲索引。 | P0 |
| **SEO-05** | **數據追蹤** | 埋設 Google Analytics 4 (GA4) 與 Google Tag Manager (GTM) 追蹤碼，並設定「點擊掛號按鈕」為轉換事件。 | P0 |

## 5. 技術架構 (Technical Architecture)

本專案採用 **Astro** 作為核心框架，旨在解決傳統 SPA 網站載入過多不必要 JavaScript 的問題，確保在行動網路上也能瞬間載入。

### 5.1 核心堆疊 (Core Stack)
* **Framework**: **Astro v5** (Static Site Generation mode)。
* **Styling**: Tailwind CSS v3.4+ (LTS) (Utility-first CSS)。
* **Icons**: Lucide React。
* **CMS**: Keystatic (Git-based)
* **Search**: **Pagefind** (Static Search Library)
* **Hosting**: Cloudflare Pages (Global CDN)。


### 5.2 效能與架構策略 (Performance Strategy)
* **Zero JavaScript by Default (預設零 JS)**：
  * 全站頁面預設皆編譯為 **純靜態 HTML**，瀏覽器無需下載、解析或執行龐大的 JavaScript Bundle 即可顯示內容。
  * **效益**：大幅降低 **TTFB** 與 **FCP**，確保「秒開」體驗。
    * **TTFB (Time to First Byte)**：透過 Cloudflare 邊緣節點，伺服器回應時間極短。
    * **FCP (First Contentful Paint)**：瀏覽器無需等待 JS 下載與執行，使用者能瞬間看到畫面內容。
* **Island Architecture (群島架構)**：
  * 僅針對「需要互動」的區塊（如：手機版漢堡選單、輪播圖）進行 **Partial Hydration (局部活化)**。
  * **實作**：使用 React 元件開發互動區塊，但設定 `client:visible` 或 `client:media` 指令，確保其餘靜態內容不載入任何 JS 程式碼。
* **圖像優化自動化 (Image Optimization)**：
  * 使用 Astro 內建 `<Image />` 元件處理所有靜態圖片。
  * **次世代格式**：自動將 JPG/PNG 轉檔為 **WebP** 或 **AVIF**，縮減 80% 以上檔案大小。
  * **CLS 防護**：自動計算並預留圖片長寬空間，防止圖片載入時發生「版面位移 (Layout Shift)」。
  * **Lazy Loading**：預設延遲載入視窗外的圖片，節省頻寬。

### 5.3 SEO 優勢 (Technical SEO)
* **Server-Side Rendered HTML**：爬蟲能直接讀取完整 HTML，無須等待 JS 執行，對 Google 排名極為友善。
* **Core Web Vitals**：針對 LCP, FID, CLS 三大指標進行架構級優化。

### 5.4.1 後台管理與安全性 (CMS Workflow)

* **系統核心**：採用 **Keystatic (Git-based CMS)**，資料直接儲存於 GitHub Repository。
* **登入入口**：
    * 網址路徑：`/keystatic` (例如：`dr-chou.com/keystatic`)。
    * 隱藏機制：不在前台顯示後台入口連結。
* **身分驗證 (Authentication)**：
    * **機制**：採用 **GitHub OAuth** 進行驗證。
    * **流程**：使用者點擊登入 -> 跳轉至 GitHub 授權頁面 -> 驗證成功後返回後台。
* **權限控制 (Authorization)**：
    * **白名單制**：僅有被加入此 GitHub Repository 的 **Collaborator (協作者)** 才能登入並進行寫入操作。
    * **安全性**：非授權人員即使知道後台網址，無法通過 GitHub 驗證，因此無法修改任何內容。
* **發布流程**：
    * 醫師在後台編輯完畢按「儲存」 -> 系統自動 Commit & Push 至 GitHub -> Cloudflare Pages 偵測到更新 -> 自動觸發重新部署 (Re-build) -> 約 1-2 分鐘後前台更新。

## 6. 待確認事項 (To-Do List)

1. **診所電話**：需確認新店高美診所的正式預約電話。

2. **線上掛號連結**：需取得診所掛號系統的確切 URL。

3. **門診時刻表**：需提供正確的醫師看診時段（週一至週六的早午晚診分配）。

4. **形象照片**：需提供醫師的高解析度去背半身照 (PNG 格式佳)，以利製作 Hero Section 的遮罩效果。
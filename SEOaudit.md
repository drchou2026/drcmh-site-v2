# SEO / GEO 全面稽核報告
## 周孟翰醫師網站（drcmh.com）
> 稽核日期：2026-04-28

---

## 一、現有優勢（已做得好的部分）

| 項目 | 狀態 | 說明 |
|---|---|---|
| `robots.txt` AI 爬蟲開放 | ✅ | GPTBot、ClaudeBot、PerplexityBot 均已 Allow |
| `lang="zh-TW"` 語言標記 | ✅ | HTML 根元素正確設定 |
| Open Graph / Twitter Card | ✅ | 完整設定，有封面圖 |
| Canonical URL | ✅ | 每頁皆有 `<link rel="canonical">` |
| Sitemap | ✅ | `@astrojs/sitemap` 已排除後台路徑 |
| JSON-LD：Physician + MedicalClinic | ✅ | `src/components/home/HomeSchema.astro` 結構完整 |
| FAQ 內容 | ✅ | 10 題高品質 Q&A，很適合 AI 引用 |
| 部落格 SEO 欄位 | ✅ | `seoTitle`、`seoDescription` 皆有設計 |
| 麵包屑導航（視覺） | ✅ | 文章頁已有 首頁 / 衛教專欄 / 文章 |
| GA4 分析（Partytown） | ✅ | 非同步載入，不阻塞渲染 |

---

## 二、重大缺失與修正建議

### 🔴 P1 — 高優先（影響排名最大）

---

#### 缺失 1：Blog 文章頁缺乏 `Article` / `MedicalWebPage` 結構化資料

**問題：** `src/pages/blog/[slug].astro` 沒有 JSON-LD Article schema。Google Search Console 與 AI 引擎（如 Perplexity、Google AI Overview）高度依賴此標記判斷文章權威性。

**建議新增的 schema（加在 `<Layout>` 底部）：**

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "headline": "攝護腺肥大為何一直想尿？",
  "description": "seoDescription 內容",
  "datePublished": "2026-03-27",
  "dateModified": "2026-03-27",
  "author": {
    "@type": "Physician",
    "@id": "https://drcmh.com/#physician",
    "name": "周孟翰",
    "medicalSpecialty": "Urology"
  },
  "publisher": {
    "@type": "MedicalClinic",
    "name": "新店高美泌尿科診所",
    "url": "https://drcmh.com"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "攝護腺肥大"
  },
  "inLanguage": "zh-TW"
}
```

---

#### 缺失 2：FAQ 頁面缺少 `FAQPage` 結構化資料

**問題：** `src/components/home/Faq.astro` 有豐富的 FAQ 內容，但沒有加上 `FAQPage` JSON-LD。這是在 Google 搜尋結果中顯示「FAQ 摺疊答案」（rich result）以及被 AI Overview 直接引用最重要的 schema。

**建議修正：** 在 `Faq.astro` 最後加入：

```astro
<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
})} />
```

---

#### 缺失 3：`og:type` 未針對文章頁設為 `"article"`

**問題：** `src/layouts/Layout.astro` 所有頁面 `og:type` 均為 `"website"`。部落格文章應改為 `"article"` 以利社群平台正確辨識。

**建議修正：** 在 Layout props 加入 `type` 參數：

```diff
// Layout.astro
- const { title, description, image, noindex } = Astro.props;
+ const { title, description, image, noindex, type = "website" } = Astro.props;

// og:type
- <meta property="og:type" content="website" />
+ <meta property="og:type" content={type} />
```

在 `[slug].astro` 呼叫 Layout 時傳入 `type="article"`。

---

#### 缺失 4：麵包屑導航缺少 `BreadcrumbList` JSON-LD

**問題：** 文章頁有視覺麵包屑，但無 schema.org `BreadcrumbList` 標記。這影響 Google 是否在搜尋結果中顯示麵包屑路徑。

**建議新增（`[slug].astro` 中）：**

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://drcmh.com/" },
    { "@type": "ListItem", "position": 2, "name": "衛教專欄", "item": "https://drcmh.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "文章標題" }
  ]
}
```

---

### 🟠 P2 — 中優先（提升搜尋豐富結果與 AI 引用率）

---

#### 缺失 5：`HomeSchema.astro` 缺少 `openingHoursSpecification` 與地理座標

**問題：** `src/components/home/HomeSchema.astro` 的 `MedicalClinic` schema 缺少營業時間與 GPS 座標。本地 SEO（Google Maps / Google Business）和 AI 搜尋引擎在回答「新店 泌尿科 幾點開診」時高度依賴此資料。

**建議補充：**

```json
"geo": {
  "@type": "GeoCoordinates",
  "latitude": 24.98260,
  "longitude": 121.53749
},
"openingHoursSpecification": [
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "09:00", "closes": "20:30" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "14:30", "closes": "20:30" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "20:30" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "14:30", "closes": "20:30" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "17:30" },
  { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "12:00" }
],
"hasMap": "https://maps.app.goo.gl/MU3R8XXKV7bweCAU9",
"areaServed": {
  "@type": "City",
  "name": "新北市"
}
```

---

#### 缺失 6：News 頁面 `[slug].astro` 無 SEO description

**問題：** `src/pages/news/[slug].astro` 傳入 Layout 時未提供 `description`：

```astro
<Layout title={`${post.data.title} | 最新消息`}>
```

Google 會自動擷取頁面內文，容易顯示不理想的摘要。

**建議修正：** 在 news content schema 新增 `summary` 或 `excerpt` 欄位，或從文章內文截取前 150 字動態生成 description。

---

#### 缺失 7：`WebSite` Schema 缺失（站內搜尋 Sitelinks Searchbox）

**問題：** 首頁 schema 缺少 `WebSite` 類型，無法讓 Google 在搜尋結果顯示「站內搜尋框」，也缺乏 `@id` 錨點連結各 schema 節點。

**建議新增至 `HomeSchema.astro`：**

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://drcmh.com/#website",
  "url": "https://drcmh.com",
  "name": "周孟翰醫師｜泌尿專科",
  "inLanguage": "zh-TW",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://drcmh.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

#### 缺失 8：`Physician` Schema 缺少 `@id` 錨點

**問題：** 目前 Physician schema 在 `HomeSchema.astro` 與 `About.astro` 各有獨立定義，但沒有用 `@id` 串聯，AI 引擎無法辨識兩者為同一實體。

**建議：** 統一 `"@id": "https://drcmh.com/#physician"` 並在文章 schema 的 `author` 欄位引用此 `@id`。

---

#### 缺失 9：部落格文章 `og:url` 應使用 canonical URL

**問題：** `Layout.astro` 中：

```astro
<meta property="og:url" content={Astro.url} />
```

`Astro.url` 包含完整請求 URL（可能有 query string），應改為 canonical URL 確保一致性：

```astro
<meta property="og:url" content={canonicalURL} />
```

---

### 🟡 P3 — GEO 專項建議（生成式引擎優化）

GEO 是針對 ChatGPT、Perplexity、Google AI Overview、Claude 等 AI 搜尋引擎的優化策略。

---

#### GEO 建議 1：文章加入「引用友善」的摘要段落

**現狀：** 文章以 Markdown 格式撰寫，排版良好，但 AI 在掃描時偏好**開頭有清晰定義段落**的文章。

**建議：** 每篇文章的最前面（第一個 `##` 標題之前）加一段 2-3 句的「AI 可引用摘要」，格式如：

```markdown
> **摘要：** 攝護腺肥大（BPH）是男性常見的泌尿問題，主要症狀包括頻尿、夜尿、尿流細弱。
> 本文由泌尿科專科醫師周孟翰介紹其成因、膀胱代償風險，及 UroLift、Rezūm 等微創治療選項。
```

---

#### GEO 建議 2：為每篇文章加入明確的 `speakable` Schema

AI 語音搜尋和 AI Overview 偏好有 `speakable` 標記的段落。建議在文章 schema 中加入：

```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": [".article-summary", "h2", "h3"]
}
```

---

#### GEO 建議 3：FAQ 內容擴充與結構優化

**現狀：** FAQ 有 10 題，品質很好。但 AI 引擎在回答具體問題時，會優先引用**答案中含有明確數字、比較、步驟**的內容。

**建議：** 在各答案中補充：
- 具體數字（「研究顯示約 50% 的 50 歲男性...」）
- 條件比較（「若 PSA > 4 ng/mL...」）
- 明確的建議就醫時機

---

#### GEO 建議 4：`sameAs` 補充 Google Knowledge Graph 連結

**問題：** `HomeSchema.astro` 的 `sameAs` 僅包含 Facebook 和 Instagram。

**建議補充：**
- Google Business Profile 連結
- LinkedIn（若有）
- 台灣泌尿科醫學會個人頁面
- Wikidata 條目（若有）

這有助於 AI 引擎確認醫師身分的可信度（E-E-A-T）。

---

#### GEO 建議 5：強化 E-E-A-T 信號

**E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）** 是 Google 與 AI 引擎評估醫療內容的核心標準。

| 建議 | 目前狀態 | 改善方式 |
|---|---|---|
| 文章署名詳細度 | 僅顯示「周孟翰 醫師」 | 加入作者簡介區塊（專長、證照連結） |
| 醫學參考文獻 | 無 | 在文章末尾加入「延伸參考」（如 PubMed 連結） |
| 最後更新日期 | 無顯示 | 在文章 meta 加入 `dateModified` 並顯示於頁面 |
| 醫療免責聲明 | 僅文末小字 | 加入固定的醫療免責聲明 block component |

---

### 🔵 P4 — 技術效能 SEO

---

#### 建議 1：FontAwesome 改用自託管或子集化

**問題：** `src/layouts/Layout.astro` 從 CDN 載入完整 FontAwesome（1.2MB+），為 render-blocking 資源：

```astro
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
```

**建議：** 只載入使用到的圖示子集，或改用 Astro 原生 SVG icon 方案（如 lucide-react，已有在用）。

---

#### 建議 2：加入 `<link rel="preload">` 給首圖

**問題：** Hero 區的醫師照片是 LCP（Largest Contentful Paint）元素，但沒有 preload 指示。

**建議：** 在 `<head>` 加入：

```astro
<link rel="preload" as="image" href={doctorProfile.src} />
```

---

#### 建議 3：OG 圖片尺寸 meta 補充

**問題：** Open Graph 圖片未宣告尺寸，部分平台會重新下載圖片確認尺寸。

**建議補充：**

```astro
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
```

---

#### 建議 4：`<link rel="sitemap">` 加入 `<head>`

雖然 `robots.txt` 已有 Sitemap 宣告，但在 `<head>` 內也加上有助於部分爬蟲發現：

```astro
<link rel="sitemap" href="/sitemap-index.xml" />
```

---

## 三、優先執行順序總覽

```
🔴 立即執行（排名影響最大）
  1. Blog 文章加入 MedicalWebPage / Article JSON-LD          [slug].astro
  2. FAQ 加入 FAQPage JSON-LD                                Faq.astro
  3. og:type 文章頁改為 "article"                            Layout.astro + [slug].astro
  4. 麵包屑加入 BreadcrumbList JSON-LD                       [slug].astro

🟠 本週內
  5. HomeSchema 補充 openingHoursSpecification + geo         HomeSchema.astro
  6. News slug 頁加入 description                            news/[slug].astro
  7. WebSite schema + SearchAction                           HomeSchema.astro
  8. Physician @id 統一                                      HomeSchema.astro + About.astro

🟡 GEO 長期優化
  9. 文章開頭加引用友善摘要段落                               各 .mdx 文章
 10. FAQ 答案品質強化（數字、條件、就醫時機）                  faq/list.yaml
 11. sameAs 補充 Google Business Profile                     global.yaml + HomeSchema.astro
 12. E-E-A-T：作者簡介、文獻、更新日期、免責聲明               [slug].astro

🔵 技術效能
 13. FontAwesome 子集化                                      Layout.astro
 14. Hero 圖片 preload                                       Layout.astro 或 Hero.astro
 15. OG 圖片尺寸 meta                                        Layout.astro
 16. sitemap link in head                                    Layout.astro
```

---

## 四、GEO 核心原則（總結）

AI 引擎（ChatGPT、Perplexity、Claude、Google AI Overview）在引用來源時，優先選擇：

1. **清晰的作者身分** — 已有醫師資訊，建議串聯 `@id`
2. **結構化的答案** — FAQPage schema 最直接，優先實作
3. **可被機器讀取的摘要** — `speakable` / `excerpt` 結構
4. **多平台印證的可信度** — `sameAs`、Google Business Profile
5. **定期更新的內容** — `dateModified` 在 schema 中明確宣告

> **目前網站最大的 GEO 缺口：FAQPage JSON-LD 缺失。** 這是最容易被 AI Overview 直接引用的格式，建議優先實作。

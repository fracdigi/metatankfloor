/**
 * Blog 文章清單 — sitemap、blog 列表、blog 詳細頁共用單一來源。
 * 新增文章時只要在這裡加一筆，sitemap 會自動包含。
 */

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: "carbonized-vs-solid-wood",
    title: "2026 碳化實木芯地板 vs 傳統實木地板：5 大優勢一次看懂",
    description:
      "台灣潮濕氣候讓實木地板容易翹曲？碳化實木芯地板結合實木調濕與 SPC 防水，5 大優勢完整解析。",
  },
  {
    slug: "waterproof-test",
    title: "杜邦美達坦克地板真的防水嗎？實測 + 實際案例分享",
    description:
      "100% 防水地板是行銷話術嗎？IXPE 背墊 + 深層碳化芯的防水結構，實測 24 小時泡水後表現。",
  },
  {
    slug: "ac6-vs-ac4-vs-spc",
    title: "超耐磨地板怎麼選？AC6 vs AC4 vs SPC 完整比較表",
    description:
      "AC6（25,500 轉）與 AC4、SPC 差在哪？從耐磨轉數、腳感、預算三面向完整比較。",
  },
  {
    slug: "kids-pets-floor",
    title: "小孩寵物家庭必看！抗菌除臭降噪碳化實木芯地板推薦",
    description:
      "小孩爬行、寵物指甲刮傷、噪音、清潔便利 — 碳化實木芯地板一次解決 4 大家庭痛點。",
  },
  {
    slug: "2026-price-list",
    title: "每坪多少錢？杜邦美達坦克 8 款花色 2026 最新報價一次看",
    description: "8 款花色 2026 年最新每坪報價、施工含料、丈量費用完整揭露。",
  },
  {
    slug: "green-building-cert",
    title: "綠建材地板這樣挑才對！EPA NAF + 台灣健康標章 雙認證解析",
    description:
      "綠建材、無醛、低 VOC 認證怎麼看？EPA NAF 與台灣綠建材標章雙認證解析。",
  },
  {
    slug: "click-lock-install",
    title: "卡扣式地板安裝 3 小時搞定！自助 vs 請師傅 省錢秘訣",
    description: "卡扣式地板 DIY 可能嗎？自助 vs 找師傅工資差多少、施工要點一次看。",
  },
  {
    slug: "humidity-control",
    title: "碳化實木芯地板能調節濕度？科學原理 + 真實使用 6 個月心得",
    description:
      "碳化實木芯的濕度調節原理，實際使用 6 個月的濕度數據與腳感變化紀錄。",
  },
  {
    slug: "spc-vs-carbonized-wood",
    title: "SPC 塑膠地板 vs 杜邦碳化木芯：哪個更環保耐用？2026 最新結論",
    description:
      "SPC（石粉壓製）與碳化實木芯地板從環保、耐用、腳感、防水四面向比較。",
  },
  {
    slug: "why-authorized-dealer",
    title: "杜邦授權地板為什麼值得信賴？500 萬產品責任險 + 三大國際認證",
    description:
      "非授權經銷商風險有多大？500 萬產品責任險、原廠授權書、三大國際認證解析。",
  },
  {
    slug: "mold-insect-solution",
    title: "木地板發霉、蟲蛀一次解決！深層碳化技術全解析",
    description:
      "200°C 深層碳化為什麼能徹底防霉防蟲？木材細胞結構層面的科學原理。",
  },
  {
    slug: "2026-design-trend",
    title: "2026 居家裝修趨勢：為什麼設計師都推「碳化實木芯」取代傳統木地板？",
    description:
      "2026 台灣設計師偏好的地板趨勢，從美學、耐用、氣候三個角度看碳化實木芯的優勢。",
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

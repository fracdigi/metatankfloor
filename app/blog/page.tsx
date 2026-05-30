import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "知識部落格",
  description: "杜邦美達坦克碳化實木芯地板專業知識。2026 碳化實木芯 vs SPC 比較、防水實測、AC6耐磨選購指南、小孩寵物家庭推薦、綠建材地板挑選等實用文章。",
};

const blogPosts = [
  { slug: "carbonized-vs-solid-wood", title: "2026 碳化實木芯地板 vs 傳統實木地板：5 大優勢一次看懂" },
  { slug: "waterproof-test", title: "杜邦美達坦克地板真的防水嗎？實測 + 實際案例分享" },
  { slug: "ac6-vs-ac4-vs-spc", title: "超耐磨地板怎麼選？AC6 vs AC4 vs SPC 完整比較表" },
  { slug: "kids-pets-floor", title: "小孩寵物家庭必看！抗菌除臭降噪碳化實木芯地板推薦" },
  { slug: "2026-price-list", title: "每坪多少錢？杜邦美達坦克 8 款花色 2026 最新報價一次看" },
  { slug: "green-building-cert", title: "綠建材地板這樣挑才對！EPA NAF + 台灣健康標章 雙認證解析" },
  { slug: "click-lock-install", title: "卡扣式地板安裝 3 小時搞定！自助 vs 請師傅 省錢秘訣" },
  { slug: "humidity-control", title: "碳化實木芯地板能調節濕度？科學原理 + 真實使用 6 個月心得" },
  { slug: "spc-vs-carbonized-wood", title: "SPC 塑膠地板 vs 杜邦碳化木芯：哪個更環保耐用？2026 最新結論" },
  { slug: "why-authorized-dealer", title: "杜邦授權地板為什麼值得信賴？500 萬產品責任險 + 三大國際認證" },
  { slug: "mold-insect-solution", title: "木地板發霉、蟲蛀一次解決！深層碳化技術全解析" },
  { slug: "2026-design-trend", title: "2026 居家裝修趨勢：為什麼設計師都推「碳化實木芯」取代傳統木地板？" },
];

export default function BlogListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-[#A67B5B] text-sm tracking-[2px]">KNOWLEDGE CENTER</div>
        <h1 className="section-title mt-2">專業知識部落格</h1>
        <p className="mt-3 text-[#6B5B4F]">深入了解碳化實木芯地板的科學原理與選購指南</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug}`} className="blog-card p-6 group">
            <div className="text-xs text-[#A67B5B] mb-2">2026 地板選購指南</div>
            <h2 className="font-semibold text-xl leading-snug group-hover:text-[#A67B5B] transition-colors">
              {post.title}
            </h2>
            <div className="mt-4 text-sm text-[#6B5B4F]">閱讀全文 →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

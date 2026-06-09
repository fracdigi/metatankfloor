import Link from "next/link";
import { Metadata } from "next";
import { knowledgeArticles, categoryMeta, KnowledgeCategory } from "@/lib/knowledge-articles";

export const metadata: Metadata = {
  title: "地板知識 QA | 杜邦美達坦克 碳化實木芯地板",
  description:
    "塑膠地磚、SPC 地板、HDF 地板、實木地板、碳化實木芯地板差別怎麼選？30 篇地板推薦、防潮、耐磨、健康綠建材深度文章，幫你避開裝修選地板的常見地雷。",
  openGraph: {
    title: "地板知識 QA — 30 篇碳化實木芯與地板比較完整指南",
    description:
      "從塑膠地磚到杜邦 Metatank 碳化實木芯地板，30 篇 SEO 完整解析地板比較、防潮、健康、室內裝修選材重點。",
  },
};

const categoryOrder: KnowledgeCategory[] = ["comparison", "education", "pain-point"];

export default function KnowledgeIndexPage() {
  const byCategory = categoryOrder.map((cat) => ({
    cat,
    meta: categoryMeta[cat],
    items: knowledgeArticles.filter((a) => a.category === cat),
  }));

  return (
    <div className="bg-[#F5F0E8] text-[#3F2E1E]">
      {/* Hero */}
      <section className="border-b border-[#D4C9B8] bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#6B5B4F]">
            <span className="editorial-rule" />
            <span>Knowledge · QA</span>
          </div>
          <h1 className="mt-6 text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-tight">
            地板知識 QA
            <br />
            <span className="italic text-[#A67B5B]">30 篇選地板必看的完整指南。</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[#6B5B4F] leading-loose font-light">
            從塑膠地磚、SPC、HDF 到碳化實木芯地板的客觀比較，從碳化實木芯的科學原理到屋主最常忽略的痛點。
            這 30 篇文章是我們為準備裝修的你準備的完整地圖。
          </p>

          {/* Category jump */}
          <div className="mt-12 grid sm:grid-cols-3 gap-px bg-[#D4C9B8] border border-[#D4C9B8]">
            {byCategory.map(({ cat, meta, items }) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="bg-white p-6 md:p-7 hover:bg-[#FAF7F2] transition-colors"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B]">
                  {cat === "comparison" ? "A" : cat === "education" ? "B" : "C"} ·{" "}
                  {items.length} ARTICLES
                </div>
                <div className="mt-3 text-lg font-medium tracking-tight">{meta.label}</div>
                <div className="mt-1 text-xs text-[#6B5B4F] leading-relaxed">
                  {meta.description}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Articles by category */}
      {byCategory.map(({ cat, meta, items }) => (
        <section
          key={cat}
          id={cat}
          className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24 scroll-mt-24"
        >
          <div className="flex items-baseline gap-4 mb-10 md:mb-14">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#A67B5B]">
              — {cat === "comparison" ? "A" : cat === "education" ? "B" : "C"} / {meta.label}
            </span>
            <span className="text-xs text-[#6B5B4F]">{items.length} 篇</span>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#D4C9B8] border border-[#D4C9B8]">
            {items.map((article) => (
              <Link
                key={article.slug}
                href={`/knowledge/${article.slug}`}
                className="group bg-white p-6 md:p-8 hover:bg-[#FAF7F2] transition-colors flex flex-col"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B] mb-3">
                  {article.categoryLabel}
                </div>
                <h2 className="text-lg md:text-xl font-medium tracking-tight leading-snug text-[#3F2E1E] group-hover:text-[#A67B5B] transition-colors">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm text-[#6B5B4F] leading-relaxed line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-[#EDE7D9] text-xs text-[#6B5B4F] tracking-[0.15em]">
                  閱讀全文 →
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border-t border-[#D4C9B8] bg-[#EDE7D9]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            看完還是不確定？
            <span className="italic text-[#A67B5B]">由專人為你諮詢報價。</span>
          </h2>
          <p className="mt-6 text-[#6B5B4F] leading-loose font-light">
            杜邦美達坦克授權專員將於 24 小時內主動聯絡，提供現場丈量、樣品索取與精準報價。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-10 text-sm tracking-[0.15em] bg-[#3F2E1E] text-white hover:bg-[#A67B5B] transition-colors"
            >
              探索 8 款花色
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center h-12 px-10 text-sm tracking-[0.2em] uppercase border border-[#3F2E1E] text-[#3F2E1E] hover:bg-[#3F2E1E] hover:text-white transition-colors"
            >
              聯絡專人
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

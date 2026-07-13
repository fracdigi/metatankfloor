import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  knowledgeArticles,
  getKnowledgeBySlug,
} from "@/lib/knowledge-articles";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://metatank.tw";

export function generateStaticParams() {
  return knowledgeArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeBySlug(slug);
  if (!article) return { title: "找不到文章" };

  const url = `${SITE_URL}/knowledge/${article.slug}`;
  return {
    title: `${article.title} | 杜邦美達坦克 地板知識 QA`,
    description: article.excerpt,
    keywords: article.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getKnowledgeBySlug(slug);
  if (!article) notFound();

  const articleUrl = `${SITE_URL}/knowledge/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    inLanguage: "zh-TW",
    keywords: article.keywords.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    author: { "@type": "Organization", name: "杜邦美達坦克 授權經銷商" },
    publisher: {
      "@type": "Organization",
      name: "杜邦美達坦克 碳化實木芯地板",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/LOGO-AuthorrizedLicensee-2.webp`,
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "地板知識 QA",
        item: `${SITE_URL}/knowledge`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  const faqJsonLd =
    article.faq && article.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  // 上下篇導航
  const idx = knowledgeArticles.findIndex((a) => a.slug === slug);
  const prev = idx > 0 ? knowledgeArticles[idx - 1] : null;
  const next =
    idx < knowledgeArticles.length - 1 ? knowledgeArticles[idx + 1] : null;

  return (
    <div className="bg-[#F5F0E8] text-[#3F2E1E]">
      <Script
        id={`article-jsonld-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`breadcrumb-jsonld-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <Script
          id={`faq-jsonld-${article.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <article className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="text-xs tracking-[0.2em] uppercase text-[#6B5B4F] mb-8 flex items-center gap-2">
          <Link href="/knowledge" className="hover:text-[#A67B5B]">
            地板知識 QA
          </Link>
          <span>/</span>
          <span>{article.categoryLabel}</span>
        </div>

        {/* Title block */}
        <header className="mb-12 md:mb-16 pb-10 border-b border-[#D4C9B8]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B] mb-4">
            {article.categoryLabel}
          </div>
          <h1 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.15] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-6 text-[#6B5B4F] leading-loose font-light">
            {article.excerpt}
          </p>
        </header>

        {/* Intro */}
        <p className="text-lg leading-loose font-light text-[#3F2E1E] mb-12">
          {article.intro}
        </p>

        {/* Sections */}
        {article.sections.map((s, i) => (
          <section key={i} className="mb-12">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B] mb-2">
              — {String(i + 1).padStart(2, "0")}
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-6 leading-snug">
              {s.heading}
            </h2>
            <div className="prose-knowledge text-[#3F2E1E] leading-loose font-light whitespace-pre-line">
              {renderMarkdown(s.body)}
            </div>

            {/* 在第二個 section 後插入比較表 */}
            {i === 1 && article.comparisonTable && (
              <div className="mt-10 overflow-x-auto">
                <table className="w-full border-collapse bg-white border border-[#D4C9B8] text-sm">
                  <thead>
                    <tr className="bg-[#3F2E1E] text-[#EDE7D9]">
                      {article.comparisonTable.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="px-3 py-3 text-left font-light tracking-tight border-r border-[#5A4530] last:border-r-0"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparisonTable.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={ri % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`px-3 py-3 border-r border-[#EDE7D9] last:border-r-0 ${
                              ci === 0 ? "font-medium text-[#3F2E1E]" : "text-[#6B5B4F]"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* FAQ */}
        <section className="mt-16 pt-10 border-t border-[#D4C9B8]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B] mb-4">
            — FAQ
          </div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">
            常見問題
          </h2>
          <div>
            {article.faq.map((f, i) => (
              <details key={i} className="group border-b border-[#D4C9B8] py-5">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                  <span className="text-base md:text-lg font-medium text-[#3F2E1E] group-hover:text-[#A67B5B] transition-colors">
                    Q{i + 1}. {f.q}
                  </span>
                  <span className="text-[#A67B5B] mt-1 text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#6B5B4F] leading-loose font-light whitespace-pre-line">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <aside className="mt-16 p-8 md:p-10 bg-[#3F2E1E] text-[#EDE7D9]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#C8A883] mb-4">
            — Next Step
          </div>
          <h3 className="text-xl md:text-2xl font-light leading-snug">
            {article.cta}
          </h3>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-12 px-8 text-sm tracking-[0.15em] bg-white text-[#3F2E1E] hover:bg-[#EDE7D9] transition-colors"
            >
              探索 8 款花色
              <ArrowRight className="ml-3 h-4 w-4" />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center h-12 px-8 text-sm tracking-[0.2em] uppercase border border-[#C8A883] text-[#EDE7D9] hover:bg-[#C8A883] hover:text-[#3F2E1E] transition-colors"
            >
              聯絡專人
            </Link>
          </div>
        </aside>

        {/* SEO Keywords (對搜尋引擎友善的關鍵字標記) */}
        <div className="mt-12 pt-8 border-t border-[#D4C9B8]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B5B4F] mb-3">
            — Related Keywords
          </div>
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((k) => (
              <span
                key={k}
                className="inline-flex items-center px-3 py-1 text-xs text-[#6B5B4F] bg-[#EDE7D9] border border-[#D4C9B8]"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <nav className="mt-16 pt-10 border-t border-[#D4C9B8] grid sm:grid-cols-2 gap-6">
          {prev ? (
            <Link
              href={`/knowledge/${prev.slug}`}
              className="group p-6 border border-[#D4C9B8] bg-white hover:bg-[#FAF7F2] transition-colors"
            >
              <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A67B5B]">
                <ArrowLeft className="h-3 w-3" />
                上一篇
              </div>
              <div className="mt-3 text-sm font-medium leading-snug group-hover:text-[#A67B5B] transition-colors">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/knowledge/${next.slug}`}
              className="group p-6 border border-[#D4C9B8] bg-white hover:bg-[#FAF7F2] transition-colors text-right"
            >
              <div className="flex items-center justify-end gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A67B5B]">
                下一篇
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="mt-3 text-sm font-medium leading-snug group-hover:text-[#A67B5B] transition-colors">
                {next.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* Back to index */}
        <div className="mt-10 text-center">
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-[#6B5B4F] hover:text-[#A67B5B]"
          >
            <ArrowLeft className="h-3 w-3" />
            返回知識 QA 列表
          </Link>
        </div>
      </article>
    </div>
  );
}

/**
 * 將 body 中的 markdown-like 標記轉成 React 節點
 * 支援：**bold**
 */
function renderMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-[#3F2E1E]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

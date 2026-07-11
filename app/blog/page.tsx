import Link from "next/link";
import { Metadata } from "next";
import { blogArticles } from "@/lib/blog-articles";

export const metadata: Metadata = {
  title: "知識部落格",
  description: "杜邦美達坦克碳化實木芯地板專業知識。2026 碳化實木芯 vs SPC 比較、防水實測、AC6耐磨選購指南、小孩寵物家庭推薦、綠建材地板挑選等實用文章。",
};

export default function BlogListPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-[#A67B5B] text-sm tracking-[2px]">KNOWLEDGE CENTER</div>
        <h1 className="section-title mt-2">專業知識部落格</h1>
        <p className="mt-3 text-[#6B5B4F]">深入了解碳化實木芯地板的科學原理與選購指南</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogArticles.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card p-6 group">
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

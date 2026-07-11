import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogArticles, getBlogArticleBySlug } from "@/lib/blog-articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogArticleBySlug(slug);
  if (!post) return { title: "找不到文章" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogArticleBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-[#A67B5B]">← 返回部落格列表</Link>
      
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-6 mb-8 leading-tight">
        {post.title}
      </h1>

      <div className="prose prose-neutral max-w-none text-[#3F2E1E] leading-relaxed">
        <p className="whitespace-pre-line">{post.description}</p>
        
        <div className="mt-12 p-8 bg-[#EDE7D9] rounded-2xl text-sm">
          完整專業文章內容將於下一階段補充（包含詳細比較表、實際使用照片、科學數據）。
          <br /><br />
          目前您可以先體驗完整的購物流程與產品頁面。
        </div>
      </div>
    </article>
  );
}

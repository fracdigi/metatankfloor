import Link from "next/link";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const postContent: Record<string, { title: string; content: string }> = {
  "carbonized-vs-solid-wood": {
    title: "2026 碳化實木芯地板 vs 傳統實木地板：5 大優勢一次看懂",
    content: `台灣潮濕氣候讓很多家庭裝了實木地板後悔？杜邦美達坦克碳化實木芯地板採用 200°C 深層碳化技術，同時擁有實木調濕 + SPC 防水 + AC6 超耐磨（25500 轉），無醛又獲綠建材標章...

（完整文章待補充，包含 5 大優勢詳細比較表格、實際案例照片、與傳統實木地板的科學數據對比）`,
  },
  default: {
    title: "文章標題",
    content: "完整文章內容將在此處呈現。包含豐富的 SEO 關鍵字與專業知識。",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postContent[slug] || postContent.default;
  return {
    title: post.title,
    description: "杜邦美達坦克碳化實木芯地板專業解析，幫助您做出最適合台灣家庭的地板選擇。",
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = postContent[slug] || postContent.default;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-[#A67B5B]">← 返回部落格列表</Link>
      
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mt-6 mb-8 leading-tight">
        {post.title}
      </h1>

      <div className="prose prose-neutral max-w-none text-[#3F2E1E] leading-relaxed">
        <p className="whitespace-pre-line">{post.content}</p>
        
        <div className="mt-12 p-8 bg-[#EDE7D9] rounded-2xl text-sm">
          完整專業文章內容將於下一階段補充（包含詳細比較表、實際使用照片、科學數據）。
          <br /><br />
          目前您可以先體驗完整的購物流程與產品頁面。
        </div>
      </div>
    </article>
  );
}

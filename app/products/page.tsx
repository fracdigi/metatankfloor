import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "產品列表",
  description: "杜邦美達坦克 8 款高壓飾面碳化實木芯地板完整列表。AC6超耐磨、200°C碳化實木芯、綠建材標章，由專人諮詢報價。適合小孩寵物家庭與潮濕氣候。",
  openGraph: {
    title: "杜邦美達坦克 碳化實木芯地板 - 8 款花色完整列表",
    description: "2026 最新花色：2690-2、2690-4、2692-1S、2699-3、2699-5、2738-1、2755-6、2802-7。由專人客製諮詢報價，立即加入詢價清單。",
  },
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="text-[#A67B5B] text-sm tracking-[2px]">ALL COLLECTIONS</div>
        <h1 className="section-title mt-2">所有花色</h1>
        <p className="mt-3 text-[#6B5B4F] max-w-2xl">
          每款皆為杜邦高壓飾面 + 200°C 深層碳化實木芯，通過台灣綠建材標章與 EPA NAF 無醛認證。
          尺寸統一為 232×1209×9.4+2mm，卡扣式安裝。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 bg-[#EDE7D9] rounded-2xl p-8 md:p-10 text-center">
        <h3 className="text-xl font-medium mb-3">需要大量採購或商業空間報價？</h3>
        <p className="text-[#6B5B4F] mb-6">我們提供工程案場專屬價格與施工團隊推薦，請直接聯絡我們。</p>
        <a href="#contact" className="text-[#A67B5B] font-medium underline">聯絡專人報價 →</a>
      </div>
    </div>
  );
}

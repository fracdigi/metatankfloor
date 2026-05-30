"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Shield, Droplets, Leaf, Users, Clock, Award } from "lucide-react";

const advantages = [
  { icon: Shield, title: "AC6 超耐磨", desc: "25,500 轉耐磨層，抗刮抗磨，適合高腳椅與寵物" },
  { icon: Droplets, title: "100% 防水", desc: "淋水 72 小時不變形，適合台灣潮濕氣候與廚浴走道" },
  { icon: Leaf, title: "零甲醛 + 綠建材", desc: "EPA NAF 無醛認證，通過台灣綠建材標章" },
  { icon: Users, title: "實木調濕", desc: "200°C 深層碳化，自動調節室內濕度，防霉抗蟲" },
  { icon: Clock, title: "快速安裝", desc: "卡扣式設計，專業師傅 3 小時完成一間房" },
  { icon: Award, title: "500萬責任險", desc: "杜邦官方授權，完整售後與產品責任保障" },
];

const testimonials = [
  {
    name: "陳小姐",
    role: "台北信義區 36坪住宅",
    quote: "裝潢師傅說這是目前最推薦給小孩家庭的地板，安裝後真的很安靜，寵物也不會滑倒。",
  },
  {
    name: "林先生",
    role: "新北板橋 28坪公寓",
    quote: "原本擔心台灣潮濕會發霉，碳化實木芯完全解決問題，現在每天拖地都不用擔心。",
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="relative h-[620px] md:h-[680px] flex items-center justify-center overflow-hidden text-white">
        
        {/* 地板情境圖（背景主圖） */}
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56b773?w=2000&q=80"
          alt="現代北歐風格客廳實景，鋪設杜邦美達坦克碳化實木芯地板"
          fill
          className="object-cover"
          priority
        />

        {/* 深色遮罩，讓文字與 Logo 更清晰 */}
        <div className="absolute inset-0 bg-[#2C2218]/70" />

        {/* 置中大型 Logo 底圖 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
          <div className="relative w-[62%] max-w-[720px] opacity-[0.22]">
            <Image
              src="/LOGO-AuthorrizedLicensee-2.webp"
              alt="杜邦美達坦克 授權經銷商 Logo"
              width={900}
              height={420}
              className="object-contain brightness-[1.6]"
            />
          </div>
        </div>

        {/* 主要文字內容 */}
        <div className="relative z-20 max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs tracking-[2px] mb-6">
              2026 台灣最強綠建材地板
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
            className="text-4xl md:text-6xl font-semibold tracking-tighter leading-none mb-6 drop-shadow-md"
          >
            杜邦美達坦克<br />碳化實木芯地板
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.55 }}
            className="max-w-2xl mx-auto text-lg text-[#EDE7D9] mb-10 drop-shadow"
          >
            AC6 超耐磨 × 200°C 深層碳化 × 實木調濕 + 防水 + 無醛<br />
            適合小孩寵物家庭，卡扣式 3 小時快速安裝
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/products">
              <Button size="lg" className="h-14 px-10 text-base bg-white text-[#3F2E1E] hover:bg-[#EDE7D9]">
                探索 8 款花色
              </Button>
            </Link>
            <Link href="/#features">
              <Button 
                size="lg" 
                className="h-14 px-10 text-base bg-[#A67B5B] text-white hover:bg-[#8B6649] border border-[#A67B5B] hover:border-[#8B6649]"
              >
                了解產品優勢
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== 6 大優勢 ========== */}
      <section id="features" className="max-w-6xl mx-auto px-4 pt-16 pb-12">
        <div className="text-center mb-12">
          <div className="text-[#A67B5B] text-sm tracking-[2px] mb-2">WHY CHOOSE US</div>
          <h2 className="section-title">2026 台灣家庭最需要的地板</h2>
          <p className="mt-3 text-[#6B5B4F] max-w-md mx-auto">杜邦美達坦克用科學解決台灣氣候與生活痛點</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } }
          }}
        >
          {advantages.map((item, index) => (
            <motion.div 
              key={index} 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }
              }}
              className="bg-white rounded-2xl p-8 border border-[#D4C9B8]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EDE7D9] flex items-center justify-center mb-6">
                <item.icon className="h-6 w-6 text-[#A67B5B]" />
              </div>
              <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-[#6B5B4F] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== 熱門花色 Grid ========== */}
      <section className="bg-white py-16 border-y border-[#D4C9B8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-[#A67B5B] text-sm tracking-[2px]">POPULAR COLORS</div>
              <h2 className="section-title mt-1">2026 熱門 8 款花色</h2>
            </div>
            <Link href="/products" className="hidden md:block text-sm font-medium text-[#A67B5B] hover:underline">
              查看全部產品 →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/products">
              <Button variant="outline" className="border-[#A67B5B] text-[#A67B5B]">查看全部 8 款花色</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 客戶見證 ========== */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="text-[#A67B5B] text-sm tracking-[2px]">REAL STORIES</div>
          <h2 className="section-title mt-1">真實家庭使用心得</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-[#D4C9B8]"
            >
              <p className="text-lg leading-relaxed mb-8">「{t.quote}」</p>
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-sm text-[#6B5B4F]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== 實景案例（藝術感呈現） ========== */}
      <section className="bg-[#F5F0E8] py-16 border-t border-[#D4C9B8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <div className="text-[#A67B5B] text-sm tracking-[3px]">REAL SPACES</div>
              <h2 className="section-title mt-2">台灣家庭真實案例</h2>
            </div>
            <p className="mt-3 md:mt-0 text-[#6B5B4F] max-w-md">
              每一個空間，都是我們對「家」的承諾
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { img: "/case1.jpg", title: "台北信義", desc: "36坪 現代北歐宅" },
              { img: "/case2.jpg", title: "新北板橋", desc: "28坪 親子溫馨宅" },
              { img: "/case3.jpg", title: "台中西屯", desc: "45坪 大宅留白美學" },
              { img: "/case4.jpg", title: "高雄鼓山", desc: "32坪 海景度假宅" },
              { img: "/case5.jpg", title: "桃園中壢", desc: "22坪 輕奢公寓" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#EDE7D9] shadow-sm"
              >
                <Image
                  src={item.img}
                  alt={`${item.title} ${item.desc} - 杜邦美達坦克地板實景`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 優雅遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
                
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <div className="text-sm tracking-[2px] opacity-75 mb-1">{item.title}</div>
                  <div className="text-2xl font-semibold tracking-tight">{item.desc}</div>
                </div>

                {/* 品牌小標 */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 text-[#3F2E1E] text-[10px] tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  杜邦美達坦克
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="outline" className="border-[#A67B5B] text-[#A67B5B] hover:bg-[#A67B5B] hover:text-white">
                查看更多實景案例
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FAQ 精選 ========== */}
      <section className="bg-white border-t border-[#D4C9B8] py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title">常見問題</h2>
          </div>

          <div className="space-y-1">
            {[
              ["碳化實木芯地板真的完全防水嗎？", "是的。表面高壓飾面 + 實木芯經 200°C 深層碳化後，具備極佳的尺寸穩定性，實測淋水 72 小時不變形。"],
              ["適合有小孩跟寵物的家庭嗎？", "非常適合。AC6 超耐磨層可承受寵物抓痕與兒童玩具，高腳椅也不易留下痕跡。"],
              ["安裝需要多久？自己可以裝嗎？", "專業師傅平均一間房約 3 小時即可完成。卡扣式設計技術門檻低，有 DIY 經驗者也可自行安裝。"],
              ["價格怎麼計算？", "以「每坪」計價，建議購買量為實際坪數 × 1.08（含損耗）。我們會依現場丈量後給您精準報價。"],
            ].map(([q, a], i) => (
              <div key={i} className="faq-item py-4">
                <details className="group">
                  <summary className="faq-question cursor-pointer list-none">
                    {q}
                    <span className="text-xl group-open:rotate-45 transition-transform inline-block ml-2">＋</span>
                  </summary>
                  <p className="pt-3 pb-1 text-[#6B5B4F] leading-relaxed">{a}</p>
                </details>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button variant="outline">閱讀更多專業知識 →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Final CTA ========== */}
      <section className="bg-[#4A7043] text-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            準備好為家裡換上<br />真正適合台灣氣候的地板了嗎？
          </h2>
          <p className="text-[#C5D0B8] mb-8">留下需求，專人將於 24 小時內主動聯絡報價</p>
          <Link href="/products">
            <Button size="lg" className="h-14 px-12 bg-white text-[#4A7043] hover:bg-[#EDE7D9] text-base">
              立即選購花色
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

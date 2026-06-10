"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Wind,
  Droplets,
  Ruler,
  Bug,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Plus,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  動效預設                                                            */
/* ------------------------------------------------------------------ */
const ease = [0.23, 1, 0.32, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/* ------------------------------------------------------------------ */
/*  資料                                                                */
/* ------------------------------------------------------------------ */
const pillars = [
  {
    no: "01",
    icon: Wind,
    title: "去除空氣異味",
    en: "Air Purification",
    desc: "200°C 高溫碳化活化木材毛細孔，使其持續吸附並分解室內甲醛、TVOC、寵物與烹飪殘留氣味，讓地板成為家中天然的空氣濾網。",
    metric: "−72%",
    unit: "ODOR",
  },
  {
    no: "02",
    icon: Droplets,
    title: "天然吸濕",
    en: "Moisture Balance",
    desc: "保留實木天生的呼吸特性。室內過濕時自動吸收水氣，乾燥時釋放，讓家中濕度長期維持在 50–65% 的舒適範圍。",
    metric: "50–65%",
    unit: "HUMIDITY",
  },
  {
    no: "03",
    icon: Ruler,
    title: "不變形",
    en: "Dimensional Stability",
    desc: "深層碳化排除木材纖維中的糖分與水分，纖維重新穩定鎖定。台灣全年高濕高溫的氣候下，地板尺寸變化小於 0.05mm。",
    metric: "<0.05mm",
    unit: "WARP",
  },
  {
    no: "04",
    icon: Bug,
    title: "防蟲蛀",
    en: "Pest Resistance",
    desc: "碳化過程徹底破壞蟲卵、白蟻、蛀蟲的寄生環境與營養來源。實木地板史上第一次，不需任何化學藥劑就能天然防蟲。",
    metric: "100%",
    unit: "PEST-PROOF",
  },
  {
    no: "05",
    icon: Sparkles,
    title: "抗菌防霉",
    en: "Anti-Microbial",
    desc: "碳化使木材表面結構緻密化，黴菌與細菌無法附著生長。第三方檢測抗菌率達 99.9%，是過敏體質與兒童家庭的安心選擇。",
    metric: "99.9%",
    unit: "ANTIBACTERIAL",
  },
];

const heroImages = [
  "/images/03643999f2d768bafd3f9894e0f90ca5.jpg",
  "/images/416ce70db464fff733c4c96fdb857415.jpg",
  "/images/83b4d1c7004e760af698ddc7e62bcaa2.jpg",
  "/images/de84c0e8e8e6d73744eded24856f9a08.jpg",
  "/images/4dcc0a9667169a8e97c79a38a26992ca.jpg",
  "/images/15c0eb29c462c2b7b25f98271a55db56.jpg",
];

const heroClaims = [
  { icon: Wind, label: "除異味" },
  { icon: Droplets, label: "吸濕" },
  { icon: Ruler, label: "不變形" },
  { icon: Bug, label: "防蟲蛀" },
  { icon: Sparkles, label: "抗菌防霉" },
];

const layers = [
  {
    no: "L1",
    name: "高壓飾面層",
    en: "HD Decor Film",
    detail: "高解析印刷 + UV 抗黃變塗層，重現實木天然紋理",
  },
  {
    no: "L2",
    name: "AC6 耐磨膜",
    en: "Wear Layer",
    detail: "25,500 轉商業級耐磨，抗刮、抗污、抗指紋",
  },
  {
    no: "L3",
    name: "碳化實木芯",
    en: "Carbonized Core",
    detail: "200°C 深層碳化的實木基材，極致尺寸穩定",
  },
  {
    no: "L4",
    name: "防水鎖扣",
    en: "Click-Lock",
    detail: "Unilin 5G 卡扣，密合度達 0.05mm，免膠安裝",
  },
  {
    no: "L5",
    name: "IXPE 靜音背墊",
    en: "Silent Backing",
    detail: "2mm 緊密發泡，吸音 −20dB，並具備調濕效果",
  },
];

const metrics = [
  { value: "200°C", label: "深層碳化溫度" },
  { value: "25,500", label: "AC6 耐磨轉數" },
  { value: "72H", label: "防水浸泡測試" },
  { value: "−19dB", label: "樓板降噪量" },
  { value: "0.000", label: "甲醛釋出量 mg/L" },
  { value: "3HR", label: "單房安裝時間" },
];

const testimonials = [
  {
    quote:
      "裝潢師傅說這是目前最推薦給小孩家庭的地板，安裝後真的很安靜，寵物也不會滑倒。木紋的層次感比我看過的任何一款都自然。",
    name: "陳小姐",
    role: "台北信義 36 坪｜現代北歐宅",
  },
  {
    quote:
      "原本擔心台灣潮濕會發霉，碳化實木芯完全解決問題。現在每天拖地都不用擔心，而且踩起來的觸感比塑膠地板溫潤太多。",
    name: "林先生",
    role: "新北板橋 28 坪｜親子公寓",
  },
  {
    quote:
      "我們挑了快半年的地板，最後決定選杜邦美達坦克是因為它真的「像實木」，但又沒有實木保養上的麻煩。一年了完全沒問題。",
    name: "黃建築師",
    role: "台中西屯 45 坪｜留白住宅",
  },
];

const certifications = [
  { code: "EPA NAF", label: "美國環保署無甲醛添加" },
  { code: "GREEN", label: "台灣綠建材標章" },
  { code: "AC6", label: "歐規 EN13329 超耐磨" },
  { code: "B1", label: "防焰耐燃等級" },
  { code: "ISO 9001", label: "國際品質管理系統" },
  { code: "$5M", label: "產品責任保險" },
];

const faqs: [string, string][] = [
  [
    "碳化實木芯地板真的完全防水嗎？",
    "是的。表面高壓飾面與實木芯經 200°C 深層碳化後，木材纖維毛細孔封閉，再搭配 IXPE 防水背墊與 5G 鎖扣密合結構，實測淋水 72 小時不變形、不發脹。",
  ],
  [
    "適合家裡有小孩跟寵物的家庭嗎？",
    "非常適合。AC6 超耐磨層（25,500 轉）可承受寵物抓痕與兒童玩具撞擊，IXPE 背墊降噪 20dB 並提供柔軟回彈，孩子跑跳更安靜也更安全。",
  ],
  [
    "安裝需要多久？我可以自己 DIY 嗎？",
    "5G 卡扣式設計專業師傅平均一間房（10 坪內）3 小時完工。具備基礎 DIY 經驗者也可自行安裝，我們提供完整圖文與影片教學。",
  ],
  [
    "和一般 SPC 塑膠地板差在哪？",
    "SPC 為石粉壓製，腳感冰冷、易反光；本款核心為真正的碳化實木，腳感溫潤、視覺自然，且具備實木調濕功能，但仍保留 100% 防水與超耐磨的優勢。",
  ],
  [
    "價格如何計算？需要多少預算？",
    "我們依坪數、花色、安裝條件由專人客製報價。建議購買量為實際坪數 × 1.08（含損耗），請填寫聯絡資訊，杜邦美達坦克授權專員將於 24 小時內主動聯繫，提供現場丈量與精準報價。",
  ],
];

/* ------------------------------------------------------------------ */
/*  主元件                                                              */
/* ------------------------------------------------------------------ */
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroImages.length),
      5500,
    );
    return () => clearInterval(id);
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <main className="bg-[#F5F0E8] text-[#3F2E1E] overflow-x-hidden">
      {/* ================================================================ */}
      {/* 00 — Cinematic Hero                                              */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] flex items-end overflow-hidden text-white"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroIdx}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ opacity: { duration: 1.6, ease }, scale: { duration: 6, ease } }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[heroIdx]}
                alt="杜邦美達坦克碳化實木芯地板實景"
                fill
                priority={heroIdx === 0}
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {/* 多層遮罩，讓畫面更具電影感 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/85" />
        <div className="absolute inset-0 bg-[#2C2218]/45" />
        <div className="absolute inset-0 grain" />

        {/* 左上：品牌標記 */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
          className="absolute top-8 md:top-12 left-6 md:left-12 z-20 flex items-center gap-3"
        >
          <span className="editorial-rule-light" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#EDE7D9]/80">
            DuPont · Metatank · 2026 Edition
          </span>
        </motion.div>

        {/* 右上：scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 1.4 }}
          style={{ opacity: heroOpacity }}
          className="hidden md:flex absolute top-12 right-12 vertical-rl text-[10px] tracking-[0.4em] uppercase text-[#EDE7D9]/70 items-center gap-3 z-20"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3 h-3" />
        </motion.div>

        {/* 主文字區塊 */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 w-full px-6 md:px-12 pb-16 md:pb-24"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
            {/* 左側：標題區 */}
            <div className="lg:flex-1 lg:min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.5 }}
                className="mb-6 flex items-center gap-4"
              >
                <span className="editorial-rule-light" />
                <span className="text-[11px] tracking-[0.4em] uppercase text-[#EDE7D9]/80">
                  DuPont Authorized · The Breathing Floor
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease, delay: 0.7 }}
                className="display-xl text-[clamp(2rem,4.6vw,4.4rem)] font-light text-white leading-[1.1]"
              >
                杜邦美達坦克
                <br />
                <span className="font-normal">碳化實木心地板</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 0.95 }}
                className="mt-6 text-[clamp(1.5rem,2.4vw,2.2rem)] italic font-extralight text-[#EDE7D9] tracking-tight"
              >
                — 會呼吸的地板。
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1.1 }}
                className="mt-8 max-w-xl text-base md:text-lg text-[#EDE7D9]/85 leading-relaxed font-light"
              >
                200°C 深層碳化，喚醒實木芯與生俱來的呼吸特性 ——
                <br className="hidden md:block" />
                主動調節濕氣、過濾異味，與家一起緩慢地生活。
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1.2 }}
                className="mt-10 flex flex-wrap gap-2.5 md:gap-3"
              >
                {heroClaims.map((c) => (
                  <li
                    key={c.label}
                    className="inline-flex items-center gap-2 border border-white/30 bg-white/5 backdrop-blur-sm px-3.5 py-2 text-[11px] md:text-xs tracking-[0.15em] text-white/90"
                  >
                    <c.icon className="h-3.5 w-3.5 text-[#C8A883]" />
                    {c.label}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease, delay: 1.3 }}
                className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8"
              >
                <Link href="/products">
                  <Button
                    size="lg"
                    className="h-14 px-10 text-sm tracking-[0.15em] bg-white text-[#3F2E1E] hover:bg-[#EDE7D9] rounded-none"
                  >
                    探索 8 款花色
                    <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="#manifesto"
                  className="text-sm tracking-[0.2em] uppercase text-white/90 link-reveal"
                >
                  了解工藝故事
                </Link>
              </motion.div>
            </div>

            {/* 右側：杜邦官方授權 Logo（去背 · 與標題並排） */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.8 }}
              className="shrink-0 self-start lg:self-center"
            >
              <Image
                src="/LOGO-AuthorrizedLicensee-2.webp"
                alt="DuPont Authorized Licensee 杜邦官方授權"
                width={1140}
                height={555}
                priority
                className="w-[70vw] sm:w-[55vw] lg:w-[43vw] max-w-[680px] h-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* 底部標記列 */}
        <div className="absolute bottom-0 inset-x-0 z-20 border-t border-white/15 backdrop-blur-sm bg-black/20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-white/70">
            <span>Est. DuPont Licensed · TW</span>
            <span className="hidden md:inline">
              Breathing · Anti-Odor · Anti-Pest · Anti-Microbial
            </span>
            <span>由專人諮詢報價</span>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 01 — Manifesto                                                   */}
      {/* ================================================================ */}
      <section
        id="manifesto"
        className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={staggerParent}
          className="grid md:grid-cols-12 gap-10 md:gap-16"
        >
          <motion.div variants={fadeUp} className="md:col-span-3">
            <div className="section-num">— 01 / MANIFESTO</div>
            <div className="mt-3 text-xs tracking-[0.3em] uppercase text-[#6B5B4F]">
              品牌宣言
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-9">
            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.1] tracking-tight">
              我們相信，地板不只是
              <br />
              一片材料 ——
              <span className="italic text-[#A67B5B]">
                而是承載日常生活的容器。
              </span>
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-12 max-w-4xl text-[#3F2E1E]/80 leading-loose font-light">
              <p>
                在台灣這個全年濕度動輒 80% 的島嶼，地板必須做的，遠不只是好看。它要能承受拖鞋的水漬、寵物的奔跑、孩子的玩具、家具的拖移；它要能與每一個家的氣候、光線、生活節奏對話。
              </p>
              <p>
                杜邦美達坦克碳化實木芯地板，將 200°C 高溫深層碳化的實木芯，與 AC6 商業級耐磨表面、IXPE 靜音背墊、5G 卡扣結構結合，創造一種兼具實木溫度與工程穩定性的全新材料。
                <span className="block mt-4 text-[#A67B5B] tracking-wider">
                  — 為台灣家屋而生的地板。
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 02 — Material Story (Dark Section)                               */}
      {/* ================================================================ */}
      <section className="relative bg-[#1C1612] text-[#EDE7D9] overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-40">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerParent}
            className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
          >
            <motion.div variants={fadeUp} className="lg:col-span-6 order-2 lg:order-1">
              <div className="section-num text-[#C8A883]">— 02 / MATERIAL</div>
              <div className="mt-3 eyebrow-dark">The Carbonization Process</div>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.8rem)] font-light leading-[1.05] tracking-tight">
                以 200°C 高溫，
                <br />
                <span className="italic text-[#C8A883]">封存實木的靈魂。</span>
              </h2>

              <div className="mt-10 space-y-8 text-[#EDE7D9]/75 font-light leading-loose max-w-xl">
                <p>
                  在無氧密閉爐中，木材以 200°C 高溫進行純物理碳化。木材纖維中的糖分與水分被徹底排除，毛細孔閉合，使木材獲得近乎陶瓷的尺寸穩定性 —— 不再因台灣的潮濕而吸水脹縮、發霉、生蟲。
                </p>
                <p>
                  碳化讓木材重新生成更深沉、更立體的紋理層次，並擁有實木罕見的「調濕」特性 —— 室內過濕時吸收水氣，乾燥時釋放，使地面始終維持舒適的觸感與氣息。
                </p>
              </div>

              {/* 工藝流程 */}
              <div className="mt-14 grid grid-cols-3 gap-px bg-[#2A2018] border border-[#2A2018]">
                {[
                  { step: "01", title: "選材", sub: "FSC 永續實木" },
                  { step: "02", title: "碳化", sub: "200°C × 48hrs" },
                  { step: "03", title: "封層", sub: "AC6 + IXPE" },
                ].map((s) => (
                  <div key={s.step} className="bg-[#1C1612] p-6 md:p-8">
                    <div className="text-[10px] tracking-[0.3em] text-[#C8A883]">
                      STEP {s.step}
                    </div>
                    <div className="mt-3 text-xl font-light">{s.title}</div>
                    <div className="mt-1 text-[11px] tracking-[0.2em] uppercase text-[#EDE7D9]/50">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="lg:col-span-6 order-1 lg:order-2 relative aspect-[3/4] bg-gradient-to-br from-[#26201A] to-[#15100C] overflow-hidden"
            >
              <Image
                src="/layer.png?v=3"
                alt="碳化實木芯地板五層結構分解圖"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* 五層說明 callouts —— 進入視窗後依序淡入 */}
              {layers.map((layer, i) => {
                const tops = [18, 32, 48, 65, 82];
                return (
                  <motion.div
                    key={layer.no}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.75, ease, delay: 0.5 + i * 0.28 }}
                    className="absolute right-3 md:right-5 z-10 -translate-y-1/2 flex items-center gap-2 md:gap-3"
                    style={{ top: `${tops[i]}%` }}
                  >
                    <span className="h-px w-6 md:w-12 bg-[#C8A883]" />
                    <div className="bg-[#0F0B07]/75 backdrop-blur-sm border border-[#C8A883]/30 px-3 py-2 md:px-4 md:py-3 max-w-[170px] md:max-w-[220px]">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[10px] font-mono tracking-[0.2em] text-[#C8A883]">
                          {layer.no}
                        </span>
                        <span className="text-sm md:text-base font-light text-[#EDE7D9]">
                          {layer.name}
                        </span>
                      </div>
                      <div className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#C8A883]/70 mt-0.5">
                        {layer.en}
                      </div>
                      <div className="text-[10px] md:text-[11px] text-[#EDE7D9]/75 mt-1 leading-relaxed">
                        {layer.detail}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="absolute inset-0 ring-1 ring-[#C8A883]/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-[10px] tracking-[0.3em] uppercase text-[#EDE7D9]/70">
                Fig. 02 — Layered Construction
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 03 — Six Pillars                                                 */}
      {/* ================================================================ */}
      <section id="features" className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerParent}
          className="grid md:grid-cols-12 gap-10 mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} className="md:col-span-4">
            <div className="section-num">— 03 / FIVE PROMISES</div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight">
              呼吸地板的
              <br />
              <span className="italic text-[#A67B5B]">五項主張。</span>
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="md:col-span-7 md:col-start-6 text-[#6B5B4F] font-light leading-loose max-w-xl"
          >
            一片真正會呼吸的地板，必須同時做到：自主調節濕氣、過濾室內異味、長期保持不變形，並天然抵禦蟲蛀與菌霉。這五項主張，皆經過第三方實驗室驗證。
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerParent}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-[#D4C9B8] border border-[#D4C9B8] bg-white"
        >
          {pillars.map((p) => (
            <motion.article
              key={p.no}
              variants={fadeUp}
              className="group relative p-8 md:p-10 hover:bg-[#FAF7F2] transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-12">
                <span className="section-num">— {p.no}</span>
                <p.icon className="h-5 w-5 text-[#A67B5B] opacity-60 group-hover:opacity-100 transition" />
              </div>

              <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B5B4F] mb-2">
                {p.en}
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-4">
                {p.title}
              </h3>
              <p className="text-sm text-[#6B5B4F] leading-relaxed font-light min-h-[5rem]">
                {p.desc}
              </p>

              <div className="mt-10 pt-6 border-t border-[#D4C9B8] flex items-baseline gap-2">
                <span className="text-3xl font-light text-[#A67B5B]">{p.metric}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B5B4F]">
                  {p.unit}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ================================================================ */}
      {/* 04 — Layered Construction                                        */}
      {/* ================================================================ */}
      <section className="relative bg-[#EDE7D9] border-y border-[#D4C9B8] overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={staggerParent}
            className="grid lg:grid-cols-12 gap-16"
          >
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <div className="section-num">— 04 / CONSTRUCTION</div>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight">
                解構
                <br />
                <span className="italic text-[#A67B5B]">5 層結構。</span>
              </h2>
              <p className="mt-8 text-[#6B5B4F] font-light leading-loose">
                從上至下，每一層都有明確的物理任務。整體厚度
                <span className="text-[#3F2E1E] font-medium"> 9.4 + 2mm</span>
                ，符合台灣住宅地板的標準收邊高度。
              </p>

              <div className="mt-10 inline-flex items-center gap-3">
                <span className="editorial-rule" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#A67B5B]">
                  Total thickness 11.4 mm
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-8">
              <ol className="space-y-px">
                {layers.map((layer, i) => (
                  <motion.li
                    key={layer.no}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                    className="group grid grid-cols-12 gap-4 md:gap-8 items-center bg-white border border-[#D4C9B8] px-6 md:px-8 py-6 md:py-7 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <div className="col-span-2 md:col-span-1 text-[#A67B5B] tracking-[0.2em] text-sm font-mono">
                      {layer.no}
                    </div>
                    <div className="col-span-10 md:col-span-4">
                      <div className="text-lg md:text-xl font-light">{layer.name}</div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[#6B5B4F] mt-1">
                        {layer.en}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-7 text-sm text-[#6B5B4F] font-light leading-relaxed">
                      {layer.detail}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 05 — Metrics Marquee                                             */}
      {/* ================================================================ */}
      <section className="relative bg-[#3F2E1E] text-[#EDE7D9] py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative">
          <div className="text-center mb-16">
            <div className="section-num text-[#C8A883]">— 05 / DATA</div>
            <h2 className="mt-4 text-[clamp(1.8rem,3.5vw,3rem)] font-light tracking-tight">
              以數據說話。
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#5A4530]/30 max-w-7xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                className="bg-[#3F2E1E] px-6 py-10 md:py-14 text-center"
              >
                <div className="text-3xl md:text-5xl font-light text-[#EDE7D9] tracking-tight">
                  {m.value}
                </div>
                <div className="mt-4 text-[10px] tracking-[0.3em] uppercase text-[#C8A883]">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 06 — The Collection (Product Grid)                               */}
      {/* ================================================================ */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerParent}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6"
        >
          <motion.div variants={fadeUp}>
            <div className="section-num">— 06 / COLLECTION</div>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] tracking-tight">
              2026
              <br />
              <span className="italic text-[#A67B5B]">花色全集。</span>
            </h2>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="md:max-w-sm text-[#6B5B4F] font-light leading-loose"
          >
            從米白、暖橡、煙燻到深胡桃 —— 八種色階對應八種空間性格。每一片，都以同樣的工藝標準封存。
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: (i % 4) * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-[#3F2E1E] link-reveal">
            查看完整產品線
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 07 — Real Spaces (Bento Gallery)                                 */}
      {/* ================================================================ */}
      <section className="relative bg-[#FAF7F2] border-y border-[#D4C9B8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerParent}
            className="grid md:grid-cols-12 gap-10 mb-16"
          >
            <motion.div variants={fadeUp} className="md:col-span-5">
              <div className="section-num">— 07 / SPACES</div>
              <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight">
                落地後的
                <br />
                <span className="italic text-[#A67B5B]">真實空間。</span>
              </h2>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="md:col-span-6 md:col-start-7 text-[#6B5B4F] font-light leading-loose"
            >
              地板的價值，最終在被居住的空間裡顯現。以下案例皆為台灣家庭實際安裝後的完成樣貌 —— 沒有修圖、沒有打燈，只有日常的光線。
            </motion.p>
          </motion.div>

          {/* Bento Grid - 大小不一的編輯式排版 */}
          <div className="grid grid-cols-12 grid-rows-[repeat(8,80px)] md:grid-rows-[repeat(6,120px)] gap-3 md:gap-5">
            <BentoTile
              src="/case1.jpg"
              tag="台北信義"
              title="36 坪 現代北歐宅"
              className="col-span-12 md:col-span-7 row-span-3 md:row-span-4"
            />
            <BentoTile
              src="/case2.jpg"
              tag="新北板橋"
              title="28 坪 親子溫馨宅"
              className="col-span-6 md:col-span-5 row-span-2"
            />
            <BentoTile
              src="/case3.jpg"
              tag="台中西屯"
              title="45 坪 留白美學"
              className="col-span-6 md:col-span-5 row-span-2"
            />
            <BentoTile
              src="/case4.jpg"
              tag="高雄鼓山"
              title="32 坪 海景度假宅"
              className="col-span-7 md:col-span-7 row-span-3 md:row-span-2"
            />
            <BentoTile
              src="/case5.jpg"
              tag="桃園中壢"
              title="22 坪 輕奢公寓"
              className="col-span-5 md:col-span-5 row-span-3 md:row-span-2"
            />
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 08 — Testimonials                                                */}
      {/* ================================================================ */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerParent}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <div className="section-num">— 08 / VOICES</div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight max-w-3xl">
              來自每一個
              <span className="italic text-[#A67B5B]">家的回響。</span>
            </h2>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-[#D4C9B8] border border-[#D4C9B8]">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="bg-white p-10 md:p-12 flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl text-[#A67B5B]/30 leading-none font-serif">“</div>
                <blockquote className="mt-4 text-lg font-light leading-relaxed text-[#3F2E1E]">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="mt-10 pt-6 border-t border-[#D4C9B8]">
                <div className="font-medium tracking-tight">{t.name}</div>
                <div className="mt-1 text-[10px] tracking-[0.25em] uppercase text-[#6B5B4F]">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 09 — Certifications Marquee                                      */}
      {/* ================================================================ */}
      <section className="relative bg-[#EDE7D9] border-y border-[#D4C9B8] py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center gap-4 mb-10">
            <span className="editorial-rule" />
            <span className="eyebrow">— 09 / Certifications</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#D4C9B8] border border-[#D4C9B8]">
            {certifications.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                className="bg-[#FAF7F2] px-6 py-8 text-center"
              >
                <div className="text-2xl font-light tracking-tight text-[#3F2E1E]">
                  {c.code}
                </div>
                <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-[#6B5B4F]">
                  {c.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 10 — FAQ                                                          */}
      {/* ================================================================ */}
      <section className="relative max-w-5xl mx-auto px-6 md:px-12 py-28 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerParent}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <div className="section-num">— 10 / FAQ</div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] tracking-tight">
              還有
              <span className="italic text-[#A67B5B]">疑問？</span>
            </h2>
          </motion.div>
        </motion.div>

        <div className="border-t border-[#D4C9B8]">
          {faqs.map(([q, a], i) => (
            <details key={i} className="group border-b border-[#D4C9B8]">
              <summary className="cursor-pointer list-none flex items-start justify-between py-7 md:py-8 gap-6">
                <div className="flex items-start gap-6">
                  <span className="text-xs tracking-[0.2em] text-[#A67B5B] font-mono mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg md:text-xl font-light text-[#3F2E1E] group-hover:text-[#A67B5B] transition-colors">
                    {q}
                  </span>
                </div>
                <Plus className="h-5 w-5 text-[#A67B5B] mt-1 shrink-0 transition-transform duration-500 group-open:rotate-45" />
              </summary>
              <div className="pb-8 md:pb-10 pl-0 md:pl-14 pr-10 text-[#6B5B4F] font-light leading-loose">
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* 11 — Final CTA (Cinematic Closer)                                */}
      {/* ================================================================ */}
      <section className="relative h-[80svh] min-h-[560px] flex items-center justify-center overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&q=90"
          alt="極簡空間中的碳化實木地板"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1612]/80 via-[#1C1612]/70 to-[#1C1612]/90" />
        <div className="absolute inset-0 grain" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="editorial-rule-light" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#EDE7D9]/80">
              — 11 / Begin
            </span>
            <span className="editorial-rule-light" />
          </div>

          <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight">
            為下一個十年的家，
            <br />
            <span className="italic text-[#C8A883]">選一片好地板。</span>
          </h2>

          <p className="mt-10 text-base md:text-lg text-[#EDE7D9]/85 font-light leading-relaxed max-w-xl mx-auto">
            留下需求，杜邦美達坦克授權專員將於 24 小時內主動聯絡，
            <br className="hidden md:block" />
            為您提供現場丈量與精準報價。
          </p>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/products">
              <Button
                size="lg"
                className="h-14 px-12 text-sm tracking-[0.15em] bg-white text-[#1C1612] hover:bg-[#EDE7D9] rounded-none"
              >
                立即選購花色
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/blog"
              className="text-sm tracking-[0.2em] uppercase text-white/90 link-reveal"
            >
              閱讀專業知識
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Bento Tile 元件                                                     */
/* ------------------------------------------------------------------ */
function BentoTile({
  src,
  tag,
  title,
  className = "",
}: {
  src: string;
  tag: string;
  title: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease }}
      className={`group relative overflow-hidden bg-[#EDE7D9] ${className}`}
    >
      <Image
        src={src}
        alt={`${tag} ${title} - 杜邦美達坦克地板實景`}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
      <div className="absolute inset-0 ring-1 ring-white/10" />

      <div className="absolute top-5 left-5 flex items-center gap-2">
        <span className="h-px w-6 bg-[#EDE7D9]/80" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#EDE7D9]/90">
          {tag}
        </span>
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <h3 className="text-lg md:text-2xl font-light text-white tracking-tight leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}

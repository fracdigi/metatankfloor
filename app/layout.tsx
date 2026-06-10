import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSheet from "@/components/CartSheet";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  // 解決 localhost:3000 / 3001 警告
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "杜邦美達坦克 碳化實木芯地板｜超耐磨 防水 無醛 綠建材地板 推薦",
    template: "%s | 杜邦美達坦克 碳化實木芯地板",
  },
  description: "2026 台灣最強綠建材地板推薦。杜邦美達坦克高壓飾面碳化實木芯地板，AC6超耐磨（25500轉）、200°C深層碳化、實木調濕+防水+無醛，獲台灣綠建材標章與EPA NAF認證。適合小孩寵物家庭，卡扣式安裝快速。",
  keywords: [
    "地板", "超耐磨地板", "SPC地板", "塑膠地板", "木地板", "實木地板",
    "碳化實木芯地板", "杜邦地板", "杜邦美達坦克", "無醛地板", "卡扣式地板",
    "AC6耐磨", "綠建材標章", "綠建材地板", "防水地板", "抗菌地板",
    "小孩寵物地板", "台灣地板推薦", "居家地板", "高壓飾面地板"
  ],
  authors: [{ name: "杜邦美達坦克 授權經銷商" }],
  openGraph: {
    title: "杜邦美達坦克 碳化實木芯地板｜超耐磨 防水 無醛 綠建材地板 推薦",
    description: "2026 台灣最強綠建材地板。AC6超耐磨、深層碳化實木芯、實木調濕+防水+無醛，獲雙認證。適合潮濕氣候與小孩寵物家庭。",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "zh_TW",
    type: "website",
  },
  alternates: {
    canonical: "https://metatankfloor.pynstone.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F0E8] text-[#3F2E1E]">
        <Navbar />
        {children}
        <Footer />
        <CartSheet />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}

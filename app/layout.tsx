import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_TC } from "next/font/google";
import Script from "next/script";
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

// Google Analytics 4（可用環境變數 NEXT_PUBLIC_GA_ID 覆寫）
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-7RVTNQRNRS";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://metatank.tw";
const SITE_NAME = "杜邦美達坦克 碳化實木芯地板";
const DEFAULT_TITLE =
  "杜邦美達坦克 碳化實木芯地板｜超耐磨 防水 無醛 綠建材地板 推薦";
const DEFAULT_DESCRIPTION =
  "2026 台灣最強綠建材地板推薦。杜邦美達坦克高壓飾面碳化實木芯地板，AC6超耐磨（25500轉）、200°C深層碳化、實木調濕+防水+無醛，獲台灣綠建材標章與EPA NAF認證。適合小孩寵物家庭，卡扣式安裝快速。";
// TODO: 上傳 1200x630 專用 og-image.jpg 到 /public 再改回 /og-image.jpg
const OG_IMAGE = "/case1.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "地板", "超耐磨地板", "SPC地板", "塑膠地板", "木地板", "實木地板",
    "碳化實木芯地板", "杜邦地板", "杜邦美達坦克", "無醛地板", "卡扣式地板",
    "AC6耐磨", "綠建材標章", "綠建材地板", "防水地板", "抗菌地板",
    "小孩寵物地板", "台灣地板推薦", "居家地板", "高壓飾面地板"
  ],
  authors: [{ name: "杜邦美達坦克 授權經銷商" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "2026 台灣最強綠建材地板。AC6超耐磨、深層碳化實木芯、實木調濕+防水+無醛，獲雙認證。適合潮濕氣候與小孩寵物家庭。",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "2026 台灣最強綠建材地板。AC6超耐磨、深層碳化實木芯、實木調濕+防水+無醛。",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/LOGO-AuthorrizedLicensee-2.webp`,
  description: DEFAULT_DESCRIPTION,
  areaServed: "TW",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "zh-TW",
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
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <CartSheet />
        <Toaster position="top-center" richColors closeButton />
      </body>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
    </html>
  );
}

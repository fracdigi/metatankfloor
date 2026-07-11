import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { products, getProductBySlug } from "@/lib/products";
import { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://metatank.tw";

// Generate static pages for all products (excellent for SEO)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "找不到產品" };
  }

  const url = `${SITE_URL}/product/${product.slug}`;
  return {
    title: `${product.name} | 杜邦美達坦克 碳化實木芯地板`,
    description: `${product.name} - ${product.description} AC6超耐磨、200°C深層碳化實木芯、綠建材標章，由專人諮詢報價。適合小孩寵物家庭。`,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} - 杜邦美達坦克碳化實木芯地板`,
      description: product.description,
      url,
      type: "website",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${SITE_URL}/product/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.model,
    mpn: product.model,
    brand: { "@type": "Brand", name: "DuPont MetaTank" },
    description: product.description,
    image: product.image,
    url: productUrl,
    additionalProperty: [
      { "@type": "PropertyValue", name: "尺寸", value: product.size },
      { "@type": "PropertyValue", name: "厚度", value: product.thickness },
      { "@type": "PropertyValue", name: "耐磨層", value: product.wearLayer },
      { "@type": "PropertyValue", name: "芯板技術", value: product.core },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "TWD",
      price: product.pricePerPing,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: product.pricePerPing,
        priceCurrency: "TWD",
        unitText: "PING",
      },
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: productUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "產品列表",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Script
        id={`product-jsonld-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id={`breadcrumb-jsonld-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="text-sm mb-8 text-[#6B5B4F]">
        <Link href="/products" className="hover:text-[#A67B5B]">產品列表</Link> / {product.name}
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: Image Gallery */}
        <div>
          <div className="product-image-container mb-4 border border-[#D4C9B8]">
            <Image
              src={product.image}
              alt={`${product.name} 地板表面紋理 - 杜邦美達坦克碳化實木芯地板`}
              fill
              className="product-image object-cover"
              priority
            />
          </div>
          <div className="text-xs text-center text-[#6B5B4F]">
            實際花色以現場樣品為準，圖片僅供參考
          </div>
        </div>

        {/* Right: Info */}
        <div className="pt-2">
          <div className="text-[#A67B5B] tracking-[1.5px] text-xs mb-1">{product.model}</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">{product.name}</h1>
          
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="price-tag">由專人諮詢報價</span>
            <span className="text-xs text-[#6B5B4F]">含丈量 · 安裝建議 · 樣品索取</span>
          </div>

          <p className="text-lg text-[#6B5B4F] leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Add to Cart Button (Client Component) */}
          <AddToCartButton product={product} />

          {/* Specifications */}
          <div className="mt-10">
            <h3 className="font-semibold mb-4 text-lg">產品規格</h3>
            <dl className="grid grid-cols-1 gap-y-3 text-sm border-t border-[#D4C9B8] pt-4">
              <div className="flex justify-between py-2 border-b border-[#EDE7D9]">
                <dt className="text-[#6B5B4F]">尺寸</dt>
                <dd className="font-medium">{product.size}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#EDE7D9]">
                <dt className="text-[#6B5B4F]">厚度</dt>
                <dd className="font-medium">{product.thickness}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#EDE7D9]">
                <dt className="text-[#6B5B4F]">耐磨層</dt>
                <dd className="font-medium">{product.wearLayer}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-[#EDE7D9]">
                <dt className="text-[#6B5B4F]">芯板技術</dt>
                <dd className="font-medium">{product.core}</dd>
              </div>
            </dl>
          </div>

          {/* Features */}
          <div className="mt-10">
            <h3 className="font-semibold mb-4 text-lg">產品特色</h3>
            <ul className="space-y-2.5 text-sm">
              {product.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-[#4A7043] flex-shrink-0" />
                  <span className="text-[#3F2E1E]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-xs text-[#6B5B4F] border-t pt-6">
            所有產品皆享有杜邦官方 500 萬產品責任險 + 台灣綠建材標章 + EPA NAF 無醛認證
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="mt-16 border-t pt-10 text-center text-sm text-[#6B5B4F]">
        需要大量採購或工程報價？請直接聯絡我們，專人為您服務。
      </div>
    </div>
  );
}

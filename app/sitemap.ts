import { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { knowledgeArticles } from "@/lib/knowledge-articles";
import { blogArticles } from "@/lib/blog-articles";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://metatank.tw";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/knowledge", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const knowledgeRoutes: MetadataRoute.Sitemap = knowledgeArticles.map((a) => ({
    url: `${SITE_URL}/knowledge/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogArticles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...knowledgeRoutes, ...blogRoutes];
}

import { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dupontmetatank.com";

  const staticRoutes = [
    "",
    "/products",
    "/blog",
    "/cart",
    "/checkout",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Blog slugs (we will expand later)
  const blogSlugs = [
    "carbonized-vs-solid-wood",
    "waterproof-test",
    "ac6-vs-ac4-vs-spc",
    "kids-pets-floor",
    "2026-price-list",
    "green-building-cert",
    "click-lock-install",
    "humidity-control",
    "spc-vs-carbonized-wood",
    "why-authorized-dealer",
    "mold-insect-solution",
    "2026-design-trend",
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

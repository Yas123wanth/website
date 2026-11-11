import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { prisma } from "@/lib/prisma";

// Regenerate hourly so product URLs appear once the database is reachable,
// even if it was unavailable at build time.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: { slug: string; updatedAt: Date }[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
  } catch (err) {
    console.error("sitemap: could not load products", err);
  }

  const staticRoutes = [
    "",
    "/designs",
    "/custom-order",
    "/pricing",
    "/about",
    "/contact",
    "/legal/disclaimer",
    "/legal/privacy",
    "/legal/terms",
    "/legal/shipping",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}/designs/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}

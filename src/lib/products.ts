import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function searchProducts(params: {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 24;
  const skip = (page - 1) * pageSize;

  const where: Prisma.ProductWhereInput = {
    isActive: true,
    ...(params.q
      ? {
          OR: [
            { sku: { contains: params.q } },
            { title: { contains: params.q } },
            { keywords: { contains: params.q } },
          ],
        }
      : {}),
    ...(params.category
      ? {
          categories: {
            some: { category: { slug: params.category } },
          },
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ]);

  return { items, total, page, pageSize };
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      formats: { orderBy: { price: "asc" } },
      categories: { include: { category: true } },
    },
  });
}

import { NextResponse } from "next/server";
import { FormatType } from "@prisma/client";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const defaultFormats: FormatType[] = [
  FormatType.DST_SMALL,
  FormatType.DST_LARGE,
  FormatType.PES,
  FormatType.JEF,
];

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const {
    sku,
    title,
    slug,
    description,
    imageUrl,
    basePrice,
    mrpPrice,
    isNew,
    isActive,
    keywords,
    categoryIds,
  } = body;

  const product = await prisma.product.create({
    data: {
      sku,
      title,
      slug,
      description,
      imageUrl,
      basePrice,
      mrpPrice,
      isNew: !!isNew,
      isActive: isActive !== false,
      keywords,
      categories: {
        create: (categoryIds as string[]).map((categoryId: string) => ({
          categoryId,
        })),
      },
      formats: {
        create: defaultFormats.map((format) => ({
          format,
          label: format.replace("_", " "),
          price: basePrice,
          fileKey: `designs/${sku}/${format}.zip`,
        })),
      },
    },
  });

  return NextResponse.json({ id: product.id });
}

export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await request.json();
  const { id, categoryIds, ...data } = body;

  await prisma.productCategory.deleteMany({ where: { productId: id } });
  await prisma.product.update({
    where: { id },
    data: {
      sku: data.sku,
      title: data.title,
      slug: data.slug,
      description: data.description,
      imageUrl: data.imageUrl,
      basePrice: data.basePrice,
      mrpPrice: data.mrpPrice,
      isNew: !!data.isNew,
      isActive: data.isActive !== false,
      keywords: data.keywords,
      categories: {
        create: (categoryIds as string[]).map((categoryId: string) => ({
          categoryId,
        })),
      },
    },
  });

  return NextResponse.json({ ok: true });
}

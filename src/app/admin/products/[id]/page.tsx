import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import { FormatUploadList } from "@/components/admin/format-upload";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { categories: true, formats: true },
  });
  if (!product) notFound();
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Edit {product.sku}</h1>
      <ProductForm
        categories={categories}
        product={{
          ...product,
          categoryIds: product.categories.map((c) => c.categoryId),
        }}
      />
      <FormatUploadList formats={product.formats} />
    </div>
  );
}

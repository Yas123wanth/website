import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { formatInr } from "@/lib/format";
import { AddToCartForm } from "@/components/products/add-to-cart-form";
import { ProductJsonLd } from "@/components/products/product-json-ld";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Design not found" };
  return {
    title: `${product.sku} — ${product.title}`,
    description: product.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <ProductJsonLd
        name={product.title}
        sku={product.sku}
        description={product.description}
        imageUrl={product.imageUrl}
        pricePaise={product.basePrice}
      />
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/designs" className="hover:text-burgundy">Designs</Link>
        <span className="mx-2">/</span>
        <span>{product.sku}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 rounded bg-cyan-500 px-2 py-1 text-xs font-bold text-white">
              New
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-burgundy">{product.sku}</p>
          <h1 className="mt-1 font-serif text-3xl text-charcoal">{product.title}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold">{formatInr(product.basePrice)}</span>
            {product.mrpPrice && product.mrpPrice > product.basePrice && (
              <span className="text-lg text-red-500 line-through">
                {formatInr(product.mrpPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.categories.map(({ category }) => (
              <Link
                key={category.id}
                href={`/designs?category=${category.slug}`}
                className="rounded-full bg-burgundy/10 px-3 py-1 text-xs font-medium text-burgundy"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <AddToCartForm
            productId={product.id}
            sku={product.sku}
            title={product.title}
            imageUrl={product.imageUrl}
            formats={product.formats.map((f) => ({
              id: f.id,
              label: f.label,
              format: f.format,
              price: f.price,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

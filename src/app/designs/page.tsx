import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { searchProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

type SearchParams = Promise<{ q?: string; category?: string; page?: string }>;

export const metadata = {
  title: "Embroidery Designs — DST, PES, JEF",
  description: "Browse and buy machine embroidery designs with instant download.",
};

export default async function DesignsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? "1") || 1;
  const { items, total, pageSize } = await searchProducts({
    q: sp.q,
    category: sp.category,
    page,
  });
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-charcoal">Embroidery Designs</h1>
        <p className="mt-1 text-gray-600">
          {total} designs — DST, PES, JEF and more
        </p>
      </div>

      <form className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          name="q"
          defaultValue={sp.q ?? ""}
          placeholder="Search design no. or keyword (e.g. D10280, peacock)"
          className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 focus:border-burgundy focus:outline-none focus:ring-2 focus:ring-burgundy/20"
        />
        <button
          type="submit"
          className="rounded-lg bg-burgundy px-6 py-2.5 font-medium text-white hover:bg-burgundy-dark"
        >
          Search
        </button>
      </form>

      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        <Link
          href="/designs"
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
            !sp.category
              ? "bg-burgundy text-white"
              : "bg-white text-charcoal shadow-sm hover:bg-gray-50"
          }`}
        >
          All Designs
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/designs?category=${cat.slug}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ""}`}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
              sp.category === cat.slug
                ? "bg-burgundy text-white"
                : "bg-white text-charcoal shadow-sm hover:bg-gray-50"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} showWishlist />
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-12 text-center text-gray-500">No designs found.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 10)
            .map((p) => (
              <Link
                key={p}
                href={`/designs?page=${p}${sp.category ? `&category=${sp.category}` : ""}${sp.q ? `&q=${encodeURIComponent(sp.q)}` : ""}`}
                className={`rounded-lg px-3 py-1 text-sm ${
                  p === page ? "bg-burgundy text-white" : "bg-white shadow hover:bg-gray-50"
                }`}
              >
                {p}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

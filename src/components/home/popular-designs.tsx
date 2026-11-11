import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/products/product-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export function PopularDesigns({ products }: { products: ProductCardData[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
          Popular Embroidery <span className="text-shimmer">Designs</span>
        </h2>
        <Link
          href="/designs"
          className="group inline-flex items-center gap-1 rounded-lg border border-burgundy px-4 py-2 text-sm font-medium text-burgundy transition hover:bg-burgundy hover:text-white"
        >
          View All Designs
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </Reveal>
      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6" stagger={0.06}>
        {products.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

type Category = {
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <Reveal className="mb-10 text-center">
        <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
          Explore Design <span className="text-shimmer">Categories</span>
        </h2>
        <p className="mt-2 text-gray-600">
          Find the perfect pattern for your next project
        </p>
      </Reveal>
      <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <StaggerItem key={cat.slug}>
            <Link
              href={cat.slug === "custom" ? "/custom-order" : `/designs?category=${cat.slug}`}
              className="card-glow-border group block overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.imageUrl ?? "/placeholder.jpg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="flex items-start justify-between gap-2 p-4">
                <div>
                  <h3 className="font-semibold text-charcoal">{cat.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy transition duration-300 group-hover:rotate-45 group-hover:bg-burgundy group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

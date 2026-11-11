import Image from "next/image";
import Link from "next/link";
import { formatInr } from "@/lib/format";
import { Heart } from "lucide-react";

export type ProductCardData = {
  id: string;
  sku: string;
  title: string;
  slug: string;
  imageUrl: string;
  basePrice: number;
  mrpPrice: number | null;
  isNew: boolean;
};

export function ProductCard({
  product,
  showWishlist,
}: {
  product: ProductCardData;
  showWishlist?: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-1 hover:ring-gold/30">
      <Link href={`/designs/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
          {product.isNew && (
            <span className="absolute left-2 top-2 rounded bg-cyan-500 px-2 py-0.5 text-xs font-bold text-white">
              New
            </span>
          )}
        </div>
        <div className="p-3">
          <p className="text-xs font-medium text-burgundy">{product.sku}</p>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-charcoal">
            {product.title}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-bold text-charcoal">
              {formatInr(product.basePrice)}
            </span>
            {product.mrpPrice && product.mrpPrice > product.basePrice && (
              <span className="text-sm text-red-500 line-through">
                {formatInr(product.mrpPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      {showWishlist && (
        <form action="/api/wishlist" method="post" className="px-3 pb-3">
          <input type="hidden" name="productId" value={product.id} />
          <button
            type="submit"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-burgundy"
          >
            <Heart className="h-4 w-4" />
            Wishlist
          </button>
        </form>
      )}
    </article>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";

export const metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/wishlist");

  const items = await prisma.wishlistItem.findMany({
    where: { userId: session.user.id },
    include: { product: true },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <Link href="/account" className="text-sm text-burgundy hover:underline">
        ← Account
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-charcoal">Wishlist</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-gray-600">No saved designs yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map(({ product }) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

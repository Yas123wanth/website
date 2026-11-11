import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { CART_COOKIE, cartTotal, parseCart } from "@/lib/cart";
import { formatInr as formatPrice } from "@/lib/format";
import { RemoveFromCartButton } from "@/components/cart/remove-button";

export const metadata = { title: "Cart" };

export default async function CartPage() {
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  const total = cartTotal(cart);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-3xl text-charcoal">Your Cart</h1>
      {cart.items.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link
            href="/designs"
            className="mt-4 inline-block rounded-lg bg-burgundy px-6 py-2 text-white"
          >
            Browse Designs
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {cart.items.map((line) => (
              <li
                key={line.productFormatId}
                className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={line.imageUrl}
                    alt={line.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-burgundy">{line.sku}</p>
                  <p className="font-semibold">{line.title}</p>
                  <p className="text-sm text-gray-500">{line.formatLabel}</p>
                  <p className="mt-1 font-bold">{formatPrice(line.unitPrice)}</p>
                </div>
                <RemoveFromCartButton productFormatId={line.productFormatId} />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-end gap-4 border-t pt-6">
            <p className="text-xl font-bold">
              Total: {formatPrice(total)}
            </p>
            <Link
              href="/checkout"
              className="rounded-lg bg-burgundy px-8 py-3 font-semibold text-white hover:bg-burgundy-dark"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

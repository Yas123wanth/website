import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { CART_COOKIE, cartTotal, parseCart } from "@/lib/cart";
import { formatInr } from "@/lib/format";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  if (cart.items.length === 0) {
    redirect("/cart");
  }

  const total = cartTotal(cart);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-3xl text-charcoal">Checkout</h1>
      <p className="mt-2 text-gray-600">
        Signed in as {session.user.email}
      </p>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold">
          Order total: {formatInr(total)}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {cart.items.length} item(s) — secure payment via Razorpay
        </p>
        <CheckoutClient totalAmount={total} />
      </div>
    </div>
  );
}

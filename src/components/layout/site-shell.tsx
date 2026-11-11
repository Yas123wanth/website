import { cookies } from "next/headers";
import { ChromeShell } from "@/components/layout/chrome-shell";
import { CART_COOKIE, cartItemCount, parseCart } from "@/lib/cart";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  const count = cartItemCount(cart);

  return <ChromeShell cartCount={count}>{children}</ChromeShell>;
}

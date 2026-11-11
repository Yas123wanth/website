import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CART_COOKIE,
  parseCart,
  serializeCart,
  type CartLine,
} from "@/lib/cart";

export async function GET() {
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CartLine;
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);

  const existing = cart.items.findIndex(
    (i) =>
      i.productId === body.productId &&
      i.productFormatId === body.productFormatId,
  );
  if (existing >= 0) {
    cart.items[existing].quantity += body.quantity ?? 1;
  } else {
    cart.items.push({ ...body, quantity: body.quantity ?? 1 });
  }

  const response = NextResponse.json({ ok: true, cart });
  response.cookies.set(CART_COOKIE, serializeCart(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}

export async function DELETE(request: Request) {
  const { productFormatId } = (await request.json()) as {
    productFormatId: string;
  };
  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  cart.items = cart.items.filter((i) => i.productFormatId !== productFormatId);

  const response = NextResponse.json({ ok: true, cart });
  response.cookies.set(CART_COOKIE, serializeCart(cart), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}

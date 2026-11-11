import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { fulfillPaidOrder } from "@/lib/orders";
import { cookies } from "next/headers";
import { CART_COOKIE, serializeCart } from "@/lib/cart";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const valid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  );
  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: {
      razorpayOrderId: razorpay_order_id,
      userId: session.user.id,
    },
  });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  await fulfillPaidOrder(order.id, razorpay_payment_id);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(CART_COOKIE, serializeCart({ items: [] }), {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}

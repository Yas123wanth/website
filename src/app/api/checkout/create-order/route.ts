import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { CART_COOKIE, parseCart, serializeCart } from "@/lib/cart";
import { createPendingOrder, fulfillPaidOrder } from "@/lib/orders";
import { getRazorpay } from "@/lib/razorpay";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const cart = parseCart(cookieStore.get(CART_COOKIE)?.value);
  if (cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const order = await createPendingOrder(session.user.id, cart);
  const razorpay = getRazorpay();

  if (!razorpay) {
    await fulfillPaidOrder(order.id, "mock_dev_payment");
    const response = NextResponse.json({ mockPaid: true, orderId: order.id });
    response.cookies.set(CART_COOKIE, serializeCart({ items: [] }), {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  const rpOrder = await razorpay.orders.create({
    amount: order.totalAmount,
    currency: "INR",
    receipt: order.id,
  });

  await import("@/lib/prisma").then(({ prisma }) =>
    prisma.order.update({
      where: { id: order.id },
      data: { razorpayOrderId: rpOrder.id },
    }),
  );

  return NextResponse.json({
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpayOrderId: rpOrder.id,
    amount: order.totalAmount,
    orderId: order.id,
  });
}

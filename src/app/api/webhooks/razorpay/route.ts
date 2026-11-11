import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { fulfillPaidOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body) as {
    event: string;
    payload: {
      payment?: { entity: { id: string; order_id: string } };
    };
  };

  if (event.event === "payment.captured") {
    const payment = event.payload.payment?.entity;
    if (payment) {
      const order = await prisma.order.findFirst({
        where: { razorpayOrderId: payment.order_id },
      });
      if (order && order.status !== "PAID") {
        await fulfillPaidOrder(order.id, payment.id);
      }
    }
  }

  return NextResponse.json({ received: true });
}

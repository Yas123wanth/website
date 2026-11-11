import { prisma } from "@/lib/prisma";
import type { CartState } from "@/lib/cart";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function createPendingOrder(userId: string, cart: CartState) {
  const totalAmount = cart.items.reduce(
    (s, i) => s + i.unitPrice * i.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      userId,
      status: OrderStatus.PENDING,
      totalAmount,
      items: {
        create: cart.items.map((line) => ({
          productId: line.productId,
          productFormatId: line.productFormatId,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        })),
      },
      payment: {
        create: {
          status: PaymentStatus.CREATED,
          amount: totalAmount,
        },
      },
    },
    include: { items: true, payment: true },
  });

  return order;
}

export async function fulfillPaidOrder(orderId: string, razorpayPaymentId?: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, user: true },
  });
  if (!order) throw new Error("Order not found");

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.PAID },
    });
    await tx.payment.update({
      where: { orderId },
      data: {
        status: PaymentStatus.CAPTURED,
        razorpayPaymentId,
      },
    });
    for (const item of order.items) {
      await tx.downloadGrant.upsert({
        where: {
          userId_orderItemId_productFormatId: {
            userId: order.userId,
            orderItemId: item.id,
            productFormatId: item.productFormatId,
          },
        },
        update: {},
        create: {
          userId: order.userId,
          orderItemId: item.id,
          productFormatId: item.productFormatId,
          maxDownloads: 10,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        },
      });
    }
  });
}

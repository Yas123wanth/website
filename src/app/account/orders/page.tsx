import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatInr } from "@/lib/format";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <Link href="/account" className="text-sm text-burgundy hover:underline">
        ← Account
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-charcoal">Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-8 text-gray-600">No orders yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {order.createdAt.toLocaleDateString("en-IN")}
                </span>
                <span
                  className={`text-sm font-medium ${
                    order.status === "PAID" ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="mt-2 font-bold">{formatInr(order.totalAmount)}</p>
              <ul className="mt-2 text-sm text-gray-600">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.sku} — {item.product.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

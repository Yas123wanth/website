import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const [products, orders, inquiries] = await Promise.all([
    prisma.product.count(),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.customInquiry.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active products", value: products },
          { label: "Paid orders", value: orders },
          { label: "New inquiries", value: inquiries },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-burgundy">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatInr } from "@/lib/format";

export const metadata = { title: "Admin — Products" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sku: "desc" },
    include: { formats: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-charcoal">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-white"
        >
          Add product
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-3">SKU</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Formats</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="p-3 font-mono text-burgundy">{p.sku}</td>
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="p-3">{formatInr(p.basePrice)}</td>
                <td className="p-3">{p.formats.length}</td>
                <td className="p-3">{p.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin — Categories" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { products: true },
  });

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Categories</h1>
      <p className="mt-2 text-sm text-gray-600">
        Categories are seeded at setup. Edit via database or extend this UI later.
      </p>
      <ul className="mt-6 space-y-2">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex justify-between rounded-lg bg-white px-4 py-3 shadow-sm"
          >
            <span className="font-medium">{c.name}</span>
            <span className="text-sm text-gray-500">
              {c.products.length} products · /{c.slug}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

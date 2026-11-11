import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/inquiries", label: "Inquiries" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-charcoal text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 lg:px-6">
          <Link href="/admin" className="font-serif text-lg text-gold">
            SLT Admin
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="hover:text-gold">
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="ml-auto text-sm text-gray-400 hover:text-white">
            View site
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">{children}</div>
    </div>
  );
}

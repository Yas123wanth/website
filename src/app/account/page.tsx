import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOutAction } from "@/app/actions/auth";

export const metadata = { title: "My Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  const links = [
    { href: "/account/orders", label: "Orders" },
    { href: "/account/downloads", label: "Downloads" },
    { href: "/account/wishlist", label: "Wishlist" },
  ];

  if (session.user.role === "ADMIN") {
    links.push({ href: "/admin", label: "Admin Panel" });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-6">
      <h1 className="font-serif text-3xl text-charcoal">My Account</h1>
      <p className="mt-2 text-gray-600">
        {session.user.name ?? session.user.email}
      </p>
      <ul className="mt-8 space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="block rounded-xl bg-white px-5 py-4 font-medium shadow-sm hover:border-burgundy hover:ring-2 hover:ring-burgundy/20"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <form action={signOutAction} className="mt-8">
        <button
          type="submit"
          className="text-sm text-gray-500 hover:text-burgundy"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

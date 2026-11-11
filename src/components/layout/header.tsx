"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/designs",
    label: "Designs",
    children: [
      { href: "/designs?category=saree", label: "Saree" },
      { href: "/designs?category=blouse", label: "Blouse" },
      { href: "/designs?category=kurti", label: "Kurti" },
      { href: "/designs?category=logo", label: "Logo" },
    ],
  },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [designsOpen, setDesignsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/20 bg-charcoal/90 shadow-xl backdrop-blur-md"
          : "bg-charcoal shadow-lg"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-6">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold text-sm font-bold text-gold">
            SLT
          </span>
          <span className="hidden font-serif text-lg leading-tight sm:block">
            <span className="text-gold">SLT</span> Embroidery
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setDesignsOpen(true)}
                onMouseLeave={() => setDesignsOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition hover:text-gold ${
                    pathname.startsWith("/designs") ? "text-gold" : ""
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" />
                </Link>
                {designsOpen && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-[160px] rounded-lg border border-white/10 bg-charcoal py-2 shadow-xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition hover:text-gold ${
                  pathname === link.href ? "text-gold" : ""
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <form action="/designs" method="get" className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                name="q"
                type="search"
                placeholder="Design no. or keyword"
                className="w-44 rounded-full bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-400 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold lg:w-52"
              />
            </div>
          </form>
          <Link
            href="/account"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full p-2 hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <form action="/designs" method="get" className="mt-3">
            <input
              name="q"
              type="search"
              placeholder="Search designs"
              className="w-full rounded-lg bg-white/10 px-3 py-2 text-sm"
            />
          </form>
        </nav>
      )}
    </header>
  );
}

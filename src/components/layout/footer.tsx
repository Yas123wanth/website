import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold text-gold font-bold">
              SLT
            </span>
            <span className="font-serif text-xl text-white">
              {siteConfig.shortName} Embroidery
            </span>
          </div>
          <p className="text-sm leading-relaxed">{siteConfig.description}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              className="rounded-full p-2 hover:bg-white/10 hover:text-gold"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.youtube}
              className="rounded-full p-2 hover:bg-white/10 hover:text-gold"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              className="rounded-full p-2 hover:bg-white/10 hover:text-gold"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/designs", "All Designs"],
              ["/custom-order", "Custom Order"],
              ["/pricing", "Pricing"],
              ["/about", "About Us"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">Design Categories</h3>
          <ul className="space-y-2 text-sm">
            {["saree", "blouse", "kurti", "logo", "maggam"].map((slug) => (
              <li key={slug}>
                <Link
                  href={`/designs?category=${slug}`}
                  className="capitalize hover:text-gold"
                >
                  {slug} designs
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-gold">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              {siteConfig.contact.phone}
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              {siteConfig.contact.email}
            </li>
            <li className="flex gap-2">
              <Globe className="h-4 w-4 shrink-0 text-gold" />
              {siteConfig.contact.website}
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              {siteConfig.contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-gray-500 sm:flex-row lg:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/legal/disclaimer" className="hover:text-gold">Disclaimer</Link>
            <Link href="/legal/privacy" className="hover:text-gold">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-gold">Terms</Link>
            <Link href="/legal/shipping" className="hover:text-gold">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

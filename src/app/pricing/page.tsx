import Link from "next/link";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <h1 className="font-serif text-4xl text-charcoal">Pricing</h1>
      <p className="mt-4 text-gray-600">
        Ready-made designs start from ₹50 per file (format-specific pricing shown on
        each product). Bulk and boutique discounts available on request.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {[
          {
            title: "Ready-made designs",
            price: "₹50 – ₹200",
            desc: "Instant download after payment. Multiple formats available.",
          },
          {
            title: "Custom digitizing",
            price: "Quote on request",
            desc: "Logo, blouse, saree, or maggam work — priced by stitch count and complexity.",
          },
        ].map((tier) => (
          <div key={tier.title} className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-lg">{tier.title}</h2>
            <p className="mt-2 text-2xl font-bold text-burgundy">{tier.price}</p>
            <p className="mt-2 text-sm text-gray-600">{tier.desc}</p>
          </div>
        ))}
      </div>
      <Link
        href="/designs"
        className="mt-10 inline-block rounded-lg bg-burgundy px-6 py-3 text-white"
      >
        Browse catalog
      </Link>
    </div>
  );
}

import { Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const testimonials = [
  {
    name: "Lakshmi R.",
    role: "Boutique Owner, Vijayawada",
    quote:
      "SLT designs stitch beautifully on my multi-head machine. Downloads are instant and formats are always correct.",
    initials: "LR",
  },
  {
    name: "Priya M.",
    role: "Home Embroiderer",
    quote:
      "The blouse neck patterns are trendy and well-digitized. Customer support helped me choose the right JEF format.",
    initials: "PM",
  },
  {
    name: "Anitha K.",
    role: "Bridal Studio",
    quote:
      "We order maggam-style designs every week. Quality is consistent and pricing is fair for commercial use.",
    initials: "AK",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            Happy Customers
          </h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="h-full rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 font-semibold text-burgundy ring-2 ring-gold/30">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

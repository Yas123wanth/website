import { Crown, Gem, Zap, Headphones } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const items = [
  { icon: Crown, title: "Unique & Trendy Designs", text: "Fresh patterns updated regularly for bridal and boutique work." },
  { icon: Gem, title: "High-Quality Digitizing", text: "Clean stitch paths tested on commercial machines." },
  { icon: Zap, title: "Support for All Machines", text: "DST, PES, JEF and more — pick the format that fits." },
  { icon: Headphones, title: "Fast & Friendly Support", text: "Help with downloads, formats, and order questions." },
];

export function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-16 text-white">
      <div className="premium-grain pointer-events-none absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl text-gold md:text-4xl">
            Why Choose <span className="text-shimmer">SLT</span>
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition hover:border-gold/40 hover:bg-white/10">
                <Icon className="mx-auto h-10 w-10 text-burgundy transition hover:scale-110" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-400">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

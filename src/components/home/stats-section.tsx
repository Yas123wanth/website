"use client";

import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Sparkles } from "lucide-react";

const stats = [
  { value: 1000, suffix: "+", label: "Unique designs" },
  { value: 500, suffix: "+", label: "Happy customers" },
  { value: 4, suffix: "", label: "Major file formats" },
  { value: 24, suffix: "h", label: "Custom quote turnaround" },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-burgundy-dark via-burgundy to-charcoal py-16 text-white">
      <div className="premium-grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-6">
        <Reveal className="mb-12 flex w-full flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Crafted with precision
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            Numbers that <span className="text-shimmer">speak quality</span>
          </h2>
        </Reveal>

        <Stagger
          className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-8"
          stagger={0.1}
        >
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="w-full min-w-0 text-center">
              <p className="font-serif text-4xl font-bold leading-none text-gold md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} className="inline-block tabular-nums" />
              </p>
              <p className="mt-3 text-sm text-white/85">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Pencil, Sparkles } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const stats = [
  { value: 1000, suffix: "+", label: "Unique designs" },
  { value: 500, suffix: "+", label: "Happy customers" },
  { value: 4, suffix: "", label: "Major file formats" },
  { value: 24, suffix: "h", label: "Custom quote turnaround" },
];

export function StatsAndCtaSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-burgundy-dark via-burgundy to-charcoal py-16 md:py-20">
      <div className="premium-grain pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-6">
        {/* Stats block */}
        <Reveal className="mb-12 flex w-full flex-col items-center text-center md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-widest text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Crafted with precision
          </span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-white">
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
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="inline-block tabular-nums"
                />
              </p>
              <p className="mt-3 text-sm text-white/85">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* CTA card — separate layer, no negative margin overlap */}
        <div className="relative z-10 mt-14 md:mt-16">
          <motion.div
            className="relative flex flex-col items-stretch justify-between gap-6 overflow-hidden rounded-2xl border border-gold/25 bg-charcoal/40 px-6 py-8 shadow-2xl backdrop-blur-sm md:flex-row md:items-center md:px-10 md:py-10"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="premium-grain pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative flex flex-1 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-2 ring-gold/40">
                <Pencil className="h-7 w-7 text-gold" />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white md:text-3xl">
                  Need a Custom Embroidery Design?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-white/90 md:text-base">
                  Share your sketch, photo, or idea — our digitizers will create a
                  stitch-ready file tailored to your machine and fabric.
                </p>
                <p className="mt-2 text-sm text-gold/90">
                  On the next page you can upload up to 5 reference images.
                </p>
              </div>
            </div>
            <Link
              href="/custom-order"
              className="btn-premium relative inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-coral px-6 py-3 font-semibold text-white"
            >
              Request Custom Design
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

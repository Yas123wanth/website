"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Download, FileType, Headphones, Sparkles } from "lucide-react";

const usps = [
  { icon: Award, label: "Premium Quality Designs" },
  { icon: Download, label: "Instant Download" },
  { icon: FileType, label: "All Major Formats" },
  { icon: Headphones, label: "Custom Design Support" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[540px] lg:min-h-[620px]">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <Image
            src="https://images.unsplash.com/photo-1583292650898-7d22cd27d6ff?w=1920&q=80"
            alt="Embroidery machine stitching intricate pattern"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/75 to-charcoal/35" />
        <div className="premium-grain pointer-events-none absolute inset-0 opacity-20" />

        <div className="pointer-events-none absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-pulse-glow" />
        <div className="pointer-events-none absolute bottom-20 left-10 h-40 w-40 rounded-full bg-burgundy/30 blur-3xl animate-pulse-glow animation-delay-700" />

        <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 lg:px-6 lg:py-28">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            India&apos;s premium embroidery design studio
          </motion.div>

          <motion.h1
            className="max-w-2xl font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            Bringing Your{" "}
            <em className="text-shimmer not-italic">Ideas to Life</em> with Perfect
            Stitches
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl text-lg text-gray-200"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
          >
            High-quality embroidery designs for sarees, blouses, kurtis, and logos.
            Download instantly in DST, PES, JEF, and more.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            <Link href="/designs" className="btn-premium group inline-flex items-center gap-2 rounded-lg bg-burgundy px-6 py-3 font-medium text-white">
              Browse Designs
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/custom-order"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/80 px-6 py-3 font-medium text-white backdrop-blur-sm transition hover:border-gold hover:bg-white/10"
            >
              Request Custom Design
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-28 right-4 hidden lg:right-12 lg:block"
          initial={reduce ? false : { opacity: 0, rotate: -6 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
        >
          <p className="font-serif text-lg italic text-gold/90 animate-float">
            Design · Stitch · Create with love
          </p>
        </motion.div>
      </div>

      <div className="border-t border-white/10 bg-charcoal/95 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-4 lg:px-6">
          {usps.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 text-xs text-gray-300 sm:text-sm"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy/20 ring-1 ring-burgundy/50">
                <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              </span>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

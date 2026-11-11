"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Pencil, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export function CustomBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="-mt-2 mx-4 mb-16 lg:mx-6">
      <Reveal>
        <motion.div
          className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-burgundy px-6 py-10 text-white md:flex-row md:px-12"
          whileHover={reduce ? undefined : { scale: 1.005 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="premium-grain pointer-events-none absolute inset-0 opacity-25" />
          <motion.div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-gold/20"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative flex items-start gap-4">
            <motion.div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-gold/40"
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Pencil className="h-7 w-7 text-gold" />
            </motion.div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Need a Custom Embroidery Design?
              </h2>
              <p className="mt-2 max-w-xl text-white/90">
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
            className="btn-premium relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-coral px-6 py-3 font-semibold text-white"
          >
            Request Custom Design
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Reveal>
    </section>
  );
}

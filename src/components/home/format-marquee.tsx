"use client";

const items = [
  "DST",
  "PES",
  "JEF",
  "EXP",
  "Instant Download",
  "Maggam Work",
  "Bridal",
  "Logo Digitizing",
  "Saree Borders",
  "Blouse Neck",
];

export function FormatMarquee() {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-charcoal py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent" />
      <div className="marquee-track flex w-max gap-8 px-4">
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-2 text-sm font-medium tracking-wide text-gold/90"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy shadow-[0_0_8px_rgba(122,32,54,0.8)]" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

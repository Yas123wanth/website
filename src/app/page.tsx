import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { ProcessSection } from "@/components/home/process-section";
import { PopularDesigns } from "@/components/home/popular-designs";
import { WhyUsSection } from "@/components/home/why-us-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FormatMarquee } from "@/components/home/format-marquee";
import { StatsAndCtaSection } from "@/components/home/stats-and-cta-section";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <>
      <HeroSection />
      <FormatMarquee />
      <CategoryGrid categories={categories} />
      <StatsAndCtaSection />
      <ProcessSection />
      <PopularDesigns products={products} />
      <WhyUsSection />
      <TestimonialsSection />
    </>
  );
}

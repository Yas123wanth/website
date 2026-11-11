import { PrismaClient, FormatType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Saree Designs",
    slug: "saree",
    description: "Borders, butis, and pallu embroidery patterns",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
    sortOrder: 1,
  },
  {
    name: "Blouse Designs",
    slug: "blouse",
    description: "Necklines, sleeves, and maggam blouse work",
    imageUrl:
      "https://images.unsplash.com/photo-1583292650898-7d22cd27d6ff?w=800&q=80",
    sortOrder: 2,
  },
  {
    name: "Kurti Designs",
    slug: "kurti",
    description: "Front yokes, borders, and allover motifs",
    imageUrl:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    sortOrder: 3,
  },
  {
    name: "Logo Designs",
    slug: "logo",
    description: "Brand logos and monograms for commercial stitching",
    imageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    sortOrder: 4,
  },
  {
    name: "Maggam Style",
    slug: "maggam",
    description: "Heavy bridal maggam and stone-work style patterns",
    imageUrl:
      "https://images.unsplash.com/photo-1617629633758-fd21e7646f78?w=800&q=80",
    sortOrder: 5,
  },
  {
    name: "Custom Designs",
    slug: "custom",
    description: "Request bespoke digitizing for your unique idea",
    imageUrl:
      "https://images.unsplash.com/photo-1523381296731-838663d2ab1e?w=800&q=80",
    sortOrder: 6,
  },
];

const productTemplates = [
  { sku: "D10280", title: "Floral Border Pair", slug: "floral-border-pair-d10280" },
  { sku: "D10279", title: "Peacock Neck Motif", slug: "peacock-neck-motif-d10279" },
  { sku: "D10278", title: "Mango Buti Allover", slug: "mango-buti-allover-d10278" },
  { sku: "D10277", title: "Bridal Maggam Sleeve", slug: "bridal-maggam-sleeve-d10277" },
  { sku: "D10276", title: "Kolam Rangoli Border", slug: "kolam-rangoli-border-d10276" },
  { sku: "D10275", title: "Lotus Pot Neck", slug: "lotus-pot-neck-d10275" },
  { sku: "D10274", title: "Designer Logo Frame", slug: "designer-logo-frame-d10274" },
  { sku: "D10273", title: "Butterfly Kids Motif", slug: "butterfly-kids-motif-d10273" },
  { sku: "D10272", title: "Temple God Blouse", slug: "temple-god-blouse-d10272" },
  { sku: "D10271", title: "Cross Work Yoke", slug: "cross-work-yoke-d10271" },
  { sku: "D10270", title: "Bird Border Set", slug: "bird-border-set-d10270" },
  { sku: "D10269", title: "Mirror Work Band", slug: "mirror-work-band-d10269" },
  { sku: "D10268", title: "Full Hand Blouse", slug: "full-hand-blouse-d10268" },
  { sku: "D10267", title: "Kurti Front Panel", slug: "kurti-front-panel-d10267" },
  { sku: "D10266", title: "Ganesh Festival Motif", slug: "ganesh-festival-motif-d10266" },
  { sku: "D10265", title: "Boat Neck Pair", slug: "boat-neck-pair-d10265" },
  { sku: "D10264", title: "Zari Leaf Border", slug: "zari-leaf-border-d10264" },
  { sku: "D10263", title: "Owl Cartoon Patch", slug: "owl-cartoon-patch-d10263" },
  { sku: "D10262", title: "Hip Belt Bridal", slug: "hip-belt-bridal-d10262" },
  { sku: "D10261", title: "Net Fabric Floral", slug: "net-fabric-floral-d10261" },
];

const images = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
  "https://images.unsplash.com/photo-1583292650898-7d22cd27d6ff?w=600&q=80",
  "https://images.unsplash.com/photo-1617629633758-fd21e7646f78?w=600&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@sltembroidery.com";
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: UserRole.ADMIN, passwordHash },
    create: {
      email: adminEmail,
      name: "SLT Admin",
      role: UserRole.ADMIN,
      passwordHash,
      policyAcceptedAt: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "demo@sltembroidery.com" },
    update: {},
    create: {
      email: "demo@sltembroidery.com",
      name: "Demo Customer",
      passwordHash: await bcrypt.hash("Demo@123", 12),
      policyAcceptedAt: new Date(),
    },
  });

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const allCategories = await prisma.category.findMany();
  const categoryBySlug = new Map(allCategories.map((c) => [c.slug, c.id]));

  for (let i = 0; i < productTemplates.length; i++) {
    const t = productTemplates[i];
    const basePrice = 5000 + (i % 5) * 1000;
    const mrpPrice = basePrice * 2;
    const imageUrl = images[i % images.length];
    const categorySlugs = [
      ["saree", "blouse", "kurti", "logo", "maggam", "custom"][i % 6],
    ];

    const product = await prisma.product.upsert({
      where: { sku: t.sku },
      update: {
        title: t.title,
        slug: t.slug,
        basePrice,
        mrpPrice,
        imageUrl,
        isNew: i < 6,
        keywords: `${t.sku} floral peacock bridal embroidery`,
      },
      create: {
        sku: t.sku,
        title: t.title,
        slug: t.slug,
        description:
          "Professionally digitized embroidery design. Instant download after purchase. Test on scrap fabric before final stitching.",
        basePrice,
        mrpPrice,
        imageUrl,
        isNew: i < 6,
        isActive: true,
        keywords: `${t.sku} floral peacock bridal embroidery`,
      },
    });

    for (const slug of categorySlugs) {
      const categoryId = categoryBySlug.get(slug);
      if (categoryId) {
        await prisma.productCategory.upsert({
          where: {
            productId_categoryId: { productId: product.id, categoryId },
          },
          update: {},
          create: { productId: product.id, categoryId },
        });
      }
    }

    const formats: { format: FormatType; label: string; price: number }[] = [
      { format: FormatType.DST_SMALL, label: "Small DST", price: basePrice },
      { format: FormatType.DST_LARGE, label: "Big DST", price: basePrice + 2000 },
      { format: FormatType.PES, label: "PES", price: basePrice },
      { format: FormatType.JEF, label: "JEF", price: basePrice },
    ];

    for (const f of formats) {
      await prisma.productFormat.upsert({
        where: { productId_format: { productId: product.id, format: f.format } },
        update: { price: f.price, label: f.label, fileKey: `designs/${t.sku}/${f.format}.zip` },
        create: {
          productId: product.id,
          format: f.format,
          label: f.label,
          price: f.price,
          fileKey: `designs/${t.sku}/${f.format}.zip`,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

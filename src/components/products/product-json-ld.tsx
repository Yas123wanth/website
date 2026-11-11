import { siteConfig } from "@/lib/site-config";

export function ProductJsonLd({
  name,
  sku,
  description,
  imageUrl,
  pricePaise,
}: {
  name: string;
  sku: string;
  description: string | null;
  imageUrl: string;
  pricePaise: number;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    sku,
    description: description ?? siteConfig.description,
    image: imageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: (pricePaise / 100).toFixed(0),
      availability: "https://schema.org/InStock",
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

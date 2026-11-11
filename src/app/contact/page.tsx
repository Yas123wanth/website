import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 lg:px-6">
      <h1 className="font-serif text-4xl text-charcoal">Contact Us</h1>
      <p className="mt-4 text-gray-600">
        {siteConfig.contact.phone} · {siteConfig.contact.email}
      </p>
      <p className="text-sm text-gray-500">{siteConfig.contact.address}</p>
      <ContactForm />
    </div>
  );
}

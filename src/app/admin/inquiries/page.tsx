import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin — Inquiries" };

function parseImages(json: string | null): string[] {
  if (!json) return [];
  try {
    const arr = JSON.parse(json) as string[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
export default async function AdminInquiriesPage() {
  const [custom, contact] = await Promise.all([
    prisma.customInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-serif text-3xl text-charcoal">Custom orders</h1>
        <ul className="mt-4 space-y-3">
          {custom.map((q) => {
            const images = parseImages(q.referenceImages);
            return (
            <li key={q.id} className="rounded-xl bg-white p-4 shadow-sm text-sm">
              <p className="font-semibold">{q.name} — {q.email}</p>
              <p className="text-gray-500">{q.phone} · {q.category}</p>
              <p className="mt-2">{q.message}</p>
              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {images.map((src) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block h-16 w-16 overflow-hidden rounded border"
                    >
                      <Image
                        src={src}
                        alt="Reference"
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized={src.startsWith("/uploads/")}
                      />
                    </a>
                  ))}
                </div>
              )}
              <p className="mt-2 text-xs text-gray-400">
                {q.createdAt.toLocaleString("en-IN")}
              </p>
            </li>
            );
          })}        </ul>
      </section>
      <section>
        <h2 className="font-serif text-2xl text-charcoal">Contact messages</h2>
        <ul className="mt-4 space-y-3">
          {contact.map((m) => (
            <li key={m.id} className="rounded-xl bg-white p-4 shadow-sm text-sm">
              <p className="font-semibold">{m.name} — {m.email}</p>
              <p className="text-gray-500">{m.subject}</p>
              <p className="mt-2">{m.message}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

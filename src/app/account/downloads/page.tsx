import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DownloadButton } from "@/components/account/download-button";

export const metadata = { title: "Downloads" };

type SearchParams = Promise<{ success?: string }>;

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account/downloads");
  const sp = await searchParams;

  const grants = await prisma.downloadGrant.findMany({
    where: { userId: session.user.id },
    include: {
      productFormat: { include: { product: true } },
      orderItem: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
      <Link href="/account" className="text-sm text-burgundy hover:underline">
        ← Account
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-charcoal">Downloads</h1>
      {sp.success && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
          Payment successful! Your files are ready below.
        </p>
      )}
      {grants.length === 0 ? (
        <p className="mt-8 text-gray-600">
          No downloads yet.{" "}
          <Link href="/designs" className="text-burgundy hover:underline">
            Browse designs
          </Link>
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {grants.map((g) => (
            <li
              key={g.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-5 shadow-sm"
            >
              <div>
                <p className="font-semibold">{g.productFormat.product.title}</p>
                <p className="text-sm text-gray-500">
                  {g.productFormat.product.sku} — {g.productFormat.label}
                </p>
                <p className="text-xs text-gray-400">
                  Downloads used: {g.downloadCount} / {g.maxDownloads}
                </p>
              </div>
              <DownloadButton grantId={g.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SocialRail } from "@/components/layout/social-rail";
import { PolicyModal } from "@/components/policy/policy-modal";

export function ChromeShell({
  children,
  cartCount,
}: {
  children: React.ReactNode;
  cartCount: number;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SocialRail />
      <PolicyModal />
    </>
  );
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  if (!productId) {
    return NextResponse.json({ error: "Missing product" }, { status: 400 });
  }

  await prisma.wishlistItem.upsert({
    where: {
      userId_productId: { userId: session.user.id, productId },
    },
    update: {},
    create: { userId: session.user.id, productId },
  });

  return NextResponse.redirect(new URL("/account/wishlist", request.url));
}

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveProductImage } from "@/lib/product-image";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const sku = (formData.get("sku") as string) || "product";

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }

  const result = await saveProductImage(file, sku);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ url: result.url });
}

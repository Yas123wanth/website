import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadDesignFile } from "@/lib/s3";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const formatId = formData.get("formatId") as string;
  const file = formData.get("file") as File | null;
  if (!formatId || !file) {
    return NextResponse.json({ error: "Missing file or format" }, { status: 400 });
  }

  const format = await prisma.productFormat.findUnique({
    where: { id: formatId },
    include: { product: true },
  });
  if (!format) {
    return NextResponse.json({ error: "Format not found" }, { status: 404 });
  }

  const key =
    format.fileKey ??
    `designs/${format.product.sku}/${format.format}.zip`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const ok = await uploadDesignFile(key, buffer);
  if (!ok) {
    return NextResponse.json(
      {
        error:
          "S3 not configured. Set AWS_* and S3_BUCKET in .env to enable uploads.",
      },
      { status: 503 },
    );
  }

  await prisma.productFormat.update({
    where: { id: formatId },
    data: { fileKey: key },
  });

  return NextResponse.json({ ok: true, fileKey: key });
}

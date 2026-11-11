import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSignedDownloadUrl } from "@/lib/s3";

type Params = Promise<{ grantId: string }>;

export async function GET(
  _request: Request,
  context: { params: Params },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { grantId } = await context.params;
  const grant = await prisma.downloadGrant.findFirst({
    where: { id: grantId, userId: session.user.id },
    include: { productFormat: true },
  });

  if (!grant) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (grant.downloadCount >= grant.maxDownloads) {
    return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
  }
  if (grant.expiresAt && grant.expiresAt < new Date()) {
    return NextResponse.json({ error: "Download expired" }, { status: 403 });
  }

  const fileKey = grant.productFormat.fileKey;
  const url = fileKey ? await getSignedDownloadUrl(fileKey) : null;

  await prisma.downloadGrant.update({
    where: { id: grant.id },
    data: { downloadCount: { increment: 1 } },
  });

  if (url) {
    return NextResponse.json({ url });
  }

  return NextResponse.json({
    message:
      "File storage is not configured. Your purchase is recorded — contact support with your order ID for the ZIP file.",
  });
}

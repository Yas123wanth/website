import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/file-upload";

const fieldsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  category: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  let fields: z.infer<typeof fieldsSchema>;
  const imageUrls: string[] = [];

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const parsed = fieldsSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      category: formData.get("category") || undefined,
      message: formData.get("message"),
    });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    fields = parsed.data;

    const files = formData.getAll("images").filter((f) => f instanceof File) as File[];
    if (files.length > 5) {
      return NextResponse.json({ error: "Maximum 5 reference images" }, { status: 400 });
    }

    const hint = fields.email.split("@")[0] || "inquiry";
    for (const file of files) {
      if (file.size === 0) continue;
      const saved = await saveUploadedImage(file, "custom-inquiries", hint);
      if ("error" in saved) {
        return NextResponse.json({ error: saved.error }, { status: 400 });
      }
      imageUrls.push(saved.url);
    }
  } else {
    const parsed = fieldsSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    fields = parsed.data;
  }

  await prisma.customInquiry.create({
    data: {
      ...fields,
      referenceImages:
        imageUrls.length > 0 ? JSON.stringify(imageUrls) : undefined,
    },
  });

  return NextResponse.json({ ok: true });
}

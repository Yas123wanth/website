import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { uploadDesignFile } from "@/lib/s3";
import { uploadToSupabaseStorage } from "@/lib/supabase-storage";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function saveUploadedImage(
  file: File,
  folder: "products" | "custom-inquiries",
  nameHint: string,
): Promise<{ url: string } | { error: string }> {
  if (!IMAGE_TYPES.has(file.type)) {
    return { error: "Use JPEG, PNG, WebP, or GIF." };
  }

  const maxBytes = folder === "custom-inquiries" ? 8 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      error: `Image must be ${maxBytes / (1024 * 1024)} MB or smaller.`,
    };
  }

  const ext =
    file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const safe = nameHint.replace(/[^a-zA-Z0-9-_]/g, "") || "file";
  const filename = `${safe}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "image/jpeg";
  const storagePath = `${folder}/${filename}`;

  const supabaseUrl = await uploadToSupabaseStorage(
    "uploads",
    storagePath,
    buffer,
    contentType,
  );
  if (supabaseUrl) return { url: supabaseUrl };

  const s3Key = `images/${storagePath}`;
  const uploadedToS3 = await uploadDesignFile(s3Key, buffer, contentType);
  if (uploadedToS3) {
    const publicBase = process.env.S3_PUBLIC_URL_BASE?.replace(/\/$/, "");
    if (publicBase) return { url: `${publicBase}/${s3Key}` };
  }

  if (process.env.VERCEL) {
    return {
      error:
        "File storage not configured. Add Supabase Storage (recommended on Vercel) or S3 env vars.",
    };
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return { url: `/uploads/${folder}/${filename}` };
}

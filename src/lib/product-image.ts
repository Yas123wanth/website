import { saveUploadedImage } from "@/lib/file-upload";

export async function saveProductImage(
  file: File,
  sku: string,
): Promise<{ url: string } | { error: string }> {
  return saveUploadedImage(file, "products", sku);
}

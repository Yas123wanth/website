"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";

export function ImageUploadField({
  defaultUrl = "",
  skuHint = "",
}: {
  defaultUrl?: string;
  skuHint?: string;
}) {
  const [imageUrl, setImageUrl] = useState(defaultUrl);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const sku =
      skuHint ||
      (document.querySelector<HTMLInputElement>('input[name="sku"]')?.value ??
        "product");

    setUploading(true);
    setMessage("");
    const form = new FormData();
    form.append("file", file);
    form.append("sku", sku);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    setUploading(false);

    if (!res.ok) {
      setMessage(data.error ?? "Upload failed");
      return;
    }

    setImageUrl(data.url);
    setMessage("Image uploaded. Save the product to keep changes.");
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Product image</label>
      <input type="hidden" name="imageUrl" value={imageUrl} required />

      {imageUrl ? (
        <div className="relative h-40 w-40 overflow-hidden rounded-lg border bg-gray-100">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
            sizes="160px"
            unoptimized={imageUrl.startsWith("/uploads/")}
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500">No image yet — upload or paste a URL below.</p>
      )}

      <label
        className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm hover:border-burgundy hover:bg-burgundy/5 ${uploading ? "opacity-50" : ""}`}
      >
        <Upload className="h-4 w-4 text-burgundy" />
        {uploading ? "Uploading…" : "Upload image (JPG, PNG, WebP — max 5 MB)"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          disabled={uploading}
          onChange={onFileChange}
        />
      </label>

      <div>
        <label className="text-xs text-gray-500">Or paste image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
        />
      </div>
      {message && (
        <p className={`text-sm ${message.includes("failed") || message.includes("Use ") ? "text-red-600" : "text-green-700"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

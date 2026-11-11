"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/image-upload-field";

type Category = { id: string; name: string; slug: string };

type ProductInput = {
  id: string;
  sku: string;
  title: string;
  slug: string;
  description: string | null;
  imageUrl: string;
  basePrice: number;
  mrpPrice: number | null;
  isNew: boolean;
  isActive: boolean;
  keywords: string | null;
  categoryIds: string[];
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductInput;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const categoryIds = categories
      .filter((c) => form.get(`cat_${c.id}`) === "on")
      .map((c) => c.id);

    const payload = {
      id: product?.id,
      sku: form.get("sku"),
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      imageUrl: form.get("imageUrl"),
      basePrice: Number(form.get("basePrice")),
      mrpPrice: Number(form.get("mrpPrice")) || null,
      isNew: form.get("isNew") === "on",
      isActive: form.get("isActive") === "on",
      keywords: form.get("keywords"),
      categoryIds,
    };

    const res = await fetch("/api/admin/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Save failed");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="SKU" name="sku" defaultValue={product?.sku} required />
        <Field label="Slug" name="slug" defaultValue={product?.slug} required />
      </div>
      <Field label="Title" name="title" defaultValue={product?.title} required />
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
        />
      </div>
      <ImageUploadField defaultUrl={product?.imageUrl ?? ""} skuHint={product?.sku} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Base price (paise)"
          name="basePrice"
          type="number"
          defaultValue={product?.basePrice ?? 5000}
          required
        />
        <Field
          label="MRP (paise)"
          name="mrpPrice"
          type="number"
          defaultValue={product?.mrpPrice ?? 10000}
        />
      </div>
      <Field label="Keywords" name="keywords" defaultValue={product?.keywords ?? ""} />
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isNew" defaultChecked={product?.isNew ?? false} />
          New badge
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={product?.isActive ?? true} />
          Active
        </label>
      </div>
      <div>
        <p className="text-sm font-medium">Categories</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                name={`cat_${c.id}`}
                defaultChecked={product?.categoryIds.includes(c.id)}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-burgundy px-6 py-2 font-medium text-white disabled:opacity-50"
      >
        {loading ? "Saving…" : "Save product"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
      />
    </div>
  );
}

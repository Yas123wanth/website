"use client";

import { useState } from "react";
import { formatInr } from "@/lib/format";
import { ShoppingCart } from "lucide-react";

type FormatOption = {
  id: string;
  label: string;
  format: string;
  price: number;
};

export function AddToCartForm({
  productId,
  sku,
  title,
  imageUrl,
  formats,
}: {
  productId: string;
  sku: string;
  title: string;
  imageUrl: string;
  formats: FormatOption[];
}) {
  const [formatId, setFormatId] = useState(formats[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const selected = formats.find((f) => f.id === formatId);

  async function addToCart() {
    if (!formatId || !selected) return;
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productFormatId: formatId,
        sku,
        title,
        formatLabel: selected.label,
        imageUrl,
        unitPrice: selected.price,
        quantity: 1,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setMessage("Added to cart!");
      window.location.href = "/cart";
    } else {
      setMessage("Could not add to cart.");
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-charcoal">Select file format</h2>
      <div className="mt-3 space-y-2">
        {formats.map((f) => (
          <label
            key={f.id}
            className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 ${
              formatId === f.id ? "border-burgundy bg-burgundy/5" : "border-gray-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="format"
                value={f.id}
                checked={formatId === f.id}
                onChange={() => setFormatId(f.id)}
                className="accent-burgundy"
              />
              <span className="text-sm font-medium">{f.label}</span>
            </span>
            <span className="font-semibold">{formatInr(f.price)}</span>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={addToCart}
        disabled={loading || !formatId}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-burgundy py-3 font-semibold text-white transition hover:bg-burgundy-dark disabled:opacity-50"
      >
        <ShoppingCart className="h-5 w-5" />
        {loading ? "Adding…" : "Add to Cart"}
      </button>
      {message && <p className="mt-2 text-center text-sm text-burgundy">{message}</p>}
    </div>
  );
}

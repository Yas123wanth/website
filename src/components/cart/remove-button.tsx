"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function RemoveFromCartButton({
  productFormatId,
}: {
  productFormatId: string;
}) {
  const router = useRouter();

  async function remove() {
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productFormatId }),
    });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={remove}
      className="self-start rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
      aria-label="Remove from cart"
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
}

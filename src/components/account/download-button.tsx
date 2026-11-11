"use client";

import { Download } from "lucide-react";
import { useState } from "react";

export function DownloadButton({ grantId }: { grantId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function download() {
    setLoading(true);
    setError("");
    const res = await fetch(`/api/downloads/${grantId}`);
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "Download unavailable");
      return;
    }
    if (data.url) {
      window.open(data.url, "_blank");
    } else if (data.message) {
      setError(data.message);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={download}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-4 py-2 text-sm font-medium text-white hover:bg-burgundy-dark disabled:opacity-50"
      >
        <Download className="h-4 w-4" />
        {loading ? "Preparing…" : "Download ZIP"}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

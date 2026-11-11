"use client";

import { useState } from "react";

type FormatRow = { id: string; label: string; format: string; fileKey: string | null };

export function FormatUploadList({ formats }: { formats: FormatRow[] }) {
  const [message, setMessage] = useState("");

  async function upload(formatId: string, file: File) {
    setMessage("");
    const form = new FormData();
    form.append("formatId", formatId);
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    setMessage(res.ok ? `Uploaded ${data.fileKey}` : data.error);
  }

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="font-semibold">Design ZIP files</h2>
      <ul className="mt-4 space-y-3">
        {formats.map((f) => (
          <li key={f.id} className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium">{f.label}</span>
            <span className="text-gray-400">{f.fileKey ?? "No file"}</span>
            <label className="cursor-pointer rounded bg-charcoal px-3 py-1 text-white">
              Upload ZIP
              <input
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) upload(f.id, file);
                }}
              />
            </label>
          </li>
        ))}
      </ul>
      {message && <p className="mt-3 text-sm text-burgundy">{message}</p>}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_FILES = 5;

export function CustomOrderForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  function onPickImages(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files ?? []);
    const room = MAX_FILES - previews.length;
    const next = picked.slice(0, room).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews((prev) => [...prev, ...next]);
    e.target.value = "";
  }

  function removePreview(index: number) {
    setPreviews((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].url);
      copy.splice(index, 1);
      return copy;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    previews.forEach(({ file }) => formData.append("images", file));

    const res = await fetch("/api/custom-inquiry", {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setStatus("error");
      setErrorMsg(data.error ?? "Submission failed");
      return;
    }

    setStatus("ok");
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Your name" required className="rounded-lg border px-3 py-2" />
        <input name="email" type="email" placeholder="Email" required className="rounded-lg border px-3 py-2" />
      </div>
      <input name="phone" placeholder="Phone / WhatsApp" className="w-full rounded-lg border px-3 py-2" />
      <select name="category" className="w-full rounded-lg border px-3 py-2">
        <option value="saree">Saree design</option>
        <option value="blouse">Blouse design</option>
        <option value="logo">Logo / brand</option>
        <option value="other">Other</option>
      </select>

      <div>
        <p className="text-sm font-medium text-charcoal">Reference photos (optional)</p>
        <p className="text-xs text-gray-500">
          Upload sketches, blouse photos, or sample designs — up to {MAX_FILES} images (8 MB each).
        </p>
        {previews.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-3">
            {previews.map((p, i) => (
              <li key={p.url} className="relative h-20 w-20 overflow-hidden rounded-lg border">
                <Image src={p.url} alt="" fill className="object-cover" sizes="80px" unoptimized />
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute right-0 top-0 bg-charcoal/80 p-0.5 text-white"
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {previews.length < MAX_FILES && (
          <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm hover:border-burgundy">
            <ImagePlus className="h-5 w-5 text-burgundy" />
            Add reference images
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="hidden"
              onChange={onPickImages}
            />
          </label>
        )}
      </div>

      <textarea
        name="message"
        rows={6}
        placeholder="Describe your design idea, size, fabric, and machine format needed..."
        required
        className="w-full rounded-lg border px-3 py-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-coral px-6 py-2.5 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Sending…" : "Submit request"}
      </button>
      {status === "ok" && (
        <p className="text-sm text-green-600">Request received! We will contact you with a quote.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg || "Submission failed."}</p>
      )}
    </form>
  );
}

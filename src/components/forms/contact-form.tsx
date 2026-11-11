"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        subject: form.get("subject"),
        message: form.get("message"),
      }),
    });
    setStatus(res.ok ? "ok" : "error");
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Your name" required className="rounded-lg border px-3 py-2" />
        <input name="email" type="email" placeholder="Email" required className="rounded-lg border px-3 py-2" />
      </div>
      <input name="phone" placeholder="Phone" className="w-full rounded-lg border px-3 py-2" />
      <input name="subject" placeholder="Subject" className="w-full rounded-lg border px-3 py-2" />
      <textarea name="message" rows={5} placeholder="Message" required className="w-full rounded-lg border px-3 py-2" />
      <button type="submit" className="rounded-lg bg-burgundy px-6 py-2.5 font-medium text-white">
        Send message
      </button>
      {status === "ok" && <p className="text-sm text-green-600">Thank you — we will reply soon.</p>}
      {status === "error" && <p className="text-sm text-red-600">Could not send. Try again.</p>}
    </form>
  );
}

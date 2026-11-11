"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Registration failed");
      return;
    }
    await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      callbackUrl: "/account",
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-burgundy focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-burgundy focus:outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-burgundy focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-lg bg-burgundy py-2.5 font-semibold text-white hover:bg-burgundy-dark"
      >
        Register
      </button>
    </form>
  );
}

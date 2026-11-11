import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center font-serif text-3xl text-charcoal">Login</h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Access orders, downloads, and wishlist
      </p>
      <Suspense>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-center text-sm">
        No account?{" "}
        <Link href="/register" className="font-medium text-burgundy hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

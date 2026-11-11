import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center font-serif text-3xl text-charcoal">Create Account</h1>
      <RegisterForm />
      <p className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-burgundy hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

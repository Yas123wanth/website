"use client";

import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export function CheckoutClient({ totalAmount }: { totalAmount: number }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout/create-order", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Checkout failed");
        setLoading(false);
        return;
      }

      if (data.mockPaid) {
        window.location.href = `/account/downloads?success=1`;
        return;
      }

      const key = data.razorpayKeyId as string;
      const options = {
        key,
        amount: data.amount,
        currency: "INR",
        name: "SLT Embroidery Designs",
        description: "Embroidery design purchase",
        order_id: data.razorpayOrderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verify.ok) {
            window.location.href = "/account/downloads?success=1";
          } else {
            setError("Payment verification failed");
          }
        },
        theme: { color: "#7a2036" },
      };

      if (!window.Razorpay) {
        setError("Payment script not loaded");
        setLoading(false);
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button
        type="button"
        onClick={pay}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-burgundy py-3 font-semibold text-white hover:bg-burgundy-dark disabled:opacity-50"
      >
        {loading ? "Processing…" : "Pay with Razorpay"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <p className="mt-4 text-xs text-gray-500">
        Without Razorpay keys configured, checkout runs in demo mode and grants
        downloads immediately for testing.
      </p>
    </>
  );
}

import { CustomOrderForm } from "@/components/forms/custom-order-form";

export const metadata = { title: "Custom Order" };

export default function CustomOrderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 lg:px-6">
      <h1 className="font-serif text-4xl text-charcoal">Request Custom Design</h1>
      <p className="mt-4 text-gray-600">
        Share your reference image, measurements, and preferred file format. We will
        reply with a quote and timeline before starting work.
      </p>
      <CustomOrderForm />
    </div>
  );
}

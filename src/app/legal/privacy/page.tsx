import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>We collect name, email, and order data to fulfill purchases and provide support.</p>
      <p>Payment processing is handled by Razorpay; we do not store card details.</p>
      <p>We do not sell your personal information to third parties.</p>
      <p>Contact us to request deletion of your account data, subject to legal record-keeping requirements.</p>
    </LegalLayout>
  );
}

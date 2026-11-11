import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>By using SLT Embroidery Designs you agree to these terms and our disclaimer.</p>
      <p>All prices are in INR unless stated otherwise. Digital goods are delivered upon successful payment.</p>
      <p>We may update catalog pricing and policies; continued use constitutes acceptance of changes.</p>
    </LegalLayout>
  );
}

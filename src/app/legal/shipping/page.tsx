import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = { title: "Shipping Information" };

export default function ShippingPage() {
  return (
    <LegalLayout title="Shipping & Delivery">
      <p>Embroidery design files are delivered digitally — no physical shipping applies.</p>
      <p>After payment, download links appear in your account and may be emailed to your registered address.</p>
      <p>Files are provided as ZIP archives. Extract and copy stitch files to USB for your machine.</p>
      <p>Re-download purchased designs from Account → Downloads while your grant is active.</p>
    </LegalLayout>
  );
}

import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Disclaimer">
      <p>Designs sold on this site are readymade stitch files. No alterations or EMB source files are provided.</p>
      <p>You are responsible for choosing a format compatible with your embroidery machine before purchase.</p>
      <p>Preview images are approximate; actual results vary with fabric, stabilizer, and machine settings.</p>
      <p>Downloads are licensed for your commercial or personal stitching. Resale or redistribution of files is prohibited.</p>
    </LegalLayout>
  );
}

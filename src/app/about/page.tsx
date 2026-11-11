export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <h1 className="font-serif text-4xl text-charcoal">About SLT Embroidery Designs</h1>
      <p className="mt-6 leading-relaxed text-gray-600">
        SLT Embroidery Designs creates and sells professionally digitized machine
        embroidery patterns for boutiques, bridal studios, and home embroiderers across
        India. From saree borders to maggam blouses and commercial logos, every file is
        tested for clean stitching on multi-head and single-needle machines.
      </p>
      <p className="mt-4 leading-relaxed text-gray-600">
        We offer instant downloads in DST, PES, JEF, and other formats, plus custom
        digitizing when you need something unique. Our team supports you with format
        selection, download help, and friendly service in Telugu and English.
      </p>
    </div>
  );
}

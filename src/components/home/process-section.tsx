import { Upload, Settings, CheckCircle, Download } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const steps = [
  { num: 1, icon: Upload, title: "Share Your Idea", text: "Upload a reference image or describe your design." },
  { num: 2, icon: Settings, title: "We Create Design", text: "Our team digitizes with perfect stitch density." },
  { num: 3, icon: CheckCircle, title: "Review & Approve", text: "Preview and confirm before final delivery." },
  { num: 4, icon: Download, title: "Get Files", text: "Download DST, PES, JEF or your chosen format." },
];

export function ProcessSection() {
  return (
    <section className="bg-off-white py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal className="text-center">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">
            Simple Steps to Get <em className="text-shimmer not-italic">Your Design</em>
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="group relative text-center">
                {step.num < 4 && (
                  <div className="absolute left-[calc(50%+2rem)] top-6 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-gold/50 to-transparent lg:block" />
                )}
                <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-burgundy text-sm font-bold text-white shadow-lg shadow-burgundy/30 transition group-hover:scale-110">
                  {step.num}
                </span>
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/40 bg-white transition duration-300 group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/20">
                  <step.icon className="h-7 w-7 text-burgundy transition group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

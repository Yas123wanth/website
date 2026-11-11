"use client";

import { useEffect, useState } from "react";
import { FileText, ChevronDown } from "lucide-react";

const STORAGE_KEY = "slt_policy_accepted";

const sections = [
  {
    title: "How to Download Designs",
    body: `After payment, your ZIP file is available under Account → Downloads and sent to your registered email. Extract the ZIP and copy the stitch file to a USB drive for your machine.`,
  },
  {
    title: "Design Usage & Compatibility",
    body: `Designs are readymade stitch files (DST, PES, JEF, etc.). No EMB files or modifications are included. Verify format compatibility with your machine before purchase.`,
  },
  {
    title: "Returns & Refunds",
    body: `Digital products cannot be returned once downloaded. Refunds apply only for corrupted or incorrect files reported within 7 days.`,
  },
];

export function PolicyModal() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setOpen(false);
    fetch("/api/policy/accept", { method: "POST" }).catch(() => {});
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-100 px-6 py-5 text-center">
          <FileText className="mx-auto h-10 w-10 text-burgundy" strokeWidth={1.5} />
          <p className="mt-2 text-sm text-gray-500">Welcome Note</p>
          <h2 id="policy-title" className="mt-1 font-serif text-xl text-charcoal">
            SLT Designs — Usage Guidelines
          </h2>
          <p className="mt-2 text-sm text-amber-700">
            Please read the following policies carefully before using our shop.
          </p>
        </div>
        <div className="max-h-[40vh] overflow-y-auto px-6 py-4">
          {sections.map((s, i) => (
            <div key={s.title} className="mb-2 rounded-lg border border-gray-200">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                {s.title}
                <ChevronDown
                  className={`h-4 w-4 transition ${expanded === i ? "rotate-180" : ""}`}
                />
              </button>
              {expanded === i && (
                <p className="px-4 pb-3 text-sm text-gray-600">{s.body}</p>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 p-6">
          <button
            type="button"
            onClick={accept}
            className="w-full rounded-full bg-burgundy py-3 font-semibold text-white transition hover:bg-burgundy-dark"
          >
            Agree & Proceed
          </button>
        </div>
      </div>
    </div>
  );
}

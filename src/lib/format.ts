import { FormatType } from "@prisma/client";

export const formatLabels: Record<FormatType, string> = {
  DST_SMALL: "Small DST (single needle / small hoop)",
  DST_LARGE: "Big DST (multi-head / large hoop)",
  PES: "PES (Brother / Babylock)",
  JEF: "JEF (Janome / Elna)",
  EXP: "EXP (Melco / Bernina)",
};

export function formatInr(paise: number): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

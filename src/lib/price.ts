/** Parse catalog price strings like "$ 20.66 / Bottle", "$ 11.11 / Tube", or "₹ 1,725 / Bottle". */
export function parseUnitPrice(price?: string | null): {
  amountUsd: number;
  amountInr: number;
  unit: string;
  formatted: string;
} | null {
  if (!price) return null;
  const cleaned = price.replace(/,/g, "");
  const amountMatch = cleaned.match(/(\d+(?:\.\d+)?)/);
  if (!amountMatch) return null;
  const num = Number(amountMatch[1]);
  if (!Number.isFinite(num) || num <= 0) return null;
  const unitMatch = price.match(/\/\s*(.+)$/);
  const unit = (unitMatch?.[1] || "unit").trim();

  const isUsd = price.includes("$") || /USD/i.test(price);
  const amountUsd = isUsd ? num : inrToUsd(num);
  const amountInr = isUsd ? num * inrPerUsd() : num;

  return {
    amountUsd: Number(amountUsd.toFixed(2)),
    amountInr: Number(amountInr.toFixed(2)),
    unit,
    formatted: `$ ${amountUsd.toFixed(2)} / ${unit}`,
  };
}

/** INR → USD. Override with NEXT_PUBLIC_INR_PER_USD (rupees per 1 USD). */
export function inrPerUsd(): number {
  const raw = process.env.NEXT_PUBLIC_INR_PER_USD;
  const n = raw ? Number(raw) : 83.5;
  return Number.isFinite(n) && n > 0 ? n : 83.5;
}

export function inrToUsd(amountInr: number): number {
  return amountInr / inrPerUsd();
}

export function formatUsd(amountUsd: number): string {
  const amount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountUsd);
  return `$${amount}`;
}

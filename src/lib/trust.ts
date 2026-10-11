/** Company facts for schema, insights CTAs, and trust UI. */
export const COMPANY = {
  legalName: "Life Cure",
  siteUrl: "https://lifecure.vercel.app",
  established: 2021,
  city: "Nagpur",
  responseSla: "1–2 business hours",
  moqNote: "Wholesale & export partners · Fast 1-tap ordering",
  indiaMartUrl: "https://www.indiamart.com",
} as const;

export function getContact() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /\D/g,
    ""
  );
  const telegram = (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "V_10120").replace(
    /^@/,
    ""
  );
  return {
    whatsapp,
    telegram,
    whatsappUrl: whatsapp ? `https://wa.me/${whatsapp}` : "",
    telegramUrl: `https://t.me/${telegram}`,
  };
}

export function formatPhonePretty(digits: string) {
  if (!digits) return "";
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

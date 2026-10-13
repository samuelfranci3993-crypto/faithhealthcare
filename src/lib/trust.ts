/** Company facts for schema, insights CTAs, and trust UI. */
export const COMPANY = {
  legalName: "Faith Health Care",
  brandName: "Faith Health Care",
  email: "faithhealthcare5@gmail.com",
  phonePretty: "+91 70200 96898",
  phoneRaw: "917020096898",
  siteUrl: "https://faithhealthcare.in",
  established: 2022,
  city: "India",
  country: "India",
  responseSla: "1–2 business hours",
  moqNote: "Wholesale & export healthcare partners · Instant direct ordering",
} as const;

export function getContact() {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898").replace(
    /\D/g,
    ""
  );
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "faithhealthcare5@gmail.com";
  const telegram = (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "").replace(
    /^@/,
    ""
  );
  return {
    whatsapp,
    email,
    telegram,
    whatsappUrl: whatsapp ? `https://wa.me/${whatsapp}` : "https://wa.me/917020096898",
    emailUrl: `mailto:${email}`,
    telegramUrl: telegram ? `https://t.me/${telegram}` : "",
  };
}

export function formatPhonePretty(digits: string) {
  if (!digits) return "+91 70200 96898";
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return `+${digits}`;
}

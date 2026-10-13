import Image from "next/image";
import Link from "next/link";

const markets = [
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "be", name: "Belgium", flag: "🇧🇪" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "ae", name: "UAE", flag: "🇦🇪" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
];

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "";

  return (
    <footer className="relative bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* 1mg Style Trust Stats Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div className="p-2">
              <p className="text-2xl font-black text-white sm:text-3xl">150+</p>
              <p className="text-xs text-slate-400 mt-0.5">WHO-GMP Formulations</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-brand sm:text-3xl">25+</p>
              <p className="text-xs text-slate-400 mt-0.5">Export Destinations</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-emerald-400 sm:text-3xl">100%</p>
              <p className="text-xs text-slate-400 mt-0.5">Genuine Tested Batches</p>
            </div>
            <div className="p-2">
              <p className="text-2xl font-black text-amber-400 sm:text-3xl">&lt; 15 min</p>
              <p className="text-xs text-slate-400 mt-0.5">Instant WhatsApp Quote</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 1mg Footer Links & Directory */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-hover font-black text-white text-lg shadow-md shadow-brand/30">
                FHC
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  FAITH HEALTH CARE
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Global Pharma Export Desk
                </span>
              </div>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-slate-400 max-w-sm">
              Faith Health Care is an independent pharmaceutical export and wholesale platform, supplying 100% genuine medicines from licensed WHO-GMP manufacturers to healthcare buyers worldwide.
            </p>

            {/* Direct Connect Buttons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={whatsapp ? `https://wa.me/${whatsapp}` : "https://wa.me/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <WhatsAppIcon />
                <span>WhatsApp Desk</span>
              </a>

              {telegram && (
                <a
                  href={`https://t.me/${telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
                >
                  <TelegramIcon />
                  <span>Telegram Desk</span>
                </a>
              )}
            </div>

            {/* Direct Contact Info */}
            <div className="mt-4 space-y-1.5 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-slate-400">WhatsApp / Call:</span>
                <a href={whatsapp ? `https://wa.me/${whatsapp}` : "tel:+917020096898"} className="font-bold text-sky-400 hover:text-white transition">
                  +91 70200 96898
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-slate-400">Email:</span>
                <a href="mailto:faithhealthcare5@gmail.com" className="font-medium text-sky-400 hover:text-white transition">
                  faithhealthcare5@gmail.com
                </a>
              </p>
            </div>

            {/* Verification Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-emerald-400 border border-slate-700">
                <ShieldMini /> GST Verified
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-blue-400 border border-slate-700">
                <DocMini /> IEC Exporter
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-amber-400 border border-slate-700">
                <SealMini /> WHO-GMP
              </span>
            </div>
          </div>

          {/* Column 2: Know Faith Health Care */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Know Faith Health Care
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-white transition">
                  Quality &amp; Export Policies
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition">
                  Wholesale Guides &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition">
                  Product Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Therapeutic Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/catalog?category=Antibiotics" className="hover:text-white transition">
                  Antibiotics &amp; Anti-infectives
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=ED%20Medicines" className="hover:text-white transition">
                  ED &amp; Men&apos;s Health
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Cancer%20Medicine" className="hover:text-white transition">
                  Oncology &amp; Cancer Care
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Pain%20Relief" className="hover:text-white transition">
                  Pain Relief &amp; Analgesics
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Steroids" className="hover:text-white transition">
                  Steroids &amp; Hormones
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Antiviral" className="hover:text-white transition">
                  Antiviral &amp; HIV Medicines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Compliance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Our Policies
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/policies#privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies#returns" className="hover:text-white transition">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#export" className="hover:text-white transition">
                  Export Compliance
                </Link>
              </li>
              <li>
                <Link href="/policies#editorial" className="hover:text-white transition">
                  Editorial &amp; Verification
                </Link>
              </li>
            </ul>

            {/* Active Export Destinations */}
            <div className="mt-6">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Major Export Corridors
              </h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {markets.map((m) => (
                  <span
                    key={m.code}
                    className="inline-flex items-center gap-1.5 rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-slate-700/60"
                  >
                    <span className="text-xs">{m.flag}</span>
                    <span>{m.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trade & Medical Disclaimer (1mg standard) */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-[11px] leading-relaxed text-slate-500">
          <p>
            <strong className="text-slate-400">Trade &amp; Regulatory Notice:</strong> The information provided on Faith Health Care is intended solely for wholesale healthcare buyers, licensed pharmacies, hospitals, and pharmaceutical importers. Faith Health Care adheres strictly to the Drugs and Cosmetics Act, 1940 and the export policies of the Directorate General of Foreign Trade (DGFT), Government of India. Prescription medications require a valid medical prescription and regulatory import permit where applicable.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-slate-400">
            <p>© {new Date().getFullYear()} FAITH HEALTH CARE. All rights reserved. Global Pharmaceutical Export Desk · India.</p>
            <p className="text-slate-500">WHO-GMP Compliant Pharmaceutical Supply</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ShieldMini() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3.5v5.2c0 4.3-2.9 7.4-7 9.3-4.1-1.9-7-5-7-9.3V6.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.1l1.8 1.8 3.8-3.9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocMini() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 9h8M8 13h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SealMini() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="11" r="6.5" fill="#f59e0b" />
      <path
        d="M9.4 11.1l1.5 1.5 3.2-3.3"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalMini() {
  return (
    <svg className="h-2.5 w-2.5 opacity-70" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3.5H3.5A1.5 1.5 0 002 5v7.5A1.5 1.5 0 003.5 14H11a1.5 1.5 0 001.5-1.5V10M9 2h5v5M14 2L7.5 8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.99 2C6.48 2 2 6.48 2 12s4.48 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.64 6.85l-1.55 7.3c-.12.52-.42.65-.85.4l-2.35-1.73-1.13 1.09c-.13.13-.23.23-.47.23l.17-2.39 4.35-3.93c.19-.17-.04-.26-.29-.1l-5.38 3.39-2.32-.72c-.5-.16-.51-.5.11-.74l9.06-3.49c.42-.15.78.1.65.69z" />
    </svg>
  );
}

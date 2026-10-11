import Image from "next/image";
import Link from "next/link";

const markets = [
  { code: "gb", name: "United Kingdom" },
  { code: "us", name: "United States" },
  { code: "de", name: "Germany" },
  { code: "nl", name: "Netherlands" },
  { code: "be", name: "Belgium" },
];

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918857030167";
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME || "V_10120";

  return (
    <footer className="relative overflow-hidden text-emerald-mist">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(520px 220px at 10% 0%, rgba(5,150,105,0.38) 0%, transparent 55%), linear-gradient(180deg, #0a192f 0%, #050d1a 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald/40 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-3xl leading-none tracking-tight text-white md:text-[2.15rem]">
              LIFE CURE
              <span
                className="brand-live-dot"
                title="Always live"
                aria-label="Always live"
                role="img"
              />
            </p>
            <p className="mt-1.5 text-[0.7rem] text-white/45">
              Pharmaceutical healthcare &amp; export · Est. 2021
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <p className="text-[0.7rem] font-medium tracking-wide text-white/55">
              Contact us
            </p>
            <a
              href={whatsapp ? `https://wa.me/${whatsapp}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="pressable inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-[#062816] transition hover:brightness-110"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`https://t.me/${telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on Telegram"
              className="pressable inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-white/30 hover:bg-white/10"
            >
              <TelegramIcon />
            </a>
          </div>
        </div>

        <div className="mt-3.5 space-y-2.5 border-t border-white/[0.08] pt-3">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-medium">
            <li className="inline-flex items-center gap-1 text-[#7ec8bf]">
              <ShieldMini />
              GST verified
            </li>
            <li className="inline-flex items-center gap-1 text-[#8eb8c9]">
              <DocMini />
              IEC verified
            </li>
            <li className="inline-flex items-center gap-1 text-[#d4b45a]">
              <SealMini />
              Verified Exporter
            </li>
            <li>
              <a
                href="https://www.indiamart.com/vitalwave/profile.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/40 transition hover:text-white/70"
              >
                IndiaMART profile
                <ExternalMini />
              </a>
            </li>
            <li>
              <Link
                href="/insights"
                className="text-white/40 transition hover:text-white/70"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-white/40 transition hover:text-white/70"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/policies"
                className="text-white/40 transition hover:text-white/70"
              >
                Policies
              </Link>
            </li>
          </ul>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
                Export markets
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {markets.map((m) => (
                  <li
                    key={m.code}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] py-0.5 pl-0.5 pr-2"
                  >
                    <span className="relative inline-flex h-3.5 w-3.5 overflow-hidden rounded-full ring-1 ring-white/15">
                      <Image
                        src={`/images/flags/${m.code}.png`}
                        alt=""
                        width={14}
                        height={14}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="text-[0.65rem] text-white/70">{m.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[0.65rem] text-white/30 sm:text-right">
              © {new Date().getFullYear()} LIFE CURE · Business enquiries only
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ShieldMini() {
  return (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="11" r="6.5" fill="#C9A227" />
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


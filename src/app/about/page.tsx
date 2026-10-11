import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { getReviewStats } from "@/lib/reviews-store";

export const metadata: Metadata = {
  title: "About",
  description:
    "Life Cure — Nagpur-based pharmaceutical wholesaler, distributor & exporter. GST & IEC verified. Est. 2021.",
};

const facts: {
  label: string;
  value: string;
  detail: string;
  accent: string;
  wash: string;
  icon: ReactNode;
}[] = [
  {
    label: "Nature of business",
    value: "Wholesaler / Distributor",
    detail: "Exporter · manufacturer · trader",
    accent: "#059669",
    wash: "rgba(5, 150, 105, 0.12)",
    icon: <BriefcaseIcon />,
  },
  {
    label: "Legal status",
    value: "Proprietorship",
    detail: "Registered Indian business",
    accent: "#0a192f",
    wash: "rgba(10, 25, 47, 0.12)",
    icon: <SealIcon />,
  },
  {
    label: "Established",
    value: "2021",
    detail: "GST registered · 2023",
    accent: "#10b981",
    wash: "rgba(16, 185, 129, 0.14)",
    icon: <CalendarIcon />,
  },
  {
    label: "Team size",
    value: "Up to 10 people",
    detail: "Focused wholesale & export desk",
    accent: "#047857",
    wash: "rgba(4, 120, 87, 0.16)",
    icon: <TeamIcon />,
  },
  {
    label: "Exporting",
    value: "3+ years",
    detail: "IEC-verified trade experience",
    accent: "#059669",
    wash: "rgba(5, 150, 105, 0.12)",
    icon: <GlobeIcon />,
  },
  {
    label: "Product range",
    value: "Tablets to injectables",
    detail: "Capsules · creams · specialty meds",
    accent: "#065f46",
    wash: "rgba(6, 95, 70, 0.12)",
    icon: <CapsuleIcon />,
  },
  {
    label: "Additional business",
    value: "Wholesale",
    detail: "Bulk & partner-ready supply",
    accent: "#059669",
    wash: "rgba(5, 150, 105, 0.1)",
    icon: <CartIcon />,
  },
];

const exportMarkets = [
  { name: "United Kingdom", code: "gb" },
  { name: "United States", code: "us" },
  { name: "Germany", code: "de" },
  { name: "Netherlands", code: "nl" },
  { name: "Belgium", code: "be" },
];

export default function AboutPage() {
  const { average, count } = getReviewStats();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      {/* Intro */}
      <header
        data-scroll
        className="grid items-start gap-x-8 gap-y-4 md:grid-cols-[auto_1fr] md:gap-x-12"
      >
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md ring-1 ring-emerald-500/20 md:h-24 md:w-24">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
            <path
              d="M12 4v16m-8-8h16"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 font-semibold">About</p>
          <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl">
            Life Cure
          </h1>

          <ul className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[0.8rem] text-ink-soft/80">
            <li className="inline-flex items-center gap-1">
              <CalendarSmallIcon />
              Est. 2021
            </li>
            <li
              className="inline-flex items-center gap-1 font-medium text-[#0f6b63]"
              title="Registered · Maharashtra (27)"
            >
              <GstBadgeIcon />
              GST verified
            </li>
            <li
              className="inline-flex items-center gap-1 font-medium text-[#1a5f7a]"
              title="Import–export code on file"
            >
              <IecBadgeIcon />
              IEC verified
            </li>
            <li
              className="inline-flex items-center gap-1 font-medium text-[#8A6A12]"
              title="3+ years exporting"
            >
              <VerifiedExporterBadge />
              Verified Exporter
            </li>
            {count > 0 && (
              <li>
                <Link
                  href="/reviews"
                  className="inline-flex items-center gap-1 transition hover:text-teal"
                  aria-label={`${average.toFixed(1)} from ${count} reviews`}
                >
                  <StarsMini value={average} />
                  <span className="font-semibold tabular-nums text-ink">
                    {average.toFixed(1)}
                  </span>
                  <span className="text-ink-soft/55">({count})</span>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="max-w-3xl md:col-span-2">
          <p className="text-base leading-relaxed text-ink-soft/85 md:text-lg">
            Established in 2021, Life Cure is a Nagpur-based exporter,
            manufacturer, wholesaler, and trader of pharmaceutical tablets,
            capsules, injections, creams, and related specialty medicines.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft/75 md:text-base">
            We focus on reliable supply, clear communication, and quality
            products for domestic and international partners — with transparent
            trade terms and responsive enquiry handling on WhatsApp or Telegram.
          </p>

          <a
            href="https://www.indiamart.com/vitalwave/profile.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal underline-offset-4 hover:underline"
          >
            View company profile on IndiaMART
            <ExternalIcon />
          </a>
        </div>
      </header>

      {/* Color-coded fact grid */}
      <section data-scroll className="mt-10 md:mt-12">
        <div className="mb-2">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-sage">
            At a glance
          </p>
          <h2 className="mt-0.5 font-display text-base text-ink md:text-lg">
            Company details
          </h2>
        </div>

        <div className="flex flex-col gap-1.5">
          {facts.map((fact) => (
            <article
              key={fact.label}
              className="group relative overflow-hidden rounded-lg border border-line/80 bg-white/70 px-2.5 py-[0.45rem] transition hover:border-transparent hover:shadow-[0_10px_24px_-20px_rgba(12,46,58,0.3)]"
              style={
                {
                  "--fact-accent": fact.accent,
                  "--fact-wash": fact.wash,
                } as CSSProperties
              }
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-90"
                style={{
                  background: `radial-gradient(120% 90% at 0% 0%, ${fact.wash}, transparent 55%)`,
                }}
              />
              <div
                className="absolute left-0 top-0 h-full w-px rounded-l-lg"
                style={{ background: fact.accent }}
              />
              <div className="relative flex items-center gap-2">
                <span
                  className="inline-flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded"
                  style={{
                    background: fact.wash,
                    color: fact.accent,
                  }}
                >
                  {fact.icon}
                </span>
                <div className="min-w-0 flex-1 sm:flex sm:items-baseline sm:justify-between sm:gap-2.5">
                  <div className="min-w-0 sm:flex sm:items-baseline sm:gap-2.5">
                    <p
                      className="text-[0.6rem] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: fact.accent }}
                    >
                      {fact.label}
                    </p>
                    <p className="font-display text-[0.84rem] leading-tight text-ink">
                      {fact.value}
                    </p>
                  </div>
                  <p className="text-[0.66rem] leading-tight text-ink-soft/65 sm:text-right sm:shrink-0">
                    {fact.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Export markets */}
      <section data-scroll className="mt-8 md:mt-10">
        <div className="mb-2">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-sage">
            Trade reach
          </p>
          <h2 className="mt-0.5 font-display text-base text-ink md:text-lg">
            Top export markets
          </h2>
          <p className="mt-0.5 max-w-xl text-[0.7rem] text-ink-soft/70">
            Primary destinations listed on our IndiaMART company profile.
          </p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {exportMarkets.map((m) => (
            <li
              key={m.code}
              className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-white/70 py-1 pl-1 pr-2.5"
            >
              <span className="relative inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-line/70">
                <Image
                  src={`/images/flags/${m.code}.png`}
                  alt=""
                  width={20}
                  height={20}
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="text-xs font-medium text-ink">{m.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How we work */}
      <section data-scroll className="mt-10 grid gap-2 sm:grid-cols-3 md:mt-12">
        {[
          {
            title: "Browse",
            text: "Filter by category & dosage form.",
            accent: "#0f6b63",
            icon: <SearchIcon />,
          },
          {
            title: "Enquire",
            text: "WhatsApp or Telegram in one tap.",
            accent: "#25D366",
            icon: <ChatIcon />,
          },
          {
            title: "Supply",
            text: "Wholesale & export from Nagpur.",
            accent: "#1a5f7a",
            icon: <TruckIcon />,
          },
        ].map((step) => (
          <div
            key={step.title}
            className="flex items-center gap-2 rounded-xl border border-line/70 bg-white/50 px-2.5 py-2"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: step.accent }}
            >
              {step.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink">{step.title}</p>
              <p className="text-[0.68rem] leading-snug text-ink-soft/70">
                {step.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div data-scroll className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-medium text-white hover:bg-teal-deep"
        >
          Browse the catalog
          <ArrowIcon />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-teal underline-offset-4 hover:underline"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function VerifiedExporterBadge() {
  return (
    <span
      className="relative inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <circle cx="12" cy="11" r="7.5" fill="#C9A227" />
        <circle
          cx="12"
          cy="11"
          r="6.2"
          stroke="#8A6A12"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M9.2 11.1l1.7 1.7 3.6-3.7"
          stroke="#fff"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.2 17.2h7.6l-1.1 3.2-2.7-1.4-2.7 1.4-1.1-3.2z"
          fill="#B42318"
        />
      </svg>
    </span>
  );
}

function GstBadgeIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l7 3.5v5.2c0 4.3-2.9 7.4-7 9.3-4.1-1.9-7-5-7-9.3V6.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 12.1l1.8 1.8 3.8-3.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IecBadgeIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M7 10h4M7 14h10M14 10h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarSmallIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 text-ink-soft/60"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 3.5V7M16 3.5V7M4 10h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarsMini({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <span
      className="inline-flex items-center gap-0.5 text-amber-500"
      aria-hidden
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={i < full ? 0 : 1.4}
        >
          <path d="M10 2.5l2.2 4.5 5 .7-3.6 3.5.9 5L10 13.8 5.5 16.2l.9-5L2.8 7.7l5-.7L10 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
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

function iconClass() {
  return "h-3 w-3";
}

function BriefcaseIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7M4 9a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9zM4 12h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SealIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l2.2 2.2L17 4.5l.3 2.8L20 8.5l-1.5 2.4L20 13.3l-2.7 1.2-.3 2.8L14.2 16.6 12 18.8l-2.2-2.2-2.8.7.3-2.8L4 13.3l1.5-2.4L4 8.5l2.7-1.2.3-2.8 2.8.7L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.2l1.6 1.6 3.4-3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 18c.9-2.2 2.7-3.4 5.5-3.4s4.6 1.2 5.5 3.4M14 14.2c1.8.2 3.2 1.1 4 2.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5"
        width="17"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8 3.5V7M16 3.5V7M3.5 10h17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.5 12h17M12 3.5c2.5 2.8 3.8 5.6 3.8 8.5S14.5 17.7 12 20.5C9.5 17.7 8.2 14.9 8.2 12S9.5 6.3 12 3.5z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CapsuleIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 15.5l7-7a3.5 3.5 0 015 5l-7 7a3.5 3.5 0 01-5-5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className={iconClass()} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 5h1.8l1.6 10.2a1.5 1.5 0 001.5 1.3h8.4a1.5 1.5 0 001.5-1.2L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 18.5L4 21V7a3 3 0 013-3h10a3 3 0 013 3v8.5a3 3 0 01-3 3H7z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 7h11v10H3V7zM14 10h4l3 3v4h-7v-7zM7 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


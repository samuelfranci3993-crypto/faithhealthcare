"use client";

import Link from "next/link";
import { COMPANY, formatPhonePretty, getContact } from "@/lib/trust";

/** Compact trust strip for home page. */
export default function TrustBand() {
  const contact = getContact();
  const phone = formatPhonePretty(contact.whatsapp);

  return (
    <section
      data-scroll
      className="border-y border-line/80 bg-gradient-to-b from-white/50 to-emerald-50/40"
    >
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-semibold">
              Why partners enquire with us
            </p>
            <h2 className="mt-1 font-display text-2xl text-ink md:text-3xl">
              Built for wholesale trust
            </h2>
            <p className="mt-2 text-sm text-ink-soft/80">
              GST &amp; IEC verified exporter from {COMPANY.city}. Replies within{" "}
              {COMPANY.responseSla}. {COMPANY.moqNote}.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-emerald-600 underline-offset-4 hover:underline lg:self-end"
          >
            Company details
            <span aria-hidden>→</span>
          </Link>
        </div>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Registered business", text: "GST verified · Maharashtra" },
            {
              title: "Export ready",
              text: "3+ years exporting · IEC on file",
            },
            {
              title: "Fast response",
              text: `Replies within ${COMPANY.responseSla}`,
            },
            {
              title: "Direct contact",
              text: phone || `@${contact.telegram}`,
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-line/70 bg-white/70 px-3.5 py-3"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-emerald-700">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-snug text-ink">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

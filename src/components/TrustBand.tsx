"use client";

import Link from "next/link";
import { COMPANY, formatPhonePretty, getContact } from "@/lib/trust";

export default function TrustBand() {
  const contact = getContact();
  const phone = formatPhonePretty(contact.whatsapp);

  const pillars = [
    {
      title: "100% Genuine Medicines",
      desc: "Direct manufacturer sourcing with authentic batch numbers & COA certificates.",
      badge: "AUTHENTIC",
      badgeColor: "bg-emerald-50 text-emerald-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-emerald-600">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "WHO-GMP & IEC Certified",
      desc: "Fully compliant with Indian FDA, GST, and international export clearance regulations.",
      badge: "GOVT COMPLIANT",
      badgeColor: "bg-blue-50 text-blue-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-blue-600">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Cold Chain & Secure Packing",
      desc: "Temperature-monitored international export packing with drop-test safety standards.",
      badge: "SAFE DISPATCH",
      badgeColor: "bg-purple-50 text-purple-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-purple-600">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Instant Quotation Desk",
      desc: `Replies within ${COMPANY.responseSla} on WhatsApp & Telegram with transparent wholesale pricing.`,
      badge: "LIVE SUPPORT",
      badgeColor: "bg-sky-50 text-sky-700",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-sky-600">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-sky-50/50 border-y border-sky-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <span className="inline-flex items-center rounded-md bg-sky-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-sky-800">
              Trust &amp; Compliance
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
              Why Healthcare Buyers Choose Faith Health Care
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              India&apos;s dependable wholesale pharmaceutical partner. Direct supply from licensed WHO-GMP manufacturers.
            </p>
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
          >
            <span>Learn More About Faith Health Care</span>
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="flex flex-col justify-between rounded-2xl border border-sky-100 bg-white p-5 shadow-xs hover:border-sky-300 hover:shadow-md hover:shadow-sky-500/5 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                    {p.icon}
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span>Verified Exporter</span>
                <span className="text-emerald-700 font-bold">100% Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

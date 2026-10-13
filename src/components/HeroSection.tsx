"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Medicine } from "@/types/medicine";
import ExpressSearchHero from "./ExpressSearchHero";

type HeroSectionProps = {
  totalMedicines?: number;
  reviewAverage?: number;
  reviewCount?: number;
  medicines?: Medicine[];
};

const PROMO_SLIDES = [
  {
    tag: "FAITH HEALTH CARE · GLOBAL EXPORT DESK",
    title: "Genuine Wholesale Medicines Direct from Certified WHO-GMP Facilities",
    desc: "Tablets, capsules, injections, creams, and specialty formulations. Direct WhatsApp enquiry with instant quote in seconds.",
    ctaText: "Explore Full Catalog",
    ctaHref: "/catalog",
    badge: "Direct Wholesale Pricing · 150+ Formulations",
    bgGradient: "from-[#e0f2fe] via-[#f0f9ff] to-[#ffffff]",
    accentColor: "#0284c7",
  },
  {
    tag: "ANTIBIOTICS & INFECTIOUS DISEASE LINES",
    title: "High-Demand Antibiotic Formulations in Bulk Export Packs",
    desc: "Amoxicillin + Clavulanate, Azithromycin, Ciprofloxacin, Doxycycline & Cefixime ready for immediate dispatch.",
    ctaText: "View Antibiotics Formulary",
    ctaHref: "/catalog?category=Antibiotics",
    badge: "Instant WhatsApp Quotation in 60s",
    bgGradient: "from-[#f0fdf4] via-[#f7fee7] to-[#ffffff]",
    accentColor: "#059669",
  },
  {
    tag: "MEN'S HEALTH & PERFORMANCE LINES",
    title: "Full Range of Sildenafil, Tadalafil & Vardenafil Brands",
    desc: "Cenforce, Vidalista, Fildena, Kamagra & specialty strengths available for wholesale distribution worldwide.",
    ctaText: "View ED Category Range",
    ctaHref: "/catalog?category=ED+Medicines",
    badge: "Discreet Global Packing & Tracking",
    bgGradient: "from-[#eff6ff] via-[#f0f9ff] to-[#ffffff]",
    accentColor: "#2563eb",
  },
];

const QUICK_SERVICE_TILES = [
  {
    title: "Order Medicines",
    desc: "150+ formulations in stock",
    icon: (
      <svg className="h-6 w-6 text-sky-600" viewBox="0 0 24 24" fill="none">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/catalog",
    badge: "150+ Products",
    bg: "bg-sky-50",
  },
  {
    title: "Instant 1-Click Quote",
    desc: "Direct pricing on WhatsApp",
    icon: (
      <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
      </svg>
    ),
    href: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
      ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Faith Health Care, I would like an instant wholesale quotation.")}`
      : `https://wa.me/917020096898?text=${encodeURIComponent("Hello Faith Health Care, I would like an instant wholesale quotation.")}`,
    badge: "0 Forms Needed",
    bg: "bg-emerald-50",
    isExternal: true,
  },
  {
    title: "Bulk RFQ / Inquiry",
    desc: "Wholesale trade discount",
    icon: (
      <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/about",
    badge: "Fast Dispatch",
    bg: "bg-blue-50",
  },
  {
    title: "Verified Credentials",
    desc: "GST & IEC export certified",
    icon: (
      <svg className="h-6 w-6 text-amber-600" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/policies",
    badge: "100% Genuine",
    bg: "bg-amber-50",
  },
];

export default function HeroSection({
  totalMedicines = 150,
  reviewAverage = 4.8,
  reviewCount = 28,
  medicines = [],
}: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto rotate promo slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((curr) => (curr + 1) % PROMO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = PROMO_SLIDES[activeSlide];

  return (
    <section className="bg-white pb-8 pt-4 sm:pt-6 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Light Blue Promo Hero Banner Carousel */}
        <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-r shadow-xs transition-all duration-500">
          <div className={`p-6 sm:p-10 md:p-12 bg-gradient-to-r ${slide.bgGradient}`}>
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-sky-700">
                  {slide.tag}
                </span>
                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-2xs">
                  {slide.badge}
                </span>
              </div>

              <h1 className="font-display text-2xl font-black leading-tight text-slate-900 sm:text-3xl md:text-4xl">
                {slide.title}
              </h1>

              <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed">
                {slide.desc}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.ctaHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-700 active:scale-95"
                >
                  <span>{slide.ctaText}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>

                <a
                  href={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
                    ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Faith Health Care, please send your wholesale price list.")}`
                    : `https://wa.me/917020096898?text=${encodeURIComponent("Hello Faith Health Care, please send your wholesale price list.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-600/30 bg-emerald-50 px-5 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-100"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-emerald-600">
                    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
                  </svg>
                  <span>1-Tap WhatsApp Quote</span>
                </a>
              </div>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 right-5 flex items-center gap-1.5">
            {PROMO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === i ? "w-6 bg-sky-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 4-Tile Quick Service Grid */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {QUICK_SERVICE_TILES.map((tile) => {
            const content = (
              <div className="flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-2xs transition hover:border-sky-400 hover:shadow-md group">
                <div className="flex items-start justify-between gap-2">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tile.bg} transition group-hover:scale-105`}>
                    {tile.icon}
                  </div>
                  <span className="rounded-md bg-sky-50 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">
                    {tile.badge}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-600">
                    {tile.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tile.desc}
                  </p>
                </div>
              </div>
            );

            return tile.isExternal ? (
              <a
                key={tile.title}
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <Link key={tile.title} href={tile.href}>
                {content}
              </Link>
            );
          })}
        </div>

        {/* Fast Search & 1-Tap Category Filters */}
        {medicines && medicines.length > 0 && (
          <div className="mt-6">
            <ExpressSearchHero medicines={medicines} />
          </div>
        )}
      </div>
    </section>
  );
}

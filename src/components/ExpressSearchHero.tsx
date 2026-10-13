"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Medicine } from "@/types/medicine";
import { inrToUsd, parseUnitPrice } from "@/lib/price";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";

type ExpressSearchHeroProps = {
  medicines: Medicine[];
};

const POPULAR_CATEGORIES = [
  { name: "Antibiotics", icon: "💊", count: "30+" },
  { name: "ED Medicines", icon: "⚡", count: "35+" },
  { name: "Anti Cancer", icon: "🧬", count: "25+" },
  { name: "Pain Killers", icon: "🛡️", count: "20+" },
  { name: "Steroids", icon: "🧪", count: "15+" },
  { name: "Cardiac", icon: "❤️", count: "18+" },
];

export default function ExpressSearchHero({ medicines }: ExpressSearchHeroProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();
  const { user } = useUser();

  const results = query.trim()
    ? medicines
        .filter((m) => {
          const text = `${m.name} ${m.composition || ""} ${m.brand || ""} ${m.category || ""}`.toLowerCase();
          return text.includes(query.trim().toLowerCase());
        })
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInstantQuote = (medicine: Medicine, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";
    let msg = `Hello Faith Health Care,\n\nI would like an instant wholesale quotation for:\n• *${medicine.name}*\n• Category: ${medicine.parentCategory || medicine.category || "General"}\n• Form: ${medicine.dosageForm || medicine.category || "Standard"}`;
    if (medicine.price) {
      msg += `\n• Listed Price: ${medicine.price}`;
    }
    if (user) {
      msg += `\n\nBuyer: ${user.name} (${user.countryCode} ${user.phone}) - ${user.country}`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleQuickAdd = (medicine: Medicine, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const unit = parseUnitPrice(medicine.price);
    const priceUsd = unit ? inrToUsd(unit.amountInr) : 15.0;

    const item = {
      id: medicine.slug,
      slug: medicine.slug,
      name: medicine.name,
      price: priceUsd,
      category: medicine.parentCategory || medicine.category || "General",
      image: medicine.images?.[0] || "/logo1.webp",
      packSize: medicine.packaging || undefined,
      manufacturer: medicine.brand || undefined,
    };

    addToCart(item, 1);
  };

  return (
    <div ref={containerRef} className="relative z-30 mx-auto mt-6 w-full max-w-3xl">
      {/* Search Input Box */}
      <div className="relative rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200 transition-all focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-500 sm:p-2.5">
        <div className="relative flex items-center">
          <div className="pointer-events-none pl-3 text-sky-600 sm:pl-4">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6">
              <path
                d="M21 21l-4.35-4.35M18 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search for medicines, active molecules, or brands..."
            className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none sm:px-4 sm:py-2.5 sm:text-base font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              className="mr-2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          <Link
            href={query ? `/catalog?q=${encodeURIComponent(query)}` : "/catalog"}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sky-700 transition active:scale-95 sm:px-5 sm:text-sm"
          >
            <span>Search</span>
            <span className="hidden sm:inline">Medicines</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Live Search Instant Results Popover (0 extra clicks) */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-sky-100 bg-white/95 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
          <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 text-xs font-semibold text-slate-500 flex justify-between items-center">
            <span>
              {results.length > 0
                ? `Instant Matches (${results.length}) — Click 1-Tap Quote or Add directly`
                : "No matching medicines"}
            </span>
            <span className="text-[10px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
              Direct Export Desk
            </span>
          </div>

          {results.length > 0 ? (
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {results.map((med) => (
                <div
                  key={med.slug}
                  className="flex items-center justify-between gap-3 p-3 transition hover:bg-sky-50/50"
                >
                  <Link
                    href={`/catalog/${med.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-1 items-center gap-3 min-w-0"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {med.images?.[0] ? (
                        <Image
                          src={med.images[0]}
                          alt={med.name}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] text-slate-400">
                          Rx
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-900 hover:text-sky-600">
                        {med.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {med.composition || med.dosageForm || "Specialty formulation"}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{med.parentCategory || med.category}</span>
                        {med.brand && <span>· By {med.brand}</span>}
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleInstantQuote(med, e)}
                      title="Direct WhatsApp Quote"
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
                      </svg>
                      <span>1-Tap Quote</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(med, e)}
                      title="Add to order"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-600 hover:text-white active:scale-95"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="bg-slate-50/80 p-2.5 text-center">
                <Link
                  href={`/catalog?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-semibold text-sky-700 hover:underline"
                >
                  View full results for &ldquo;{query}&rdquo; in Catalog &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-slate-500">
              No products found matching &ldquo;{query}&rdquo;.
              <div className="mt-2">
                <Link
                  href="/catalog"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-bold text-sky-600 hover:underline"
                >
                  Browse all 150+ medicines &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1-Click Fast Category Pills */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800/80 mr-1 hidden sm:inline">
          ⚡ 1-Tap Filter:
        </span>
        {POPULAR_CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={`/catalog?category=${encodeURIComponent(cat.name)}`}
            className="group inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs backdrop-blur-xs transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 active:scale-95"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="rounded-full bg-sky-100 px-1.5 py-0.2 text-[10px] text-sky-800 font-bold">
              {cat.count}
            </span>
          </Link>
        ))}
      </div>

      {/* Trust micro-bar for fewer clicks reassurance */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">1-Click WhatsApp Quotes (0 Forms)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Direct Factory Wholesale MOQ</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="h-4 w-4 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">IEC &amp; GST Verified Desk</span>
        </div>
      </div>
    </div>
  );
}

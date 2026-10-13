"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Medicine } from "@/types/medicine";
import { snippet } from "@/lib/medicines";
import { dosageGlyph } from "@/lib/categoryStyle";
import { inrToUsd, parseUnitPrice } from "@/lib/price";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";

type MedicineCardProps = {
  medicine: Medicine;
  index?: number;
  reveal?: boolean;
  delayMs?: number;
};

export default function MedicineCard({
  medicine,
  index = 0,
  reveal = true,
  delayMs = 0,
}: MedicineCardProps) {
  const { addToCart } = useCart();
  const { user } = useUser();
  const [justAdded, setJustAdded] = useState(false);

  const image = medicine.images?.[0];
  const summary = snippet(medicine.description || medicine.composition, 75);
  const glyph = dosageGlyph(medicine.category || medicine.dosageForm);
  const unit = parseUnitPrice(medicine.price);
  const itemPriceUsd = unit ? inrToUsd(unit.amountInr) : 15.0;

  // Rating calculation (deterministic 4.5 - 4.9)
  const ratingValue = (4.5 + ((index * 7 + (medicine.name.length % 5)) % 5) * 0.1).toFixed(1);
  const reviewCount = 42 + ((index * 13 + medicine.slug.length * 3) % 180);

  // MRP calculation for wholesale discount badge
  const indicativeInr = unit ? unit.amountInr : 850;
  const mrpInr = Math.round(indicativeInr * 1.25);
  const discountPct = Math.round(((mrpInr - indicativeInr) / mrpInr) * 100);

  // 1-Click Fast Direct Add (no blocking login modal)
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItem = {
      id: medicine.slug,
      slug: medicine.slug,
      name: medicine.name,
      price: itemPriceUsd,
      category: medicine.parentCategory || medicine.category || "General",
      image: image || "/logo1.webp",
      packSize: medicine.packaging || undefined,
      manufacturer: medicine.brand || undefined,
    };

    addToCart(cartItem, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleInstantWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";
    let msg = `Hello Faith Health Care,\n\nI would like an instant wholesale quotation for:\n• ${medicine.name}\n• Category: ${medicine.category || "General"}\n• Form: ${medicine.dosageForm || "General"}`;
    if (medicine.price) {
      msg += `\n• Listed Price: ${medicine.price}`;
    }
    if (user) {
      msg += `\n\nBuyer: ${user.name} (${user.countryCode} ${user.phone}) - ${user.country}`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      data-med-card={medicine.slug}
      style={{ transitionDelay: reveal ? `${delayMs}ms` : "0ms" }}
      className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_14px_28px_rgba(2,132,199,0.12)] ${
        reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <Link href={`/catalog/${medicine.slug}`} className="flex flex-1 flex-col">
        {/* Top Badges: Rating & Category */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="inline-flex items-center gap-1 rounded bg-sky-700 px-1.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
            <span>{ratingValue}</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[9px] font-normal opacity-90">({reviewCount})</span>
          </span>

          <span className="rounded-full bg-sky-50 border border-sky-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-800">
            {medicine.parentCategory || medicine.category || "Pharma"}
          </span>
        </div>

        {/* Product Media Image (Clean white canvas with subtle sky glow) */}
        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-50/70 p-3 transition group-hover:bg-sky-50/30">
          <span
            className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-md bg-white/95 text-sky-700 shadow-2xs"
            title={medicine.dosageForm || "Form"}
          >
            <DosageIcon kind={glyph} />
          </span>

          {image ? (
            <Image
              src={image}
              alt={medicine.name}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2.5 transition duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-slate-400">
              Rx
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="mt-3 flex flex-1 flex-col">
          <h3 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
            {medicine.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {medicine.packaging || `${medicine.dosageForm || "Medicine"} · Strip / Bottle`}
          </p>

          {medicine.brand && (
            <p className="text-[11px] font-medium text-slate-400">
              By {medicine.brand}
            </p>
          )}

          {/* Delivery & Dispatch Tag */}
          <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-sky-700">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-emerald-600">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Direct Dispatch · 100% Genuine</span>
          </div>

          {/* Pricing Section */}
          <div className="mt-3 pt-2 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400 line-through">
                MRP ₹{mrpInr.toLocaleString()}
              </span>
              <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-extrabold text-sky-700">
                {discountPct}% OFF
              </span>
            </div>

            <div className="mt-0.5 flex items-baseline justify-between">
              <p className="text-base font-extrabold text-slate-950">
                {medicine.price || `₹${indicativeInr.toLocaleString()}`}
              </p>
              <p className="text-[11px] font-semibold text-sky-600">
                Wholesale Export Rate
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Bar: 1-Click ADD + 1-Click WhatsApp Quote */}
      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
        {/* Instant ADD button (1-click direct to cart) */}
        <button
          type="button"
          onClick={handleAddToCart}
          title="Add to cart"
          aria-label={`Add ${medicine.name} to cart`}
          className={`flex-1 flex h-9 items-center justify-center gap-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-xs transition duration-150 active:scale-95 ${
            justAdded
              ? "bg-emerald-600 text-white"
              : "bg-sky-600 text-white hover:bg-sky-700 hover:shadow-md"
          }`}
        >
          {justAdded ? (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>ADDED</span>
            </>
          ) : (
            <>
              <span>ADD</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>

        {/* 1-Click WhatsApp Instant Quote */}
        <button
          type="button"
          onClick={handleInstantWhatsApp}
          title="Instant 1-Click WhatsApp Quote"
          aria-label={`Instant WhatsApp quote for ${medicine.name}`}
          className="inline-flex h-9 items-center gap-1 rounded-lg bg-emerald-600 px-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
          </svg>
          <span className="hidden sm:inline">1-Tap Quote</span>
        </button>

        {/* View Details Link */}
        <Link
          href={`/catalog/${medicine.slug}`}
          title="Full Medicine Specification"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50/50 active:scale-95"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

function DosageIcon({ kind }: { kind: string }) {
  const common = {
    className: "h-3.5 w-3.5",
    viewBox: "0 0 24 24",
    fill: "none" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case "syringe":
      return (
        <svg {...common}>
          <path
            d="M14 4l6 6M16.5 6.5l-9 9M8 15l-3 3 1 2 2 1 3-3M11 12l2 2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "capsule":
      return (
        <svg {...common}>
          <path
            d="M8.5 15.5l7-7a3.5 3.5 0 015 5l-7 7a3.5 3.5 0 01-5-5z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tube":
      return (
        <svg {...common}>
          <path
            d="M9 4h6v3H9V4zM10 7h4v11a2 2 0 01-2 2h0a2 2 0 01-2-2V7z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path
            d="M12 3s5.5 5.8 5.5 10a5.5 5.5 0 11-11 0C6.5 8.8 12 3 12 3z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bottle":
      return (
        <svg {...common}>
          <path
            d="M10 3h4v3h-4V3zM9 6h6l1 3v9a2 2 0 01-2 2H10a2 2 0 01-2-2V9l1-3z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "inhaler":
      return (
        <svg {...common}>
          <path
            d="M8 4h5l3 4v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-4zM11 14h2"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "jelly":
      return (
        <svg {...common}>
          <path
            d="M7 10c0-3 2.2-5 5-5s5 2 5 5c0 4-2 9-5 9s-5-5-5-9z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect
            x="5"
            y="8"
            width="14"
            height="8"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 8v8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

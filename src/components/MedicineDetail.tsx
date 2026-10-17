"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Medicine } from "@/types/medicine";
import {
  dosageGlyph,
  toneForCategory,
  toneForForm,
} from "@/lib/categoryStyle";
import { getPrimaryInsightForCategory } from "@/lib/insights";
import { formatUsd, parseUnitPrice } from "@/lib/price";
import { presentFields } from "@/lib/medicines";
import EnquireButton from "./EnquireButton";
import ProductGallery from "./ProductGallery";
import SpecsPanel from "./SpecsPanel";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";

export default function MedicineDetail({ medicine }: { medicine: Medicine }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isLoggedIn, openAuthModal, user } = useUser();

  const handleAddToCart = () => {
    const item = {
      id: medicine.slug,
      slug: medicine.slug,
      name: medicine.name,
      price: unitUsd || 15.0,
      category: medicine.parentCategory || medicine.category || "General",
      image: medicine.images?.[0] || "/logo1.webp",
      packSize: medicine.packaging || undefined,
      manufacturer: medicine.brand || undefined,
    };

    addToCart(item, quantity);
  };

  const handleInstantWhatsApp = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";
    let msg = `Hello Faith Health Care,\n\nI would like an instant wholesale quotation for:\n• *${medicine.name}*\n• Requested Qty: ${quantity}\n• Category: ${medicine.parentCategory || medicine.category || "General"}\n• Form: ${medicine.dosageForm || medicine.category || "Standard"}`;
    if (medicine.packaging) {
      msg += `\n• Packaging: ${medicine.packaging}`;
    }
    if (user) {
      msg += `\n\nBuyer: ${user.name} (${user.countryCode} ${user.phone}) - ${user.country}`;
      if (user.company) msg += `\nCompany: ${user.company}`;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const parentTone = toneForCategory(
    medicine.parentCategory || medicine.category
  );
  const formTone = toneForForm(medicine.category || medicine.dosageForm);
  const glyph = dosageGlyph(medicine.category || medicine.dosageForm);
  const unit = parseUnitPrice(medicine.price);
  const unitUsd = unit ? unit.amountUsd : null;
  const relatedGuide = getPrimaryInsightForCategory(
    medicine.parentCategory || medicine.category
  );

  const fields = presentFields(medicine).filter(
    (row) => row.label.toLowerCase() !== "price"
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <nav
        data-scroll
        className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft/70"
      >
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 transition hover:bg-teal-mist hover:text-teal"
        >
          Catalog
        </Link>
        {medicine.parentCategory && (
          <>
            <Chevron />
            <Link
              href={`/catalog?category=${encodeURIComponent(medicine.parentCategory)}`}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 transition hover:bg-teal-mist hover:text-teal"
            >
              {medicine.parentCategory}
            </Link>
          </>
        )}
        <Chevron />
        <span className="rounded-full bg-sand px-2 py-0.5 text-ink">
          {medicine.category}
        </span>
      </nav>

      <div
        data-scroll
        className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <div
          className="rounded-2xl border border-line/70 bg-white/70"
          style={{
            background: `radial-gradient(120% 90% at 0% 0%, ${parentTone.wash}, transparent 55%), rgba(255,255,255,0.75)`,
          }}
        >
          <div className="rounded-t-2xl border-b border-line/60 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {medicine.parentCategory && (
                <Chip
                  accent={parentTone.accent}
                  wash={parentTone.wash}
                  icon={categoryIcon(medicine.parentCategory)}
                  label={medicine.parentCategory}
                />
              )}
              <Chip
                accent={formTone.accent}
                wash={formTone.wash}
                icon={<DosageIcon kind={glyph} />}
                label={medicine.category || "Medicine"}
              />
            </div>
          </div>
          <div className="p-3 md:p-4">
            <ProductGallery images={medicine.images || []} name={medicine.name} />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Product details
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl lg:text-[2.75rem] text-balance">
            {medicine.name}
          </h1>

          {medicine.description && (
            <div className="mt-2.5 space-y-1.5 text-[0.8125rem] leading-relaxed text-ink-soft/75 md:text-sm">
              {medicine.description.split(/\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {medicine.composition && (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-ink-soft/85 md:text-base">
              <span
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                style={{
                  background: parentTone.wash,
                  color: parentTone.accent,
                }}
                aria-hidden
              >
                <FlaskIcon />
              </span>
              <span>
                <span className="text-ink-soft/55">Composition · </span>
                {medicine.composition}
              </span>
            </p>
          )}

          {/* 1mg Rating & Trust Strip */}
          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded bg-emerald-700 px-2 py-0.5 text-xs font-bold text-white shadow-xs">
              <span>4.6</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              128 verified ratings · 100% Genuine Export Quality
            </span>
          </div>

          {/* Wholesale Pricing on Request Block */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pricing Tier
                </p>
                <p className="text-2xl font-black text-slate-950 mt-0.5">
                  Wholesale Price on Request
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                Bulk / Export Rates
              </span>
            </div>

            <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
              Export quotation is customized based on order quantity, country destination, and air or sea cargo terms.
            </p>

            <p className="mt-2.5 text-[11px] text-emerald-700 font-semibold flex items-center gap-1 border-t border-slate-100 pt-2.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>In Stock · Ready for Direct Air &amp; Sea Cargo Dispatch Worldwide</span>
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {/* Quantity Selector + 1mg Coral Add to Cart */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold text-slate-800 shadow-xs hover:bg-slate-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-bold text-slate-800 shadow-xs hover:bg-slate-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* 1mg Signature Coral Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 rounded-xl bg-brand hover:bg-hover px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-brand/25 transition active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                ADD TO INQUIRY BASKET ({quantity})
              </button>

              <button
                type="button"
                onClick={handleInstantWhatsApp}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
                </svg>
                1-Tap Quote
              </button>

              <EnquireButton
                medicineName={medicine.name}
                price={medicine.price}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
              >
                Detailed RFQ
                <ArrowIcon />
              </EnquireButton>
            </div>

            <div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft/70 hover:text-teal hover:underline"
              >
                &larr; Back to full catalog
              </Link>
            </div>
          </div>

          {fields.length > 0 && (
            <SpecsPanel
              fields={fields.map((row) => ({
                label: row.label,
                value:
                  row.label.toLowerCase() === "price" && unitUsd && unit
                    ? `${formatUsd(unitUsd)} / ${unit.unit}`
                    : row.value,
              }))}
              parentTone={parentTone}
              formTone={formTone}
            />
          )}
        </div>
      </div>

      <section
        data-scroll
        className="mt-12 overflow-hidden rounded-2xl border border-line/70 px-5 py-6 md:px-7 md:py-7"
        style={{
          background: `radial-gradient(90% 80% at 0% 0%, ${parentTone.wash}, transparent 55%), rgba(255,255,255,0.65)`,
        }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
              Next step
            </p>
            <h2 className="mt-1 font-display text-xl text-ink md:text-2xl">
              Interested in {medicine.name}?
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-ink-soft/75">
              Tell us quantity and contact details — we&apos;ll reply on WhatsApp
              or Telegram with availability.
            </p>
          </div>
          <EnquireButton
            medicineName={medicine.name}
            price={medicine.price}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-deep"
          >
            Enquire now
            <ArrowIcon />
          </EnquireButton>
        </div>
      </section>

      {relatedGuide && (
        <section
          data-scroll
          className="mt-6 overflow-hidden rounded-2xl border border-line/70 px-5 py-5 md:px-6"
          style={{
            background: `radial-gradient(90% 80% at 0% 0%, ${parentTone.wash}, transparent 55%), rgba(255,255,255,0.7)`,
          }}
        >
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-sage">
            Related trade guide
          </p>
          <h2 className="mt-1 font-display text-lg text-ink md:text-xl">
            {relatedGuide.title}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-soft/75">
            {relatedGuide.description}
          </p>
          <Link
            href={`/insights/${relatedGuide.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
          >
            Read wholesale guide
            <span aria-hidden>→</span>
          </Link>
        </section>
      )}
    </div>
  );
}

function Chip({
  accent,
  wash,
  icon,
  label,
}: {
  accent: string;
  wash: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ background: wash, color: accent }}
    >
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/70"
        aria-hidden
      >
        {icon}
      </span>
      {label}
    </span>
  );
}

function Chevron() {
  return (
    <svg className="h-3.5 w-3.5 text-ink-soft/40" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M6 3l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function iconSvg(children: ReactNode, className = "h-3.5 w-3.5") {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {children}
    </svg>
  );
}

function categoryIcon(name: string): ReactNode {
  const key = name.toLowerCase();
  if (key.includes("ed") || key.includes("erectile")) return iconSvg(<path d="M19.5 12.5c1.5-1.6 1.5-4.2-.2-5.8a3.9 3.9 0 00-5.3.3L12 9l-1.9-2a3.9 3.9 0 00-5.4-.2c-1.7 1.6-1.7 4.2-.1 5.8L12 20l7.5-7.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
  if (key.includes("pain")) return iconSvg(<path d="M13 2L5 14h6l-1 8 9-13h-6l0-7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
  if (key.includes("cancer")) return iconSvg(<path d="M12 3l8 3.5v5.2c0 5-3.4 8.5-8 9.8-4.6-1.3-8-4.8-8-9.8V6.5L12 3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
  if (key.includes("diabet")) return <DropletIcon />;
  if (key.includes("cardiac") || key.includes("hypertens")) return iconSvg(<path d="M3 12h4l2.5-6 4 12L16 9h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
  if (key.includes("antibiotic") || key.includes("parasitic")) return <CapsuleIcon />;
  return <PillIcon />;
}

function DosageIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "syringe":
      return iconSvg(<path d="M14 4l6 6M16.5 6.5l-9 9M8 15l-3 3 1 2 2 1 3-3M11 12l2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
    case "capsule":
      return <CapsuleIcon />;
    case "drop":
      return <DropletIcon />;
    case "tube":
      return iconSvg(<path d="M9 4h6v3H9V4zM10 7h4v11a2 2 0 01-2 2h0a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
    case "bottle":
      return iconSvg(<path d="M10 3h4v3h-4V3zM9 6h6l1 3v9a2 2 0 01-2 2H10a2 2 0 01-2-2V9l1-3z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
    case "inhaler":
      return iconSvg(<path d="M8 4h5l3 4v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-4zM11 14h2" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
    default:
      return <PillIcon />;
  }
}

function FlaskIcon() {
  return iconSvg(<path d="M9 3h6M10 3v5.2L5.8 18a2.8 2.8 0 002.5 4h7.4a2.8 2.8 0 002.5-4L14 8.2V3M8.5 14h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />);
}

function ArrowIcon() {
  return iconSvg(<path d="M5 12h12M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />, "h-3.5 w-3.5");
}

function CapsuleIcon() {
  return iconSvg(<path d="M8.5 15.5l7-7a3.5 3.5 0 015 5l-7 7a3.5 3.5 0 01-5-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
}

function PillIcon() {
  return iconSvg(<><rect x="5" y="8" width="14" height="8" rx="4" stroke="currentColor" strokeWidth="1.7" /><path d="M12 8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></>);
}

function DropletIcon() {
  return iconSvg(<path d="M12 3s6 6.2 6 11a6 6 0 11-12 0c0-4.8 6-11 6-11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />);
}

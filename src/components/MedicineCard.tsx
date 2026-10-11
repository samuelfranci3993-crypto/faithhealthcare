"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import type { Medicine } from "@/types/medicine";
import { snippet } from "@/lib/medicines";
import { dosageGlyph, toneForCategory } from "@/lib/categoryStyle";
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
  const [viewBounce, setViewBounce] = useState(false);
  const { addToCart } = useCart();
  const { isLoggedIn, openAuthModal, user } = useUser();
  const image = medicine.images?.[0];
  const summary = snippet(medicine.description || medicine.composition, 90);
  const tone = toneForCategory(medicine.parentCategory || medicine.category);
  const variant = index % 6;
  const glyph = dosageGlyph(medicine.category || medicine.dosageForm);
  const unit = parseUnitPrice(medicine.price);
  const itemPriceUsd = unit ? inrToUsd(unit.amountInr) : 15.0;

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

    if (!isLoggedIn) {
      openAuthModal({ item: cartItem, quantity: 1 });
      return;
    }

    addToCart(cartItem, 1);
  };

  const handleInstantWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    let msg = `Hello Life Cure,\n\nI would like an instant wholesale quotation for:\n• ${medicine.name}\n• Category: ${medicine.category || "General"}\n• Form: ${medicine.dosageForm || "General"}`;
    if (medicine.price) {
      msg += `\n• Listed Price: ${medicine.price}`;
    }
    if (user) {
      msg += `\n\nBuyer: ${user.name} (${user.countryCode} ${user.phone}) - ${user.country}`;
    }
    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article
      data-med-card={medicine.slug}
      className={`med-card med-variant-${variant} group ${
        reveal ? "is-visible" : ""
      }`}
      style={
        {
          "--med-accent": tone.accent,
          "--med-wash": tone.wash,
          "--med-mist": tone.mist,
          transitionDelay: reveal ? `${delayMs}ms` : "0ms",
        } as CSSProperties
      }
    >
      <Link href={`/catalog/${medicine.slug}`} className="med-card-link">
        <div className="med-media">
          <span className="med-glyph" aria-hidden>
            <DosageIcon kind={glyph} />
          </span>
          {image ? (
            <Image
              src={image}
              alt={medicine.name}
              fill
              priority={index < 6}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-3.5 transition duration-700 ease-out group-hover:scale-[1.04] sm:p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-sage">
              No image
            </div>
          )}
        </div>

        <div className="med-body">
          <div className="med-meta">
            <span className="med-chip">
              {medicine.parentCategory || medicine.category}
            </span>
            {medicine.category && medicine.parentCategory && (
              <span className="med-form">{medicine.category}</span>
            )}
          </div>
          <h3 className="med-name">{medicine.name}</h3>
          {medicine.price && (
            <p className="mt-0.5 text-xs font-bold text-emerald-600">
              {medicine.price}
            </p>
          )}
          {summary && <p className="med-summary">{summary}</p>}
        </div>
      </Link>

      <div className="med-actions flex items-center justify-between gap-1.5 pt-2">
        <Link
          href={`/catalog/${medicine.slug}`}
          className={`med-view flex-1 text-xs${viewBounce ? " is-bouncing" : ""}`}
          onPointerDown={() => {
            setViewBounce(true);
            window.setTimeout(() => setViewBounce(false), 400);
          }}
          onAnimationEnd={(e) => {
            if (e.animationName === "med-view-bounce") setViewBounce(false);
          }}
        >
          <span className="med-view-label">Details</span>
          <span className="med-view-arrow" aria-hidden>
            →
          </span>
        </Link>

        {/* 1-Click WhatsApp Instant Quote */}
        <button
          type="button"
          onClick={handleInstantWhatsApp}
          title="Instant 1-Click WhatsApp Quote"
          aria-label={`Instant WhatsApp quote for ${medicine.name}`}
          className="inline-flex h-9 items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-110 hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
          </svg>
          <span className="hidden sm:inline">1-Tap Quote</span>
        </button>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          title="Add to cart"
          aria-label={`Add ${medicine.name} to cart`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-600/30 bg-emerald-50 text-emerald-800 shadow-sm transition hover:bg-emerald-100 hover:scale-105 active:scale-95"
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
        </button>
      </div>
    </article>
  );
}

function DosageIcon({ kind }: { kind: string }) {
  const common = {
    className: "h-4 w-4",
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


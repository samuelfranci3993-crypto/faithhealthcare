"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";
import type { Medicine } from "@/types/medicine";
import medicinesData from "../../data/medicines.json";
import { parseUnitPrice } from "@/lib/price";

const medicines = medicinesData as unknown as Medicine[];

const CATEGORY_LINKS = [
  { href: "/catalog", label: "All Medicines" },
  { href: "/catalog?category=Antibiotics", label: "Antibiotics" },
  { href: "/catalog?category=ED+Medicines", label: "ED & Men's Health" },
  { href: "/catalog?category=Anti+Cancer", label: "Cancer Care" },
  { href: "/catalog?category=Pain+Killers", label: "Pain Relief" },
  { href: "/catalog?category=Cardiac", label: "Cardiac & BP" },
  { href: "/catalog?category=Steroids", label: "Steroids" },
  { href: "/catalog?category=Skin+Care", label: "Skin Care" },
  { href: "/insights", label: "Export Insights" },
  { href: "/reviews", label: "Partner Reviews" },
  { href: "/about", label: "About Faith Health Care" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { totalItems, setIsCartOpen, addToCart } = useCart();
  const { user, isLoggedIn, openAuthModal } = useUser();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "faithhealthcare5@gmail.com";

  // Close search popover on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? medicines
        .filter((m) => {
          const text = `${m.name} ${m.composition || ""} ${m.brand || ""} ${m.category || ""}`.toLowerCase();
          return text.includes(searchQuery.trim().toLowerCase());
        })
        .slice(0, 5)
    : [];

  const handleInstantQuote = (med: Medicine, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let msg = `Hello Faith Health Care,\n\nI would like an instant wholesale quotation for:\n• *${med.name}*\n• Category: ${med.category || "General"}\n• Form: ${med.dosageForm || "General"}`;
    if (med.price) msg += `\n• Listed Price: ${med.price}`;
    if (user) msg += `\n\nBuyer: ${user.name} (${user.countryCode} ${user.phone}) - ${user.country}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // 1-Click direct add to cart (zero blocking auth)
  const handleQuickAdd = (med: Medicine, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const unit = parseUnitPrice(med.price);
    const priceUsd = unit ? unit.amountUsd : 15.0;
    const item = {
      id: med.slug,
      slug: med.slug,
      name: med.name,
      price: priceUsd,
      category: med.parentCategory || med.category || "General",
      image: med.images?.[0] || "/logo1.webp",
      packSize: med.packaging || undefined,
      manufacturer: med.brand || undefined,
    };
    addToCart(item, 1);
    setIsCartOpen(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Light Blue & White Top Strip: Deliver Everywhere & Contact Channels */}
      <div className="border-b border-sky-100 bg-[#f0f9ff] px-4 py-1.5 text-xs text-slate-600 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-sky-600">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Deliver to: <span className="font-bold text-slate-900 underline decoration-sky-300">Worldwide &amp; All India</span>
            </span>
            <span className="hidden text-sky-200 md:inline">|</span>
            <span className="hidden text-[11px] text-slate-600 md:inline">
              WHO-GMP &amp; ISO Sourced Pharmaceutical Export Desk
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Faith Health Care, I would like to place a bulk enquiry.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
                <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
              </svg>
              <span>+91 70200 96898</span>
            </a>
            <span className="text-sky-200">|</span>
            <a
              href={`mailto:${contactEmail}`}
              className="hidden lg:flex items-center gap-1 text-sky-700 hover:text-sky-900 font-semibold"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>{contactEmail}</span>
            </a>
            <span className="hidden lg:inline text-sky-200">|</span>
            <Link href="/insights" className="hover:text-sky-600">
              Insights
            </Link>
            <span className="text-sky-200">|</span>
            <Link href="/about" className="hover:text-sky-600">
              About Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar: Logo, Wide Search Bar with Live Autocomplete, 1-Click Order */}
      <div className="border-b border-slate-200 bg-white px-4 py-2.5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-6">
          {/* Logo in Faith Health Care Styling */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 shadow-md shadow-sky-500/25 text-white font-extrabold text-xl transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  FAITH <span className="text-sky-600">HEALTH CARE</span>
                </span>
                <span className="hidden sm:inline rounded-full bg-sky-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-sky-700">
                  Verified Desk
                </span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 -mt-0.5">
                Wholesale &amp; Export Pharmaceutical Desk
              </p>
            </div>
          </Link>

          {/* Centerpiece Search Bar with City Dropdown & Live Instant Autocomplete */}
          <div ref={searchContainerRef} className="relative hidden flex-1 max-w-2xl md:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-sky-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-100">
              <div className="flex items-center gap-1 border-r border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 shrink-0">
                <span>All Medicines</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-slate-400">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              <div className="relative flex flex-1 items-center">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search for Medicines, Salts, Brands, or Compositions..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none font-sans"
                />
              </div>

              <button
                type="submit"
                aria-label="Search Catalog"
                className="mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white transition hover:bg-sky-700 active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M21 21l-4.35-4.35M18 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </form>

            {/* Instant Search Results Dropdown (0-Click ordering) */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl z-50">
                <div className="border-b border-slate-100 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-500 flex justify-between items-center">
                  <span>Medicines matching &ldquo;{searchQuery}&rdquo;</span>
                  <span className="text-[10px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded">
                    Instant 1-Click Action
                  </span>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {searchResults.map((med) => (
                      <div
                        key={med.slug}
                        className="flex items-center justify-between gap-3 p-3 transition hover:bg-sky-50/50"
                      >
                        <Link
                          href={`/catalog/${med.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex flex-1 items-center gap-3 min-w-0"
                        >
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                            {med.images?.[0] ? (
                              <Image
                                src={med.images[0]}
                                alt={med.name}
                                fill
                                className="object-contain p-0.5"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[9px] text-slate-400">
                                Rx
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-bold text-slate-900 hover:text-sky-600">
                              {med.name}
                            </p>
                            <p className="truncate text-[11px] text-slate-500">
                              {med.composition || med.dosageForm || "General formulation"}
                            </p>
                          </div>
                        </Link>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* 1-Tap Quick Add button */}
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(med, e)}
                            className="flex items-center gap-1 rounded-md bg-sky-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-2xs hover:bg-sky-700 active:scale-95"
                          >
                            <span>+ ADD</span>
                          </button>

                          {/* 1-Tap Instant WhatsApp button */}
                          <button
                            type="button"
                            onClick={(e) => handleInstantQuote(med, e)}
                            title="Instant WhatsApp Quote"
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700 active:scale-95"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                              <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No exact match found.{" "}
                    <Link
                      href="/catalog"
                      onClick={() => setIsSearchOpen(false)}
                      className="font-bold text-sky-600 underline"
                    >
                      Browse full catalog
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Controls: Quick 1-Click RFQ, Profile & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick 1-Click RFQ WhatsApp Pill */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Faith Health Care, I would like an instant wholesale quote for my order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 transition hover:bg-sky-600 hover:text-white"
            >
              <span>⚡</span>
              <span>1-TAP QUOTE</span>
            </a>

            {/* User Account / Sign In */}
            {isLoggedIn && user ? (
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[10px] font-bold text-white uppercase">
                  {user.name.charAt(0)}
                </span>
                <span className="max-w-[70px] truncate">{user.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-sky-600 px-2 py-1.5"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-slate-400">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>Account</span>
              </button>
            )}

            {/* Cart Button with Sky Blue Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open Cart (${totalItems} items)`}
              className="relative flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white">
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Order</span>
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-500 px-1 text-[11px] font-black text-white">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-1.5 text-slate-700 md:hidden"
              aria-label="Toggle navigation menu"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center rounded-lg border border-slate-300 bg-slate-50">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 150+ wholesale medicines..."
              className="w-full bg-transparent px-3 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none"
            />
            <button
              type="submit"
              className="mr-1 flex h-7 w-7 items-center justify-center rounded-md bg-sky-600 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path d="M21 21l-4.35-4.35M18 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Horizontal Sub-Nav Category Strip */}
      <nav className="border-b border-slate-200 bg-white shadow-2xs overflow-x-auto no-scrollbar hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-8 py-1.5 text-xs font-semibold">
          {CATEGORY_LINKS.map((link) => {
            const isActive =
              link.href === "/catalog"
                ? pathname === "/catalog" && !pathname.includes("category")
                : pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 transition ${
                  isActive
                    ? "bg-sky-600 text-white shadow-2xs"
                    : "text-slate-700 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white p-4 md:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-1">
            {CATEGORY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

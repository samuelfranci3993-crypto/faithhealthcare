"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";

const links: {
  href: string;
  label: string;
  accent: string;
  wash: string;
  icon: ReactNode;
}[] = [
  {
    href: "/",
    label: "Home",
    accent: "#0f6b63",
    wash: "rgba(15,107,99,0.12)",
    icon: (
      <path
        d="M4 10.5L12 4l8 6.5V19a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-8.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/catalog",
    label: "Catalog",
    accent: "#1a5f7a",
    wash: "rgba(26,95,122,0.12)",
    icon: (
      <path
        d="M5 7h6v6H5V7zm8 0h6v4h-6V7zM5 15h6v4H5v-4zm8-2h6v6h-6v-6z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/insights",
    label: "Insights",
    accent: "#0a524c",
    wash: "rgba(10,82,76,0.12)",
    icon: (
      <path
        d="M5 5.5h14v13H5V5.5zM8 9h8M8 12.5h5.5M8 16h8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/about",
    label: "About",
    accent: "#3d6b5a",
    wash: "rgba(61,107,90,0.14)",
    icon: (
      <path
        d="M12 3l8 3.5v5.2c0 5-3.4 8.5-8 9.8-4.6-1.3-8-4.8-8-9.8V6.5L12 3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/reviews",
    label: "Reviews",
    accent: "#9a6a10",
    wash: "rgba(196,138,26,0.14)",
    icon: (
      <path
        d="M5 7.5A2.5 2.5 0 017.5 5h9A2.5 2.5 0 0119 7.5v6A2.5 2.5 0 0116.5 16H10l-3.5 3v-3H7.5A2.5 2.5 0 015 13.5v-6z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isLoggedIn, logout, openAuthModal } = useUser();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: reduce, duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#f7fbf9]/92 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 py-2.5 md:gap-3 md:px-8 md:py-3">
        <Link
          href="/"
          className="nav-bounce group flex min-w-0 shrink-0 items-center gap-2.5 justify-self-start"
          aria-label="Life Cure home"
        >
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400/30 transition group-hover:scale-105"
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white"
              fill="none"
            >
              {/* Medical cross + pulse */}
              <path
                d="M12 4v16M4 12h16"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="#d1fae5" />
            </svg>
          </span>
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="font-display text-2xl font-bold tracking-tight text-ink md:text-[1.75rem]">
              LIFE CURE
              <span
                className="brand-live-dot !bg-emerald-500"
                title="Active"
                aria-label="Active"
                role="img"
              />
            </span>
            <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.2em] text-emerald-700 lg:inline">
              Healthcare
            </span>
          </span>
        </Link>

        <button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          tabIndex={showTop ? 0 : -1}
          className={`back-to-top back-to-top--header justify-self-center ${
            showTop
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <span>Back to top</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center justify-end gap-2 justify-self-end md:gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-bounce inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition ${
                    active ? "font-semibold" : "font-medium"
                  }`}
                  style={
                    active
                      ? { background: link.wash, color: link.accent }
                      : { color: "rgba(12,46,58,0.62)" }
                  }
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-md"
                    style={{
                      background: active ? "rgba(255,255,255,0.65)" : link.wash,
                      color: link.accent,
                    }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
                      {link.icon}
                    </svg>
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Account / Profile */}
          {isLoggedIn && user ? (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50/80 px-2.5 py-1 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100"
              title={`Account: ${user.name}`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white uppercase">
                {user.name.charAt(0)}
              </span>
              <span className="hidden sm:inline max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-emerald-600">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Cart Button with Counter Badge */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open Cart (${totalItems} items)`}
            className="nav-bounce relative inline-flex h-9 items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50/80 px-3 py-1 text-xs font-bold text-emerald-800 shadow-xs transition hover:bg-emerald-100 hover:border-emerald-600/50 active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-emerald-700"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline font-semibold">Cart</span>
            <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-[11px] font-extrabold text-white shadow-xs">
              {totalItems}
            </span>
          </button>

          <button
            type="button"
            className="nav-bounce inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/80 text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-ink transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-ink transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-ink transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line/70 bg-[#f7fbf9] px-5 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="nav-bounce flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium"
                  style={
                    active
                      ? { background: link.wash, color: link.accent }
                      : { color: "#0c2e3a" }
                  }
                >
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ background: link.wash, color: link.accent }}
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-3.5 w-3.5"
                    >
                      {link.icon}
                    </svg>
                  </span>
                  {link.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setIsCartOpen(true);
              }}
              className="nav-bounce flex items-center justify-between rounded-xl bg-teal-50 px-3 py-2.5 text-sm font-semibold text-teal-800 border border-teal-600/30"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-800">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>My Shopping Cart</span>
              </div>
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-teal-700 px-1.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


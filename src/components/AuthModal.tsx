"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useUser, type CustomerProfile } from "@/lib/user-context";
import { useCart } from "@/lib/cart-context";
import { COUNTRY_CODES, DEFAULT_COUNTRY } from "@/lib/countries";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    pendingCartAction,
    clearPendingCartAction,
  } = useUser();

  const { addToCart } = useCart();
  const [tab, setTab] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY);
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone.trim() || phone.trim().length < 6) {
      setError("Please enter a valid phone number.");
      return;
    }

    const selectedCountryObj = COUNTRY_CODES.find((c) => c.code === countryCode);
    const countryLabel = country.trim() || selectedCountryObj?.label || "International";

    const profile: CustomerProfile = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      countryCode,
      country: countryLabel,
      company: company.trim() || undefined,
    };

    login(profile);
    setIsAuthModalOpen(false);

    // If user clicked Add to Cart before logging in, automatically complete the action!
    if (pendingCartAction) {
      addToCart(pendingCartAction.item, pendingCartAction.quantity);
      clearPendingCartAction();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/50 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl animate-scale-up sm:p-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-sand/60 text-ink-soft hover:bg-sand hover:text-ink transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
            Customer Account Required
          </span>
          <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
            {pendingCartAction ? "Sign in to add to cart" : "Customer Account"}
          </h2>
          <p className="mt-1 text-sm text-ink-soft/80">
            Please enter your contact details to continue your order request & wholesale enquiry.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex rounded-2xl bg-sand/60 p-1">
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
              tab === "register"
                ? "bg-white text-teal shadow-xs"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
              tab === "login"
                ? "bg-white text-teal shadow-xs"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-sage">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. John Smith"
              className="mt-1.5 w-full rounded-xl border border-line bg-sand/30 px-4 py-2.5 text-sm outline-none ring-teal/30 focus:border-teal focus:ring-2"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/30 px-4 py-2.5 text-sm outline-none ring-teal/30 focus:border-teal focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="mt-1.5 flex rounded-xl border border-line bg-sand/30">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-l-xl border-r border-line bg-transparent px-2 text-xs outline-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.dial} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-r-xl bg-transparent px-3 py-2.5 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage">
                Country / City
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United States"
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/30 px-4 py-2.5 text-sm outline-none ring-teal/30 focus:border-teal focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-sage">
                Company / Pharmacy (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Business name"
                className="mt-1.5 w-full rounded-xl border border-line bg-sand/30 px-4 py-2.5 text-sm outline-none ring-teal/30 focus:border-teal focus:ring-2"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-full bg-teal-700 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-teal-800 active:scale-[0.98]"
            >
              {tab === "register" ? "Save Account & Continue" : "Sign In & Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

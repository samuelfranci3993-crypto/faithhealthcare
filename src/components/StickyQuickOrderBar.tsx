"use client";

import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";
import { formatUsd } from "@/lib/price";

export default function StickyQuickOrderBar() {
  const { items, totalItems, subtotal, shippingFee, orderTotal, shippingTier, setIsCartOpen } = useCart();
  const { user, isLoggedIn, openAuthModal } = useUser();

  if (totalItems === 0) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

  const handleInstantWhatsAppCheckout = () => {
    const lines = items.map(
      (item) => `• ${item.name} (${item.category || "General"}) - Qty: ${item.quantity}`
    );

    let msg = `Hello Faith Health Care,\n\nI would like an instant wholesale quotation for my order:\n\n${lines.join("\n")}\n\nSubtotal: ${formatUsd(subtotal)}\nEstimated Shipping (${totalItems} items): ${formatUsd(shippingFee)}\nEstimated Order Total: ${formatUsd(orderTotal)}`;

    if (user && user.name) {
      msg += `\n\nCustomer Details:\n- Name: ${user.name}\n- Email: ${user.email}\n- Phone: ${user.countryCode} ${user.phone}\n- Destination: ${user.country}`;
      if (user.company) msg += `\n- Company: ${user.company}`;
    }

    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${whatsappNumber || "917020096898"}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none flex justify-center animate-fade-up">
      <div className="pointer-events-auto flex items-center justify-between gap-3 w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-slate-900/95 p-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10 sm:p-3">
        {/* Left: Cart items summary */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-3 text-left pl-1 sm:pl-2 group"
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-brand/30 transition group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[11px] font-extrabold text-brand shadow">
              {totalItems}
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-300">
              {totalItems} {totalItems === 1 ? "item" : "items"} in cart
            </p>
            <p className="font-bold text-sm text-white">
              {formatUsd(orderTotal)}{" "}
              <span className="text-[10px] font-normal text-slate-400">
                (incl. {formatUsd(shippingFee)} ship)
              </span>
            </p>
          </div>
        </button>

        {/* Right: 1-Click WhatsApp Quick Quote & Drawer Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:inline-flex items-center rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700 active:scale-95"
          >
            Review Cart
          </button>
          <button
            type="button"
            onClick={handleInstantWhatsAppCheckout}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-700 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
            </svg>
            <span>1-Click Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}

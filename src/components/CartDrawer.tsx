"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";
import EnquiryModal from "@/components/EnquiryModal";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    shippingFee,
    shippingTier,
    orderTotal,
    clearCart,
  } = useCart();

  const { user, openAuthModal } = useUser();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const handleWhatsAppCheckout = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";

    let message = `Hello Faith Health Care team,\nI would like to request an official wholesale quotation for the following items:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Category: ${item.category || "General"} | Qty: ${item.quantity}\n`;
    });

    message += `\n*Total Products Selected*: ${totalItems}`;
    message += `\n*Pricing Terms*: Wholesale Export Rate on Request`;

    if (user && user.name) {
      message += `\n\n*Customer Details*:`;
      message += `\n• Name: ${user.name}`;
      if (user.email) message += `\n• Email: ${user.email}`;
      if (user.phone) message += `\n• Phone: ${user.phone}`;
      if (user.country) message += `\n• Destination: ${user.country}`;
      if (user.company) message += `\n• Company: ${user.company}`;
    }

    message += `\n\nPlease confirm availability and shipping details. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop Blur */}
      <div
        className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <aside
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-slate-900 text-slate-100 shadow-2xl transition-transform duration-300 animate-in slide-in-from-right sm:border-l sm:border-slate-800"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/20 text-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                Inquiry Basket
              </h2>
              <p className="text-xs text-slate-400">
                {totalItems} {totalItems === 1 ? "product" : "products"} selected for quote
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800 text-slate-500 mb-4">
                <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                  <path
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-base font-semibold text-slate-200">
                Your cart is currently empty
              </p>
              <p className="mt-1 text-xs text-slate-400 max-w-xs">
                Browse our pharmaceutical catalog and add products to request bulk export pricing.
              </p>
              <Link
                href="/catalog"
                onClick={() => setIsCartOpen(false)}
                className="mt-6 rounded-full bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-hover active:scale-95"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5 transition hover:border-slate-700"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    {item.category}
                  </span>
                  <h3 className="line-clamp-1 text-sm font-semibold text-white">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400">
                      Quote on Request
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-lg p-1.5 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                  aria-label="Remove item"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Actions */}
        {items.length > 0 && (
          <div className="border-t border-slate-800 bg-slate-950 p-6 space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Selected Products</span>
                <span className="font-bold text-white">{totalItems} {totalItems === 1 ? "product" : "products"}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Wholesale Pricing</span>
                <span className="font-semibold text-emerald-400">Custom B2B Quotation</span>
              </div>
              <p className="text-[11px] text-slate-400 border-t border-slate-800/60 pt-2 leading-relaxed">
                Volume discounts and express air/sea cargo rates are tailored based on your quantity and destination.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppCheckout}
                className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 active:scale-[0.99]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.103-1.076z" />
                </svg>
                Request Quotation via WhatsApp
              </button>

              <button
                onClick={() => setShowEnquiryModal(true)}
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                Request Official Email Quote
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-500 hover:text-red-400 transition"
                >
                  Clear Cart
                </button>
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-bold text-brand hover:underline"
                >
                  View Full Cart Page &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Enquiry Modal linked to Cart */}
      {showEnquiryModal && (
        <EnquiryModal
          isOpen={showEnquiryModal}
          onClose={() => setShowEnquiryModal(false)}
          cartSummary={{
            items: items.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            })),
            totalPrice: orderTotal,
            shippingFee,
          }}
        />
      )}
    </>
  );
}

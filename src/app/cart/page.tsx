"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import EnquiryModal from "@/components/EnquiryModal";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    clearCart,
  } = useCart();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918857030167";

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `Hello Life Cure team,\nI would like to place a bulk enquiry for the following items:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Qty: ${item.quantity} | Est: $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Total Items*: ${totalItems}`;
    message += `\n*Estimated Total*: $${subtotal.toFixed(2)}`;
    message += `\n\nPlease confirm availability and shipping details. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink-soft/70">
        <Link href="/" className="hover:text-teal hover:underline">
          Home
        </Link>
        <span>&rsaquo;</span>
        <span className="font-semibold text-ink">Order Cart</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal">
            Wholesale & Export Basket
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Shopping Cart ({totalItems})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-600 hover:underline"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-line/60 bg-white/70 p-12 text-center shadow-xs">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-mist text-teal mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <path
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-ink">
            Your Cart is Currently Empty
          </h2>
          <p className="mt-2 max-w-md text-sm text-ink-soft/75">
            Explore our extensive catalog of quality pharmaceutical medicines, supplements, and healthcare products to request bulk export pricing.
          </p>
          <Link
            href="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-teal-deep active:scale-95"
          >
            Explore Catalog &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Cart Table / Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-line/70 bg-white p-4 shadow-xs transition hover:border-teal/30"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-20 w-20 shrink-0 rounded-xl bg-teal-mist/50 p-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal">
                      {item.category}
                    </span>
                    <Link
                      href={`/catalog/${item.slug}`}
                      className="block hover:text-teal"
                    >
                      <h3 className="line-clamp-1 font-display text-base font-bold text-ink">
                        {item.name}
                      </h3>
                    </Link>
                    {item.packSize && (
                      <p className="text-xs text-ink-soft/60">
                        Pack: {item.packSize}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-teal-deep">
                      ${item.price.toFixed(2)} / unit
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-line/40 pt-3 sm:pt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-full border border-teal-600/30 bg-teal-50/50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-bold text-teal-800 shadow-xs hover:bg-teal-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-teal-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-bold text-teal-800 shadow-xs hover:bg-teal-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-extrabold text-ink">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg p-2 text-ink-soft/40 hover:bg-red-50 hover:text-red-600 transition"
                    title="Remove item"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
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
              </div>
            ))}
          </div>

          {/* Sidebar Summary Card */}
          <div className="h-fit space-y-4 rounded-3xl border border-line bg-white p-6 shadow-md">
            <h2 className="font-display text-xl font-bold text-ink border-b border-line pb-4">
              Order Quote Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Total Items</span>
                <span className="font-semibold text-ink">{totalItems}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping Est.</span>
                <span className="text-xs font-semibold text-teal-deep">
                  Calculated upon enquiry
                </span>
              </div>
              <div className="border-t border-line/60 pt-3 flex justify-between text-base font-bold text-ink">
                <span>Estimated Total</span>
                <span className="text-xl font-extrabold text-teal">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleWhatsAppCheckout}
                className="flex items-center justify-center gap-2.5 w-full rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500 active:scale-[0.99]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.099 4.017 4.103-1.076z" />
                </svg>
                Request Quote via WhatsApp
              </button>

              <button
                onClick={() => setShowEnquiryModal(true)}
                className="w-full rounded-2xl border border-teal-600/30 bg-teal-50 px-5 py-3 text-xs font-bold text-teal-900 transition hover:bg-teal-100"
              >
                Send Email Quote Enquiry
              </button>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-ink-soft/70 space-y-1">
              <p className="font-semibold text-ink">🔒 Secure International Export</p>
              <p>Direct shipments via DHL / FedEx / Aramex with custom documentation.</p>
            </div>
          </div>
        </div>
      )}

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
            totalPrice: subtotal,
          }}
        />
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useUser } from "@/lib/user-context";
import EnquiryModal from "@/components/EnquiryModal";

export default function CartPage() {
  const {
    items,
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

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917020096898";

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let message = `Hello Faith Health Care team,\nI would like to place an official wholesale quotation request for the following items:\n\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Category: ${item.category || "General"} | Qty: ${item.quantity}\n`;
    });

    message += `\n*Total Products Selected*: ${totalItems}`;
    message += `\n*Pricing Terms*: Wholesale Export Rate on Request`;

    if (user && user.name) {
      message += `\n\n*Customer Details*:`;
      message += `\n• Name: ${user.name}`;
      if (user.email) message += `\n• Email: ${user.email}`;
      if (user.phone) message += `\n• Phone: ${user.countryCode || "+91"} ${user.phone}`;
      if (user.country) message += `\n• Destination: ${user.country}`;
      if (user.company) message += `\n• Company: ${user.company}`;
    }

    message += `\n\nPlease confirm product availability, batch COA, and dispatch schedule. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Link href="/" className="hover:text-brand hover:underline">
          Home
        </Link>
        <span>&rsaquo;</span>
        <span className="text-slate-900">Order Cart</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="inline-flex items-center rounded-md bg-brand-light px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand">
            Export Wholesale Basket
          </span>
          <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
            Wholesale Inquiry Basket ({totalItems} {totalItems === 1 ? "Product" : "Products"})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-red-600 hover:underline"
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-light text-brand mb-4">
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
          <h2 className="text-2xl font-black text-slate-900">
            Your Order Cart is Empty
          </h2>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Explore our catalog of certified pharmaceutical formulations, active molecules, and health products to request wholesale export pricing.
          </p>
          <Link
            href="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-hover transition active:scale-95"
          >
            Explore Catalog &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Table / Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-brand/40"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-2 border border-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="rounded-md bg-brand-light px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                      {item.category}
                    </span>
                    <Link
                      href={`/catalog/${item.slug}`}
                      className="block hover:text-brand"
                    >
                      <h3 className="line-clamp-1 text-base font-bold text-slate-900 mt-1">
                        {item.name}
                      </h3>
                    </Link>
                    {item.packSize && (
                      <p className="text-xs text-slate-500">
                        Packaging: {item.packSize}
                      </p>
                    )}
                    <p className="mt-1 text-xs font-bold text-emerald-600">
                      Wholesale Price on Request
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  {/* Quantity Controls */}
                  <div className="flex items-center rounded-xl border border-slate-300 bg-slate-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white font-bold text-slate-700 shadow-xs hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {item.quantity} {item.quantity === 1 ? "unit" : "units"}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
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
          <div className="h-fit space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">
              Wholesale RFQ Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Selected Products</span>
                <span className="font-bold text-slate-900">{totalItems} {totalItems === 1 ? "product" : "products"}</span>
              </div>
              <div className="flex justify-between items-start text-slate-600">
                <div>
                  <span className="block font-medium text-slate-700">Pricing Terms</span>
                  <span className="text-[11px] text-slate-500">Volume-tiered export discounts</span>
                </div>
                <span className="font-bold text-emerald-600">Quote on Request</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
                <span>Cargo Dispatch</span>
                <span className="text-base font-bold text-slate-800">
                  Air &amp; Sea Cargo
                </span>
              </div>
            </div>

            {/* Wholesale Quote Guide */}
            <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3 text-[11px] text-slate-600">
              <p className="font-bold text-sky-900 mb-1">📋 Wholesale Quotation Process</p>
              <div className="space-y-1 text-[11px] leading-relaxed">
                <p>• Submit your list of required items &amp; quantities.</p>
                <p>• Receive commercial invoice with batch COA.</p>
                <p>• Direct air cargo dispatch to your country.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleWhatsAppCheckout}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.92.52 3.72 1.43 5.28L2 22l5.05-1.52a9.9 9.9 0 004.99 1.34h.01c5.46 0 9.89-4.4 9.89-9.83S17.5 2 12.04 2zm5.75 13.9c-.24.67-1.4 1.23-1.93 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.2-4.93-4.4-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.35.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.3.02.49-.1.19-.14.3-.28.47-.14.16-.3.36-.43.49-.14.14-.29.29-.12.56.17.28.75 1.23 1.61 2 .97.87 1.97 1.23 2.25 1.37.28.14.44.12.6-.07.17-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.32.07.12.07.67-.17 1.34z" />
                </svg>
                <span>Request Wholesale Quotation</span>
              </button>

              <button
                onClick={() => setShowEnquiryModal(true)}
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
              >
                Request Email Quotation
              </button>

              <div className="mt-3 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 space-y-1">
                <p className="font-bold text-slate-700">✓ WHO-GMP Certified Export Sourcing</p>
                <p>✓ International Air &amp; Ocean Freight Direct Dispatch</p>
                <p>✓ Authentic COA &amp; Commercial Invoice Included</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
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
    </div>
  );
}

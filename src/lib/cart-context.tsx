"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
  packSize?: string;
  manufacturer?: string;
}

interface ToastState {
  id: number;
  message: string;
  itemImage?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toast: ToastState | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "faithhealthcare_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [items, isMounted]);

  const showToast = (message: string, itemImage?: string) => {
    setToast({ id: Date.now(), message, itemImage });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantityToAdd = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
        };
        return updated;
      }
      return [...prev, { ...item, quantity: quantityToAdd }];
    });
    showToast(`Added ${item.name} to cart`, item.image);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        toast,
      }}
    >
      {children}

      {/* Global Animated Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {toast.itemImage ? (
            <Image
              src={toast.itemImage}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg bg-slate-50 object-contain p-1 border border-slate-100"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand">
              Item Added to Cart
            </p>
            <p className="line-clamp-1 text-sm font-semibold text-slate-800">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 rounded-xl bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-hover active:scale-95"
          >
            View Cart
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

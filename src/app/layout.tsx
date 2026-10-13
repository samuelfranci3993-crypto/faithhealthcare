import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/lib/cart-context";
import { UserProvider } from "@/lib/user-context";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import StickyQuickOrderBar from "@/components/StickyQuickOrderBar";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Faith Health Care — Pharmaceutical & Healthcare Catalog",
    template: "%s | Faith Health Care",
  },
  description:
    "Faith Health Care supplies certified pharmaceutical tablets, capsules, injections, and specialty healthcare medicines for global wholesale and export.",
  metadataBase: new URL("https://faithhealthcare.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <UserProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-[70vh]">{children}</main>
            <Footer />
            <CartDrawer />
            <AuthModal />
            <StickyQuickOrderBar />
            <SmoothScroll />
            <ScrollMotion />
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}


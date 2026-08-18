import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Whisky Shop Kenya | Premium Single Malts & Fine Spirits",
  description:
    "Nairobi's premier destination for rare single malts, aged whiskies, luxury spirits, and bespoke corporate gifting with same-day delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-obsidian-900 text-gray-200 antialiased selection:bg-gold-500 selection:text-black">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

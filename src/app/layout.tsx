import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { BranchProvider } from "@/context/BranchContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Whisky Shop | Premium Single Malt Whiskies & Fine Spirits",
  description:
    "Discover our rare single malt collections, aged whiskies, and curated spirits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-white text-neutral-900 antialiased font-sans selection:bg-neutral-900 selection:text-white">
        <BranchProvider>
          <CartProvider>{children}</CartProvider>
        </BranchProvider>
      </body>
    </html>
  );
}

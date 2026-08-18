"use client";

import { useCart } from "@/context/CartContext";
import { Search, ShoppingBag, Heart, Menu, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { openCart, itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800 transition-all">
      {/* Nairobi Delivery Top Bar */}
      <div className="bg-obsidian-900 border-b border-obsidian-800/60 py-1.5 px-4 text-center text-xs text-gold-400 font-medium tracking-wide">
        ✦ SAME-DAY NAIROBI DISPATCH FOR ORDERS PLACED BEFORE 4:00 PM • FREE DELIVERY OVER KES 15,000 ✦
      </div>

      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-gray-300">
          <Link href="#collections" className="hover:text-gold-400 transition-colors">Shop</Link>
          <Link href="#craftsmanship" className="hover:text-gold-400 transition-colors">Events</Link>
          <Link href="#about" className="hover:text-gold-400 transition-colors">About</Link>
        </div>

        {/* Center Brand Wordmark matching mockup header style */}
        <Link href="/" className="text-center group flex flex-col items-center">
          <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.25em] text-white font-bold block uppercase group-hover:text-gold-400 transition-colors">
            THE WHISKY SHOP
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] text-gold-500 font-sans block mt-0.5">
            NAIROBI • EST. 2015
          </span>
        </Link>

        {/* Right Action Icons matching design mockup */}
        <div className="flex items-center gap-5 text-gray-300">
          <button aria-label="Search" className="hover:text-gold-400 transition-colors hidden sm:block p-1">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Account" className="hover:text-gold-400 transition-colors hidden sm:block p-1">
            <User className="w-5 h-5" />
          </button>
          <button aria-label="Wishlist" className="hover:text-gold-400 transition-colors hidden sm:block p-1">
            <Heart className="w-5 h-5" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 px-3.5 py-2 rounded-full transition-all group"
          >
            <ShoppingBag className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-white">{itemCount}</span>
          </button>

          <button className="lg:hidden text-gray-300 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}

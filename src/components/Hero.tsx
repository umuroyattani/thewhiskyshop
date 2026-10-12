"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Hero() {
  const { openCart, itemCount } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <section className="bg-transparent px-2.5 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-2.5 pb-7 sm:pb-8 text-white relative min-h-[calc(100vh-1.5rem)] flex flex-col justify-center">
      {/* Outer Wrapper for Relative Positioning of Overlapping Down Arrow */}
      <div className="relative max-w-[1360px] w-full mx-auto">
        {/* Dark Curved-Border Container with Full-Bleed Image Background */}
        <div className="relative rounded-[24px] sm:rounded-[36px] overflow-hidden border border-neutral-700/80 ring-1 ring-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-black px-5 sm:px-8 lg:px-12 pt-5 sm:pt-6 pb-7 sm:pb-9 min-h-[500px] sm:min-h-[540px] md:min-h-[580px] lg:min-h-[600px] flex flex-col justify-between">
          
          {/* Full Cover Background Image of Hand Holding Macallan 12 */}
          <Image
            src="/images/hero/macallan_hand_user.jpg"
            alt="Hand holding Macallan 12 Single Malt Scotch Whisky horizontally"
            fill
            priority
            className="object-cover object-center pointer-events-none select-none z-0"
          />

          {/* Smooth Dark Vignette Overlay for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/70 pointer-events-none z-0" />

          {/* Top Navigation Bar inside Dark Container */}
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-3">
            {/* Left: 3 Pill-shaped Outlined Buttons */}
            <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
              <Link
                href="/catalog"
                className="px-3.5 py-1 rounded-full border border-neutral-600/80 hover:border-white text-[10px] lg:text-[11px] font-semibold tracking-[0.16em] text-neutral-300 hover:text-white uppercase transition-all duration-200 backdrop-blur-sm bg-black/20"
              >
                SHOP
              </Link>
              <Link
                href="/catalog"
                className="px-3.5 py-1 rounded-full border border-neutral-600/80 hover:border-white text-[10px] lg:text-[11px] font-semibold tracking-[0.16em] text-neutral-300 hover:text-white uppercase transition-all duration-200 backdrop-blur-sm bg-black/20"
              >
                BOTTLES
              </Link>
              <Link
                href="#art-of-whisky"
                className="px-3.5 py-1 rounded-full border border-neutral-600/80 hover:border-white text-[10px] lg:text-[11px] font-semibold tracking-[0.16em] text-neutral-300 hover:text-white uppercase transition-all duration-200 backdrop-blur-sm bg-black/20"
              >
                ABOUT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex flex-col gap-1.5 p-1 text-white"
            >
              <span className="block w-5 h-[1.5px] bg-white" />
              <span className="block w-5 h-[1.5px] bg-white" />
              <span className="block w-5 h-[1.5px] bg-white" />
            </button>

            {/* Center: THE WHISKY SHOP centered in Serif Font */}
            <Link
              href="/"
              className="md:absolute md:left-1/2 md:-translate-x-1/2 text-center"
            >
              <span className="font-serif text-[14px] sm:text-[16px] tracking-[0.24em] text-white font-bold block uppercase drop-shadow">
                THE WHISKY SHOP
              </span>
            </Link>

            {/* Right: Four Thin Outline Icons (Search, User, Heart, Cart) */}
            <div className="flex items-center gap-3 sm:gap-4 text-neutral-300">
              {/* Search (magnifying glass) */}
              <Link
                href="/catalog"
                aria-label="Search"
                className="hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </Link>

              {/* User Profile */}
              <button
                aria-label="User Profile"
                className="hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Heart (Wishlist) */}
              <Link
                href="#best-sellers"
                aria-label="Wishlist"
                className="hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </Link>

              {/* Shopping Cart with Small '0' Badge */}
              <button
                onClick={openCart}
                aria-label="Shopping Cart"
                className="hover:text-white transition-colors cursor-pointer relative"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-white text-black text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenu && (
            <div className="relative z-20 md:hidden bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-3 mb-3 flex flex-col gap-2.5 text-[11px] font-semibold tracking-widest uppercase">
              <Link href="/catalog" onClick={() => setMobileMenu(false)} className="hover:text-white">SHOP</Link>
              <Link href="/catalog" onClick={() => setMobileMenu(false)} className="hover:text-white">BOTTLES</Link>
              <Link href="#art-of-whisky" onClick={() => setMobileMenu(false)} className="hover:text-white">ABOUT</Link>
            </div>
          )}

          {/* Main Headline */}
          <div className="relative z-10 text-center my-1 sm:my-2">
            <h1 className="font-serif text-[32px] sm:text-[46px] md:text-[54px] lg:text-[64px] text-white font-normal tracking-tight leading-[1.05] max-w-4xl mx-auto drop-shadow-lg">
              Raise Your Spirits with Every Sip
            </h1>
          </div>

          {/* Center Spacer allowing the bottle and hand to be cleanly highlighted in the center */}
          <div className="flex-1 min-h-[140px] sm:min-h-[180px] md:min-h-[200px]" />

          {/* Lower Row inside Container */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 pt-1 sm:pt-2">
            {/* Bottom Left: Three Statistics in Light Font */}
            <div className="flex items-center gap-5 sm:gap-8 md:gap-10 drop-shadow">
              <div>
                <span className="font-serif text-[22px] sm:text-[28px] lg:text-[34px] text-white font-normal block leading-none">
                  300+
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 font-light block tracking-wider mt-1 uppercase">
                  Rare Single Malts
                </span>
              </div>
              <div>
                <span className="font-serif text-[22px] sm:text-[28px] lg:text-[34px] text-white font-normal block leading-none">
                  77%
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 font-light block tracking-wider mt-1 uppercase">
                  Cask Strengths
                </span>
              </div>
              <div>
                <span className="font-serif text-[22px] sm:text-[28px] lg:text-[34px] text-white font-normal block leading-none">
                  24.7
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 font-light block tracking-wider mt-1 uppercase">
                  Years of Age
                </span>
              </div>
            </div>

            {/* Bottom Right: Paragraph and Small Pill 'Discover More' Button */}
            <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-[280px] sm:max-w-[310px]">
              <p className="text-[11px] sm:text-[12px] text-neutral-200 font-light leading-snug mb-2 sm:mb-2.5 drop-shadow">
                Discover our new collections, for those who appreciate premium quality and refined taste.
              </p>
              <Link
                href="/catalog"
                className="px-6 py-2 bg-white text-black font-semibold text-[10px] sm:text-[11px] tracking-[0.14em] uppercase rounded-full hover:bg-neutral-100 active:scale-95 transition-all duration-200 shadow-md"
              >
                Discover More
              </Link>
            </div>
          </div>
        </div>

        {/* At bottom right edge of dark container: Vertical pill button with downward arrow overlapping the border */}
        <div className="absolute -bottom-5 sm:-bottom-6 right-6 sm:right-12 md:right-16 z-20">
          <Link
            href="#category"
            aria-label="Scroll to categories"
            className="w-8 sm:w-9 h-12 sm:h-14 rounded-full bg-white border border-neutral-300 shadow-xl flex items-center justify-center text-neutral-900 hover:translate-y-1 transition-all duration-200 cursor-pointer group"
          >
            <svg
              className="w-3.5 h-3.5 text-neutral-900 group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

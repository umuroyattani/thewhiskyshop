"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar({ alwaysVisible = false }: { alwaysVisible?: boolean }) {
  const { openCart, itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!alwaysVisible && !scrolled) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/[0.08] transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[56px] flex items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center gap-6 text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
            <Link href="/catalog" className="hover:text-white transition-colors">
              SHOP
            </Link>
            <Link href="/catalog" className="hover:text-white transition-colors">
              BOTTLES
            </Link>
            <Link href="#art-of-whisky" className="hover:text-white transition-colors">
              ABOUT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-[1.5px] bg-white/80" />
            <span className="block w-5 h-[1.5px] bg-white/80" />
            <span className="block w-5 h-[1.5px] bg-white/80" />
          </button>

          {/* Center Brand: Official Store Logo */}
          <Link href="/" className="flex items-center justify-center group py-1">
            <div className="relative h-8 sm:h-9 w-24 sm:w-28 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-r.webp"
                alt="The Whisky Shop"
                fill
                sizes="120px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 text-neutral-400">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="hover:text-white transition-colors cursor-pointer relative"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-[13px] font-semibold tracking-[0.24em] uppercase text-neutral-300">
          <Link href="#category" onClick={() => setMobileOpen(false)} className="hover:text-white">SHOP</Link>
          <Link href="#best-sellers" onClick={() => setMobileOpen(false)} className="hover:text-white">BOTTLES</Link>
          <Link href="#art-of-whisky" onClick={() => setMobileOpen(false)} className="hover:text-white">ABOUT</Link>
          <button onClick={() => { setMobileOpen(false); openCart(); }} className="hover:text-white">BAG ({itemCount})</button>
          <button onClick={() => setMobileOpen(false)} className="text-neutral-500 text-xs mt-4">CLOSE</button>
        </div>
      )}
    </>
  );
}

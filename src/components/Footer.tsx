"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-8 px-5 sm:px-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Giant Edge-to-Edge Serif Brand */}
        <div className="w-full text-center overflow-hidden mb-10 select-none">
          <span className="font-serif text-[48px] sm:text-[72px] md:text-[96px] lg:text-[116px] xl:text-[136px] text-white font-black tracking-[0.05em] uppercase block leading-none">
            THE WHISKY SHOP
          </span>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] uppercase tracking-[0.2em] text-gray-500">
          {/* Left: Legal */}
          <div className="flex items-center gap-5 flex-wrap justify-center md:justify-start">
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Terms of Use
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Center: Payment */}
          <div className="flex items-center gap-2 text-gray-600">
            {["VISA", "MC", "AMEX", "M-PESA"].map((p) => (
              <span
                key={p}
                className="px-2 py-0.5 rounded border border-white/[0.12] text-[8px] font-mono"
              >
                {p}
              </span>
            ))}
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-5">
            {["Instagram", "Facebook", "X"].map((s) => (
              <Link
                key={s}
                href="#"
                className="hover:text-white transition-colors duration-200"
              >
                {s.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[9px] text-gray-700 mt-5 tracking-wider text-center">
          © 2024 THE WHISKY SHOP. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}

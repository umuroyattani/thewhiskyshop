"use client";

import Image from "next/image";
import Link from "next/link";
import { SPOTLIGHT_FEATURE } from "@/data/catalog";

export default function SpotlightBanner() {
  return (
    <section id="spotlight" className="bg-[#0e0e0e] text-white py-16 px-5 sm:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: Rounded luxury cocktail photo */}
        <div className="relative h-[300px] sm:h-[360px] w-full rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
          <Image
            src={SPOTLIGHT_FEATURE.image}
            alt="Crafting Moments"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Right: Headline, paragraphs, pill buttons */}
        <div className="flex flex-col items-start justify-center">
          <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-white font-normal mb-5 leading-[1.2] tracking-tight">
            {SPOTLIGHT_FEATURE.title}
          </h2>

          <p className="text-[13px] text-gray-400 leading-[1.75] mb-3 max-w-sm font-light">
            {SPOTLIGHT_FEATURE.description}
          </p>

          <p className="text-[13px] text-gray-500 leading-[1.75] mb-9 max-w-sm font-light">
            {SPOTLIGHT_FEATURE.subtext}
          </p>

          {/* 3 Outline Pill Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="#category"
              className="px-5 py-2 rounded-full border border-white/30 text-[10px] font-bold tracking-[0.18em] uppercase text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
            >
              WINE COLLECTION
            </Link>
            <Link
              href="#category"
              className="px-5 py-2 rounded-full border border-white/30 text-[10px] font-bold tracking-[0.18em] uppercase text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
            >
              COCKTAILS
            </Link>
            <Link
              href="#best-sellers"
              className="px-5 py-2 rounded-full border border-white/30 text-[10px] font-bold tracking-[0.18em] uppercase text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
            >
              SEE ALL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

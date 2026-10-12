"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/data/catalog";

export default function CategoryGrid() {
  const [showAll, setShowAll] = useState(false);
  const displayCategories = showAll ? CATEGORIES : CATEGORIES.slice(0, 12);

  return (
    <section id="category" className="bg-white text-black py-16 px-5 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-[28px] sm:text-[36px] text-neutral-900 font-normal tracking-tight mb-2">
            Shop by Category
          </h2>
          <p className="text-[12px] text-neutral-500 font-light tracking-wide max-w-md mx-auto">
            Browse authentic spirits, rare single malts, champagnes, and fine goods from The Whisky Shop Kenya.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-8 justify-items-center">
          {displayCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-2.5 group cursor-pointer w-full text-center"
            >
              {/* Circular image container with crisp border and clean white studio backdrop */}
              <div className="w-[90px] h-[90px] sm:w-[102px] sm:h-[102px] rounded-full bg-white border border-neutral-200 shadow-[0_4px_14px_rgba(0,0,0,0.06)] flex items-center justify-center relative overflow-hidden group-hover:shadow-xl group-hover:border-neutral-400 group-hover:scale-105 transition-all duration-300">
                <div className="relative w-[66px] sm:w-[76px] h-[72px] sm:h-[84px] flex items-center justify-center">
                  <Image
                    src={cat.image || cat.remoteImage || "/images/thewhiskyshop/categories/whisky.png"}
                    alt={cat.name}
                    fill
                    sizes="102px"
                    className="object-contain drop-shadow group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                  />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-neutral-900 group-hover:text-black uppercase leading-tight line-clamp-1">
                {cat.name.replace("SINGLEMALT", "SINGLE MALT")}
              </span>
              <span className="text-[9px] text-neutral-400 font-light -mt-1">
                {cat.brandsCount > 0 ? `${cat.brandsCount} Brands` : "Curated"}
              </span>
            </Link>
          ))}
        </div>

        {/* View All Categories Toggle */}
        {CATEGORIES.length > 12 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full border border-neutral-300 text-[11px] font-semibold tracking-widest uppercase text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200"
            >
              {showAll ? "Show Less" : `View All ${CATEGORIES.length} Categories`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

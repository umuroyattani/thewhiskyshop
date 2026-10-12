"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { FEATURED_SELECTION } from "@/data/catalog";
import { useState } from "react";

export default function FeaturedSelection() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleSelect = () => {
    addToCart({
      id: FEATURED_SELECTION.id,
      name: FEATURED_SELECTION.title,
      category: "Single Malt Scotch Whisky",
      region: "Highlands",
      abv: "46%",
      price: FEATURED_SELECTION.price,
      image: FEATURED_SELECTION.image,
      tastingNotes: ["Dark Chocolate", "Rare Sherry Oak", "Dried Fig"],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="bg-[#fbfbfb] text-black py-20 px-5 sm:px-10 relative overflow-hidden border-t border-neutral-200/60">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Tagline */}
        <p className="text-[13px] text-center text-neutral-600 max-w-xl mx-auto mb-10 leading-[1.7] font-light">
          {FEATURED_SELECTION.tagline}
        </p>

        {/* Center Container: Giant Watermark + Bottle */}
        <div className="relative w-full max-w-3xl h-[340px] sm:h-[420px] flex items-center justify-center mb-8">
          {/* Faint Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-serif font-black text-[60px] sm:text-[90px] md:text-[120px] text-black/[0.04] tracking-[0.2em] whitespace-nowrap leading-none uppercase">
              {FEATURED_SELECTION.watermark}
            </span>
          </div>

          {/* Bottle Visual */}
          <div className="relative z-10 w-44 sm:w-56 md:w-64 h-full flex items-center justify-center">
            <Image
              src={FEATURED_SELECTION.image}
              alt={FEATURED_SELECTION.title}
              fill
              sizes="(max-width: 768px) 200px, 260px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Description & Purchase CTA */}
        <div className="text-center max-w-lg">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-400 block mb-1">
            {FEATURED_SELECTION.subtitle}
          </span>
          <h3 className="font-serif text-[22px] sm:text-[26px] font-normal text-neutral-900 tracking-tight mb-2">
            {FEATURED_SELECTION.title}
          </h3>
          <p className="font-serif text-[18px] font-semibold text-neutral-800 mb-4">
            KES {FEATURED_SELECTION.price.toLocaleString()}
          </p>

          <p className="text-[12px] text-neutral-500 leading-[1.8] mb-8 font-light">
            {FEATURED_SELECTION.description}
          </p>

          <button
            onClick={handleSelect}
            className={`px-9 py-3 font-bold uppercase tracking-[0.18em] text-[10px] rounded-full transition-all duration-200 cursor-pointer shadow-lg ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95"
            }`}
          >
            {added ? "ADDED TO BASKET ✓" : FEATURED_SELECTION.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}

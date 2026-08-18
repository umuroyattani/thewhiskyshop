"use client";

import { FEATURED_SELECTION } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FeaturedSelection() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAcquire = () => {
    addToCart({
      id: FEATURED_SELECTION.id,
      name: FEATURED_SELECTION.title,
      category: "Rare Allocation",
      region: "Highlands",
      abv: "48%",
      price: FEATURED_SELECTION.price,
      image: FEATURED_SELECTION.image,
      tastingNotes: ["Sherry Cask", "Dark Chocolate", "Spiced Clove"],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="py-24 bg-obsidian-900 border-b border-obsidian-800">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-xs sm:text-sm font-light max-w-xl mx-auto mb-12 leading-relaxed">
          Discover our special collection tailored for those who appreciate every cured taste:
        </p>

        {/* Carousel Showcase Container matching mockup */}
        <div className="relative bg-obsidian-950 border border-obsidian-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          {/* Subtle Background Watermark text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none opacity-10">
            <span className="font-serif text-6xl sm:text-9xl font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap">
              THE SELECTION
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Nav Arrows */}
            <button
              aria-label="Previous Item"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-obsidian-700 bg-obsidian-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next Item"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-obsidian-700 bg-obsidian-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:border-gold-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottle Image */}
            <div className="relative w-48 h-64 sm:h-80 my-4 drop-shadow-[0_20px_20px_rgba(212,175,55,0.2)]">
              <Image
                src={FEATURED_SELECTION.image}
                alt={FEATURED_SELECTION.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Product Title & Info */}
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-2">
              {FEATURED_SELECTION.title}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm max-w-lg mb-6 leading-relaxed">
              {FEATURED_SELECTION.description}
            </p>

            <button
              onClick={handleAcquire}
              className="px-8 py-3.5 bg-obsidian-800 hover:bg-gold-500 hover:text-obsidian-950 text-white font-bold uppercase tracking-widest text-xs rounded border border-obsidian-700 hover:border-gold-500 transition-all shadow-lg cursor-pointer"
            >
              {added ? "Added to Selection" : "ULTIMATE SELECTION"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

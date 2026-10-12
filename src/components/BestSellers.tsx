"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COLLECTOR_BOTTLES, Product } from "@/data/catalog";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export default function BestSellers() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});
  const [showAllCollector, setShowAllCollector] = useState(false);

  // Curate 4 to 6 top expensive collector bottles
  const displayBottles = showAllCollector
    ? COLLECTOR_BOTTLES
    : COLLECTOR_BOTTLES.slice(0, 4);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBuy = (product: Product) => {
    addToCart(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1600);
  };

  return (
    <section id="best-sellers" className="bg-white text-black py-16 sm:py-20 px-5 sm:px-10 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] text-amber-700 uppercase bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-600" />
                COLLECTOR&apos;S VAULT • RARE ALLOCATIONS
              </span>
            </div>
            <h2 className="font-serif text-[30px] sm:text-[40px] font-normal text-neutral-900 tracking-tight leading-tight">
              The Collector&apos;s Reserve
            </h2>
            <p className="text-[13px] text-neutral-500 mt-1.5 font-light tracking-wide max-w-xl">
              Curated exclusively for connoisseurs. High-age statement single malts, prestige French cognacs, and rare vintage champagnes from world-class distilleries.
            </p>
          </div>

          {/* Quick link to full catalog */}
          <Link
            href="/catalog"
            className="group flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-900 hover:text-amber-800 transition-colors py-2"
          >
            <span>View Full Catalog (460+ Bottles)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Curated Collector Bottles Grid (Few & Exclusive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBottles.map((product) => {
            const isWishlisted = !!wishlist[product.id];
            const isAdded = !!added[product.id];

            return (
              <div
                key={product.id}
                className="border border-neutral-200/90 rounded-2xl overflow-hidden flex flex-col bg-white group hover:shadow-2xl hover:border-neutral-900 transition-all duration-300 relative"
              >
                {/* Image Container with studio backdrop */}
                <div className="relative w-full h-[270px] bg-[#fbfbfb] p-4 flex items-center justify-center overflow-hidden border-b border-neutral-100">
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-[#0d0d0d] text-amber-300 text-[9px] uppercase font-bold px-2.5 py-1 rounded-full tracking-[0.14em] shadow-sm border border-neutral-800">
                      ★ RARE PIECE
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Wishlist bottle"
                      className="w-8 h-8 rounded-full bg-white/95 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:scale-110 transition-all cursor-pointer shadow-sm"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill={isWishlisted ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        className={isWishlisted ? "text-red-500" : ""}
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottle Photo */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image || "https://thewhiskyshop.co.ke/api/open/images/1_1760964123096_1112.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md mix-blend-multiply"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mb-1.5">
                      <span>{product.brand || product.category}</span>
                      <span>{product.size || "700 ml"}</span>
                    </div>

                    <h3 className="font-serif text-[16px] sm:text-[17px] font-normal text-neutral-900 group-hover:text-black line-clamp-2 leading-snug mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 mb-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">Certified Distillery Original • Tamper-Sealed</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[9px] text-neutral-400 block -mb-0.5 font-medium tracking-wider">
                        PRICE
                      </span>
                      <span className="font-serif text-[18px] font-bold text-neutral-950">
                        KES {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(product)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#0d0d0d] text-white hover:bg-neutral-800 active:scale-95 border border-neutral-800"
                      }`}
                    >
                      {isAdded ? "ADDED ✓" : "ADD TO BASKET"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner linking to full catalog */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#0d0d0d] text-white border border-neutral-800 ring-1 ring-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
              THE WHISKY SHOP FULL COLLECTION
            </span>
            <p className="text-sm font-light text-neutral-300">
              Explore all 460+ bottles including Gins, Whiskies, Rums, Tequilas, and Fine Wines with live branch filters.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {COLLECTOR_BOTTLES.length > 4 && (
              <button
                onClick={() => setShowAllCollector((prev) => !prev)}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                {showAllCollector ? "Show Fewer" : `See All ${COLLECTOR_BOTTLES.length} Collector Pieces`}
              </button>
            )}
            <Link
              href="/catalog"
              className="px-5 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-neutral-200 transition-colors shadow-md flex items-center gap-1.5"
            >
              <span>Explore All Drinks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

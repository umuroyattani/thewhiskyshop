"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ALL_PRODUCTS, Product } from "@/data/catalog";

const CATEGORY_TABS = [
  "ALL",
  "SINGLEMALT",
  "WHISKY",
  "JAPANESE WHISKY",
  "COGNAC",
  "TEQUILA",
  "GIN",
  "CIGAR",
];

export default function BestSellers() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("ALL");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    if (activeTab === "ALL") {
      // Pick top signature items across categories
      return ALL_PRODUCTS.slice(0, 12);
    }
    return ALL_PRODUCTS.filter(
      (p) => p.category.toUpperCase() === activeTab || p.tag?.toUpperCase() === activeTab
    ).slice(0, 12);
  }, [activeTab]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBuy = (product: Product) => {
    addToCart(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1600);
  };

  return (
    <section id="best-sellers" className="bg-white text-black py-16 px-5 sm:px-10 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-1">
              THE WHISKY SHOP KENYA
            </span>
            <h2 className="font-serif text-[28px] sm:text-[36px] font-normal text-neutral-900 tracking-tight">
              Our Authentic Bottles & Goods
            </h2>
            <p className="text-[12px] text-neutral-500 mt-1 font-light tracking-wide max-w-lg">
              Direct from The Whisky Shop Kenya catalog. Guaranteed authentic bottles, verified stocks, and real prices.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 max-w-full no-scrollbar">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                }`}
              >
                {tab.replace("SINGLEMALT", "SINGLE MALT")}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = !!wishlist[product.id];
            const isAdded = !!added[product.id];

            return (
              <div
                key={product.id}
                className="border border-neutral-200/90 rounded-2xl overflow-hidden flex flex-col bg-white group hover:shadow-xl hover:border-neutral-300 transition-all duration-300 relative"
              >
                {/* Image Container with crisp background */}
                <div className="relative w-full h-[240px] bg-gradient-to-b from-neutral-50 to-neutral-100/70 p-4 flex items-center justify-center overflow-hidden">
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-neutral-900 text-white text-[9px] uppercase font-bold px-2.5 py-1 rounded-full tracking-[0.12em] shadow-sm">
                      {product.category}
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Wishlist bottle"
                      className="w-7 h-7 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-red-500 hover:scale-110 transition-all cursor-pointer shadow-sm"
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
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mb-1">
                      <span>{product.brand || product.category}</span>
                      <span>{product.size}</span>
                    </div>

                    <h3 className="font-serif text-[15px] sm:text-[16px] font-normal text-neutral-900 group-hover:text-black line-clamp-2 leading-snug mb-3">
                      {product.name}
                    </h3>

                    {/* Branch availability if available */}
                    {product.availableBranches && product.availableBranches.length > 0 && (
                      <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded px-2 py-0.5 inline-block mb-3">
                        ✓ In Stock: {product.availableBranches.slice(0, 2).join(", ")}
                      </div>
                    )}
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-neutral-400 block -mb-0.5">PRICE</span>
                      <span className="font-serif text-[17px] font-bold text-neutral-900">
                        KES {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(product)}
                      className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-neutral-900 text-white hover:bg-neutral-800 active:scale-95"
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
      </div>
    </section>
  );
}

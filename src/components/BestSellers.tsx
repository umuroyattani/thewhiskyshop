"use client";

import { BEST_SELLERS } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function BestSellers() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (product: (typeof BEST_SELLERS)[0]) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="collections" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold mb-2">
            Collector Favorites
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-white">Our Best Selling Bottles</h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mt-2">
            Detailed from our finest selection for those looking for our most popular premium choices.
          </p>
        </div>

        <div className="flex items-center gap-3 self-end">
          <button
            aria-label="Previous Page"
            className="w-10 h-10 rounded-full border border-obsidian-700 bg-obsidian-900 flex items-center justify-center text-gray-300 hover:text-white hover:border-gold-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Next Page"
            className="w-10 h-10 rounded-full border border-obsidian-700 bg-obsidian-900 flex items-center justify-center text-gray-300 hover:text-white hover:border-gold-500 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BEST_SELLERS.map((product) => (
          <div
            key={product.id}
            className="group bg-obsidian-900 border border-obsidian-800 rounded-xl p-6 flex flex-col justify-between hover:border-gold-500/40 transition-all shadow-xl"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded">
                  {product.tag}
                </span>
                <span className="text-xs text-gray-500 font-medium">{product.abv} ABV</span>
              </div>

              <div className="relative h-72 w-full my-4 overflow-hidden rounded-lg bg-obsidian-950 flex items-center justify-center border border-obsidian-850">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              <p className="text-xs text-gray-400 mb-1 font-medium">{product.region} • {product.category}</p>
              <h3 className="font-serif text-xl text-white font-semibold mb-3">
                {product.name}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {product.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-obsidian-850 text-gray-300 border border-obsidian-800"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-obsidian-800">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Price</p>
                <p className="font-serif text-lg font-bold text-gold-400">
                  KES {product.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => handleAdd(product)}
                className="flex items-center gap-2 px-5 py-2.5 bg-obsidian-800 hover:bg-gold-500 hover:text-obsidian-950 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md cursor-pointer"
              >
                {addedId === product.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Acquire
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

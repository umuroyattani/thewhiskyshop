"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-20 overflow-hidden bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Headline */}
      <div className="max-w-4xl mx-auto z-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400 text-[11px] uppercase tracking-widest font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Curated Single Malt Allocations
        </span>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.05] mb-6">
          Raise Your Spirits <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gold-300 to-gold-500">
            with Every Sip
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-gray-400 text-sm sm:text-base mb-8 font-light leading-relaxed">
          Kenya&apos;s authoritative cellar of rare scotch, limited distillery releases, and bespoke collector spirits. Delivered chilled to your doorstep in Nairobi.
        </p>

        {/* Hero Visual Bottle Showcase */}
        <div className="relative w-full max-w-2xl h-80 sm:h-96 mx-auto my-6 flex items-center justify-center">
          <div className="relative w-72 h-full drop-shadow-[0_35px_35px_rgba(212,175,55,0.15)]">
            <Image
              src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1000&auto=format&fit=crop"
              alt="The Macallan 12 Sherry Oak"
              fill
              priority
              className="object-contain"
            />
          </div>
          {/* Mockup Badge overlay */}
          <div className="absolute right-4 bottom-8 hidden sm:block text-left bg-obsidian-950/80 backdrop-blur-md border border-obsidian-800 p-3 rounded-lg max-w-[200px]">
            <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Featured Bottling</p>
            <p className="font-serif text-xs text-white mt-0.5">The Macallan 12 Sherry Oak</p>
            <a href="#collections" className="text-[10px] text-gray-400 underline hover:text-white mt-1 inline-block">Discover More</a>
          </div>
        </div>

        {/* Stats Row matching design mockup: 300+ Single Malts, 77% Rare Allocations, 24.7 Years of Age */}
        <div className="grid grid-cols-3 max-w-lg mx-auto gap-4 pt-6 border-t border-obsidian-800/80">
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-white font-bold">300+</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Rare Single Malts</p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-gold-400 font-bold">77%</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Rare Allocations</p>
          </div>
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-white font-bold">24.7</p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Avg Years of Age</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <ArrowDown className="w-5 h-5" />
      </div>
    </section>
  );
}

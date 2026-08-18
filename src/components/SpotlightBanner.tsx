import { SPOTLIGHT_FEATURE } from "@/data/catalog";
import Image from "next/image";

export default function SpotlightBanner() {
  return (
    <section id="craftsmanship" className="py-20 bg-obsidian-900 border-b border-obsidian-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-obsidian-950 border border-obsidian-800 rounded-2xl p-8 sm:p-12 overflow-hidden relative">
          {/* Left Visual Image representing luxury tasting / bar atmosphere */}
          <div className="lg:col-span-6 relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-obsidian-800">
            <Image
              src={SPOTLIGHT_FEATURE.image}
              alt="Crafting Moments with Finest Spirits"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60" />
          </div>

          {/* Right Text Content matching mockup layout */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold block">
              Heritage & Craftsmanship
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
              {SPOTLIGHT_FEATURE.title}
            </h2>

            <p className="text-gray-300 font-serif text-sm italic leading-relaxed">
              &ldquo;{SPOTLIGHT_FEATURE.description}&rdquo;
            </p>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
              {SPOTLIGHT_FEATURE.subtext}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#collections"
                className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs rounded transition-colors"
              >
                Wine Collection
              </a>
              <a
                href="#collections"
                className="px-6 py-3 bg-obsidian-800 hover:bg-obsidian-700 text-white font-bold uppercase tracking-widest text-xs rounded border border-obsidian-700 transition-colors"
              >
                Cocktails
              </a>
              <a
                href="#collections"
                className="px-6 py-3 border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-bold uppercase tracking-widest text-xs rounded transition-colors"
              >
                See All
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { CATEGORIES } from "@/data/catalog";
import Image from "next/image";

export default function CategoryGrid() {
  return (
    <section className="py-20 bg-obsidian-950 border-y border-obsidian-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold mb-2">
            The Cellar
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="group cursor-pointer p-6 rounded-xl bg-obsidian-900 border border-obsidian-800 hover:border-gold-500/50 transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1 shadow-lg"
            >
              <div className="w-20 h-20 rounded-full bg-obsidian-850 border border-obsidian-700 relative overflow-hidden mb-4 group-hover:scale-105 group-hover:border-gold-500 transition-all shadow-inner flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-obsidian-950/40 group-hover:bg-transparent transition-colors" />
                <span className="font-serif text-sm text-gold-400 font-bold relative z-10 drop-shadow">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-serif text-sm font-semibold text-white group-hover:text-gold-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                {cat.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

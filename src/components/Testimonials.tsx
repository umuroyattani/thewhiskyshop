import { TESTIMONIALS } from "@/data/catalog";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="py-24 bg-obsidian-950 border-t border-obsidian-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold mb-2">
            The Fine Taste Speaks
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            What they&apos;re saying?
          </h2>
        </div>

        {/* Card Box matching mockup container structure */}
        <div className="bg-obsidian-900/60 border border-obsidian-800 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-obsidian-950/80 border border-obsidian-800/80 hover:border-gold-500/30 transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold-500/40 mb-4 shadow-lg">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>

                <h4 className="font-serif text-base font-semibold text-white">{t.name}</h4>
                <p className="text-[10px] uppercase tracking-wider text-gold-500 font-sans mb-4">
                  {t.role}
                </p>

                <p className="font-serif text-gray-300 text-xs italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

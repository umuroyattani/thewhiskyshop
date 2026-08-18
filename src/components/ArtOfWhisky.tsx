import { ART_OF_WHISKY } from "@/data/catalog";

export default function ArtOfWhisky() {
  return (
    <section className="relative py-32 bg-obsidian-950 border-y border-obsidian-800/80 overflow-hidden flex items-center justify-center text-center">
      {/* Background Image with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${ART_OF_WHISKY.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-obsidian-950" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-6">
        <span className="text-[11px] uppercase tracking-[0.4em] text-gold-400 font-semibold block">
          {ART_OF_WHISKY.subtitle}
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight">
          {ART_OF_WHISKY.title}
        </h2>

        <p className="text-gray-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {ART_OF_WHISKY.description}
        </p>

        <div className="pt-4">
          <a
            href="#collections"
            className="inline-block px-8 py-3.5 bg-white hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs rounded transition-all shadow-xl"
          >
            {ART_OF_WHISKY.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

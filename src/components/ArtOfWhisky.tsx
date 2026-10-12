"use client";

import Image from "next/image";
import Link from "next/link";
import { ART_OF_WHISKY } from "@/data/catalog";

export default function ArtOfWhisky() {
  return (
    <section
      id="art-of-whisky"
      className="relative h-[440px] sm:h-[520px] w-full overflow-hidden flex items-center justify-center text-center px-6"
    >
      {/* Background Photo */}
      <Image
        src="/images/hero/art_bar.jpg"
        alt="Celebrating the Art of Whisky"
        fill
        className="object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered Content */}
      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        <span className="text-[9px] uppercase tracking-[0.35em] text-gray-300/80 font-medium mb-4 block">
          {ART_OF_WHISKY.subtitle}
        </span>

        <h2 className="font-serif text-[30px] sm:text-[42px] md:text-[50px] text-white font-normal mb-5 tracking-tight leading-tight">
          {ART_OF_WHISKY.title}
        </h2>

        <p className="text-[13px] text-gray-300/80 max-w-md mx-auto leading-[1.75] mb-8 font-light">
          {ART_OF_WHISKY.description}
        </p>

        <Link
          href="#best-sellers"
          className="px-9 py-2.5 bg-white text-black font-bold uppercase tracking-[0.18em] text-[10px] rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-2xl"
        >
          {ART_OF_WHISKY.buttonText}
        </Link>
      </div>
    </section>
  );
}

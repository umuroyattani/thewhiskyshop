"use client";

import { useState } from "react";
import Image from "next/image";
import { NEWSLETTER } from "@/data/catalog";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="bg-[#0e0e0e] py-12 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden relative min-h-[300px] flex items-center justify-center p-10 sm:p-16 text-center text-white shadow-2xl">
        {/* Background Photo */}
        <Image
          src="/images/hero/newsletter_lounge.jpg"
          alt="Stay in the Spirit"
          fill
          className="object-cover brightness-[0.35]"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-md mx-auto">
          <h2 className="font-serif text-[28px] sm:text-[38px] font-normal mb-3 text-white tracking-tight">
            {NEWSLETTER.title}
          </h2>

          <p className="text-[13px] text-gray-300/80 max-w-sm mx-auto mb-8 leading-[1.75] font-light">
            {NEWSLETTER.description}
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubmit}
              className="max-w-sm mx-auto flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 shadow-2xl focus-within:border-white/50 transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-4 text-xs text-white placeholder-gray-400/70 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-black font-bold uppercase tracking-[0.15em] text-[9px] rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {NEWSLETTER.buttonText}
              </button>
            </form>
          ) : (
            <div className="px-6 py-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-full max-w-sm mx-auto text-xs text-white">
              You are now connected. Thank you.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

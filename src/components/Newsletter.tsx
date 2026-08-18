"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 2000);
    }
  };

  return (
    <section className="py-20 bg-obsidian-900 border-t border-obsidian-800 px-6">
      <div className="max-w-4xl mx-auto bg-obsidian-950 border border-obsidian-800 rounded-2xl p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl text-white">
            Stay in the Spirit
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
            Join our exclusive society of spirit enthusiasts for rare release alerts, tasting invitations, and custom offers.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-obsidian-900 border border-obsidian-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                SUBSCRIBE NOW
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 pt-4">
              <Check className="w-4 h-4" /> Welcome to the society. Check your inbox shortly.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

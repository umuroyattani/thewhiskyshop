"use client";

import Link from "next/link";
import { Layers, Store, Truck, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { useBranch } from "@/context/BranchContext";

export default function EnterpriseTrialBanner() {
  const { selectedBranch } = useBranch();

  return (
    <section className="bg-obsidian-950 border-y border-obsidian-800 py-10 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold-400" />
                ENTERPRISE RFP FUNCTIONAL TRIAL
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live Prototype Active
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Scalable Multi-Location E-Commerce Architecture
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
              Explore the functional trial built specifically to demonstrate our technical capability: 4,000+ SKU catalog scalability, multi-branch stock routing, inter-branch transfers, and real-time GPS delivery tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              Active Node: <strong className="text-gold-400">{selectedBranch.name}</strong>
            </span>
          </div>
        </div>

        {/* 3 Interactive Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 4,000+ SKU Catalog */}
          <Link
            href="/catalog"
            className="group bg-obsidian-900 border border-obsidian-800 hover:border-gold-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block font-bold">
                Pillar I • Catalog Scalability
              </span>
              <h3 className="font-serif text-lg text-white font-bold mt-1 group-hover:text-gold-300 transition-colors">
                4,000+ SKU High-Speed Engine
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Browse our in-memory high-density product database with instant faceted search, barcode lookup, ABV/region filters, and sub-50ms query response.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-obsidian-800 flex items-center justify-between text-xs font-bold text-gold-400">
              <span>Launch 4k+ Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Multi-Branch Inventory */}
          <Link
            href="/operations"
            className="group bg-obsidian-900 border border-obsidian-800 hover:border-gold-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block font-bold">
                Pillar II • Multi-Branch WMS
              </span>
              <h3 className="font-serif text-lg text-white font-bold mt-1 group-hover:text-gold-300 transition-colors">
                Multi-Location Inventory Matrix
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Manage stock across 5 branches (CBD, Westlands, Kilimani Hub, Karen, Mombasa). Trigger inter-branch transfers and rebalance warehouse allocations in real time.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-obsidian-800 flex items-center justify-between text-xs font-bold text-gold-400">
              <span>Open Operations Cockpit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Real-Time Logistics Tracking */}
          <Link
            href="/track/TWS-ORD-8821"
            className="group bg-obsidian-900 border border-obsidian-800 hover:border-gold-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block font-bold">
                Pillar III • Last-Mile Fulfillment
              </span>
              <h3 className="font-serif text-lg text-white font-bold mt-1 group-hover:text-gold-300 transition-colors">
                Live GPS Delivery Radar
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Test the client-facing tracking portal: moving courier GPS on interactive route, climate telemetry (cellar temp sensor), ETA countdown, and OTP security handover.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-obsidian-800 flex items-center justify-between text-xs font-bold text-gold-400">
              <span>Test Live Order Tracking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

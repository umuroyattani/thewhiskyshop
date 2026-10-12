"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import {
  BRANCH_LOCATIONS,
  BASE_INVENTORY,
  ACTIVE_TRANSFERS,
  generateExpandedCatalog,
} from "@/data/multiLocationData";
import { StockTransferRequest, InventoryItem } from "@/types/multiLocation";
import {
  Store,
  Layers,
  ArrowRightLeft,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Package,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function OperationsPage() {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>(BASE_INVENTORY);
  const [transfers, setTransfers] = useState<StockTransferRequest[]>(ACTIVE_TRANSFERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState("all");

  // Transfer Modal / Form state
  const [sourceBranchId, setSourceBranchId] = useState("loc-nbo-kilimani");
  const [destBranchId, setDestBranchId] = useState("loc-nbo-karen");
  const [transferSku, setTransferSku] = useState(BASE_INVENTORY[0].sku);
  const [transferQty, setTransferQty] = useState(6);
  const [transferSuccessMsg, setTransferSuccessMsg] = useState("");

  const filteredInventory = inventoryList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedBranchFilter === "all") return true;

    return (item.stockByBranch[selectedBranchFilter] || 0) < item.lowStockThreshold;
  });

  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceBranchId === destBranchId) {
      alert("Source and Destination branches must be different.");
      return;
    }

    const targetItem = inventoryList.find((i) => i.sku === transferSku);
    if (!targetItem) return;

    const sourceStock = targetItem.stockByBranch[sourceBranchId] || 0;
    if (sourceStock < transferQty) {
      alert(`Insufficient stock at source branch. Only ${sourceStock} units available.`);
      return;
    }

    // Deduct from source and add transfer log
    const updatedInventory = inventoryList.map((item) => {
      if (item.sku === transferSku) {
        return {
          ...item,
          stockByBranch: {
            ...item.stockByBranch,
            [sourceBranchId]: sourceStock - transferQty,
          },
        };
      }
      return item;
    });
    setInventoryList(updatedInventory);

    const newTransfer: StockTransferRequest = {
      id: `TRF-${Math.floor(1000 + Math.random() * 9000)}`,
      transferNumber: `TRF-AUT-${Date.now().toString().slice(-4)}`,
      sku: transferSku,
      productName: targetItem.name,
      sourceBranchId,
      destinationBranchId: destBranchId,
      quantity: transferQty,
      status: "in_transit",
      initiatedAt: "Just now",
      eta: "1 hr 15 mins (Dedicated Fleet Van)",
    };

    setTransfers([newTransfer, ...transfers]);
    setTransferSuccessMsg(
      `Successfully generated Transfer ${newTransfer.transferNumber}: Dispatched ${transferQty}x ${targetItem.name} from ${
        BRANCH_LOCATIONS.find((b) => b.id === sourceBranchId)?.neighborhood
      } to ${BRANCH_LOCATIONS.find((b) => b.id === destBranchId)?.neighborhood}.`
    );

    setTimeout(() => {
      setTransferSuccessMsg("");
    }, 6000);
  };

  const getBranchName = (id: string) => {
    return BRANCH_LOCATIONS.find((b) => b.id === id)?.neighborhood || id;
  };

  return (
    <main className="min-h-screen bg-obsidian-950 text-gray-200">
      <Navbar />

      {/* Enterprise Operations Bar */}
      <section className="bg-obsidian-900 border-b border-obsidian-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                  Enterprise Operations Cockpit
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  Multi-Branch WMS v2.4
                </span>
              </div>
              <h1 className="font-serif text-xl text-white font-bold">
                Distributed Inventory & Inter-Branch Logistics
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/catalog"
              className="px-4 py-2 bg-obsidian-850 hover:bg-obsidian-800 border border-obsidian-700 text-xs font-semibold text-gray-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>Customer 4k+ Catalog</span>
            </Link>
            <Link
              href="/track/TWS-ORD-8821"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Live Delivery Radar</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-obsidian-900 border border-obsidian-800 rounded-2xl">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider mb-2">
              <span>Managed SKUs</span>
              <Package className="w-4 h-4 text-gold-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white">4,200+</p>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Scalable to 50,000+ SKUs with GIN indexes
            </p>
          </div>

          <div className="p-5 bg-obsidian-900 border border-obsidian-800 rounded-2xl">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider mb-2">
              <span>Branch Nodes</span>
              <Store className="w-4 h-4 text-gold-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white">5 Active Hubs</p>
            <p className="text-[11px] text-gray-400 mt-1">4 Nairobi Nodes + 1 Coastal Depot</p>
          </div>

          <div className="p-5 bg-obsidian-900 border border-obsidian-800 rounded-2xl">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider mb-2">
              <span>Active Dispatches</span>
              <Truck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white">18 Couriers</p>
            <p className="text-[11px] text-emerald-400 mt-1">Average last-mile ETA: 32 mins</p>
          </div>

          <div className="p-5 bg-obsidian-900 border border-obsidian-800 rounded-2xl">
            <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider mb-2">
              <span>Active Transfers</span>
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white">{transfers.length} In Transit</p>
            <p className="text-[11px] text-amber-400 mt-1">Inter-branch rebalancing active</p>
          </div>
        </div>

        {/* Transfer Action Alert if successful */}
        {transferSuccessMsg && (
          <div className="p-4 bg-emerald-950/60 border border-emerald-500 rounded-xl flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>{transferSuccessMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Multi-Branch Stock Matrix Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-obsidian-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-serif text-lg font-bold text-white">
                    Live Multi-Location Inventory Matrix
                  </h2>
                  <p className="text-xs text-gray-400">
                    Real-time stock balance across all distribution centers and storefronts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter SKU or name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-obsidian-950 border border-obsidian-800 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-obsidian-950 border-b border-obsidian-800 text-[10px] uppercase font-mono tracking-wider text-gray-400">
                    <tr>
                      <th className="py-3 px-4">SKU / Bottle</th>
                      <th className="py-3 px-3 text-center">CBD Flagship</th>
                      <th className="py-3 px-3 text-center">Westlands</th>
                      <th className="py-3 px-3 text-center">Kilimani Hub</th>
                      <th className="py-3 px-3 text-center">Karen Store</th>
                      <th className="py-3 px-3 text-center">Mombasa</th>
                      <th className="py-3 px-4 text-right">System Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-obsidian-800/80">
                    {filteredInventory.map((item) => {
                      const total = Object.values(item.stockByBranch).reduce((a, b) => a + b, 0);

                      return (
                        <tr key={item.sku} className="hover:bg-obsidian-850/50 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[10px] text-gold-400 block font-bold">
                              {item.sku}
                            </span>
                            <span className="font-serif font-bold text-white">{item.name}</span>
                            <span className="text-[10px] text-gray-400 block">{item.category}</span>
                          </td>

                          {/* CBD */}
                          <td className="py-3.5 px-3 text-center font-mono">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                (item.stockByBranch["loc-nbo-cbd"] || 0) <= item.lowStockThreshold
                                  ? "bg-amber-950/60 text-amber-400 border border-amber-800"
                                  : "text-gray-300"
                              }`}
                            >
                              {item.stockByBranch["loc-nbo-cbd"] || 0}
                            </span>
                          </td>

                          {/* Westlands */}
                          <td className="py-3.5 px-3 text-center font-mono">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                (item.stockByBranch["loc-nbo-westlands"] || 0) <= item.lowStockThreshold
                                  ? "bg-amber-950/60 text-amber-400 border border-amber-800"
                                  : "text-gray-300"
                              }`}
                            >
                              {item.stockByBranch["loc-nbo-westlands"] || 0}
                            </span>
                          </td>

                          {/* Kilimani Central Hub */}
                          <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-400">
                            {item.stockByBranch["loc-nbo-kilimani"] || 0}
                          </td>

                          {/* Karen */}
                          <td className="py-3.5 px-3 text-center font-mono">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                (item.stockByBranch["loc-nbo-karen"] || 0) === 0
                                  ? "bg-red-950/60 text-red-400 border border-red-800 font-bold"
                                  : (item.stockByBranch["loc-nbo-karen"] || 0) <= item.lowStockThreshold
                                  ? "bg-amber-950/60 text-amber-400 border border-amber-800"
                                  : "text-gray-300"
                              }`}
                            >
                              {item.stockByBranch["loc-nbo-karen"] || 0}
                            </span>
                          </td>

                          {/* Mombasa */}
                          <td className="py-3.5 px-3 text-center font-mono text-gray-300">
                            {item.stockByBranch["loc-msa-central"] || 0}
                          </td>

                          {/* Total */}
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                            {total} units
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Inter-Branch Transit Table */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-gold-400" />
                    <span>Active Stock Transfers Between Nodes</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Automated transfer slips tracked with fleet barcode manifests.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {transfers.map((trf) => (
                  <div
                    key={trf.id}
                    className="p-3.5 bg-obsidian-950 border border-obsidian-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-gold-400 font-bold">{trf.transferNumber}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {trf.status.replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="font-serif text-white font-semibold mt-0.5">
                        {trf.quantity}x {trf.productName} ({trf.sku})
                      </p>
                      <p className="text-gray-400 text-[11px]">
                        From: <strong className="text-gray-200">{getBranchName(trf.sourceBranchId)}</strong> → To:{" "}
                        <strong className="text-gray-200">{getBranchName(trf.destinationBranchId)}</strong>
                      </p>
                    </div>

                    <div className="text-right sm:self-center">
                      <span className="text-[10px] text-gray-500 block">Transit ETA</span>
                      <span className="font-mono font-bold text-amber-400">{trf.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inter-Branch Stock Rebalancing Tool */}
          <div className="space-y-6">
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-6 shadow-xl">
              <div className="mb-4">
                <span className="text-[10px] uppercase font-mono font-bold text-gold-400 tracking-wider block">
                  Logistics Dispatch Engine
                </span>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  Initiate Inter-Branch Stock Transfer
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Rebalance inventory between branches to prevent stock-outs or fulfill click & collect orders.
                </p>
              </div>

              <form onSubmit={handleInitiateTransfer} className="space-y-4 text-xs">
                {/* SKU Select */}
                <div>
                  <label className="text-gray-300 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                    Select Product SKU
                  </label>
                  <select
                    value={transferSku}
                    onChange={(e) => setTransferSku(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    {inventoryList.map((item) => (
                      <option key={item.sku} value={item.sku}>
                        {item.sku} — {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Source Node */}
                <div>
                  <label className="text-gray-300 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                    Dispatch From (Source Branch)
                  </label>
                  <select
                    value={sourceBranchId}
                    onChange={(e) => setSourceBranchId(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    {BRANCH_LOCATIONS.map((br) => (
                      <option key={br.id} value={br.id}>
                        {br.name} ({br.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination Node */}
                <div>
                  <label className="text-gray-300 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                    Receive At (Destination Branch)
                  </label>
                  <select
                    value={destBranchId}
                    onChange={(e) => setDestBranchId(e.target.value)}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    {BRANCH_LOCATIONS.map((br) => (
                      <option key={br.id} value={br.id}>
                        {br.name} ({br.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-gray-300 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                    Transfer Quantity (Bottles)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={transferQty}
                    onChange={(e) => setTransferQty(Number(e.target.value))}
                    className="w-full bg-obsidian-950 border border-obsidian-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-obsidian-950 font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>Generate Transfer Manifest</span>
                </button>
              </form>
            </div>

            {/* Architectural Highlights Card for Proposal review */}
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl p-6 space-y-3">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-wider block">
                Technical Architecture Highlights
              </span>
              <h4 className="font-serif text-sm font-bold text-white">
                How We Ensure Zero Discrepancy Multi-Warehouse Sync
              </h4>
              <ul className="text-xs text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">1.</span>
                  <span><strong>Distributed Locks (Redis Redlock):</strong> Prevents race conditions during concurrent checkouts across branches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">2.</span>
                  <span><strong>Available-To-Promise (ATP):</strong> Real-time separation of physical on-hand stock vs committed uncollected orders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">3.</span>
                  <span><strong>ERP Two-Way Webhooks:</strong> Auto-reconciliation with Odoo / SAP / Sage / QuickBooks every 30 seconds.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}

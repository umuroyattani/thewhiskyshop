"use client";

import React, { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { MapPin, Check, Store, Truck, X, Clock, Phone } from "lucide-react";

export default function BranchSelectorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    allBranches,
    selectedBranch,
    setSelectedBranchId,
    customerLocation,
    setCustomerLocation,
    fulfillmentMode,
    setFulfillmentMode,
  } = useBranch();

  const [tempLocation, setTempLocation] = useState(customerLocation);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-obsidian-950 border border-obsidian-750 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 text-gray-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-full hover:bg-obsidian-850"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gold-400 font-bold uppercase tracking-widest mb-1">
            <Store className="w-4 h-4" />
            <span>Multi-Location Inventory Routing</span>
          </div>
          <h2 className="font-serif text-2xl text-white">Select Your Preferred Branch & Mode</h2>
          <p className="text-xs text-gray-400 mt-1">
            Stock availability, delivery speed, and collection options dynamically adapt to your selected fulfillment node.
          </p>
        </div>

        {/* Fulfillment Mode Toggle */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-obsidian-900 border border-obsidian-800 rounded-xl">
          <button
            onClick={() => setFulfillmentMode("delivery")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              fulfillmentMode === "delivery"
                ? "bg-gold-500 text-obsidian-950 shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Doorstep Courier Delivery</span>
          </button>
          <button
            onClick={() => setFulfillmentMode("pickup")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all ${
              fulfillmentMode === "pickup"
                ? "bg-gold-500 text-obsidian-950 shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Click & Collect (Store Pickup)</span>
          </button>
        </div>

        {/* Delivery Address input if delivery mode */}
        {fulfillmentMode === "delivery" && (
          <div className="mb-6 p-4 bg-obsidian-900/70 border border-obsidian-800 rounded-xl">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-300 block mb-1.5">
              Your Delivery Area (Nairobi / Coast)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                placeholder="e.g. Westlands, Kilimani, Karen, Nyali..."
                className="flex-1 bg-obsidian-950 border border-obsidian-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
              <button
                onClick={() => setCustomerLocation(tempLocation)}
                className="px-4 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-xs font-bold text-gold-400 rounded-lg transition-colors border border-obsidian-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Branch Cards */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {allBranches.map((branch) => {
            const isSelected = selectedBranch.id === branch.id;
            return (
              <div
                key={branch.id}
                onClick={() => {
                  setSelectedBranchId(branch.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  isSelected
                    ? "bg-gold-500/10 border-gold-500 shadow-lg shadow-gold-500/5"
                    : "bg-obsidian-900 border-obsidian-800 hover:border-obsidian-700"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-sm font-bold text-white">{branch.name}</h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-obsidian-800 text-gold-400 border border-obsidian-700">
                      {branch.code}
                    </span>
                    {branch.type === "express_hub" && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        24/7 Dark Hub
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                    <span>{branch.address}</span>
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {branch.openingHours}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {branch.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {isSelected ? (
                    <span className="w-6 h-6 rounded-full bg-gold-500 text-obsidian-950 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 hover:text-gold-400 underline">Select</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-obsidian-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold uppercase tracking-wider text-xs rounded-lg transition-colors cursor-pointer"
          >
            Confirm Fulfillment Location
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShieldCheck, Smartphone, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CartDrawer() {
  const { isOpen, closeCart, cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaSent, setMpesaSent] = useState(false);

  if (!isOpen) return null;

  const handleMpesaPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate Safaricom Daraja STK Push trigger
    setTimeout(() => {
      setIsProcessing(false);
      setMpesaSent(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-obsidian-800 text-gray-200 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-obsidian-800 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg text-white tracking-wider">Your Selection</h2>
              <p className="text-[11px] text-gold-500 uppercase tracking-widest mt-0.5">Nairobi Cellar Order</p>
            </div>
            <button onClick={closeCart} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-obsidian-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p className="font-serif text-xl text-gray-400 mb-2">Your cellar is empty</p>
                <p className="text-xs">Explore our single malt allocations to begin.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-obsidian-900 border border-obsidian-800 rounded-lg hover:border-obsidian-700 transition-colors"
                >
                  <div className="w-16 h-20 bg-obsidian-850 rounded relative overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm text-white truncate">{item.name}</h3>
                      <p className="text-[11px] text-gold-500 mb-1">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-obsidian-850 border border-obsidian-700 rounded px-2 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-200">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-400 self-start p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout & M-Pesa STK Push Section */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-obsidian-800 bg-obsidian-900/60">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-widest text-gray-400">Total Due</span>
                <span className="font-serif text-xl font-bold text-gold-400">
                  KES {cartTotal.toLocaleString()}
                </span>
              </div>

              {!mpesaSent ? (
                <form onSubmit={handleMpesaPrompt} className="space-y-3">
                  <div className="relative">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1">
                      Express Safaricom M-Pesa STK Checkout
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 absolute left-3 top-3 text-gold-500" />
                      <input
                        type="tel"
                        required
                        placeholder="07XX XXX XXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-obsidian-950 border border-obsidian-700 rounded py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:to-gold-400 text-obsidian-950 font-bold uppercase tracking-widest text-xs rounded transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? "Sending Prompt..." : "Pay with M-Pesa Prompt"}
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-center space-y-2">
                  <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-semibold text-white">STK Push Request Sent!</p>
                  <p className="text-[11px] text-gray-400">
                    A prompt has been sent to <span className="text-gold-400 font-mono">{phoneNumber}</span>. Enter your M-Pesa PIN to finalize your acquisition.
                  </p>
                  <button
                    onClick={() => {
                      setMpesaSent(false);
                      setPhoneNumber("");
                    }}
                    className="text-[10px] text-gold-500 underline mt-2 inline-block"
                  >
                    Send another request
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

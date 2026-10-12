"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [branch, setBranch] = useState("Westlands");

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[440px] bg-white text-black flex flex-col shadow-2xl transform transition-transform duration-400 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-serif text-[20px] font-normal text-black tracking-tight">
              Your Bag
            </h2>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase mt-0.5">
              {cart.length === 0
                ? "Empty"
                : `${cart.reduce((s, i) => s + i.quantity, 0)} item${
                    cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""
                  }`}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close bag"
            className="text-[20px] text-gray-400 hover:text-black transition-colors cursor-pointer p-1 leading-none"
          >
            x
          </button>
        </div>

        {/* Branch Selector */}
        <div className="px-7 py-4 border-b border-gray-100 bg-[#fafafa]">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-2">
            Pickup Location
          </label>
          <div className="relative">
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-black cursor-pointer focus:outline-none focus:border-black focus:ring-1 focus:ring-black pr-8 font-medium"
            >
              {["Westlands", "Karen", "CBD", "Kilimani", "Lavington"].map((b) => (
                <option key={b} value={b}>
                  {b} Branch
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none">
              v
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-7 py-5 space-y-5">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pt-14">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-5">
                <span className="text-2xl text-gray-300 font-serif font-light">W</span>
              </div>
              <h3 className="font-serif text-lg font-normal text-gray-700 mb-1">Your bag is empty</h3>
              <p className="text-xs text-gray-400 mb-7 leading-[1.7]">
                Browse our collection and add<br />something special.
              </p>
              <button
                onClick={closeCart}
                className="px-7 py-2.5 bg-black text-white font-bold uppercase text-[10px] tracking-[0.18em] rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 pb-5 border-b border-gray-100 last:border-0"
              >
                {/* Product image */}
                <div className="relative w-[72px] h-[88px] rounded-xl overflow-hidden bg-[#f5f5f5] flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-semibold text-black leading-snug mb-0.5 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-3">
                    {item.category}
                  </p>

                  <div className="flex items-center justify-between">
                    {/* Quantity stepper */}
                    <div className="flex items-center gap-1 border border-gray-200 rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold px-1 min-w-[16px] text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, +1)}
                        aria-label="Increase quantity"
                        className="w-7 h-7 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                      >
                        +
                      </button>
                    </div>

                    {/* Price + remove */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-bold text-black">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[9px] uppercase tracking-wider text-gray-400 hover:text-black transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Order Summary + Checkout */}
        {cart.length > 0 && (
          <div className="px-7 py-6 border-t border-gray-100 bg-[#fafafa] space-y-3">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Subtotal</span>
              <span>KES {cartTotal.toLocaleString()}</span>
            </div>

            {/* Delivery */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Delivery (Nairobi)</span>
              <span className="text-green-600 font-medium">Calculated at checkout</span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-sm text-black">Total</span>
              <span className="font-bold text-lg text-black">
                KES {cartTotal.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full mt-1 px-6 py-4 bg-black text-white text-center font-bold uppercase tracking-[0.18em] text-[10px] rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-black/20 cursor-pointer"
            >
              Proceed to Checkout
            </Link>

            <p className="text-[9px] text-gray-400 text-center tracking-wide pt-1">
              Pay securely via M-Pesa, Visa or Mastercard
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

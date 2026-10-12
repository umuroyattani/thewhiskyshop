"use client";

import { useCart } from "@/context/CartContext";
import { BRANCH_LOCATIONS } from "@/data/multiLocationData";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { createSupabaseOrder } from "@/lib/supabase";

type Step = "details" | "location" | "payment" | "confirmed";
type FulfillmentMode = "delivery" | "pickup";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [mode, setMode] = useState<FulfillmentMode>("delivery");
  const [branchId, setBranchId] = useState("loc-nbo-westlands");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderId] = useState(
    "TWS-" + Math.random().toString(36).substring(2, 7).toUpperCase()
  );
  const [paying, setPaying] = useState(false);

  const selectedBranch = BRANCH_LOCATIONS.find((b) => b.id === branchId)!;
  const deliveryFee = mode === "delivery" ? 350 : 0;
  const total = cartTotal + deliveryFee;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);

    // Persist order to Supabase
    try {
      await createSupabaseOrder({
        id: orderId,
        customer_name: name || "Valued Customer",
        customer_phone: phone || "+254700000000",
        delivery_address: address || selectedBranch.address,
        city_estate: selectedBranch.neighborhood,
        items: cart.map((c) => ({
          id: c.id,
          name: c.name,
          price: c.price,
          quantity: c.quantity,
        })),
        subtotal: cartTotal,
        delivery_fee: deliveryFee,
        total_amount: total,
        status: "confirmed",
        payment_method: "mpesa_express",
        created_at: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Supabase order sync note:", err);
    }

    await new Promise((r) => setTimeout(r, 1200));
    setPaying(false);
    clearCart();
    setStep("confirmed");
  };

  if (cart.length === 0 && step !== "confirmed") {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center mb-6">
          <span className="font-serif text-3xl text-gray-300 font-light">W</span>
        </div>
        <h1 className="font-serif text-2xl text-black font-normal mb-2">Your bag is empty</h1>
        <p className="text-sm text-gray-500 mb-8">Add some bottles before checking out.</p>
        <Link
          href="/"
          className="px-8 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-[0.18em] hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex flex-col items-center justify-center text-center px-6">
        <div className="bg-white rounded-3xl p-14 max-w-md w-full shadow-xl shadow-black/[0.06]">
          <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
            <span className="text-green-500 text-xl font-bold">✓</span>
          </div>
          <h1 className="font-serif text-[28px] font-normal text-black mb-2 tracking-tight">
            Order Confirmed
          </h1>
          <p className="text-sm text-gray-500 mb-1">Thank you, {name}.</p>
          <p className="text-xs text-gray-400 mb-7">
            Your order <span className="font-mono font-bold text-black">{orderId}</span> has been received.
          </p>

          <div className="bg-[#fafafa] rounded-2xl p-5 text-left mb-7 space-y-2 border border-gray-100">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Order total</span>
              <span className="font-bold text-black">KES {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Fulfilment</span>
              <span>{mode === "delivery" ? "Home Delivery" : "Store Pickup"}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Location</span>
              <span>{selectedBranch.neighborhood}</span>
            </div>
            {mode === "delivery" && (
              <div className="flex justify-between text-xs text-gray-600">
                <span>ETA</span>
                <span className="text-green-600 font-medium">45 - 90 minutes</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mb-7 leading-[1.75]">
            You will receive an M-Pesa confirmation SMS shortly. Our team will call you to confirm your order.
          </p>

          <div className="flex flex-col gap-2.5">
            <Link
              href={`/track/${orderId}`}
              className="block w-full py-3.5 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-neutral-800 transition-colors text-center shadow-md"
            >
              Track Live Delivery & Rider →
            </Link>
            <Link
              href="/"
              className="block w-full py-3 bg-neutral-100 text-neutral-700 rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-neutral-200 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-100 px-6 sm:px-14 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-[15px] tracking-[0.22em] text-black font-bold uppercase">
          The Whisky Shop
        </Link>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Secure Checkout</span>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left: Form Steps */}
        <div className="lg:col-span-3 space-y-5">
          {/* Step Progress */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-2">
            {(["details", "location", "payment"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`font-bold transition-colors ${
                    step === s ? "text-black" : "text-gray-300"
                  }`}
                >
                  {i + 1}. {s}
                </span>
                {i < 2 && <span className="text-gray-200">—</span>}
              </div>
            ))}
          </div>

          {/* STEP 1: Contact Details */}
          {step === "details" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-serif text-[22px] font-normal text-black mb-7 tracking-tight">
                Your Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Kamau"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-1.5">
                    Phone (M-Pesa)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
                <button
                  disabled={!name || !phone}
                  onClick={() => setStep("location")}
                  className="w-full mt-2 py-4 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-gray-900 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-black/20"
                >
                  Continue to Location
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Fulfilment */}
          {step === "location" && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-serif text-[22px] font-normal text-black mb-7 tracking-tight">
                Fulfilment
              </h2>

              {/* Delivery / Pickup Toggle */}
              <div className="flex items-center gap-3 mb-7 p-1.5 bg-[#f5f5f5] rounded-2xl">
                {(["delivery", "pickup"] as FulfillmentMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                      mode === m
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-400 hover:text-black"
                    }`}
                  >
                    {m === "delivery" ? "Home Delivery" : "Store Pickup"}
                  </button>
                ))}
              </div>

              {/* Delivery address */}
              {mode === "delivery" && (
                <div className="mb-6">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-1.5">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Apt 3B, Riverside Drive, Westlands"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-black placeholder-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                  />
                  <p className="text-[9px] text-gray-400 mt-2 tracking-wide">
                    We currently deliver within Nairobi. Delivery fee: KES 350.
                  </p>
                </div>
              )}

              {/* Branch Selector */}
              <div className="mb-7">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold block mb-3">
                  {mode === "pickup" ? "Pick up from" : "Nearest Branch"}
                </label>
                <div className="space-y-2.5">
                  {BRANCH_LOCATIONS.map((branch) => (
                    <label
                      key={branch.id}
                      htmlFor={`branch-${branch.id}`}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        branchId === branch.id
                          ? "border-black bg-[#fafafa]"
                          : "border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <input
                        id={`branch-${branch.id}`}
                        type="radio"
                        name="branch"
                        value={branch.id}
                        checked={branchId === branch.id}
                        onChange={() => setBranchId(branch.id)}
                        className="mt-1 accent-black cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-black">
                            {branch.neighborhood}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              branch.type === "flagship"
                                ? "bg-amber-100 text-amber-700"
                                : branch.type === "express_hub"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {branch.type === "flagship"
                              ? "Flagship"
                              : branch.type === "express_hub"
                              ? "Express Hub"
                              : "Branch"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{branch.address}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{branch.openingHours}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("details")}
                  className="flex-1 py-3.5 border border-gray-200 text-black rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] hover:border-gray-400 transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  disabled={mode === "delivery" && !address}
                  onClick={() => setStep("payment")}
                  className="flex-[2] py-3.5 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-gray-900 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg shadow-black/20"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === "payment" && (
            <form onSubmit={handlePayment} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="font-serif text-[22px] font-normal text-black mb-1 tracking-tight">
                Payment
              </h2>
              <p className="text-xs text-gray-400 mb-7 leading-[1.7]">
                An M-Pesa STK push will be sent to{" "}
                <span className="font-bold text-black">{phone}</span> to complete your payment.
              </p>

              {/* Summary Card */}
              <div className="bg-[#fafafa] rounded-2xl p-5 space-y-2.5 mb-7 border border-gray-100">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span>KES {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">Free (Pickup)</span>
                    ) : (
                      `KES ${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa Visual */}
              <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-5 py-4 mb-7 bg-[#fafff6]">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-[11px] tracking-tight">M</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">M-Pesa STK Push</p>
                  <p className="text-[10px] text-gray-500">
                    KES {total.toLocaleString()} from {phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("location")}
                  className="flex-1 py-3.5 border border-gray-200 text-black rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] hover:border-gray-400 transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={paying}
                  className="flex-[2] py-3.5 bg-black text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-gray-900 active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                >
                  {paying ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    `Pay KES ${total.toLocaleString()}`
                  )}
                </button>
              </div>

              <p className="text-[9px] text-gray-400 text-center mt-5 tracking-wide">
                Your data is secured. All payments are encrypted.
              </p>
            </form>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-serif text-[17px] font-normal text-black mb-5 tracking-tight">
              Order Summary
            </h3>

            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-[52px] h-[64px] rounded-xl bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1.5"
                    />
                    <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-black text-white text-[8px] rounded-full flex items-center justify-center font-bold min-w-[18px] min-h-[18px] text-center leading-none px-1">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-black truncate leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-gray-400">{item.category}</p>
                  </div>
                  <span className="text-xs font-bold text-black whitespace-nowrap">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Subtotal</span>
                <span>KES {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Delivery</span>
                <span>
                  {mode === "pickup" ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    "KES 350"
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
            </div>

            {step !== "details" && (
              <div className="mt-5 pt-4 border-t border-gray-100 text-[10px] text-gray-400 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="text-black font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-black font-medium">{phone}</span>
                </div>
                {step === "payment" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fulfilment</span>
                      <span className="text-black font-medium capitalize">{mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Branch</span>
                      <span className="text-black font-medium">{selectedBranch.neighborhood}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { SAMPLE_TRACKED_ORDERS, BRANCH_LOCATIONS } from "@/data/multiLocationData";
import { TrackedOrder, OrderStatus } from "@/types/multiLocation";
import {
  MapPin,
  Truck,
  Phone,
  ShieldCheck,
  Thermometer,
  Clock,
  BatteryCharging,
  CheckCircle2,
  Navigation,
  RefreshCw,
  Store,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const [resolvedOrderId, setResolvedOrderId] = useState<string>("TWS-ORD-8821");

  useEffect(() => {
    Promise.resolve(params).then((p) => {
      if (p?.orderId) {
        setResolvedOrderId(decodeURIComponent(p.orderId));
      }
    });
  }, [params]);

  const [order, setOrder] = useState<TrackedOrder>(
    SAMPLE_TRACKED_ORDERS["TWS-ORD-8821"]
  );

  // Simulation states
  const [courierProgress, setCourierProgress] = useState(65); // 0 to 100%
  const [isLiveTelemetryActive, setIsLiveTelemetryActive] = useState(true);
  const [tempCelsius, setTempCelsius] = useState(18.2);
  const [etaRemaining, setEtaRemaining] = useState(14);
  const [speedKmH, setSpeedKmH] = useState(34);

  // Micro-simulation interval
  useEffect(() => {
    if (!isLiveTelemetryActive || order.currentStatus === "delivered") return;

    const interval = setInterval(() => {
      setCourierProgress((prev) => {
        if (prev >= 98) {
          return 98;
        }
        return prev + 1;
      });

      setSpeedKmH(30 + Math.floor(Math.random() * 12));
      setTempCelsius(Number((18.1 + Math.random() * 0.3).toFixed(1)));
      setEtaRemaining((prev) => Math.max(2, prev - 0.2));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveTelemetryActive, order.currentStatus]);

  const originBranch =
    BRANCH_LOCATIONS.find((b) => b.id === order.originBranchId) || BRANCH_LOCATIONS[2];

  const handleAdvanceStatus = () => {
    const statuses: OrderStatus[] = [
      "received",
      "inventory_reserved",
      "picked_packed",
      "dispatched",
      "out_for_delivery",
      "delivered",
    ];
    const currentIndex = statuses.indexOf(order.currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    const nextStatus = statuses[nextIndex];

    setOrder((prev) => {
      const updatedTimeline = prev.timeline.map((step, idx) => ({
        ...step,
        completed: idx <= nextIndex,
      }));

      return {
        ...prev,
        currentStatus: nextStatus,
        timeline: updatedTimeline,
      };
    });

    if (nextStatus === "delivered") {
      setCourierProgress(100);
      setEtaRemaining(0);
      setSpeedKmH(0);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian-950 text-gray-200">
      <Navbar />

      {/* RFP Demonstration Banner */}
      <section className="bg-obsidian-900 border-b border-obsidian-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Navigation className="w-4 h-4 animate-spin" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                  Real-Time Logistics & GPS Telemetry Simulator
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  Live Dispatch Socket
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Demonstrating multi-hub routing, automated driver assignment, temperature-controlled transit, and last-mile ETA.
              </p>
            </div>
          </div>

          {/* Quick Simulation controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAdvanceStatus}
              className="px-3.5 py-1.5 bg-obsidian-850 hover:bg-obsidian-800 border border-gold-500/40 text-gold-400 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Advance Step ({order.currentStatus})</span>
            </button>
            <Link
              href="/operations"
              className="px-3.5 py-1.5 bg-obsidian-800 hover:bg-obsidian-750 text-gray-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Admin View
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-obsidian-900 border border-obsidian-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl text-white font-bold">
                Order #{order.orderId}
              </h1>
              <span className="text-xs font-mono bg-obsidian-800 text-gold-400 px-2.5 py-1 rounded-full border border-obsidian-700">
                Waybill: {order.trackingNumber}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
              <span>Placed {order.createdAt}</span>
              <span>•</span>
              <span className="text-gold-400 font-medium">Dispatched from {originBranch.name}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Status</span>
              <span className="text-xs uppercase font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                {order.currentStatus.replace(/_/g, " ")}
              </span>
            </div>
            <div className="text-right border-l border-obsidian-800 pl-4">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Est. Arrival</span>
              <span className="font-serif text-lg font-bold text-white">
                {Math.ceil(etaRemaining)} mins
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Visual: Interactive Route Map Simulator */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-obsidian-900 border border-obsidian-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-obsidian-850 border-b border-obsidian-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Live Courier Radar (Nairobi Transit Corridor)
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-gold-400" />
                    {tempCelsius}°C Cellar Temp
                  </span>
                  <span className="flex items-center gap-1">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                    88%
                  </span>
                  <span>{speedKmH} km/h</span>
                </div>
              </div>

              {/* Simulated Map Canvas */}
              <div className="relative h-96 w-full bg-[#0a0d14] overflow-hidden flex items-center justify-center">
                {/* SVG Route Visualization */}
                <svg
                  className="w-full h-full absolute inset-0"
                  viewBox="0 0 800 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines mimicking digital mapping */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#161c2b" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="800" height="400" fill="url(#grid)" />

                  {/* Landmarks */}
                  <text x="140" y="70" fill="#2d3748" fontSize="11" fontFamily="sans-serif">
                    WESTLANDS COMMERCIAL DISTRICT
                  </text>
                  <text x="120" y="340" fill="#2d3748" fontSize="11" fontFamily="sans-serif">
                    KILIMANI LOGISTICS ZONE
                  </text>
                  <text x="600" y="110" fill="#2d3748" fontSize="11" fontFamily="sans-serif">
                    RIVERSIDE RESIDENTIAL PARK
                  </text>

                  {/* Transit Route Path */}
                  <path
                    d="M 160 300 C 220 280, 240 210, 320 200 C 400 190, 480 230, 560 170 C 620 120, 650 140, 680 120"
                    stroke="#223048"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Active Covered Path */}
                  <path
                    d="M 160 300 C 220 280, 240 210, 320 200 C 400 190, 480 230, 560 170 C 620 120, 650 140, 680 120"
                    stroke="#D4AF37"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="600"
                    strokeDashoffset={600 - (courierProgress / 100) * 600}
                    className="transition-all duration-1000"
                  />

                  {/* Origin Point: Kilimani Central Hub */}
                  <g transform="translate(160, 300)">
                    <circle r="14" fill="#171B24" stroke="#D4AF37" strokeWidth="2" />
                    <circle r="6" fill="#D4AF37" />
                    <text x="-40" y="28" fill="#D4AF37" fontSize="10" fontWeight="bold">
                      Kilimani Hub (Origin)
                    </text>
                  </g>

                  {/* Destination Point: Riverside Penthouse */}
                  <g transform="translate(680, 120)">
                    <circle r="14" fill="#171B24" stroke="#10b981" strokeWidth="2" />
                    <circle r="6" fill="#10b981" />
                    <text x="-35" y="-18" fill="#10b981" fontSize="10" fontWeight="bold">
                      Riverside Park (Dest.)
                    </text>
                  </g>
                </svg>

                {/* Animated Courier Marker that moves along route */}
                <div
                  className="absolute z-20 transition-all duration-700 ease-out flex flex-col items-center"
                  style={{
                    left: `${16 + (courierProgress / 100) * 66}%`,
                    top: `${68 - (courierProgress / 100) * 44}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-gold-500/30 animate-ping" />
                    <div className="relative p-2.5 rounded-full bg-gold-500 text-obsidian-950 shadow-xl border-2 border-white flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-obsidian-950/90 border border-gold-500 text-[10px] font-mono text-gold-300 font-bold whitespace-nowrap shadow-md">
                    {order.courier.driverName} • {speedKmH} km/h
                  </div>
                </div>

                {/* Floating Telemetry Box */}
                <div className="absolute bottom-4 left-4 z-20 bg-obsidian-950/90 border border-obsidian-700/80 backdrop-blur-md p-3 rounded-xl text-xs space-y-1">
                  <p className="text-[10px] uppercase font-bold text-gray-400">Transit Telemetry</p>
                  <p className="text-white font-mono">
                    Lat: -1.2755, Lng: 36.7981 (Near Chiromo Interchange)
                  </p>
                  <p className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Cold-chain / fine spirit climate seal intact
                  </p>
                </div>
              </div>
            </div>

            {/* Courier & Vehicle Profile */}
            <div className="bg-obsidian-900 border border-obsidian-800 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-obsidian-800 border-2 border-gold-500/50 flex items-center justify-center text-gold-400 font-serif text-xl font-bold">
                  JN
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    {order.courier.driverName}
                  </h3>
                  <p className="text-xs text-gray-400">{order.courier.vehicle} • {order.courier.plateNumber}</p>
                  <p className="text-[11px] text-emerald-400 mt-0.5">Verified Executive Courier • 4.9 ★ (1,420 Deliveries)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="p-2.5 bg-obsidian-950 border border-obsidian-800 rounded-xl text-center flex-1 sm:flex-initial">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Security Handover OTP</span>
                  <span className="font-mono text-sm font-bold text-gold-400">8821</span>
                </div>
                <a
                  href={`tel:${order.courier.phone}`}
                  className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-obsidian-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Courier</span>
                </a>
              </div>
            </div>

            {/* Order Items in this shipment */}
            <div className="bg-obsidian-900 border border-obsidian-800 p-6 rounded-2xl">
              <h3 className="font-serif text-base font-bold text-white mb-4">
                Consignment Contents ({order.items.length} Items)
              </h3>
              <div className="divide-y divide-obsidian-800">
                {order.items.map((item) => (
                  <div key={item.sku} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-14 bg-obsidian-850 rounded relative overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-white">{item.name}</h4>
                        <span className="text-[11px] font-mono text-gold-400">{item.sku}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">Qty: {item.quantity}</span>
                      <p className="text-xs font-bold text-white">
                        KES {(item.unitPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper Timeline & Fulfillment Milestones */}
          <div className="space-y-6">
            <div className="bg-obsidian-900 border border-obsidian-800 p-6 rounded-2xl">
              <h3 className="font-serif text-base font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span>Dispatch Milestones</span>
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-obsidian-800">
                {order.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Bullet marker */}
                    <span
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 transition-all ${
                        step.completed
                          ? "bg-gold-500 border-obsidian-950 shadow-md shadow-gold-500/30"
                          : "bg-obsidian-850 border-obsidian-700"
                      }`}
                    />

                    <div>
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-xs font-bold ${
                            step.completed ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="text-[10px] font-mono text-gold-400">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                      <span className="text-[10px] text-gray-500 block mt-1">
                        Node: {step.locationName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Destination card */}
            <div className="bg-obsidian-900 border border-obsidian-800 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Destination Coordinates</span>
              </div>
              <p className="text-sm font-semibold text-white">{order.deliveryAddress}</p>
              <p className="text-xs text-gray-400">Recipient: {order.customerName} ({order.customerPhone})</p>
              <div className="p-3 bg-obsidian-950 rounded-xl border border-obsidian-800 text-[11px] text-gray-400">
                <span className="text-gold-400 font-semibold block mb-0.5">Delivery Protocol:</span>
                Handover requiring physical ID check and SMS OTP verification prior to seal breakage.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}

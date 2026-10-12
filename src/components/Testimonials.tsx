"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/data/catalog";

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export default function Testimonials() {
  return (
    <section className="bg-[#f8f8f8] py-16 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Floating White Card */}
        <div className="bg-white rounded-2xl px-6 sm:px-12 py-10 sm:py-12 shadow-md shadow-black/[0.06]">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[9px] text-gray-400 uppercase tracking-[0.3em] font-semibold block mb-2">
              The bar they seek
            </span>
            <h2 className="font-serif text-[24px] sm:text-[30px] font-normal text-black tracking-tight">
              What they&apos;re saying
            </h2>
          </div>

          {/* 3 Reviewer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {TESTIMONIALS.map((item: TestimonialItem) => (
              <div key={item.name} className="flex flex-col items-center">
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden relative shadow-md mb-4 border-2 border-gray-100">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="font-serif text-[14px] font-semibold text-black tracking-tight mb-0.5">
                  {item.name}
                </h3>
                <span className="text-[9px] text-gray-400 mb-4 block tracking-wide uppercase">
                  {item.role}
                </span>

                <p className="text-[12px] text-gray-600 italic leading-[1.8] font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import poster1 from "@/assets/poster-1.png";
import HeroImage from "@/assets/HeroImage-Puremyst.png"

export default function HeroSection() {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-white overflow-hidden flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage.src})` }}
      >
        {/* Dark overlay to ensure text readability if needed */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Pure Water.<br />
            Trusted Service.
          </h1>

          <p className="text-lg md:text-xl font-light mb-10 leading-relaxed max-w-xl">
            Advanced RO+UV purification technology engineered for the modern home. Refreshing hydration, clinical precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide text-white bg-[#0b6c2c] hover:bg-[#085221] rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
            >
              Shop Now
            </Link>
            <Link
              href="/ro-water-purifier"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-wide text-white border-2 border-white hover:bg-white/10 rounded-sm transition-all duration-300 uppercase"
            >
              View Systems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

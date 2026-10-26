"use client";

import React from "react";
import Link from "next/link";
import { Droplets, Leaf, ShieldCheck } from "lucide-react";
import missionHeroBg from "@/assets/mission-hero-bg.jpg";

export default function OurMission() {
  return (
    <section className="relative w-full min-h-[580px] lg:h-[650px] bg-white overflow-hidden flex items-center">
      {/* Background Image matching Hero Section */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${missionHeroBg.src})` }}
      >
        {/* Dark overlay with green depth to ensure readability and match hero aesthetic */}
        <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-r md:from-black/85 md:via-black/65 md:to-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero-Styled Text Content */}
          <div className="lg:col-span-7 text-white">
            {/* Top Subheading Tag with Signature Green Accent Lines */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1.5">
                <div className="h-0.5 w-8 bg-[#22c55e]"></div>
                <div className="h-0.5 w-4 bg-[#22c55e]"></div>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#22c55e] uppercase tracking-widest">
                Our Mission
              </span>
            </div>

            {/* Main Headline matching Hero Section */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Purity You Can Trust.<br />
              <span className="text-white">Sustainability You Can Feel.</span>
            </h2>

            {/* Description matching Hero paragraph style */}
            <p className="text-base sm:text-lg md:text-xl font-light mb-8 leading-relaxed max-w-xl text-white/90">
              At PureMyst, we believe clean water is the foundation of a healthy life. We engineer advanced RO+UV purification systems that deliver clinical-grade purity while minimizing environmental impact.
            </p>

            {/* CTA Buttons identical to Hero Section */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide text-white bg-[#0b6c2c] hover:bg-[#085221] rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl uppercase"
              >
                Shop Now
              </Link>
              <Link
                href="/AboutUs"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide text-white border-2 border-white hover:bg-white/10 rounded-sm transition-all duration-300 uppercase"
              >
                Read Our Story
              </Link>
            </div>
          </div>

          {/* Right Side: Sleek Glassmorphic Mission Feature Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-sm shadow-2xl max-w-md w-full text-white">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/15">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-sm bg-[#0b6c2c] flex items-center justify-center text-white shadow-md">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div className="w-12 h-12 rounded-sm bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                    <Leaf className="w-6 h-6 text-[#22c55e]" />
                  </div>
                </div>
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-white/15 rounded-sm text-white">
                  PureMyst EcoTech
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 tracking-tight text-white">
                Committed to Excellence
              </h3>
              
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                Blending nature's purity with modern water filtration technology to empower every household with safe, crystal-clear hydration.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-xs font-semibold text-white/90">
                  <div className="w-5 h-5 rounded-full bg-[#0b6c2c] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>100% Chemical-Free Multi-Stage RO+UV</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-semibold text-white/90">
                  <div className="w-5 h-5 rounded-full bg-[#0b6c2c] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span>Eco-Conscious Water Saving Design</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { Gift, Sparkles } from "lucide-react";

export default function SaleBanner() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-900 text-white py-16 md:py-24">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-red-500/20 animate-pulse">
                    <Sparkles className="w-12 h-12" />
                </div>
                <div className="absolute bottom-10 right-10 text-red-500/20 animate-pulse delay-700">
                    <Sparkles className="w-16 h-16" />
                </div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-block mb-6 relative">
                    <div className="bg-white text-red-700 px-8 py-2 rounded-t-lg rounded-b-3xl shadow-lg transform -rotate-2 mx-auto w-fit">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-wide">Year End</h2>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif font-bold mt-2 tracking-wider drop-shadow-lg">Sale</h2>
                    <Gift className="absolute -top-6 -right-8 w-12 h-12 text-yellow-400 animate-bounce" />
                </div>

                <h3 className="text-2xl md:text-4xl font-light mb-8 text-red-100">
                    Up to <span className="font-bold text-yellow-400">70% off</span> + Extra <span className="font-bold text-yellow-400">12% off</span>
                    <br />
                    <span className="text-xl md:text-2xl mt-2 block">on all products</span>
                </h3>

                <div className="inline-flex items-center bg-red-800/50 border border-red-400/30 rounded-lg p-2 mb-8 backdrop-blur-sm">
                    <span className="px-4 py-2 text-red-200 font-medium">Coupon Code :</span>
                    <span className="px-6 py-2 bg-red-600 rounded-md font-bold tracking-wider text-white shadow-inner">
                        NEWYEAR12
                    </span>
                </div>

                <p className="text-red-200 font-medium tracking-widest uppercase text-sm md:text-base">
                    24th Dec. 2025 - 4th Jan. 2026
                </p>
            </div>
        </section>
    );
}

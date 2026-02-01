import React from "react";
import { Droplet, Leaf } from "lucide-react";

export default function OurMission() {
    return (
        <section className="py-24 bg-gradient-to-b from-[#007C91]/5 to-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <span className="h-px w-8 bg-[#0EA5E9]"></span>
                            <span className="text-[#0EA5E9] font-bold tracking-wider text-sm uppercase">
                                Our Mission
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-6 leading-tight font-heading">
                            Purity You Can Trust. <br /> Sustainability You Can Feel.
                        </h2>

                        <p className="text-lg text-[#475569] leading-relaxed mb-6">
                            At PureMyst, we believe clean water is the foundation of a healthy life. We are dedicated to engineering advanced purification systems that deliver crystal-clear water while minimizing environmental impact.
                        </p>
                        <p className="text-lg text-[#475569] leading-relaxed">
                            Every product is designed with precision, ensuring that you and your family have access to safe, refreshing hydration every single day.
                        </p>
                    </div>

                    {/* Visual Content - Static & Professional */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-[#E2E8F0] max-w-md w-full">
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-blue-50 rounded-2xl">
                                    <Droplet className="w-10 h-10 text-[#0EA5E9]" />
                                </div>
                                <div className="p-4 bg-green-50 rounded-2xl">
                                    <Leaf className="w-10 h-10 text-[#22C55E]" />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#0F172A] mb-2">Committed to Excellence</h3>
                            <p className="text-[#475569]">
                                Blending nature's purity with modern technology for a healthier tomorrow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

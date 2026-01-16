"use client";
import Link from "next/link";
import { ArrowRight, ShowerHead, Filter, Droplets } from "lucide-react";
import poster from "@/assets/poster.jpeg";
import washingMachineFilters from "@/assets/washing-machine-filters.jpeg";
import mainPoster from "@/assets/mainPoster.jpeg"
import waterFilter from "@/assets/water-filter.jpeg";

export default function HeroSectionNew() {
    return (
        <section className="py-12 mt-15 bg-blue-50/30 dark:bg-ocean-900">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center ">
                    <img src={mainPoster.src} alt="Water Filter Poster" className="w-full rounded-2xl shadow-sm" />
                </div>

                <div className="text-center my-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        <span className="text-theme-blue">Find</span> Your Perfect Water Filter
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[500px]">
                    {/* Left Large Card - Shower and Tap Filters */}
                    <div className="relative overflow-hidden rounded-3xl bg-[#4FA3E3] group transition-transform hover:scale-[1.01] duration-300">
                        <div className="absolute inset-0">
                            <img
                                src={mainPoster.src}
                                alt="Shower and Tap Filters"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 relative z-20 drop-shadow-md">
                                Shower And Tap
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-light text-white/90 mb-8 relative z-20 drop-shadow-md">
                                Filters
                            </h3>

                            <Link
                                href="/washing-machine-cleaner"
                                className="inline-flex items-center px-6 py-3 bg-white text-theme-blue rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors w-fit relative z-20 shadow-lg"
                            >
                                Explore <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="grid grid-rows-2 gap-6 h-full">
                        {/* Top Right - Water Filter Cartridges */}
                        <div className="relative overflow-hidden rounded-3xl bg-[#8B88E6] group transition-transform hover:scale-[1.01] duration-300">
                            <div className="absolute inset-0">
                                <img
                                    src={waterFilter.src}
                                    alt="Water Filter Cartridges"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center p-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 relative z-20 drop-shadow-md">
                                    Water Filter
                                </h2>
                                <h3 className="text-xl md:text-2xl font-light text-white/90 relative z-20 drop-shadow-md">
                                    Cartridges
                                </h3>
                                <Link href="/ro-water-purifier" className="absolute inset-0 z-30" aria-label="Water Filter Cartridges" />
                            </div>
                        </div>

                        {/* Bottom Right - Other Filters */}
                        <div className="relative overflow-hidden rounded-3xl bg-[#7BC4A6] group transition-transform hover:scale-[1.01] duration-300">
                            <div className="absolute inset-0">
                                <img
                                    src={waterFilter.src}
                                    alt="Other Filters"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center p-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 relative z-20 drop-shadow-md">
                                    Other
                                </h2>
                                <h3 className="text-xl md:text-2xl font-light text-white/90 relative z-20 drop-shadow-md">
                                    Filters
                                </h3>
                                <Link href="/products" className="absolute inset-0 z-30" aria-label="Other Filters" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

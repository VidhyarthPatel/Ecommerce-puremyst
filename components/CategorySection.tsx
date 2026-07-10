"use client";

import Link from "next/link";
import Image from "next/image";

import waterPurifierImg from "@/assets/water-purifier-category.png";
import commercialWaterPurifierImg from "@/assets/commercial-water-purifier-category.png";
import washingMachineFilterImg from "@/assets/washing-machine-filter-category.png";

const categories = [
    {
        title: "RO Purifiers",
        subtitle: "Advanced RO+UV Technology",
        href: "/ro-water-purifier",
        image: waterPurifierImg,
    },
    {
        title: "Commercial RO",
        subtitle: "High Capacity Solutions",
        href: "/commercial-water-purifier",
        image: commercialWaterPurifierImg,
    },
    {
        title: "Appliance Filters",
        subtitle: "Protect Your Appliances",
        href: "/washing-machine-cleaner",
        image: washingMachineFilterImg,
    },
];

export default function CategorySection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <p className="text-sm font-bold text-[#0b6c2c] uppercase tracking-wider mb-2">OUR SOLUTIONS</p>
                        <h2 className="text-4xl font-bold text-[#0F172A] font-heading">Explore By Category</h2>
                    </div>
                    <div className="mt-4 md:mt-0 max-w-sm text-right">
                        <p className="text-[#475569] text-sm">Premium water purification solutions tailored for your home and business needs.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group relative block overflow-hidden rounded-md h-[300px] md:h-[400px] shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Background */}
                            {category.image && (
                                <Image
                                    src={category.image}
                                    alt={category.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute bottom-6 left-6 text-left w-full pr-6 z-10">
                                <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                                    {category.title}
                                </h3>
                                <p className="text-sm text-white/90 font-medium drop-shadow-md">
                                    {category.subtitle}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

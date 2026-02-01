"use client";

import Link from "next/link";
import Image from "next/image";

import waterPurifierImg from "@/assets/water-purifier-category.png";
import washingMachineFilterImg from "@/assets/washing-machine-filter-category.png";
import commercialWaterPurifierImg from "@/assets/commercial-water-purifier-category.png";
import accessoriesImg from "@/assets/accessories-category.png";

const categories = [
    {
        title: "Water Purifiers",
        subtitle: "Advanced RO+UV Technology",
        href: "/ro-water-purifier",
        image: waterPurifierImg,
    },
    {
        title: "Washing Machine Filters",
        subtitle: "Protect Your Appliances",
        href: "/washing-machine-cleaner",
        image: washingMachineFilterImg,
    },
    {
        title: "Commercial RO",
        subtitle: "High Capacity Solutions",
        href: "/commercial-water-purifier",
        image: commercialWaterPurifierImg,
    },
    {
        title: "Accessories",
        subtitle: "Filters, Spares & More",
        href: "/accessories",
        image: accessoriesImg,
    },
];

export default function CategorySection() {
    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-3 font-heading">Explore By Category</h2>
                    <p className="text-[#475569] text-lg max-w-3xl mx-auto">Premium water purification solutions tailored for your home and business needs.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group relative flex flex-col items-center p-6 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm transition-all duration-300 ease-out hover:border-[#0EA5E9] hover:shadow-lg hover:shadow-blue-100/50"
                        >
                            {/* Image Container */}
                            <div className="w-full h-40 relative mb-6 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-blue-50/30 transition-colors">
                                {category.image && (
                                    <div className="relative w-32 h-32">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            className="object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="text-center w-full">
                                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors mb-1">
                                    {category.title}
                                </h3>
                                <p className="text-sm text-[#475569] font-medium">
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

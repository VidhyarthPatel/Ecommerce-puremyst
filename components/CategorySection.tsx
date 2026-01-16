"use client";

import Link from "next/link";
import Image from "next/image";

import waterPurifierImg from "@/assets/water-purifier-category.png";
import washingMachineFilterImg from "@/assets/washing-machine-filter-category.png";
import commercialWaterPurifierImg from "@/assets/commercial-water-purifier-category.png";
import accessoriesImg from "@/assets/accessories-category.png";

const categories = [
    {
        title: "Water Purifier",
        href: "/ro-water-purifier",
        image: waterPurifierImg,
        color: "bg-gray-100", // Neutral background for image placeholder
    },
    {
        title: "Washing Machine Filters",
        href: "/washing-machine-cleaner",
        image: washingMachineFilterImg,
        color: "bg-gray-100",
    },
    {
        title: "Commercial Water Purifier",
        href: "/commercial-water-purifier",
        image: commercialWaterPurifierImg,
        color: "bg-gray-100",
    },
    {
        title: "Accessories",
        href: "/accessories",
        image: accessoriesImg,
        color: "bg-gray-100",
    },
];

export default function CategorySection() {
    return (
        <section className="py-12 bg-white dark:bg-ocean-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 gap-2 md:gap-8 justify-items-center">
                    {categories.map((category) => (
                        <Link
                            key={category.title}
                            href={category.href}
                            className="group flex flex-col items-center text-center w-full"
                        >
                            {/* Circular Image Container */}
                            <div
                                className={`w-16 h-16 md:w-40 md:h-40 rounded-full ${category.color} flex items-center justify-center mb-2 md:mb-4 transition-transform duration-300 group-hover:scale-105 shadow-sm group-hover:shadow-md overflow-hidden relative`}
                            >
                                {category.image && (
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        fill
                                        className="object-contain p-3 md:p-4"
                                    />
                                )}
                            </div>

                            {/* Title */}
                            <h3 className="text-xs md:text-lg font-medium text-gray-900 dark:text-white leading-tight group-hover:text-theme-blue transition-colors break-words w-full px-1">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

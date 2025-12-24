"use client";
import React from "react";
import Link from "next/link";
import { Droplets, Factory, Settings, Sparkles, ArrowRight } from "lucide-react";

const categories = [
    {
        title: "RO Water Purifier",
        href: "/ro-water-purifier",
        icon: Droplets,
        description: "Advanced purification for home",
        color: "text-blue-500",
        bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
        title: "Commercial Water Purifier",
        href: "/commercial-water-purifier",
        icon: Factory,
        description: "High-capacity solutions",
        color: "text-teal-500",
        bg: "bg-teal-50 dark:bg-teal-900/20",
    },
    {
        title: "Washing Machine Cleaner",
        href: "/washing-machine-cleaner",
        icon: Sparkles,
        description: "Keep appliances clean",
        color: "text-purple-500",
        bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
        title: "Accessories",
        href: "/accessories",
        icon: Settings,
        description: "Filters, membranes & more",
        color: "text-orange-500",
        bg: "bg-orange-50 dark:bg-orange-900/20",
    },
];

export default function CategorySection() {
    return (
        <section className="py-24 bg-gray-50 dark:bg-ocean-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Browse by Category
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Find the perfect solution for your needs
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="group flex items-center text-sm font-medium text-[#0A2540] dark:text-white hover:text-[#00AEEF] transition-colors"
                    >
                        View All Products
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.title}
                                href={category.href}
                                className="group relative bg-white dark:bg-ocean-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-xl ${category.bg} ${category.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {category.title}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {category.description}
                                </p>

                                <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-[#00AEEF] transition-colors">
                                    Explore
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

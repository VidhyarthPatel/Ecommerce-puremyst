"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

import waterPurifierImg from "@/assets/water-purifier-category.png";
import washingFilterImg from "@/assets/washing-machine-filter-category.png";
import accessoriesImg from "@/assets/accessories-category.png";
import commercialImg from "@/assets/commercial-water-purifier-category.png";

const categories = [
  {
    title: "RO Purifiers",
    href: "/ro-water-purifier",
    image: waterPurifierImg,
  },
  {
    title: "Filters",
    href: "/washing-machine-cleaner",
    image: washingFilterImg,
  },
  {
    title: "Bottles & Accessories",
    href: "/accessories",
    image: accessoriesImg,
  },
  {
    title: "Commercial Systems",
    href: "/commercial-water-purifier",
    image: commercialImg,
  },
];

export default function EmptyCart() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      {/* Top Center Empty State matching Screenshot */}
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-16">
        {/* Soft rounded icon container */}
        <div className="w-20 h-20 bg-[#EDE9FE] rounded-2xl flex items-center justify-center mb-6 text-[#6366F1]">
          <ShoppingBag className="w-9 h-9 stroke-[1.6]" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">
          Your cart is currently empty
        </h1>
        
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-normal">
          Discover our range of high-performance hydration systems and start building your perfect setup.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-[#0b6c2c] hover:bg-[#085221] text-white font-bold py-3.5 px-8 rounded-sm text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Start Shopping
        </Link>
      </div>

      {/* Explore Categories Section matching Screenshot */}
      <div className="pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#111827]">
            Explore Categories
          </h2>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-semibold text-[#0b6c2c] hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group bg-white rounded-2xl border border-gray-200/90 p-4 flex flex-col items-center shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50/70 mb-4 flex items-center justify-center p-3">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-semibold text-[#111827] text-center group-hover:text-[#0b6c2c] transition-colors">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

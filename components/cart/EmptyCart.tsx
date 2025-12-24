"use client";
import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-ocean-800 rounded-full flex items-center justify-center mb-6 animate-pulse-subtle">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>

            <h2 className="font-poppins text-2xl font-bold text-[#0A2540] dark:text-white mb-3">
                Your cart is empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                Looks like you haven&apos;t added anything to your cart yet. Explore our premium water purification products.
            </p>

            <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                Start Shopping
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
    );
}

"use client";
import React from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: any[];
    viewMode: "grid" | "list";
    isLoading?: boolean;
}

export default function ProductGrid({ products, viewMode, isLoading }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-ocean-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden h-[400px] animate-pulse">
                        <div className="h-2/3 bg-gray-200 dark:bg-gray-800" />
                        <div className="p-5 space-y-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mt-4" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`
      ${viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-6"
            }
    `}>
            {products.map((product) => (
                <div key={product.id} className={viewMode === "list" ? "w-full" : ""}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
}

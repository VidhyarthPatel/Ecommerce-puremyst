"use client";
import React from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

interface SortControlsProps {
    onFilterClick: () => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    totalProducts: number;
    filteredCount: number;
}

export default function SortControls({
    onFilterClick,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    totalProducts,
    filteredCount
}: SortControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-gray-50 dark:bg-ocean-800 p-4 rounded-xl">
            {/* Mobile Filter Toggle */}
            <button
                onClick={onFilterClick}
                className="lg:hidden flex items-center gap-2 text-[#0A2540] dark:text-white font-medium"
            >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
            </button>

            {/* Results Count */}
            <p className="text-gray-600 dark:text-gray-400 text-sm hidden sm:block">
                Showing <span className="font-semibold text-[#0A2540] dark:text-white">{filteredCount}</span> of <span className="font-semibold text-[#0A2540] dark:text-white">{totalProducts}</span> products
            </p>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort Select */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white dark:bg-ocean-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                    >
                        <option value="popularity">Popularity</option>
                        <option value="newest">Newest Arrivals</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-white dark:bg-ocean-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                            ? "bg-gray-100 dark:bg-ocean-800 text-[#00AEEF]"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                        aria-label="Grid view"
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "list"
                            ? "bg-gray-100 dark:bg-ocean-800 text-[#00AEEF]"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                        aria-label="List view"
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

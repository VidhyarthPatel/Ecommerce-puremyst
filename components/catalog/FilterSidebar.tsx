"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    minRating: number | null;
    setMinRating: (rating: number | null) => void;
    inStockOnly: boolean;
    setInStockOnly: (inStock: boolean) => void;
}

export default function FilterSidebar({
    isOpen,
    onClose,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    inStockOnly,
    setInStockOnly
}: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState({
        category: true,
        price: true,
        rating: true,
        availability: true,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const categories = [
        "RO Water Purifier",
        "UV Water Purifier",
        "Commercial Water Purifier",
        "Accessories",
        "Washing Machine Cleaner",
        "Spare Parts",
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:sticky top-0 lg:top-24 left-0 h-full lg:h-[calc(100vh-8rem)] 
        w-80 lg:w-64 bg-white dark:bg-ocean-900 z-50 lg:z-0 
        transform transition-transform duration-300 ease-in-out
        border-r border-gray-100 dark:border-gray-700 lg:border-none
        overflow-y-auto p-6 lg:p-0
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <div className="flex items-center justify-between mb-6 lg:hidden">
                    <h2 className="font-poppins font-bold text-xl text-theme-blue dark:text-white">
                        Filters
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-8">


                    {/* Price Range */}
                    <div className="border-b border-gray-100 dark:border-gray-700 pb-6 lg:border-none lg:pb-0">
                        <button
                            onClick={() => toggleSection("price")}
                            className="flex items-center justify-between w-full font-semibold text-theme-blue dark:text-white mb-4"
                        >
                            Price Range
                            {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {expandedSections.price && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                    <span>₹{priceRange[0]}</span>
                                    <span>₹{priceRange[1].toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-theme-blue"
                                />
                            </div>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="border-b border-gray-100 dark:border-gray-700 pb-6 lg:border-none lg:pb-0">
                        <button
                            onClick={() => toggleSection("rating")}
                            className="flex items-center justify-between w-full font-semibold text-theme-blue dark:text-white mb-4"
                        >
                            Rating
                            {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {expandedSections.rating && (
                            <div className="space-y-3">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                className="peer sr-only"
                                                checked={minRating === rating}
                                                onChange={() => setMinRating(minRating === rating ? null : rating)}
                                            />
                                            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-theme-blue peer-checked:border-theme-blue transition-colors" />
                                            <svg className="absolute w-3 h-3 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className={`transition-colors ${minRating === rating ? "text-theme-blue font-medium" : "text-gray-600 dark:text-gray-400 group-hover:text-theme-blue"}`}>
                                                {rating}+ Stars
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Availability */}
                    <div>
                        <button
                            onClick={() => toggleSection("availability")}
                            className="flex items-center justify-between w-full font-semibold text-theme-blue dark:text-white mb-4"
                        >
                            Availability
                            {expandedSections.availability ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {expandedSections.availability && (
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={inStockOnly}
                                            onChange={(e) => setInStockOnly(e.target.checked)}
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-theme-blue peer-checked:border-theme-blue transition-colors" />
                                        <svg className="absolute w-3 h-3 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span className={`transition-colors ${inStockOnly ? "text-theme-blue font-medium" : "text-gray-600 dark:text-gray-400 group-hover:text-theme-blue"}`}>
                                        In Stock Only
                                    </span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}

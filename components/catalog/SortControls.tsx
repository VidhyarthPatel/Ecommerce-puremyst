"use client";
import React from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

interface SortControlsProps {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
}

export default function SortControls({
    viewMode,
    setViewMode,
}: SortControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mb-8 bg-gray-50 dark:bg-ocean-800 p-4 rounded-xl">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-white dark:bg-ocean-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "grid"
                            ? "bg-gray-100 dark:bg-ocean-800 text-theme-blue"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                        aria-label="Grid view"
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${viewMode === "list"
                            ? "bg-gray-100 dark:bg-ocean-800 text-theme-blue"
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

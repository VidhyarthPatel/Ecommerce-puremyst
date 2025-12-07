"use client";
import React from "react";
import Link from "next/link";
import { Trash2, Heart, Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
    item: {
        id: string;
        slug: string;
        name: string;
        price: number;
        imageUrl: string;
        quantity: number;
        sku?: string;
        stock?: number;
    };
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart();

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity < 1) return;
        if (item.stock && newQuantity > item.stock) return;
        updateQuantity(item.slug, newQuantity);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-100 dark:border-gray-700 last:border-0">
            {/* Image */}
            <div className="relative w-full sm:w-32 aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 group">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <Link
                            href={`/products/${item.slug}`}
                            className="font-poppins font-semibold text-lg text-[#0A2540] dark:text-white hover:text-[#00AEEF] transition-colors line-clamp-2"
                        >
                            {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">SKU: {item.sku || "PM-" + item.id.slice(0, 6)}</p>
                        {item.stock && item.stock < 5 && (
                            <p className="text-xs text-red-500 font-medium mt-2">
                                Only {item.stock} left in stock - order soon
                            </p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-[#0A2540] dark:text-white">
                            ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                                ₹{item.price.toLocaleString()} each
                            </p>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <span className="w-12 text-center font-medium text-[#0A2540] dark:text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                            disabled={item.stock ? item.quantity >= item.stock : false}
                            aria-label="Increase quantity"
                        >
                            <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00AEEF] transition-colors"
                            aria-label="Move to wishlist"
                        >
                            <Heart className="w-4 h-4" />
                            <span className="hidden sm:inline">Save for later</span>
                        </button>
                        <button
                            onClick={() => removeItem(item.slug)}
                            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
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
    <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 shadow-2xs">
      {/* Left Column: Image & Product Details */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {/* Product Image */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-50/50 border border-gray-100 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
          <img
            src={item.imageUrl || "/placeholder.png"}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title, Subtitle & Quantity */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/products/${item.slug}`}
            className="font-bold text-base sm:text-lg text-[#111827] hover:text-[#0b6c2c] transition-colors line-clamp-1"
          >
            {item.name}
          </Link>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 mb-3 line-clamp-1">
            {item.sku || "Advanced Multi-Stage Filtration"}
          </p>

          {/* Stepper Quantity Selector */}
          <div className="inline-flex items-center border border-gray-200 rounded-sm overflow-hidden bg-white">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 text-sm font-medium"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3.5 py-1 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center border-x border-gray-200">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.stock ? item.quantity >= item.stock : false}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 text-sm font-medium"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Price & Remove Button */}
      <div className="flex sm:flex-col justify-between sm:justify-between items-end w-full sm:w-auto self-stretch sm:min-h-[90px]">
        <div className="text-left sm:text-right">
          <span className="font-bold text-xl sm:text-2xl text-[#111827]">
            ₹{(item.price * item.quantity).toLocaleString()}
          </span>
        </div>

        <button
          onClick={() => removeItem(item.slug)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#dc2626] hover:text-red-700 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

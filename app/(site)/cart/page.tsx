"use client";

import React from "react";
import { useCart } from "@/hooks/use-cart";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cartItems } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#fafafa] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Title matching Screenshot */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-6">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Free Shipping Notice + Cart Items */}
          <div className="lg:col-span-8">
            {/* Free Shipping Alert Box matching Screenshot */}
            <div className="bg-white border border-gray-200/90 rounded-sm p-4 mb-6 shadow-2xs">
              <div className="text-xs sm:text-sm text-gray-700 font-medium">
                You are eligible for <span className="text-[#0b6c2c] font-bold">FREE Shipping!</span>
              </div>
              <div className="w-full h-1.5 bg-[#0b6c2c] rounded-full mt-2.5"></div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <OrderSummary />
          </div>

        </div>
      </div>
    </main>
  );
}

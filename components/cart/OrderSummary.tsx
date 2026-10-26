"use client";

import React from "react";
import Link from "next/link";
import { Lock, Truck, Award } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function OrderSummary() {
  const { cartItems, totalPrice, totalItems } = useCart();

  // Free shipping as per screenshot
  const shipping = 0;
  // Estimated taxes (18% GST)
  const estimatedTaxes = Math.round(totalPrice * 0.18);
  const total = totalPrice + shipping + estimatedTaxes;

  return (
    <div className="bg-white border border-gray-200/90 rounded-sm p-6 sm:p-8 sticky top-28 shadow-xs">
      <h2 className="text-2xl font-bold text-[#111827] mb-6 tracking-tight">
        Order Summary
      </h2>

      {/* Pricing Breakdown matching Screenshot */}
      <div className="space-y-4 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Subtotal ({totalItems || cartItems?.length || 0} items)</span>
          <span className="font-semibold text-gray-900">₹{totalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span className="font-bold text-[#0b6c2c] uppercase">FREE</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Estimated Taxes</span>
          <span className="font-semibold text-gray-900">₹{estimatedTaxes.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-5 mt-6 flex justify-between items-baseline">
          <span className="font-bold text-lg text-gray-900">Total</span>
          <span className="font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* PROCEED TO CHECKOUT Button */}
      <Link
        href="/checkout"
        className="w-full bg-[#0b6c2c] hover:bg-[#085221] text-white font-bold py-4 rounded-sm tracking-wider text-sm uppercase text-center block transition-all duration-200 shadow-md hover:shadow-lg mt-6"
      >
        PROCEED TO CHECKOUT
      </Link>

      {/* Trust Badges matching Screenshot */}
      <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-gray-100 text-center">
        <div className="flex flex-col items-center">
          <Lock className="w-5 h-5 text-gray-500 mb-1.5" strokeWidth={1.5} />
          <span className="text-[11px] text-gray-600 font-medium leading-tight">
            Secure<br />Checkout
          </span>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-5 h-5 text-gray-500 mb-1.5" strokeWidth={1.5} />
          <span className="text-[11px] text-gray-600 font-medium leading-tight">
            Free<br />Shipping
          </span>
        </div>
        <div className="flex flex-col items-center">
          <Award className="w-5 h-5 text-gray-500 mb-1.5" strokeWidth={1.5} />
          <span className="text-[11px] text-gray-600 font-medium leading-tight">
            Quality<br />Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}

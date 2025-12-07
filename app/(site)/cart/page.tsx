"use client";
import React from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-white dark:bg-ocean-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-ocean-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-poppins text-3xl font-bold text-[#0A2540] dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              You have {cartItems.length} items in your cart
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-[#00AEEF] hover:text-[#0099d6] font-medium transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-ocean-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Bulk Actions */}
              <div className="bg-gray-50 dark:bg-ocean-800 px-6 py-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Shipping Estimator (Placeholder) */}
            <div className="bg-white dark:bg-ocean-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-[#0A2540] dark:text-white mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#00AEEF]" />
                Estimate Shipping
              </h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-ocean-900 focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
                />
                <button className="px-6 py-2 bg-gray-100 dark:bg-ocean-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-ocean-700 transition-colors">
                  Check
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}

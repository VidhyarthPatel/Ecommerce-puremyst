"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function OrderSummary() {
    const { cartItems, totalPrice } = useCart();
    const [promoCode, setPromoCode] = useState("");
    const [isApplying, setIsApplying] = useState(false);
    const [promoError, setPromoError] = useState("");
    const [promoSuccess, setPromoSuccess] = useState("");

    const shipping = totalPrice > 500 ? 0 : 50;
    const tax = Math.round(totalPrice * 0.18); // 18% GST
    const total = totalPrice + shipping + tax;

    const handleApplyPromo = () => {
        if (!promoCode) return;
        setIsApplying(true);
        setPromoError("");
        setPromoSuccess("");

        // Simulate API call
        setTimeout(() => {
            if (promoCode.toUpperCase() === "PUREMYST10") {
                setPromoSuccess("Coupon applied successfully!");
            } else {
                setPromoError("Invalid coupon code");
            }
            setIsApplying(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-50 dark:bg-ocean-800 rounded-2xl p-6 lg:p-8 sticky top-24">
            <h2 className="font-poppins text-xl font-bold text-[#0A2540] dark:text-white mb-6">
                Order Summary
            </h2>

            {/* Pricing Breakdown */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal ({cartItems?.length || 0} items)</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                    ) : (
                        <span>₹{shipping}</span>
                    )}
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toLocaleString()}</span>
                </div>

                {promoSuccess && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount (10%)</span>
                        <span>-₹{Math.round(totalPrice * 0.1).toLocaleString()}</span>
                    </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-[#0A2540] dark:text-white">Total</span>
                    <span className="font-bold text-2xl text-[#0A2540] dark:text-white">
                        ₹{(promoSuccess ? total - Math.round(totalPrice * 0.1) : total).toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Promo Code */}
            <div className="mb-8">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-ocean-900 focus:outline-none focus:ring-2 focus:ring-[#00AEEF] transition-all"
                    />
                    <button
                        onClick={handleApplyPromo}
                        disabled={!promoCode || isApplying}
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                    >
                        {isApplying ? "..." : "Apply"}
                    </button>
                </div>
                {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                {promoSuccess && <p className="text-green-500 text-sm mt-2">{promoSuccess}</p>}
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="w-full bg-[#00AEEF] hover:bg-[#0099d6] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mb-6 group">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Trust Badges */}
            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="w-5 h-5 text-[#00AEEF]" />
                    <span>Free Shipping on orders over ₹500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <RotateCcw className="w-5 h-5 text-orange-500" />
                    <span>7-Day Easy Returns</span>
                </div>
            </div>
        </div>
    );
}

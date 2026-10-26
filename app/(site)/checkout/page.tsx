"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { MapPin, User, ChevronLeft, Lock, Truck, Award, ShieldCheck } from "lucide-react";
import Link from "next/link";
import RazorpayCheckoutButton from "@/components/RazorpayCheckoutButton";

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutPage() {
  const { cartItems, totalPrice, totalItems } = useCart();
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = totalPrice;
  const shipping = 0; // Free shipping
  const estimatedTaxes = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + estimatedTaxes;

  const handleInputChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo((prev) => ({ ...prev, [field]: value }));
  };

  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center max-w-md bg-white border border-gray-200/90 rounded-sm p-8 shadow-xs">
          <h2 className="text-2xl font-bold text-[#111827] mb-3">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Add water purification systems or filters to proceed to checkout.</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0b6c2c] hover:bg-[#085221] text-white rounded-sm font-bold text-xs uppercase tracking-wider transition-all duration-200"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation link back to cart */}
        <div className="mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-[#0b6c2c] transition-colors gap-1 uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shopping Cart
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-500 text-sm">
            Complete your order as a guest. All transactions are SSL encrypted and 100% secure.
          </p>
        </div>

        <form onSubmit={preventSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Contact & Address Information */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Contact Information */}
            <div className="bg-white rounded-sm border border-gray-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-[#111827]">
                  1. Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                    placeholder="e.g. rahul@example.com (For order updates)"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-sm border border-gray-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-8 h-8 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-[#111827]">
                  2. Delivery Address
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Street Address / House / Flat No. *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                    placeholder="Flat 402, Green View Apartments, MG Road"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                      placeholder="e.g. Mumbai"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                      placeholder="e.g. Maharashtra"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0b6c2c] focus:border-[#0b6c2c] bg-white transition-all"
                      placeholder="e.g. 400001"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-200/90 rounded-sm p-6 sm:p-8 sticky top-28 shadow-xs">
              <h3 className="text-2xl font-bold text-[#111827] mb-6 tracking-tight">
                Order Summary
              </h3>

              {/* Items Miniature List */}
              <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-6 pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3 first:pt-0">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img src={item.imageUrl || "/placeholder.png"} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-[11px] text-gray-500">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-3 border-t border-gray-100 text-sm text-gray-600 mb-6">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({totalItems || cartItems.length} items)</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-bold text-[#0b6c2c] uppercase">FREE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Estimated Taxes (18% GST)</span>
                  <span className="font-semibold text-gray-900">₹{estimatedTaxes.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-baseline">
                  <span className="font-bold text-base text-gray-900">Total</span>
                  <span className="font-extrabold text-3xl text-[#111827]">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Razorpay Button */}
              <RazorpayCheckoutButton
                amountRupees={total}
                guestInfo={guestInfo}
                items={cartItems}
                shippingRupees={shipping}
              />

              <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed">
                By placing this order, you agree to PureMyst's Terms of Service and Privacy Policy.
              </p>

              {/* Trust Badges matching Cart */}
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
          </div>

        </form>
      </div>
    </div>
  );
}

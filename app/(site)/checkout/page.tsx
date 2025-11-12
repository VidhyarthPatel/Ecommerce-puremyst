"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, X, CreditCard, MapPin, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import RazorpayCheckoutButton from "@/components/ui/RazorpayCheckoutButton";

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: "card" | "upi" | "cod";
}

export default function CheckoutPage() {
  const { cartItems, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const [loading, setLoading] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "upi",
  });

  const subtotal = totalPrice;
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  

  const handleInputChange = (field: keyof GuestInfo, value: string) => {
    setGuestInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        guestInfo,
        items: cartItems.map(item => ({
          productId: item.id,
          productSlug: item.slug,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        subtotal,
        shipping,
        total,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      
      // Clear cart after successful order
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ecommerce_cart');
        window.dispatchEvent(new Event("cartUpdated"));
      }

      // Redirect to order confirmation
      window.location.href = `/order-confirmation/${order.id}`;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/products">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order as a guest</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Guest Information Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={guestInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your street address"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestInfo.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={guestInfo.paymentMethod === "card"}
                    onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                    className="mr-3"
                  />
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={guestInfo.paymentMethod === "upi"}
                    onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                    className="mr-3"
                  />
                  <Phone className="w-5 h-5 mr-2" />
                  <span>UPI Payment</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={guestInfo.paymentMethod === "cod"}
                    onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                    className="mr-3"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div> */}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping > 0 ? `₹${shipping}` : "Free"}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              {/* <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Place Order"}
              </button> */}
              <RazorpayCheckoutButton  amountRupees={total} />
              
              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our terms and conditions
              </p>

           
             

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


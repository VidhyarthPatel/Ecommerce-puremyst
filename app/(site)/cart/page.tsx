"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import Link from "next/link";

type CartItem = {
  id: string;
  quantity: number;
  productId?: string;
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    ProductsImage: Array<{ imageUrl: string }>;
  };
};

export default function CartPage() {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true); // only for initial load

  // 🧠 Fetch cart only once on mount
  const fetchCart = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [session]);

  // ⚡ Optimistic Quantity Update
  const updateQuantity = async (slug: string, qty: number) => {
    if (qty < 1) return;

    // Update locally first (instant)
    setCart((prev) =>
      prev.map((item) =>
        item.product.slug === slug ? { ...item, quantity: qty } : item
      )
    );

    // Then call API (no loading spinner)
    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id, productSlug: slug, quantity: qty }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ⚡ Optimistic Remove Item
  const removeItem = async (slug: string) => {
    // Remove from UI immediately
    setCart((prev) => prev.filter((item) => item.product.slug !== slug));

    // Then call API silently
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session?.user?.id, productSlug: slug }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600">
            {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-3">Your cart is empty</h3>
            <p className="text-gray-600 text-lg mb-8">
              Discover our premium water purification systems
            </p>
            <Link href="/products">
              <button
                type="button"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const firstImage =
                  item.product.ProductsImage?.[0]?.imageUrl || "/placeholder.png";

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={firstImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        ₹{item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.slug, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[100px]">
                      <p className="font-semibold text-gray-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.slug)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
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
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors mb-3"
                >
                  Proceed to Checkout
                </button>

                <Link href="/products">
                  <button
                    type="button"
                    className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

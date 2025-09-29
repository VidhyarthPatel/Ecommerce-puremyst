"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Check } from "lucide-react";

export default function ProductDetailClient({ product }: { product: any }) {
  const [previewImage, setPreviewImage] = useState(
    product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"
  );
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { data: session } = useSession();
  const imgRef = useRef<HTMLDivElement>(null);

  // Update cart in real-time if needed
  const updateCart = () => window.dispatchEvent(new Event("cartUpdated"));

  const handleAddToCart = async () => {
    if (!session) {
      console.log("User not logged in");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user?.id,
          productSlug: product.slug, // Using slug
          quantity,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      setAddedToCart(true);
      updateCart();
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!session) return;

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user?.id,
          productSlug: product.slug,
          quantity,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add to cart");
      }

      updateCart();
      window.location.href = "/checkout"; // redirect to checkout
    } catch (err) {
      console.error("Buy now error:", err);
      alert("Failed to proceed with purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div
            ref={imgRef}
            className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-8"
          >
            <img
              src={previewImage}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex gap-3 justify-center">
            {product.ProductsImage?.map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setPreviewImage(img.imageUrl)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                  previewImage === img.imageUrl
                    ? "border-blue-500 shadow-sm"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={img.imageUrl}
                  alt={`${product.name} ${i + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:py-4">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
              <span className="text-blue-600 text-sm font-medium">
                ⭐ {product.rating || "4.5"}
              </span>
            </div>
            <span className="text-gray-500 text-sm">Based on customer reviews</span>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-semibold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {product.discountPercentage || "62%"} OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-4 flex items-center gap-3">
            <span>Quantity:</span>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={loading || addedToCart || !session}
              className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 ${
                addedToCart
                  ? "bg-green-500 text-white"
                  : !session
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {!session
                ? "Please login to add to cart"
                : loading
                ? "Adding..."
                : addedToCart
                ? "Added to Cart"
                : "Add to Cart"}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!session || loading}
              className={`w-full py-4 rounded-xl font-medium ${
                !session
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {!session ? "Please login to buy" : "Buy Now"}
            </button>
          </div>

          {/* Features */}
          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {(product.features?.length ? product.features : [
                "7-stage purification process",
                "RO + UV + UF technology",
                "Smart TDS controller",
                "Energy efficient operation",
                "Sleek modern design"
              ]).map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-8 mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="border-t border-gray-100 pt-8 mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

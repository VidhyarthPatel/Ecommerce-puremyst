"use client";

import React from "react";
import { tempProducts } from "./tempProduct";
import { useCart } from "@/hooks/use-cart";

export default function Products() {
  const { addToCart, loading } = useCart();

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart({
        id: product.id,
        slug: product.slug || product.id, // Use slug if available, otherwise use id
        name: product.name,
        price: product.discountPrice || product.price,
        imageUrl: product.imageUrl,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {tempProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="aspect-square overflow-hidden bg-gray-50 relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
            </div>

            {/* Product Info */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-normal text-gray-900 text-lg mb-3 line-clamp-2 leading-tight">
                {product.name}
              </h3>

              {/* Price Section */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-semibold text-gray-900">
                    ${product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price}
                    </span>
                  )}
                </div>
                
                {/* Add to Cart - Always visible but enhanced on hover */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  disabled={loading}
                  className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 transform group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>

            {/* Subtle border effect */}
            {/* <div className="absolute inset-0 rounded-2xl border border-gray-200 group-hover:border-gray-300 transition-all duration-500 pointer-events-none" /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
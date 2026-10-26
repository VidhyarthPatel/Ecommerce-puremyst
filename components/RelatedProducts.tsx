"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowRight, ShoppingBag } from "lucide-react";

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  slug: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
              Explore More Models
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b]">
              You May Also Like
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0b6c2c] hover:text-[#085221] uppercase tracking-wider transition-colors"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const effectiveOriginal = product.originalPrice && product.originalPrice > product.price
              ? product.originalPrice
              : Math.round(product.price * 1.25);

            const discount = Math.round(
              ((effectiveOriginal - product.price) / effectiveOriginal) * 100
            );

            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-white border border-gray-200/90 rounded-sm overflow-hidden hover:border-[#0b6c2c]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Image Area */}
                  <div className="relative aspect-square bg-[#fafafa] p-6 flex items-center justify-center border-b border-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                      <div className="absolute top-3 left-3 bg-[#0b6c2c] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-2xs">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating || 4.5)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-gray-500">
                        {product.rating ? product.rating.toFixed(1) : "4.5"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-[#1c2b4b] group-hover:text-[#0b6c2c] transition-colors line-clamp-2 leading-snug mb-3">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-[#1c2b4b]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {effectiveOriginal > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{effectiveOriginal.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-5 pb-5 pt-0">
                  <div className="w-full py-2.5 bg-gray-50 group-hover:bg-[#0b6c2c] group-hover:text-white text-gray-700 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 border border-gray-200 group-hover:border-[#0b6c2c]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    View Details
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

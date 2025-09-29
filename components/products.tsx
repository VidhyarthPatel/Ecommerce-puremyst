import React from "react";
import { tempProducts } from "./tempProduct";

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {tempProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-t-xl bg-gray-50">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
              <h3 className="font-medium text-gray-900 text-sm md:text-base mb-2 line-clamp-2 leading-tight">
                {product.name}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-semibold text-black">
                  ${product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="mt-4 opacity-0 group-hover:opacity-100 duration-300 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all">
                Add to Cart
              </button>
            </div>

            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gray-900/5 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";

type ProductsImage = {
  id: string;
  productId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  discount?: number | null;
  featured: boolean;
  rating: number;
  units: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  ProductsImage?: ProductsImage[];
};

export default function Products(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP ERROR: ${res.status}`);

        const data: Product[] = await res.json();

        const featuredProducts = Array.isArray(data)
          ? data.filter((p) => p.featured === true)
          : [];

        if (mounted) setProducts(featuredProducts);
      } catch (err) {
        console.error("Products fetch error:", err);
        if (mounted) setError("Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No featured products available.</p>;
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-gray-900 mb-3">Water Purifiers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced purification technology for clean, safe drinking water
          </p>
        </div>

        {/* Products Grid — mobile now shows 2 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const img = product.ProductsImage?.[0]?.imageUrl ?? "/placeholder.png";

            return (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6">
                    <img
                      src={img}
                      alt={product.name}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-medium text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description || "Premium water purification system"}
                    </p>

                    <div className="mt-auto space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-900">
                          ₹{product.price.toFixed(2)}
                        </span>

                        {product.rating !== undefined && (
                          <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
                            <span className="text-blue-600 text-sm">⭐</span>
                            <span className="text-blue-600 text-sm font-medium">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Button */}
                      <button className="w-full mt-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                        View Details
                      </button>
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

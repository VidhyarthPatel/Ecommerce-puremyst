"use client";

import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Eye } from "lucide-react";

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
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500 py-20">No featured products available.</p>;
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-ocean-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-teal-500 font-semibold tracking-wider uppercase text-sm">Best Sellers</span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Premium Water Purifiers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our most popular models, engineered for purity and designed for your modern home.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const img = product.ProductsImage?.[0]?.imageUrl ?? "/placeholder.png";

            return (
              <Link key={product.id} href={`/products/${product.slug}`} className="group">
                <div className="bg-white dark:bg-ocean-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full flex flex-col relative">

                  {/* Badge */}
                  {product.discount && (
                    <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={img}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-200 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <Eye size={20} />
                      </button>
                      <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-200 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {product.rating?.toFixed(1) || "4.8"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1 group-hover:text-teal-500 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                      {product.description || "Experience pure water with our advanced filtration system."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Price</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-teal-500 text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-teal-500/30">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

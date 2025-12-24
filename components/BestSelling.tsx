"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number | null;
  rating: number;
  ProductsImage?: { imageUrl: string }[];
};

export default function BestSelling() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Product[] = await res.json();
        // Take first 4 products for best selling
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-ocean-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Best Sellers
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our most popular purification solutions
            </p>
          </div>
          <Link
            href="/products"
            className="group flex items-center text-sm font-medium text-[#0A2540] dark:text-white hover:text-[#00AEEF] transition-colors"
          >
            View All
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white dark:bg-ocean-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative bg-gray-100 dark:bg-ocean-700 overflow-hidden">
                <img
                  src={product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#00AEEF] transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.discount && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-ocean-700 flex items-center justify-center text-[#0A2540] dark:text-white group-hover:bg-[#0A2540] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

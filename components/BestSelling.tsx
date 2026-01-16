"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Product = {
    id: string;
    name: string;
    slug: string;
    price: number;
    discount?: number | null;
    rating: number;
    featured: boolean;
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

                // Filter for featured products
                const featuredProducts = data.filter(product => product.featured === true);

                // Take first 4
                setProducts(featuredProducts.slice(0, 4));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return null;

    // If no featured products, don't show the section
    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-white dark:bg-ocean-900">
            <div className="w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        <span className="text-black font-semibold text-3xl md:text-5xl">Best Seller</span>
                    </h2>
                </div>

                {/* Navigation Arrows (Visual only for now if 4 items) */}
                <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4 w-10 h-10 bg-theme-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-theme-blue-hover transition-colors z-10 hidden md:flex">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-4 w-10 h-10 bg-theme-blue text-white rounded-full flex items-center justify-center shadow-lg hover:bg-theme-blue-hover transition-colors z-10 hidden md:flex">
                    <ChevronRight className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white dark:bg-ocean-800 rounded-xl border border-gray-100 dark:border-ocean-700 p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                        >
                            <Link href={`/products/${product.slug}`} className="block relative aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg bg-gray-50 dark:bg-ocean-700">
                                <img
                                    src={product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            <div className="flex items-center mb-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
                                    ))}
                                </div>
                                <span className="text-[10px] md:text-xs text-gray-500 ml-1 md:ml-2">{product.rating}</span>
                            </div>

                            <Link href={`/products/${product.slug}`} className="block mb-2">
                                <h3 className="text-xs md:text-sm font-medium dark:text-white line-clamp-2 min-h-[2.5em]">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="mt-auto">
                                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-2 md:mb-3">
                                    <span className="text-sm md:text-lg font-bold dark:text-white">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    {product.discount && (
                                        <div className="flex items-center gap-1">
                                            <span className="text-xs md:text-sm text-gray-400 line-through">
                                                ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                                            </span>
                                            <span className="text-[10px] md:text-xs text-green-600 font-medium">
                                                {product.discount}% Off
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 bg-theme-blue text-white rounded-full font-medium hover:bg-theme-blue-hover transition-colors">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
}

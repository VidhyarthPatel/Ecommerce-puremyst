"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

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
    return (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-ocean-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-8">
                    You May Also Like
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const discount = product.originalPrice
                            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                            : 0;

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group bg-white dark:bg-ocean-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative aspect-square bg-gray-50 dark:bg-gray-700 p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {discount > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {discount}% OFF
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-[#0A2540] dark:text-white mb-2 line-clamp-2 group-hover:text-[#00AEEF] transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < Math.floor(product.rating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                                            ({product.rating})
                                        </span>
                                    </div>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-[#0A2540] dark:text-white">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
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

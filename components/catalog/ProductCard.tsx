"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
    product: {
        id: string;
        slug: string;
        name: string;
        description: string;
        price: number;
        originalPrice?: number;
        rating: number;
        reviewsCount: number;
        imageUrl: string;
        inStock: boolean;
        tags?: string[];
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart, loading } = useCart();
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
        });
    };

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group bg-white dark:bg-ocean-900 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {discount}% OFF
                        </span>
                    )}
                    {product.tags?.map(tag => (
                        <span key={tag} className="bg-theme-blue text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || loading}
                        className="bg-white  p-3 rounded-full hover:bg-theme-blue hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <div className="bg-white text-theme-blue p-3 rounded-full hover:bg-theme-blue hover:text-white transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                        <Eye className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-lg dark:text-white mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {product.description}
                    </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                        ({product.reviewsCount})
                    </span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold dark:text-white">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    {!product.inStock && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

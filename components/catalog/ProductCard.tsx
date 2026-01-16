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
            className="group block h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    {product.tags?.map(tag => (
                        <span key={tag} className="bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <h3 className="font-medium text-base text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-theme-blue transition-colors">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-500 font-medium">
                        {product.rating} ({product.reviewsCount})
                    </span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!product.inStock || loading}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-theme-blue hover:text-white transition-colors"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
}

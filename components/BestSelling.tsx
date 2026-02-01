"use client";
import React, { useEffect, useState, useRef } from "react";
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
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Failed to fetch");
                const data: Product[] = await res.json();
                const featuredProducts = data.filter(product => product.featured === true);
                setProducts(featuredProducts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth
                : scrollLeft + clientWidth;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (loading || products.length === 0) return null;

    return (
        <section className="py-20 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header with Navigation Controls */}
                <div className="relative flex items-end justify-center mb-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#0F172A] mb-3 font-heading">Best Sellers</h2>
                        <p className="text-[#475569] text-lg">Loved by our customers.</p>
                    </div>

                    {/* Desktop Navigation Buttons */}
                    <div className="hidden md:flex space-x-3 absolute right-0 bottom-1">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 rounded-full border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 rounded-full border border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="min-w-[280px] md:min-w-[300px] lg:min-w-[320px] snap-start group relative bg-white rounded-2xl border border-[#E2E8F0] p-4 shadow-sm transition-all duration-300 hover:border-[#0EA5E9] hover:shadow-lg flex flex-col"
                        >
                            {/* Product Image */}
                            <Link href={`/products/${product.slug}`} className="block relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                                <img
                                    src={product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.discount && (
                                    <span className="absolute top-3 left-3 bg-[#22C55E] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-md">
                                        {product.discount}% OFF
                                    </span>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center mb-2 space-x-1">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}`} />
                                        ))}
                                    </div>
                                    <span className="text-xs text-[#94A3B8]">({product.rating})</span>
                                </div>

                                <Link href={`/products/${product.slug}`} className="block mb-2">
                                    <h3 className="text-sm md:text-base font-medium text-[#0F172A] line-clamp-2 md:min-h-[3rem]">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-[#0EA5E9]">₹{product.price.toLocaleString()}</span>
                                        {product.discount && (
                                            <span className="text-xs text-[#94A3B8] line-through">
                                                ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-2 rounded-full bg-blue-50 text-[#0EA5E9]">
                                        <ChevronRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 bg-[#0EA5E9] text-white rounded-full font-medium hover:bg-[#0284C7] transition-all">
                        View All Best Sellers
                    </Link>
                </div>
            </div>
        </section>
    );
}
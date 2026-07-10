"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, Droplet, Leaf } from "lucide-react";

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

    if (loading) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-[#1c2b4b]">Bestselling Systems</h2>
                    <Link href="/products" className="text-sm font-semibold text-[#0b6c2c] hover:underline flex items-center">
                        View All <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Dynamic Products */}
                    {products.slice(0, 4).map((product, index) => (
                        <div key={product.id} className="group relative bg-white flex flex-col">
                            {/* Image Container */}
                            <Link href={`/products/${product.slug}`} className="block relative aspect-square mb-4 border border-gray-100 rounded-sm overflow-hidden flex items-center justify-center p-4">
                                <img
                                    src={product.ProductsImage?.[0]?.imageUrl || "/placeholder.png"}
                                    alt={product.name}
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.featured && (
                                    <span className="absolute top-0 left-0 bg-[#e87042] text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase">
                                        Bestseller
                                    </span>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-col flex-grow text-left">
                                <div className="flex items-center mb-1 space-x-1">
                                    <div className="flex text-[#F59E0B]">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? "fill-current" : "text-gray-200"}`} />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-gray-500">({product.rating > 0 ? '1.2k' : '850'})</span>
                                </div>

                                <Link href={`/products/${product.slug}`} className="block mb-1">
                                    <h3 className="text-sm font-medium text-[#1c2b4b] line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="flex items-baseline space-x-2">
                                    <span className="text-lg font-bold text-[#0b6c2c]">₹{product.price.toLocaleString()}</span>
                                    {product.discount && (
                                        <span className="text-xs text-gray-400 line-through">
                                            ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Static Promotional Cards (Show if we have less than 4 products) */}
                    {products.length < 3 && (
                        <div className="group relative bg-white flex flex-col">
                            {/* Image Container (Placeholder) */}
                            <div className="block relative aspect-square mb-4 border border-gray-100 rounded-sm bg-gray-50/50 flex flex-col items-center justify-center p-4">
                                <Droplet className="w-12 h-12 text-[#b5ddc2] mb-4" strokeWidth={1.5} />
                                <span className="text-xs font-medium text-gray-500">New Model Coming Soon</span>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-grow text-left">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">PRE-ORDER OPENING</span>
                                <h3 className="text-sm font-medium text-[#1c2b4b] line-clamp-1 mb-1">
                                    Elite RO Pro Max
                                </h3>
                                <span className="text-sm font-semibold text-[#0b6c2c]">Discover the future</span>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </section>
    );
}
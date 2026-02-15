"use client";
import React, { useState } from "react";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface ProductShowcaseProps {
    product: {
        id?: string;
        slug?: string;
        name: string;
        description: string;
        price: number;
        originalPrice?: number;
        images: string[];
        highlights: string[];
        inStock: boolean;
    };
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addToCart, loading } = useCart();
    const router = useRouter();

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = async () => {
        if (!product.id || !product.slug) {
            alert("Product information is incomplete");
            return;
        }

        try {
            await addToCart({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                imageUrl: product.images[0] || "/placeholder.png",
            }, quantity);

            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (err) {
            console.error("Add to cart error:", err);
            alert("Failed to add product to cart. Please try again.");
        }
    };

    const handleBuyNow = async () => {
        if (!product.id || !product.slug) {
            alert("Product information is incomplete");
            return;
        }

        try {
            await addToCart({
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                imageUrl: product.images[0] || "/placeholder.png",
            }, quantity);

            router.push("/checkout");
        } catch (err) {
            console.error("Buy now error:", err);
            alert("Failed to proceed with purchase. Please try again.");
        }
    };

    return (
        <section className="py-4 md:py-8 bg-white dark:bg-ocean-900">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">

                    {/* Left: Product Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-white dark:bg-ocean-900 rounded-none overflow-hidden group">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                            {discount > 0 && (
                                <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                                    -{discount}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-20 h-20 flex-shrink-0 bg-white dark:bg-ocean-900 overflow-hidden transition-opacity ${selectedImage === index
                                        ? "opacity-100 ring-1 ring-black dark:ring-white"
                                        : "opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col justify-center space-y-8">
                        {/* Title & Price */}
                        <div className="space-y-4">
                            <h1 className="font-sans text-3xl md:text-5xl font-medium text-gray-900 dark:text-white tracking-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-2xl md:text-3xl font-normal text-gray-900 dark:text-white">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-gray-400 line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                            {product.description}
                        </p>

                        {/* Key Highlights */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                                Features
                            </h3>
                            <ul className="space-y-2">
                                {product.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 space-y-4 max-w-md">
                            {/* Quantity & Add to Cart */}
                            <div className="flex gap-4">
                                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-full h-12">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-l-full transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 rounded-r-full transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock || loading || addedToCart}
                                    className="flex-1 bg-black dark:bg-white text-white dark:text-black h-12 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Adding..." : addedToCart ? "Added" : "Add to Cart"}
                                </button>
                            </div>

                            <button
                                onClick={handleBuyNow}
                                disabled={!product.inStock || loading}
                                className="w-full h-12 border border-black dark:border-white text-black dark:text-white rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                            <span className="text-gray-500 dark:text-gray-400">
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

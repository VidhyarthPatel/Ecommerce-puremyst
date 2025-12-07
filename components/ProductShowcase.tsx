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
        <section className="py-8 md:py-12 bg-white dark:bg-ocean-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Left: Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden group">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                            />
                            {discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {discount}% OFF
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? "border-[#00AEEF]"
                                            : "border-transparent hover:border-gray-300"
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
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <h1 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-3">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 py-4 border-y border-gray-200 dark:border-gray-700">
                            <span className="text-4xl font-bold text-[#0A2540] dark:text-white">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.originalPrice && (
                                <span className="text-2xl text-gray-400 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                            {discount > 0 && (
                                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                    Save ₹{(product.originalPrice! - product.price).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.inStock ? (
                                <>
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-green-600 font-medium">In Stock</span>
                                </>
                            ) : (
                                <>
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    <span className="text-red-600 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Key Highlights */}
                        <div className="space-y-3">
                            <h3 className="font-poppins text-lg font-semibold text-[#0A2540] dark:text-white">
                                Key Features
                            </h3>
                            <ul className="space-y-2">
                                {product.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-[#00AEEF] flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 font-semibold border-x border-gray-300 dark:border-gray-600">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock || loading || addedToCart}
                                className="w-full bg-[#00AEEF] hover:bg-[#0099d6] text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    "Adding..."
                                ) : addedToCart ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={!product.inStock || loading}
                                className="w-full bg-[#0A2540] hover:bg-[#0d3154] text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="text-sm font-medium">Add to Wishlist</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#00AEEF] transition-colors">
                                <Share2 className="w-5 h-5" />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

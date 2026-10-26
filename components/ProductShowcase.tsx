"use client";

import React, { useState } from "react";
import { 
  ShoppingCart, 
  Check, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Award, 
  ChevronRight,
  PhoneCall,
  Sparkles,
  Zap
} from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    rating?: number;
    category?: string;
  };
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart, loading } = useCart();
  const router = useRouter();

  // If original price is not provided, generate a sensible one (e.g. ~25% higher) for discount display
  const effectiveOriginalPrice = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : Math.round(product.price * 1.25);

  const discount = Math.round(
    ((effectiveOriginalPrice - product.price) / effectiveOriginalPrice) * 100
  );

  const handleAddToCart = async () => {
    if (!product.id || !product.slug) {
      alert("Product information is incomplete");
      return;
    }

    try {
      await addToCart(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.images[0] || "/placeholder.png",
        },
        quantity
      );

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2200);
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
      await addToCart(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.images[0] || "/placeholder.png",
        },
        quantity
      );

      router.push("/checkout");
    } catch (err) {
      console.error("Buy now error:", err);
      alert("Failed to proceed with purchase. Please try again.");
    }
  };

  const displayHighlights = product.highlights && product.highlights.length > 0
    ? product.highlights
    : [
        "Advanced Multi-Stage RO + UV Water Purification",
        "Retains Essential Natural Minerals with TDS Infuser",
        "Food-Grade High-Durability Storage Chamber",
        "High Purification Flow Rate with Auto Shut-off"
      ];

  return (
    <section className="bg-white border-b border-gray-100">
      {/* Breadcrumb Navigation */}
      <div className="bg-[#fafafa] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#0b6c2c] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/products" className="hover:text-[#0b6c2c] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[#1c2b4b] font-semibold truncate max-w-xs sm:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Product Images (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-[#fafafa] border border-gray-200/90 rounded-sm overflow-hidden flex items-center justify-center p-6 group">
              <img
                src={product.images[selectedImage] || product.images[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Discount Tag */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 bg-[#0b6c2c] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs">
                  {discount}% OFF
                </div>
              )}

              {/* In-Stock Pill */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm border border-gray-200/80 px-2.5 py-1 rounded-sm text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className={product.inStock ? "text-emerald-700" : "text-red-700"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 bg-[#fafafa] rounded-sm overflow-hidden transition-all duration-200 border ${
                      selectedImage === index
                        ? "border-[#0b6c2c] ring-2 ring-[#0b6c2c]/30 shadow-xs"
                        : "border-gray-200/90 hover:border-gray-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-contain p-1.5"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Guarantees Under Image */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm">
                <div className="w-8 h-8 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1c2b4b]">Free Shipping</p>
                  <p className="text-[11px] text-gray-500">Across All India</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm">
                <div className="w-8 h-8 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1c2b4b]">1 Year Warranty</p>
                  <p className="text-[11px] text-gray-500">Comprehensive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Actions (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Header / Brand info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#0b6c2c] bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-[#0b6c2c]/20 uppercase tracking-wider">
                  PureMyst Official
                </span>
                <span className="text-xs font-medium text-gray-400">
                  • {product.category || "RO Water Purification"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b] tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Rating and review stats */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200/60">
                  <span className="text-xs font-bold text-amber-800">
                    {product.rating ? product.rating.toFixed(1) : "4.8"}
                  </span>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-gray-500">
                  128 Verified Ratings & Reviews
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Certified Grade
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#fafafa] border border-gray-200/90 rounded-sm p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#1c2b4b]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {effectiveOriginalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{effectiveOriginalPrice.toLocaleString("en-IN")}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-xs font-bold bg-[#0b6c2c]/10 text-[#0b6c2c] px-2.5 py-1 rounded-sm border border-[#0b6c2c]/20">
                    Save ₹{(effectiveOriginalPrice - product.price).toLocaleString("en-IN")} ({discount}% OFF)
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5">
                <span className="font-semibold text-gray-700">All Taxes Included.</span> Standard installation & doorstep delivery covered.
              </p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Key Features Bullets */}
            <div className="border-t border-b border-gray-100 py-4 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c2b4b]">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {displayHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 text-[#0b6c2c] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase CTA Buttons & Quantity */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Quantity Box */}
                <div className="flex items-center border border-gray-300 rounded-sm h-12 w-full sm:w-36 bg-white justify-between px-3">
                  <span className="text-xs font-semibold text-gray-500">Qty:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-sm disabled:opacity-40 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-bold text-sm text-[#1c2b4b]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || loading || addedToCart}
                  className="flex-1 h-12 px-6 bg-[#0b6c2c] hover:bg-[#085221] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {loading ? "Adding to Cart..." : addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock || loading}
                className="w-full h-12 px-6 bg-[#1c2b4b] hover:bg-[#111827] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                Buy Now — Instant Checkout
              </button>
            </div>

            {/* Detailed Trust Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4">
              <div className="p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm text-center">
                <Truck className="w-5 h-5 mx-auto text-[#0b6c2c] mb-1.5" />
                <p className="text-[11px] font-bold text-[#1c2b4b]">Free Delivery</p>
                <p className="text-[10px] text-gray-500">2-4 Business Days</p>
              </div>
              <div className="p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm text-center">
                <ShieldCheck className="w-5 h-5 mx-auto text-[#0b6c2c] mb-1.5" />
                <p className="text-[11px] font-bold text-[#1c2b4b]">1 Year Guarantee</p>
                <p className="text-[10px] text-gray-500">Full Parts Coverage</p>
              </div>
              <div className="p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm text-center">
                <RotateCcw className="w-5 h-5 mx-auto text-[#0b6c2c] mb-1.5" />
                <p className="text-[11px] font-bold text-[#1c2b4b]">7-Day Return</p>
                <p className="text-[10px] text-gray-500">Hassle-Free Policy</p>
              </div>
              <div className="p-3 bg-[#fafafa] border border-gray-200/80 rounded-sm text-center">
                <Award className="w-5 h-5 mx-auto text-[#0b6c2c] mb-1.5" />
                <p className="text-[11px] font-bold text-[#1c2b4b]">100% Genuine</p>
                <p className="text-[10px] text-gray-500">Certified Pure Water</p>
              </div>
            </div>

            {/* Need Help Assistance Banner */}
            <div className="flex items-center justify-between p-3.5 bg-emerald-50/70 border border-[#0b6c2c]/20 rounded-sm">
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#0b6c2c]" />
                <span className="text-xs font-semibold text-[#1c2b4b]">
                  Need help picking or installation guidance?
                </span>
              </div>
              <Link
                href="/contact"
                className="text-xs font-bold text-[#0b6c2c] hover:underline"
              >
                Talk to Expert &rarr;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

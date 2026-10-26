"use client";

import { useState } from "react";
import ProductShowcase from "@/components/ProductShowcase";
import ProductFeatures from "@/components/ProductFeatures";
import ProductSpecs from "@/components/ProductSpecs";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";
import TrustedBy from "@/components/TrustedBy";

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: {
  product: any;
  relatedProducts?: any[];
}) {
  // Transform product data to match ProductShowcase interface
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || "High-performance multi-stage RO+UV water purifier designed for pure, clean and mineral-rich drinking water.",
    price: product.price,
    originalPrice: product.originalPrice || (product.discount ? Math.round(product.price / (1 - product.discount / 100)) : undefined),
    images: product.ProductsImage?.map((img: any) => img.imageUrl) || ["/placeholder.png"],
    highlights: product.keyFeatures || [],
    inStock: product.units > 0,
    rating: product.rating || 4.8,
    category: product.category || "RO Water Purifier",
  };

  // Map related products to the format expected by RelatedProducts component
  const mappedRelatedProducts = relatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.discount ? Math.round(p.price / (1 - p.discount / 100)) : undefined,
    image: p.ProductsImage?.[0]?.imageUrl || "/placeholder.png",
    rating: p.rating || 4.7,
    slug: p.slug,
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased selection:bg-[#0b6c2c] selection:text-white">
      {/* 1. Main Hero Showcase with Images & Checkout CTA */}
      <ProductShowcase product={productData} />

      {/* 2. Platform Availability (Amazon, Flipkart) */}
      <TrustedBy />

      {/* 3. Core Feature Highlights */}
      <ProductFeatures />

      {/* 4. Technical Specs */}
      <ProductSpecs
        specs={product.specifications && product.specifications.length > 0 ? product.specifications : undefined}
        productName={product.name}
      />

      {/* 5. Customer Reviews & Ratings */}
      <ProductReviews
        reviews={product.reviews && product.reviews.length > 0 ? product.reviews : undefined}
        averageRating={product.rating || 4.8}
        totalReviews={product.reviewCount || 128}
      />

      {/* 6. Product FAQ Accordion */}
      <ProductFAQ faqs={product.faqs} />

      {/* 7. Related / Recommended Products */}
      {mappedRelatedProducts.length > 0 && (
        <RelatedProducts products={mappedRelatedProducts} />
      )}
    </div>
  );
}

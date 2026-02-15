"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import ProductShowcase from "@/components/ProductShowcase";
import ProductFeatures from "@/components/ProductFeatures";
import ProductSpecs from "@/components/ProductSpecs";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";

export default function ProductDetailClient({ product, relatedProducts = [] }: { product: any, relatedProducts?: any[] }) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Transform product data to match ProductShowcase interface
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || "",
    price: product.price,
    originalPrice: product.originalPrice || null,
    images: product.ProductsImage?.map((img: any) => img.imageUrl) || ["/placeholder.png"],
    highlights: product.keyFeatures || [],
    inStock: product.units > 0,
  };

  // Map related products to the format expected by RelatedProducts component
  const mappedRelatedProducts = relatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.discount ? p.price / (1 - p.discount / 100) : undefined,
    image: p.ProductsImage?.[0]?.imageUrl || "/placeholder.png",
    rating: p.rating || 0,
    slug: p.slug,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-ocean-900">
      <ProductShowcase product={productData} />
      <ProductFeatures />

      {product.specifications && product.specifications.length > 0 && (
        <ProductSpecs specs={product.specifications} />
      )}

      {product.reviews && product.reviews.length > 0 && (
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.rating || 0}
          totalReviews={product.reviewCount || 0}
        />
      )}

      {product.faqs && product.faqs.length > 0 && (
        <ProductFAQ faqs={product.faqs} />
      )}

      {mappedRelatedProducts.length > 0 && (
        <RelatedProducts products={mappedRelatedProducts} />
      )}
    </div>
  );
}

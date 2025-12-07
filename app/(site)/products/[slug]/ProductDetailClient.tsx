"use client";

import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import ProductShowcase from "@/components/ProductShowcase";
import ProductFeatures from "@/components/ProductFeatures";
import ProductSpecs from "@/components/ProductSpecs";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";

// Sample data for sections that might not be in the database yet
const defaultSpecs = [
  { label: "Filter Type", value: "Multi-stage Purification" },
  { label: "Technology", value: "RO + UV + UF" },
  { label: "Capacity", value: "7-10 Liters" },
  { label: "Power Consumption", value: "60W" },
  { label: "Warranty", value: "1 Year" },
  { label: "Dimensions", value: "Standard" },
];

const defaultReviews = [
  {
    id: 1,
    name: "Satisfied Customer",
    rating: 5,
    date: "2 weeks ago",
    comment: "Excellent product! Highly recommended for quality and performance.",
    verified: true,
  },
  {
    id: 2,
    name: "Happy User",
    rating: 4,
    date: "1 month ago",
    comment: "Good quality product. Value for money.",
    verified: true,
  },
];

const defaultFAQs = [
  {
    question: "How long is the warranty period?",
    answer: "This product comes with a 1-year manufacturer warranty covering all manufacturing defects.",
  },
  {
    question: "Is installation included?",
    answer: "Installation services may be available in select areas. Please contact customer support for details.",
  },
  {
    question: "What is the return policy?",
    answer: "We offer a 7-day return policy for unopened products in original packaging.",
  },
];

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Transform product data to match ProductShowcase interface
  const productData = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description || "Premium quality product from PureMyst",
    price: product.price,
    originalPrice: product.originalPrice || null,
    images: product.ProductsImage?.map((img: any) => img.imageUrl) || ["/placeholder.png"],
    highlights: product.features || [
      "Premium quality materials",
      "Easy installation",
      "Long-lasting performance",
      "Certified and tested",
      "1-year warranty included",
    ],
    inStock: product.units > 0,
  };

  // Get related products (you can fetch these from API later)
  const relatedProducts = [
    {
      id: "1",
      name: "Related Product 1",
      price: 999,
      image: product.ProductsImage?.[0]?.imageUrl || "/placeholder.png",
      rating: 4.5,
      slug: "related-1",
    },
    {
      id: "2",
      name: "Related Product 2",
      price: 1299,
      originalPrice: 1999,
      image: product.ProductsImage?.[0]?.imageUrl || "/placeholder.png",
      rating: 4.7,
      slug: "related-2",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-ocean-900 mt-20">
      <ProductShowcase product={productData} />
      <ProductFeatures />
      <ProductSpecs specs={product.specifications || defaultSpecs} />
      <ProductReviews
        reviews={product.reviews || defaultReviews}
        averageRating={product.rating || 4.5}
        totalReviews={product.reviewCount || 50}
      />
      <ProductFAQ faqs={product.faqs || defaultFAQs} />
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}

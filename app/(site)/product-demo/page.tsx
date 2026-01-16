import React from "react";
import ProductShowcase from "@/components/ProductShowcase";
import ProductFeatures from "@/components/ProductFeatures";
import ProductSpecs from "@/components/ProductSpecs";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import RelatedProducts from "@/components/RelatedProducts";
import posterImg from "@/assets/mainPoster.jpeg";

// Sample product data
const productData = {
    id: "demo-1",
    slug: "demo-product",
    name: "PureMyst Hard Water Filter for Washing Machines",
    description: "Premium polyphosphate filter that prevents scaling and extends your washing machine's lifespan. Easy to install and maintain.",
    price: 1299,
    originalPrice: 1999,
    images: [posterImg.src, posterImg.src, posterImg.src, posterImg.src],
    highlights: [
        "Prevents mineral buildup and scaling",
        "Food-grade polyphosphate media",
        "Extends washing machine life by 40%",
        "Easy DIY installation in 5 minutes",
        "Compatible with all washing machine brands",
        "1-year warranty included",
    ],
    inStock: true,
};

const specs = [
    { label: "Filter Type", value: "Polyphosphate Scale Inhibitor" },
    { label: "Connection Size", value: "3/4 inch BSP" },
    { label: "Flow Rate", value: "Up to 15 LPM" },
    { label: "Media Capacity", value: "200 grams" },
    { label: "Lifespan", value: "6-12 months (depending on usage)" },
    { label: "Material", value: "Food-grade plastic housing" },
    { label: "Dimensions", value: "8\" x 3\" x 3\"" },
    { label: "Weight", value: "350 grams" },
    { label: "Warranty", value: "1 Year Manufacturer Warranty" },
];

const reviews = [
    {
        id: 1,
        name: "Rajesh Kumar",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent product! My washing machine was having scaling issues, and this filter completely solved the problem. Installation was super easy.",
        verified: true,
    },
    {
        id: 2,
        name: "Priya Sharma",
        rating: 4,
        date: "1 month ago",
        comment: "Good quality filter. Noticed improvement in washing quality. Only wish it came with clearer installation instructions.",
        verified: true,
    },
    {
        id: 3,
        name: "Amit Patel",
        rating: 5,
        date: "3 months ago",
        comment: "Best investment for hard water areas. My clothes feel softer and the machine runs more efficiently now.",
        verified: true,
    },
];

const faqs = [
    {
        question: "How often do I need to replace the filter?",
        answer: "The filter media typically lasts 6-12 months depending on your water hardness and usage frequency. We recommend checking it every 6 months and replacing when the media is depleted.",
    },
    {
        question: "Is this compatible with my washing machine brand?",
        answer: "Yes! This filter is universal and works with all washing machine brands including LG, Samsung, Whirlpool, Bosch, IFB, and others. It connects to the standard 3/4 inch water inlet.",
    },
    {
        question: "Can I install this myself?",
        answer: "Absolutely! Installation is very simple and takes only 5 minutes. No plumber needed. Just connect it between your water tap and washing machine inlet pipe. Detailed instructions are included.",
    },
    {
        question: "What is polyphosphate and is it safe?",
        answer: "Polyphosphate is a food-grade mineral that prevents scale formation by binding with calcium and magnesium in hard water. It's completely safe and commonly used in water treatment applications.",
    },
    {
        question: "Will this reduce water pressure?",
        answer: "No, the filter is designed to maintain optimal water flow with minimal pressure drop. Your washing machine will receive adequate water pressure for normal operation.",
    },
];

const relatedProducts = [
    {
        id: "1",
        name: "RO Membrane Replacement Kit",
        price: 899,
        originalPrice: 1299,
        image: posterImg.src,
        rating: 4.5,
        slug: "ro-membrane-kit",
    },
    {
        id: "2",
        name: "Sediment Filter Cartridge",
        price: 299,
        image: posterImg.src,
        rating: 4.2,
        slug: "sediment-filter",
    },
    {
        id: "3",
        name: "Carbon Block Filter",
        price: 499,
        originalPrice: 699,
        image: posterImg.src,
        rating: 4.7,
        slug: "carbon-filter",
    },
    {
        id: "4",
        name: "UV Lamp Replacement",
        price: 1199,
        image: posterImg.src,
        rating: 4.8,
        slug: "uv-lamp",
    },
];

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-ocean-900 mt-20">
            <ProductShowcase product={productData} />
            <ProductFeatures />
            <ProductSpecs specs={specs} />
            <ProductReviews
                reviews={reviews}
                averageRating={4.7}
                totalReviews={156}
            />
            <ProductFAQ faqs={faqs} />
            <RelatedProducts products={relatedProducts} />
        </main>
    );
}

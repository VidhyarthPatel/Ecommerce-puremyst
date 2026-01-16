"use client";
import React, { useState, useEffect } from "react";


import ProductGrid from "@/components/catalog/ProductGrid";

// Type definition matching the API response
type Product = {
    id: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    discount?: number | null;
    featured: boolean;
    rating: number;
    units: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    ProductsImage?: { imageUrl: string }[];
};

interface ProductListingProps {
    title: string;
    description: string;
    initialCategories?: string[];
    apiEndpoint?: string;
}

export default function ProductListing({ title, description, initialCategories = [], apiEndpoint = "/api/products" }: ProductListingProps) {


    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Reset selected categories if initialCategories changes (though unlikely for this use case)
    // But we want to allow user to change filters, so we only initialize.

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch(apiEndpoint);
                if (!res.ok) throw new Error("Failed to fetch products");
                const data: Product[] = await res.json();

                // Map API data to ProductCard props
                const mappedProducts = data.map(product => ({
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    description: product.description || "",
                    price: product.price,
                    originalPrice: product.discount ? Math.round(product.price / (1 - product.discount / 100)) : undefined,
                    rating: product.rating || 0,
                    reviewsCount: Math.floor(Math.random() * 50) + 10, // Mock review count as it's not in API
                    imageUrl: product.ProductsImage?.[0]?.imageUrl || "/placeholder.png",
                    inStock: product.units > 0,
                    tags: [
                        product.discount ? "Sale" : null,
                        product.units < 5 && product.units > 0 ? "Low Stock" : null
                    ].filter(Boolean) as string[],
                    category: product.category, // Add category for filtering
                }));

                setProducts(mappedProducts);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts = products;

    if (error) {
        return (
            <main className="min-h-screen bg-white dark:bg-ocean-900 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-theme-blue text-white rounded-lg hover:bg-theme-blue-hover transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-ocean-900 pt-24 pb-12">
            {/* Page Header */}
            <div className="py-16 mb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {description}
                    </p>
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">


                        {filteredProducts.length > 0 ? (
                            <ProductGrid
                                products={filteredProducts}
                                viewMode="grid"
                                isLoading={loading}
                            />
                        ) : (
                            !loading && (
                                <div className="text-center py-20">
                                    <p className="text-gray-500 text-lg">No products found.</p>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

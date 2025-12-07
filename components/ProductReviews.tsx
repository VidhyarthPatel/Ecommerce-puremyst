"use client";
import React from "react";
import { Star } from "lucide-react";

interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
}

interface ProductReviewsProps {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

export default function ProductReviews({ reviews, averageRating, totalReviews }: ProductReviewsProps) {
    return (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-ocean-800/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-6">
                        Customer Reviews
                    </h2>

                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-[#0A2540] dark:text-white mb-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(averageRating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Based on {totalReviews} reviews
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white dark:bg-ocean-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-[#0A2540] dark:text-white">
                                            {review.name}
                                        </span>
                                        {review.verified && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

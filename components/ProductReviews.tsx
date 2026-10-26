"use client";

import React, { useState } from "react";
import { Star, CheckCircle, ThumbsUp, ShieldCheck, Sparkles } from "lucide-react";

interface Review {
  id: string | number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location?: string;
  helpfulCount?: number;
}

interface ProductReviewsProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const defaultReviews: Review[] = [
  {
    id: 1,
    name: "Dr. Rajeshwar Sharma",
    rating: 5,
    date: "12 Oct 2026",
    location: "Bangalore",
    verified: true,
    comment: "Extremely pleased with the water purity and sweet taste. Our inlet TDS was 680 ppm and the output is now around 85 ppm with ideal mineral balance. The installation technician arrived promptly within 24 hours.",
    helpfulCount: 24,
  },
  {
    id: 2,
    name: "Ananya Deshmukh",
    rating: 5,
    date: "28 Sep 2026",
    location: "Pune",
    verified: true,
    comment: "Best RO system in this price segment. Build quality is solid, doesn't make any loud vibrating noise during filtration, and the customer care team followed up to check TDS after 3 days.",
    helpfulCount: 18,
  },
  {
    id: 3,
    name: "Vikramaditya Roy",
    rating: 4,
    date: "15 Sep 2026",
    location: "Kolkata",
    verified: true,
    comment: "Water quality is 10/10. Noticeable difference in taste compared to our old filter. Sleek minimalist front panel looks great on our kitchen wall.",
    helpfulCount: 9,
  },
];

export default function ProductReviews({
  reviews,
  averageRating = 4.8,
  totalReviews = 128,
}: ProductReviewsProps) {
  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const ratingValue = averageRating || 4.8;
  const count = totalReviews || 128;

  const [helpfulClicked, setHelpfulClicked] = useState<{ [key: string]: boolean }>({});

  const toggleHelpful = (id: string | number) => {
    setHelpfulClicked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Verified Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b]">
            Customer Reviews & Experiences
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Real experiences from homeowners who made the switch to pure hydration.
          </p>
        </div>

        {/* Rating Breakdown Header Card */}
        <div className="bg-white border border-gray-200/90 rounded-sm p-6 sm:p-8 mb-10 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Score Card */}
            <div className="md:col-span-4 text-center md:border-r md:border-gray-100 md:pr-8">
              <div className="text-5xl font-extrabold text-[#1c2b4b] mb-1">
                {ratingValue.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(ratingValue)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-200 text-amber-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Based on {count} verified orders
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#0b6c2c] text-xs font-bold rounded-sm border border-[#0b6c2c]/20">
                <CheckCircle className="w-3.5 h-3.5" />
                98% Recommend This Model
              </div>
            </div>

            {/* Right Progress Bars */}
            <div className="md:col-span-8 space-y-2.5">
              {[
                { stars: "5 Star", percent: 86, count: 110 },
                { stars: "4 Star", percent: 11, count: 14 },
                { stars: "3 Star", percent: 2, count: 3 },
                { stars: "2 Star", percent: 1, count: 1 },
                { stars: "1 Star", percent: 0, count: 0 },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-semibold text-gray-600">{item.stars}</span>
                  <div className="flex-1 h-2.5 bg-gray-100 rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-[#0b6c2c] rounded-sm transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-medium text-gray-500">{item.percent}%</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {displayReviews.map((review) => {
            const isHelpful = helpfulClicked[review.id];
            const baseHelpful = review.helpfulCount || 12;

            return (
              <div
                key={review.id}
                className="bg-white border border-gray-200/90 rounded-sm p-6 hover:border-[#0b6c2c]/40 transition-all duration-200 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] font-bold text-sm flex items-center justify-center">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1c2b4b] text-sm sm:text-base">
                          {review.name}
                        </span>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0b6c2c] bg-emerald-50 px-2 py-0.5 rounded-sm border border-[#0b6c2c]/20">
                            <ShieldCheck className="w-3 h-3" />
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      {review.location && (
                        <p className="text-[11px] text-gray-400">{review.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#0b6c2c]" />
                    Certified Water Quality Test Passed
                  </span>
                  <button
                    onClick={() => toggleHelpful(review.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border transition-colors ${
                      isHelpful
                        ? "bg-emerald-50 border-[#0b6c2c] text-[#0b6c2c] font-semibold"
                        : "border-gray-200 hover:border-gray-300 text-gray-500"
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    Helpful ({isHelpful ? baseHelpful + 1 : baseHelpful})
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

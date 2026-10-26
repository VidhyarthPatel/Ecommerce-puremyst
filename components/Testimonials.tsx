"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Homeowner",
    city: "Ahmedabad, GJ",
    content:
      "The PureMyst RO+UV purifier is simply exceptional. The taste and clarity of our drinking water has improved drastically, and their technician finished installation within 24 hours.",
    rating: 5,
    initials: "RS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Homemaker",
    city: "Surat, GJ",
    content:
      "We installed the washing machine appliance filter and the difference is unbelievable. Clothes feel much softer and our machine drum is free of hard water scaling.",
    rating: 5,
    initials: "PP",
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Business Owner",
    city: "Mumbai, MH",
    content:
      "We installed the commercial RO plant for our 40-person office. The build quality is clinical, water flow is consistent, and service support has been completely hassle-free.",
    rating: 5,
    initials: "AS",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Green & White Theme */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b4b] leading-tight mb-4">
            Trusted by PureMyst Families
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Real experiences from homeowners and businesses enjoying pure, healthy hydration across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-sm border border-gray-200/90 p-7 sm:p-8 shadow-2xs hover:shadow-md hover:border-[#0b6c2c]/50 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex space-x-1 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < t.rating ? "fill-current" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0b6c2c] bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Buyer
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
                  "{t.content}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-3.5 pt-5 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100/80 border border-emerald-200 text-[#0b6c2c] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#1c2b4b] truncate">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t.role} • {t.city}
                  </p>
                </div>
                <Quote className="w-6 h-6 text-gray-200 flex-shrink-0 group-hover:text-[#0b6c2c]/20 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Rating Trust Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1 text-[#F59E0B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-gray-900">4.9 / 5.0 Rating</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span>Based on 10,000+ satisfied homes & offices across India</span>
        </div>

      </div>
    </section>
  );
}

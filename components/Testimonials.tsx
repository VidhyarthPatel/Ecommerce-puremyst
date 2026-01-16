"use client";

import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Homeowner",
        content:
            "The water purifier I bought from here is amazing. The taste of water has improved significantly, and the service was top-notch.",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "Homemaker",
        content:
            "I was looking for a reliable washing machine filter, and this one works wonders. My clothes feel softer, and the machine stays clean.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amit Singh",
        role: "Business Owner",
        content:
            "We installed the commercial water purifier in our office. It handles the load perfectly, and the maintenance is hassle-free.",
        rating: 4,
    },
    {
        id: 4,
        name: "Neha Verma",
        role: "Working Professional",
        content:
            "Installation was quick and the team explained everything clearly. Water quality feels much better now.",
        rating: 5,
    },
    {
        id: 5,
        name: "Suresh Patel",
        role: "Restaurant Owner",
        content:
            "We use their commercial purifier daily. Reliable performance and very low maintenance.",
        rating: 4,
    },
    {
        id: 6,
        name: "Janvi Sharma",
        role: "Student",
        content:
            "We use their commercial purifier daily. Reliable performance and very low maintenance.",
        rating: 4,
    },
    {
        id: 7,
        name: "Suresh Patel",
        role: "Restaurant Owner",
        content:
            "We use their commercial purifier daily. Reliable performance and very low maintenance.",
        rating: 4,
    },
    {
        id: 8,
        name: "Suresh Patel",
        role: "Restaurant Owner",
        content:
            "We use their commercial purifier daily. Reliable performance and very low maintenance.",
        rating: 4,
    },
    {
        id: 9,
        name: "Suresh Patel",
        role: "Restaurant Owner",
        content:
            "We use their commercial purifier daily. Reliable performance and very low maintenance.",
        rating: 4,
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    const visibleCount =
        typeof window !== "undefined"
            ? window.innerWidth >= 1024
                ? 3
                : window.innerWidth >= 768
                    ? 2
                    : 1
            : 3;

    const maxIndex = testimonials.length - visibleCount;

    const next = () => {
        setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            next();
        }, 5000);

        return () => clearInterval(timer);
    }, [index]);

    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 relative">

                {/* heading */}
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-16">
                    What our customers say
                </h2>

                {/* arrows */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full border bg-white hover:bg-gray-50 shadow-sm z-10 hidden md:block"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full border bg-white hover:bg-gray-50 shadow-sm z-10 hidden md:block"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* slider */}
                <div className="overflow-hidden px-4">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${index * (100 / visibleCount)}%)`,
                        }}
                    >
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                            >
                                <div className="border border-gray-200 rounded-xl p-8 bg-white hover:shadow-md transition h-full flex flex-col">
                                    {/* stars */}
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < t.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* text */}
                                    <p className="text-lg text-gray-700 leading-relaxed mb-8 flex-grow">
                                        “{t.content}”
                                    </p>

                                    {/* user */}
                                    <div>
                                        <p className="text-base font-medium text-gray-900">
                                            {t.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

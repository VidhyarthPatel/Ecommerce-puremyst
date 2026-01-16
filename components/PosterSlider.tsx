"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import images
import poster1 from "@/assets/poster-1.png";
import poster2 from "@/assets/poster-2.png";
import poster3 from "@/assets/poster-3.png";

const slides = [
    {
        id: 1,
        image: poster1,
        alt: "Poster 1",
    },
    {
        id: 2,
        image: poster2,
        alt: "Poster 2",
    },
    {
        id: 3,
        image: poster3,
        alt: "Poster 3",
    },
];

export default function PosterSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-swipe logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden group">
            {/* Slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={slide.id === 1}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next Slide"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-white w-8" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

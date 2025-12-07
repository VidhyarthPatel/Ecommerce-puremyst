"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import posterImg from "@/assets/poster.jpeg";

const slides = [
  {
    id: 1,
    image: posterImg,
    alt: "Water Purifier Promotion 1",
  },
  {
    id: 2,
    image: posterImg,
    alt: "Water Purifier Promotion 2",
  },
  {
    id: 3,
    image: posterImg,
    alt: "Water Purifier Promotion 3",
  },
  {
    id: 4,
    image: posterImg,
    alt: "Water Purifier Promotion 4",
  },
  {
    id: 5,
    image: posterImg,
    alt: "Water Purifier Promotion 5",
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden mt-20">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex-shrink-0"
          >
            <img
              src={slide.image.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Smaller */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 rounded-full transition-all duration-200 hover:scale-110 shadow-lg z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 rounded-full transition-all duration-200 hover:scale-110 shadow-lg z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${current === index
              ? "w-8 h-2 bg-white"
              : "w-2 h-2 bg-white/60 hover:bg-white/90"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;

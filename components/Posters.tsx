"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import posterImg from "@/assets/poster.jpeg";

const posters = [
  {
    id: 1,
    src: posterImg,
    alt: "Advanced Water Purification",
    title: "Pure Water, Healthy Life",
    subtitle: "Advanced RO+UV+UF Technology",
  },
  {
    id: 2,
    src: posterImg,
    alt: "Mineral Protection",
    title: "Preserve Essential Minerals",
    subtitle: "TDS Controller for Healthy Water",
  },
  {
    id: 3,
    src: posterImg,
    alt: "Smart Purification",
    title: "Smart Water Solutions",
    subtitle: "IoT Enabled Purification Systems",
  },
];

export default function PosterSlider() {
  const [current, setCurrent] = useState(0);

  // Auto swipe every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posters.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? posters.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % posters.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-gray-100">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {posters.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative h-[500px] md:h-[700px]"
          >
            <img
              src={slide.src.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-100">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={28} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 px-2 py-1 ${
              current === index
                ? "bg-white w-8 h-2"
                : "bg-white/50 hover:bg-white/80 w-2 h-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

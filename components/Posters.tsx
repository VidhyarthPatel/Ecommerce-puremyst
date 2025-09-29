"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import poster from "../assets/posters.png";

const posters = [
  { id: 1, src: "https://www.kent.co.in/images/banners/water-banner.jpg", alt: "Poster 1" },
  { id: 2, src: "https://www.kent.co.in/images/banners/water-banner.jpg", alt: "Poster 2" },
  { id: 3, src: "https://www.kent.co.in/images/banners/water-banner.jpg", alt: "Poster 3" },
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
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
      {/* Wrapper that moves left */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {posters.map((poster) => (
          <div
            key={poster.id}
            className="w-full flex-shrink-0 relative h-[400px] md:h-[600px]"
          >
            <img
              src={poster.src}
              alt={poster.alt}
              // fill
              className="object-cover"
              // priority={poster.id === 1}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

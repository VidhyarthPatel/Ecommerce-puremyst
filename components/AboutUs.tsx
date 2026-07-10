"use client";
import React, { useEffect, useState, useRef } from "react";
import aboutImg from "@/assets/aboutIMG.png";
import { Check } from "lucide-react";

function AnimatedCounter({ target, suffix, duration = 2000, decimals = 0 }: { target: number; suffix: string; duration?: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = target;
    const totalMiliseconds = duration;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / totalMiliseconds, 1);

      // Ease out quad formula: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);

      const currentValue = start + easeProgress * (end - start);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export default function AboutUs() {
  const bulletPoints = [
    "Advanced RO+UV Tech",
    "Smart Water Monitoring",
    "Mineral Retention",
    "Eco-Friendly Design",
    "Certified Quality Materials",
    "24/7 Service Support"
  ];

  const stats = [
    { target: 10000, suffix: "+", decimals: 0, label: "Happy Families" },
    { target: 25, suffix: "M+", decimals: 0, label: "Liters Purified" },
    { target: 99.9, suffix: "%", decimals: 1, label: "Purity Guaranteed" },
    { target: 10, suffix: "+", decimals: 0, label: "Years of Trust" }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Left: Image */}
          <div className="relative group rounded-md overflow-hidden shadow-md aspect-[4/3] sm:aspect-[1.4] lg:aspect-auto lg:h-[450px]">
            <img
              src={aboutImg.src}
              alt="PureMyst Team and Water Technology"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Right: Content details */}
          <div className="text-left lg:pl-6">
            <span className="text-sm font-bold text-[#0b6c2c] uppercase tracking-wider block mb-3">About Us</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1c2b4b] leading-tight mb-4">
              Purity in Every Drop, Trust in Every Home
            </h2>
            
            {/* Two Accent Lines */}
            <div className="flex space-x-1.5 mb-6">
              <div className="h-0.5 w-8 bg-[#0b6c2c]"></div>
              <div className="h-0.5 w-4 bg-[#0b6c2c]"></div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              At PureMyst, we are dedicated to providing clean, healthy, and premium drinking water solutions for your home and office. Our advanced filtration systems combine cutting-edge technology with elegant design to deliver the ultimate purity.
            </p>

            {/* 2-Column Bullet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center space-x-2.5 text-xs font-semibold text-gray-500">
                  <span className="w-4 h-4 rounded-full bg-[#0b6c2c] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-gray-100 mb-16"></div>

        {/* Bottom: Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-5xl font-semibold text-gray-800 mb-2">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

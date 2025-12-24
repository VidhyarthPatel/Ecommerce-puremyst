"use client";
import React from "react";
import { ShieldCheck, Truck, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    description: "Certified products ensuring pure and safe water for your family.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Fast and free delivery on all orders above ₹500.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your queries.",
  },
  {
    icon: Headphones,
    title: "Expert Installation",
    description: "Professional installation service by certified technicians.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-ocean-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-ocean-800 flex items-center justify-center mb-6 text-[#0A2540] dark:text-white group-hover:bg-[#0A2540] group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

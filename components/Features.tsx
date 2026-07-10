"use client";
import React from "react";
import { ShieldCheck, Truck, Headphones, Wrench } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Guarantee",
    description: "Certified products ensuring pure and safe water for your family.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Fast and free delivery on all orders above ₹500 across India.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your technical queries.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Professional installation service by our certified technicians.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 font-heading">Why Choose PureMyst</h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">Pure water. Trusted service. Premium quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-start text-left bg-white p-8 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-100"
              >
                {/* Icon Container */}
                <div className="mb-6 text-[#0b6c2c] transition-colors duration-300">
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
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

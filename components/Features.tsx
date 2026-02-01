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
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 font-heading">Why Choose PureMyst</h2>
          <p className="text-[#475569] text-lg max-w-2xl mx-auto">Pure water. Trusted service. Premium quality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300  hover:border-[#0EA5E9] hover:shadow-lg "
              >
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-[#0EA5E9] transition-colors duration-300 group-hover:bg-[#0EA5E9] group-hover:text-white">
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#0F172A] mb-3 group-hover:text-[#0EA5E9] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#475569] leading-relaxed">
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

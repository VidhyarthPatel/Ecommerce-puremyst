"use client";
import React from "react";
import { Shield, Zap, Droplet, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Advanced RO+UV",
    description: "Multi-stage purification ensures every drop is safe and pure.",
    color: "teal",
  },
  {
    icon: Zap,
    title: "Smart Energy Saver",
    description: "Auto-off functionality saves electricity when tank is full.",
    color: "blue",
  },
  {
    icon: Droplet,
    title: "Mineral Guard",
    description: "Retains essential natural minerals in the water.",
    color: "cyan",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service for your peace of mind.",
    color: "indigo",
  },
];

const colorClasses = {
  teal: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  cyan: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
  indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
};

function Features() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-ocean-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-poppins text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
            Why Choose PureMyst
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cutting-edge technology meets elegant design to deliver the healthiest water for your family.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-poppins text-xl font-medium text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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

export default Features;

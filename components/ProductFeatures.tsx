"use client";
import React from "react";
import { Shield, Droplets, Clock, Wrench } from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Prevents Scaling",
        description: "Protects your washing machine from hard water damage and mineral buildup.",
    },
    {
        icon: Droplets,
        title: "Polyphosphate Media",
        description: "Advanced filtration technology for superior water treatment.",
    },
    {
        icon: Clock,
        title: "Extends Machine Life",
        description: "Significantly improves the lifespan of your washing machine.",
    },
    {
        icon: Wrench,
        title: "Easy Installation",
        description: "Simple DIY setup with no professional help required.",
    },
];

export default function ProductFeatures() {
    return (
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-ocean-800/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-4">
                        Why Choose This Product
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Engineered for performance, designed for convenience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-ocean-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#00AEEF]/10 mb-4">
                                    <Icon className="w-7 h-7 text-[#00AEEF]" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-poppins text-xl font-semibold text-[#0A2540] dark:text-white mb-2">
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

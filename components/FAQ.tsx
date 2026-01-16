"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How often should I change the filters?",
        answer:
            "For optimal performance and water quality, we recommend changing the filters every 6 to 12 months, depending on your water usage and quality.",
    },
    {
        question: "Do you offer installation services?",
        answer:
            "Yes, we provide professional installation services for all our water purifiers. Our certified technicians ensure a hassle-free setup.",
    },
    {
        question: "What is the warranty period?",
        answer:
            "All our products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are also available.",
    },
    {
        question: "Is it suitable for borewell water?",
        answer:
            "Yes, our advanced RO+UV+UF purification systems are designed to effectively treat borewell, tanker, and municipal water sources.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 bg-white dark:bg-ocean-900">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-100 dark:border-ocean-800 pb-4"
                        >
                            <button
                                className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-theme-blue transition-colors">
                                    {faq.question}
                                </span>
                                <span className="ml-4 text-gray-400 group-hover:text-theme-blue transition-colors">
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed pb-4">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

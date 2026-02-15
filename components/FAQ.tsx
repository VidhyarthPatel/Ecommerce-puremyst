"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4 font-heading">Frequently Asked Questions</h2>
                    <p className="text-[#475569] text-lg">Everything you need to know about PureMyst products.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            key={index}
                            className="group bg-white rounded-2xl border border-[#E2E8F0] shadow-sm open:border-[#0EA5E9] open:ring-1 open:ring-[#0EA5E9]/20 transition-all duration-300"
                        >
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none select-none">
                                <span className="text-lg font-semibold text-[#0F172A] group-open:text-[#0EA5E9] transition-colors">
                                    {faq.question}
                                </span>
                                <span className="ml-4 flex-shrink-0 text-[#22C55E]">
                                    <Plus className="w-6 h-6 block group-open:hidden" />
                                    <Minus className="w-6 h-6 hidden group-open:block" />
                                </span>
                            </summary>
                            <div className="px-6 pb-6 pt-0">
                                <p className="text-[#475569] leading-relaxed text-lg">
                                    {faq.answer}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                details > summary {
                    list-style: none;
                }
                details > summary::-webkit-details-marker {
                    display: none;
                }
            `}</style>
        </section>
    );
}

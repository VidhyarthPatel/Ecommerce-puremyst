"use client";

import React from "react";
import { Plus, Minus, MessageCircleQuestion, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs?: FAQItem[];
}

const defaultProductFaqs: FAQItem[] = [
  {
    question: "How does the PureMyst RO+UV filtration process work?",
    answer: "Our system combines multi-stage sediment and activated carbon filtration with high-rejection 80 GPD RO membranes to strip dissolved solids, followed by a UV-C sterilization chamber to deactivate bacteria and viruses, finished with a post-carbon mineralizer that balances pH and replenishes essential minerals."
  },
  {
    question: "Is professional installation provided with this purifier?",
    answer: "Yes, standard doorstep installation is supported across all major pin codes in India. Once your unit is delivered, an authorized PureMyst technician can be scheduled within 24-48 hours for complete setup and inlet TDS testing."
  },
  {
    question: "What is the recommended filter replacement interval?",
    answer: "The sediment and carbon pre-filters are typically replaced every 6 to 12 months depending on your input water quality. The high-durability RO membrane usually lasts 18 to 24 months. Replacement filter kits are readily available directly from our website."
  },
  {
    question: "Will this system work with high TDS borewell water?",
    answer: "Yes, this model is engineered for input water sources with TDS levels up to 2000 ppm, effectively reducing hardness and heavy metals to safe, crystal-clear drinking levels below 120 ppm."
  },
  {
    question: "What does the 1-year comprehensive warranty cover?",
    answer: "The warranty covers all manufacturing defects, the booster pump, electrical SMPS adapter, UV ballast, and internal valves. Our service team offers on-site diagnosis and free replacement of defective components."
  }
];

export default function ProductFAQ({ faqs }: ProductFAQProps) {
  // Merge user provided faqs with defaults to ensure complete coverage without duplicates
  const provided = faqs && faqs.length > 0 ? faqs : [];
  const existingQuestions = new Set(provided.map((f) => f.question.toLowerCase().trim()));
  const merged = [
    ...provided,
    ...defaultProductFaqs.filter((f) => !existingQuestions.has(f.question.toLowerCase().trim()))
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b]">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Answers to common questions about installation, maintenance, and water quality.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {merged.map((faq, index) => (
            <details
              key={index}
              className="group bg-[#fafafa] rounded-sm border border-gray-200/90 open:border-[#0b6c2c] open:ring-1 open:ring-[#0b6c2c]/20 transition-all duration-200"
            >
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none">
                <span className="text-base font-bold text-[#1c2b4b] group-open:text-[#0b6c2c] transition-colors pr-4">
                  {faq.question}
                </span>
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-[#0b6c2c] flex items-center justify-center flex-shrink-0 group-open:bg-[#0b6c2c] group-open:text-white transition-all duration-200">
                  <Plus className="w-4 h-4 block group-open:hidden" strokeWidth={2.5} />
                  <Minus className="w-4 h-4 hidden group-open:block" strokeWidth={2.5} />
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 border-t border-gray-100 bg-white">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom Help Card */}
        <div className="mt-12 p-6 bg-[#fafafa] border border-gray-200/90 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center flex-shrink-0">
              <MessageCircleQuestion className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#1c2b4b] text-sm sm:text-base">Have more questions about this model?</h4>
              <p className="text-gray-500 text-xs">Our water specialists are ready to help you with advice and testing.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0b6c2c] hover:bg-[#085221] text-white text-xs font-bold tracking-wider uppercase rounded-sm transition-all shadow-xs hover:shadow-md flex-shrink-0"
          >
            Contact Support
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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

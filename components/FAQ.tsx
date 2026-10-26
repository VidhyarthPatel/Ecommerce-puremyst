"use client";

import React from "react";
import { Plus, Minus, MessageCircleQuestion, ArrowRight } from "lucide-react";
import Link from "next/link";

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Green & White Brand Theme */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c2b4b] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about PureMyst advanced RO+UV purification systems and support.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white rounded-sm border border-gray-200/90 shadow-2xs open:border-[#0b6c2c] open:ring-1 open:ring-[#0b6c2c]/20 transition-all duration-200"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none select-none">
                <span className="text-base sm:text-lg font-bold text-[#1c2b4b] group-open:text-[#0b6c2c] transition-colors pr-4">
                  {faq.question}
                </span>
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-[#0b6c2c] flex items-center justify-center flex-shrink-0 group-open:bg-[#0b6c2c] group-open:text-white transition-all duration-200">
                  <Plus className="w-4 h-4 block group-open:hidden" strokeWidth={2.5} />
                  <Minus className="w-4 h-4 hidden group-open:block" strokeWidth={2.5} />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* Bottom Help Card */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-gray-200/90 rounded-sm text-center shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center flex-shrink-0">
              <MessageCircleQuestion className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#1c2b4b] text-base">Have more questions?</h4>
              <p className="text-gray-500 text-xs sm:text-sm">Our water specialists are available 24/7 to guide you.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0b6c2c] hover:bg-[#085221] text-white text-xs font-bold tracking-wider uppercase rounded-sm transition-all shadow-xs hover:shadow-md flex-shrink-0"
          >
            Contact Support
            <ArrowRight className="w-4 h-4" />
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

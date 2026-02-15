import React from "react";
import ProductListing from "@/components/catalog/ProductListing";
import { Metadata } from 'next';
import FAQ from "@/components/FAQ";
import { FAQS } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Water Purifier Accessories & Spares | PureMyst",
  description: " Genuine spare parts and accessories for RO water purifiers. Filters, membranes, taps, and more.",
  keywords: ["RO Spare Parts", "Water Purifier Filters", "RO Membrane", "Water Filter Accessories"],
};

export default function AccessoriesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-schema-accessories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductListing
        title="Accessories"
        description="Essential accessories for your water purification system."
        initialCategories={["Accessories"]}
        apiEndpoint="/api/accessories"
      />
      <FAQ faqs={FAQS} />
    </>
  );
}
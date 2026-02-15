import React from "react";
import ProductListing from "@/components/catalog/ProductListing";
import { Metadata } from 'next';
import FAQ from "@/components/FAQ";
import { FAQS } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Best RO Water Purifiers for Home | PureMyst",
  description: "Shop advanced RO water purifiers at PureMyst. Remove dissolved impurities and bacteria for 100% safe drinking water.",
  keywords: ["RO Water Purifier", "Reverse Osmosis System", "Best RO for Home", "PureMyst RO"],
};

export default function ROWaterPurifierPage() {
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
        id="faq-schema-ro"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductListing
        title="RO Water Purifiers"
        description="Advanced RO purification technology for clean, safe drinking water."
        initialCategories={["RO Water Purifier"]}
        apiEndpoint="/api/ro-water-purifier"
      />
      <FAQ faqs={FAQS} />
    </>
  );
}
import React from "react";
import ProductListing from "@/components/catalog/ProductListing";
import { Metadata } from 'next';
import FAQ from "@/components/FAQ";
import { FAQS } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Commercial Water Purifiers for Office & Business | PureMyst",
  description: "High-capacity commercial RO water purifiers for offices, schools, and restaurants. Durable, efficient, and reliable purification.",
  keywords: ["Commercial RO Plant", "Office Water Purifier", "Industrial Water Filter", "50LPH RO System"],
};

export default function CommercialWaterPurifierPage() {
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
        id="faq-schema-commercial"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProductListing
        title="Commercial Water Purifiers"
        description="High-capacity purification solutions for businesses and institutions."
        initialCategories={["Commercial Water Purifier"]}
        apiEndpoint="/api/commercial-water-purifier"
      />
      <FAQ faqs={FAQS} />
    </>
  );
}
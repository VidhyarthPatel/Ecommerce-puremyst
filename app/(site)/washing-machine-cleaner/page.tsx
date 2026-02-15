import React from "react";
import ProductListing from "@/components/catalog/ProductListing";
import { Metadata } from 'next';
import FAQ from "@/components/FAQ";
import { FAQS } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Washing Machine Cleaner & Descaler | PureMyst",
    description: "Extend the life of your washing machine with PureMyst's effective descaler and cleaner. Remove limescale and bad odor.",
    keywords: ["Washing Machine Cleaner", "Descaler Powder", "Limescale Remover", "Appliance Care"],
};

export default function WashingMachineCleanerPage() {
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
                id="faq-schema-cleaner"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <ProductListing
                title="Washing Machine Cleaner"
                description="Keep your washing machine clean and efficient with our specialized cleaners."
                initialCategories={["Washing Machine Cleaner"]}
                apiEndpoint="/api/washing-machine-cleaner"
            />
            <FAQ faqs={FAQS} />
        </>
    );
}

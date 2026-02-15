import Features from "@/components/Features";
import CategorySection from "@/components/CategorySection";
import PosterSlider from "@/components/PosterSlider";
import BestSelling from "@/components/BestSelling";
import Testimonials from "@/components/Testimonials";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import OurMission from "@/components/OurMission";
import FAQ from "@/components/FAQ";
import TrustedBy from "@/components/TrustedBy";
import { Metadata } from "next";
import { FAQS, COMPANY_INFO } from "@/lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PureMyst | Advanced Water Purifiers for Home & Office",
  description: "Discover PureMyst's range of advanced RO+UV+UF water purifiers. Ensure safe, healthy drinking water for your family with our trusted technology.",
  keywords: ["water purifier", "RO water purifier", "UV water purifier", "alkaline water purifier", "best water purifier India", "PureMyst", "clean drinking water"],
  openGraph: {
    title: "PureMyst | Advanced Water Purifiers",
    description: "Experience pure, healthy water with PureMyst's advanced purification technology. Shop now for the best water purifiers.",
    url: "https://www.puremyst.in",
    siteName: "PureMyst",
    images: [
      {
        url: "/OG/logo.png", // Ensure this path is correct based on previous context
        width: 1200,
        height: 630,
        alt: "PureMyst Water Purifiers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PureMyst",
    "url": "https://www.puremyst.in",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.puremyst.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": COMPANY_INFO.name,
    "url": COMPANY_INFO.url,
    "logo": COMPANY_INFO.logo,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": COMPANY_INFO.contactPoint.telephone,
      "contactType": COMPANY_INFO.contactPoint.contactType
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <main className="font-sans bg-white dark:bg-ocean-900 transition-colors duration-300">
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PosterSlider />
      <CategorySection />
      <BestSelling />
      <Features />
      <OurMission />
      <FAQ faqs={FAQS} />
      <Testimonials />
      <TrustedBy />
      <WhatsAppFloat />
    </main>
  );
}

import React from "react";
import ProductListing from "@/components/catalog/ProductListing";

export default function CommercialWaterPurifierPage() {
  return (
    <ProductListing
      title="Commercial Water Purifiers"
      description="High-capacity purification solutions for businesses and institutions."
      initialCategories={["Commercial Water Purifier"]}
      apiEndpoint="/api/commercial-water-purifier"
    />
  );
}
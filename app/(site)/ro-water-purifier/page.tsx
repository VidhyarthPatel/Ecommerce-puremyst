import React from "react";
import ProductListing from "@/components/catalog/ProductListing";

export default function ROWaterPurifierPage() {
  return (
    <ProductListing
      title="RO Water Purifiers"
      description="Advanced RO purification technology for clean, safe drinking water."
      initialCategories={["RO Water Purifier"]}
      apiEndpoint="/api/ro-water-purifier"
    />
  );
}
import React from "react";
import ProductListing from "@/components/catalog/ProductListing";

export default function AccessoriesPage() {
  return (
    <ProductListing
      title="Accessories"
      description="Essential accessories for your water purification system."
      initialCategories={["Accessories"]}
      apiEndpoint="/api/accessories"
    />
  );
}
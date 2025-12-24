import React from "react";
import ProductListing from "@/components/catalog/ProductListing";

export default function WashingMachineCleanerPage() {
    return (
        <ProductListing
            title="Washing Machine Cleaner"
            description="Keep your washing machine clean and efficient with our specialized cleaners."
            initialCategories={["Washing Machine Cleaner"]}
            apiEndpoint="/api/washing-machine-cleaner"
        />
    );
}

import React from 'react';

export default function ReturnRefundPolicy() {
    return (
        <div className="bg-white text-gray-900 font-sans pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Return & Refund Policy
                    </h1>
                    <div className="text-gray-600 space-y-1">
                        <p>Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Website: www.puremyst.in</p>
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-12 text-lg text-gray-600 leading-relaxed">
                    <p>
                        At PureMyst, customer satisfaction is important to us. This Return & Refund Policy explains the conditions under which products may be returned and refunds may be issued.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">

                    {/* 1. Eligibility for Returns */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Eligibility for Returns</h2>
                        <p className="text-gray-600 mb-4">A product is eligible for return only if:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>It was delivered in a damaged or defective condition, or</li>
                            <li>You received a wrong product or missing item, or</li>
                            <li>There is a manufacturing defect confirmed by our technical team.</li>
                        </ul>
                        <p className="text-gray-600">
                            Return requests must be raised within 48 hours of delivery.
                        </p>
                    </section>

                    {/* 2. Non-Returnable Items */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">2. Non-Returnable Items</h2>
                        <p className="text-gray-600 mb-4">The following are not eligible for return or refund:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Installed or used products</li>
                            <li>Filter cartridges, candles, membranes, and consumables</li>
                            <li>Products damaged due to improper installation or misuse</li>
                            <li>Orders placed incorrectly by the customer</li>
                            <li>Normal wear and tear</li>
                            <li>Clearance or special-discount items (if applicable)</li>
                        </ul>
                    </section>

                    {/* 3. Return Request Process */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">3. Return Request Process</h2>
                        <p className="text-gray-600 mb-4">To request a return:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>Email us at <a href="mailto:support@puremyst.in" className="text-blue-600 hover:text-blue-700">support@puremyst.in</a> or contact us at our support number</li>
                            <li>Share your order number, product details, and issue description</li>
                            <li>Provide clear photos or videos of the product and packaging</li>
                        </ul>
                        <p className="text-gray-600 mb-4">
                            Our team will review and confirm eligibility within 2–3 business days.
                        </p>
                        <p className="text-gray-600">
                            Unauthorized returns will not be accepted.
                        </p>
                    </section>

                    {/* 4. Return Pickup & Inspection */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Return Pickup & Inspection</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Once approved, we will arrange a pickup or provide return instructions.</li>
                            <li>Products must be returned in original packaging with all accessories.</li>
                            <li>All returns are subject to inspection after we receive the product.</li>
                            <li>If the product does not meet return conditions, it will be sent back to the customer.</li>
                        </ul>
                    </section>

                    {/* 5. Replacement or Refund */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Replacement or Refund</h2>
                        <p className="text-gray-600 mb-4">After inspection:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>If approved, we will replace the product or</li>
                            <li>Issue a refund based on availability and your preference.</li>
                        </ul>
                        <p className="text-gray-600 mb-4">
                            Refunds will be processed to the original payment method within 5–10 business days after approval.
                        </p>
                        <p className="text-gray-600">
                            Shipping or service charges (if any) are non-refundable unless the error is from PureMyst.
                        </p>
                    </section>

                    {/* 6. Damaged in Transit */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Damaged in Transit</h2>
                        <p className="text-gray-600 mb-4">If your product is damaged during delivery:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>Report it within 24 hours of receiving the order</li>
                            <li>Do not install or use the product</li>
                            <li>Share photos/videos of the outer box and product</li>
                        </ul>
                        <p className="text-gray-600">
                            Late claims may not be accepted.
                        </p>
                    </section>

                    {/* 7. Cancellation Policy */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Cancellation Policy</h2>
                        <p className="text-gray-600">
                            Orders can be cancelled only before dispatch. Once shipped, cancellation requests will not be accepted.
                        </p>
                    </section>

                    {/* 8. Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">PureMyst is not responsible for:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Incorrect product selection by the customer</li>
                            <li>Damage caused after installation</li>
                            <li>Delays due to courier partners</li>
                            <li>Health or appliance issues caused by improper use or maintenance</li>
                        </ul>
                    </section>

                    {/* 9. Policy Changes */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">9. Policy Changes</h2>
                        <p className="text-gray-600">
                            PureMyst reserves the right to change this policy at any time. Updates will be published on this page.
                        </p>
                    </section>

                    {/* 10. Contact Information */}
                    <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-medium text-gray-900 mb-6">10. Contact Information</h2>
                        <p className="text-gray-600 mb-6">
                            For returns and refunds:
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <p className="font-medium">PureMyst Customer Support</p>
                            <p className="flex items-center">
                                <span className="w-24 text-gray-500">Email:</span>
                                <a href="mailto:support@puremyst.in" className="text-blue-600 hover:text-blue-700">support@puremyst.in</a>
                            </p>
                            <p className="flex items-center">
                                <span className="w-24 text-gray-500">Phone:</span>
                                <span>[Insert number]</span>
                            </p>
                            <p className="flex items-center">
                                <span className="w-24 text-gray-500">Website:</span>
                                <a href="https://www.puremyst.in" className="text-blue-600 hover:text-blue-700">www.puremyst.in</a>
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function WarrantyPolicy() {
    return (
        <div className="bg-white text-gray-900 font-sans pt-20 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Warranty Policy
                    </h1>
                    <div className="text-gray-600 space-y-1">
                        <p>Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p>Website: www.puremyst.in</p>
                    </div>
                </div>

                {/* Introduction */}
                <div className="mb-12 text-lg text-gray-600 leading-relaxed">
                    <p>
                        At PureMyst, we are committed to delivering reliable and high-quality water filtration products. This Warranty Policy outlines the terms and conditions under which warranty service is provided.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-12">

                    {/* 1. Warranty Coverage */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Warranty Coverage</h2>
                        <p className="text-gray-600 mb-4">
                            PureMyst warrants that its products are free from manufacturing defects in materials and workmanship under normal domestic use.
                        </p>
                        <p className="text-gray-600 mb-4">Unless otherwise stated on the product page or packaging:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>
                                <span className="font-medium text-gray-900">Water purifiers & filtration devices:</span> Warranty of Electrical components (SMPS, SOLENOID VALVE, UV LED): Warranty of 6 months from the date of purchase
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">Filter cartridges, candles, membranes, and consumables:</span> No warranty, as they are wear-and-tear items
                            </li>
                        </ul>
                        <p className="text-gray-600">
                            Warranty applies only to the original purchaser and is valid only with a proof of purchase (invoice/order receipt).
                        </p>
                    </section>

                    {/* 2. What Is Covered */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">2. What Is Covered</h2>
                        <p className="text-gray-600 mb-4">This warranty covers:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2 mb-4">
                            <li>Manufacturing defects</li>
                            <li>Functional failure due to faulty components</li>
                            <li>Structural defects in product body under normal usage</li>
                        </ul>
                        <p className="text-gray-600 mb-2">PureMyst will, at its discretion:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Repair the product, or</li>
                            <li>Replace the defective part/product, or</li>
                            <li>Offer an equivalent product if the original is discontinued</li>
                        </ul>
                    </section>

                    {/* 3. What Is Not Covered */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">3. What Is Not Covered</h2>
                        <p className="text-gray-600 mb-4">This warranty does NOT cover:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Normal wear and tear</li>
                            <li>Filter replacement and routine maintenance</li>
                            <li>Damage due to improper installation</li>
                            <li>Damage caused by misuse, neglect, accidents, or unauthorized repairs</li>
                            <li>Damage due to water pressure issues, scaling, or unsuitable water conditions</li>
                            <li>Cosmetic damage (scratches, discoloration, etc.)</li>
                            <li>Commercial or industrial use unless specified</li>
                            <li>Transit damage after delivery</li>
                            <li>Products purchased from unauthorized sellers</li>
                        </ul>
                    </section>

                    {/* 4. Installation & Usage Conditions */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Installation & Usage Conditions</h2>
                        <p className="text-gray-600 mb-4">Warranty is valid only if:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>The product is installed as per PureMyst guidelines</li>
                            <li>Genuine PureMyst replacement parts and filters are used</li>
                            <li>The product is used only for its intended purpose</li>
                            <li>Maintenance schedules are followed</li>
                        </ul>
                        <p className="text-gray-600 mt-4">Failure to follow instructions may void the warranty.</p>
                    </section>

                    {/* 5. Warranty Claim Process */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Warranty Claim Process</h2>
                        <p className="text-gray-600 mb-4">To raise a warranty claim:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Email us at <a href="mailto:support@puremyst.in" className="text-blue-600 hover:text-blue-700">support@puremyst.in</a> or call our support number</li>
                            <li>Share your order invoice, product model, and issue details</li>
                            <li>Provide photos/videos if requested</li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            Our support team will guide you through troubleshooting, repair, or replacement. Service timelines may vary based on location and product availability.
                        </p>
                    </section>

                    {/* 6. Service & Replacement Terms */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Service & Replacement Terms</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Replaced parts or products may be new or refurbished</li>
                            <li>Warranty continues only for the remaining original warranty period</li>
                            <li>Service visits, courier charges, or installation may be chargeable unless stated otherwise</li>
                            <li>PureMyst’s decision on repair or replacement shall be final</li>
                        </ul>
                    </section>

                    {/* 7. Limitation of Liability */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">PureMyst shall not be responsible for:</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
                            <li>Any indirect, incidental, or consequential damages</li>
                            <li>Health issues due to incorrect product selection or improper maintenance</li>
                            <li>Loss or damage caused by external factors beyond product manufacturing</li>
                        </ul>
                    </section>

                    {/* 8. Policy Updates */}
                    <section>
                        <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Policy Updates</h2>
                        <p className="text-gray-600">
                            PureMyst reserves the right to modify this Warranty Policy at any time without prior notice. Updated versions will be published on our website.
                        </p>
                    </section>

                    {/* 9. Contact Information */}
                    <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-medium text-gray-900 mb-6">9. Contact Information</h2>
                        <p className="text-gray-600 mb-6">
                            For warranty support:
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <p className="font-medium">PureMyst Customer Care</p>
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

"use client";
import React from "react";

interface Spec {
    label: string;
    value: string;
}

interface ProductSpecsProps {
    specs: Spec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
    return (
        <section className="py-16 md:py-20 bg-white dark:bg-ocean-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A2540] dark:text-white mb-8">
                    Technical Specifications
                </h2>

                <div className="bg-gray-50 dark:bg-ocean-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <table className="w-full">
                        <tbody>
                            {specs.map((spec, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white dark:bg-ocean-800/50" : "bg-gray-50 dark:bg-ocean-800"
                                        }`}
                                >
                                    <td className="px-6 py-4 font-semibold text-[#0A2540] dark:text-white w-1/3">
                                        {spec.label}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                        {spec.value}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import Amazon from "@/assets/amazon.png";
import Flipkart from "@/assets/flipkart.png"

export default function TrustedBy() {
    return (
        <section className="py-12 bg-gray-50 dark:bg-ocean-900 border-b border-gray-100 dark:border-ocean-800">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-2xl font-medium mb-8 uppercase tracking-widest">
                    Available on
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 ">

                    {/* Amazon */}
                    <Image
                        src={Amazon}
                        alt="Amazon"
                        className="h-25 w-auto object-contain"
                    />

                    {/* Flipkart */}
                    <Image
                        src={Flipkart}
                        alt="Flipkart"
                        className="h-52 w-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
}

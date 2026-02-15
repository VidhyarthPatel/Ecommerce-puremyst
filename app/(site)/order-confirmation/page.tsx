"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationFallback() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You for Your Order!
                </h1>
                <p className="text-gray-600 mb-8">
                    Your order has been received and is being processed. You will receive an email confirmation shortly.
                </p>

                <div className="space-y-3">
                    <Link href="/products" className="block">
                        <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                    <Link href="/contact" className="block">
                        <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Contact Support
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Homeowner",
        content:
            "The water purifier I bought from here is amazing. The taste of water has improved significantly, and the service was top-notch.",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Patel",
        role: "Homemaker",
        content:
            "I was looking for a reliable washing machine filter, and this one works wonders. My clothes feel softer, and the machine stays clean.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amit Singh",
        role: "Business Owner",
        content:
            "We installed the commercial water purifier in our office. It handles the load perfectly, and the maintenance is hassle-free.",
        rating: 4,
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4 font-heading">Trusted by PureMyst Customers</h2>
                    <p className="text-[#475569] text-lg max-w-2xl mx-auto">Real experiences from homes and businesses across India.</p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA5E9] hover:shadow-md flex flex-col"
                        >
                            {/* Stars */}
                            <div className="flex mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < t.rating ? "text-[#FACC15] fill-[#FACC15]" : "text-gray-200"}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="text-lg text-[#475569] leading-relaxed mb-8 flex-grow italic">
                                "{t.content}"
                            </p>

                            {/* User Info */}
                            <div className="mt-auto pt-6 border-t border-gray-50">
                                <p className="text-base font-bold text-[#0F172A]">
                                    {t.name}
                                </p>
                                <p className="text-sm text-[#64748B]">
                                    {t.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button (Optional) */}
                <div className="text-center mt-12">
                    <button className="text-[#0EA5E9] font-medium hover:text-[#007C91] transition-colors inline-flex items-center group">
                        View More Reviews
                        <span className="block w-2 h-2 border-r-2 border-t-2 border-current transform rotate-45 ml-2 group-hover:translate-x-1 transition-transform"></span>
                    </button>
                </div>
            </div>
        </section>
    );
}

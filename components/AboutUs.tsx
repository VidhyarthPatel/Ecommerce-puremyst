"use client";
import React from "react";
import Link from "next/link";
import aboutImg from "@/assets/aboutIMG.png";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-24 bg-white dark:bg-ocean-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-teal-500/10 rounded-3xl transform rotate-3 scale-105" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={aboutImg.src}
                alt="About PureMyst"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-ocean-800 p-8 rounded-2xl shadow-xl hidden md:block">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-bold text-[#0A2540] dark:text-white">10k+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Committed to Providing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                Pure & Safe Water
              </span>
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              At PureMyst, we believe everyone deserves access to clean, healthy drinking water. Our advanced purification systems combine cutting-edge technology with elegant design to deliver the best water quality for your home and business.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Advanced RO+UV+UF Technology",
                "Smart Monitoring Systems",
                "Eco-friendly & Water Saving",
                "Certified Quality Standards"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-[#0A2540] dark:text-white font-semibold group"
            >
              Read Our Story
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

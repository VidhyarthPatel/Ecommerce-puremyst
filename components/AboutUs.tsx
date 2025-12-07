"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AboutIMG from "../assets/aboutIMG.png";

function AboutUs() {
  return (
    <section className="py-24 bg-white dark:bg-ocean-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 z-10">
              <img
                src={AboutIMG.src}
                alt="Pure Water Solutions"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />

            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-ocean-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 hidden md:block animate-float">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-teal-500">10+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Years of <br /> Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Committed to <span className="text-teal-500">Pure & Safe</span> Drinking Water
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              For over a decade, PureMyst has been at the forefront of water purification technology. We believe that access to clean, healthy water is a fundamental right, not a luxury.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Advanced RO+UV+UF Purification Systems",
                "Customized Solutions for Home & Business",
                "Certified Quality & Safety Standards",
                "Dedicated After-Sales Support"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 transition-colors group"
            >
              Read more about us
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutUs;

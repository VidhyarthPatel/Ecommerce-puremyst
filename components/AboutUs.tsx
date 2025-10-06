import Image from "next/image";
import React from "react";
import AboutIMG from "../assets/aboutIMG.png";

function AboutUs() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <Image
                src={AboutIMG}
                alt="Pure Water Solutions"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl -z-10"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <div className="w-16 h-1 bg-blue-600 mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
                About PureMyst
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  For over a decade, we've been at the forefront of water purification technology, 
                  providing comprehensive solutions across India.
                </p>
                <p>
                  Our expertise spans electric, non-electric, UV, RO, commercial, and industrial 
                  purification systems—all backed by unwavering commitment to quality and 
                  customer satisfaction.
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  Trusted by homes and businesses nationwide for reliable, pure water solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
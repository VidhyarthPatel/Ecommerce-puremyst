import Image from "next/image";
import React from "react";
import AboutIMG from "../assets/aboutIMG.png";

function AboutUs() {
  return (
    <section
      id="about"
      className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={AboutIMG}
            alt="About Us"
            className="rounded-xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#154D71]">
            About Us
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We provide all types of water purifiers including electric, non-electric, UV, RO, commercial RO, and industrial RO purifiers, with sales and service across India. Quality, reliability, and customer satisfaction are at the heart of what we do.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

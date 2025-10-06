import React from "react";
import Posters from "./Posters";

function HeroSection() {
  return (
    <div className="relative">
      <Posters />
      {/* Expertise Banner */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-light tracking-wide">
            Trusted by families across India for over{" "}
            <span className="font-semibold text-white">12 years</span> of pure water excellence
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
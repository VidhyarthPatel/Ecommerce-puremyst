import React from "react";
// import Nav from './nav'
import Posters from "./Posters";

function HeroSection() {
  return (
    <div>
      <Posters />
      <div className="w-full bg-blue-700 text-white py-2 md:py-3 text-center font-medium text-lg md:text-xl">
        Over <span className="font-bold text-white">12 Years of Expertise</span>{" "}
        in Water Purifiers
      </div>
    </div>
  );
}

export default HeroSection;

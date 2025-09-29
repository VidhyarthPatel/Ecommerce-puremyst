import Image from "next/image";
import React from "react";
// import AboutIMG from "../assets/aboutIMG.png";
import AboutIMG from "@/assets/aboutIMG.png"

function AboutUs() {
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-gray-900 mb-4">
            About Puremyst
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over eight years, we've been revolutionizing water purification across India 
            with cutting-edge technology and unwavering commitment to quality.
          </p>
        </div>

        {/* Main Content with Image */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={AboutIMG}
              alt="Puremyst Water Purification Technology"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h3 className="text-2xl font-light text-gray-900">
              Comprehensive Water Solutions
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We provide all types of water purifiers including electric, non-electric, UV, RO, 
              commercial RO, and industrial RO purifiers, with sales and service across India. 
              Quality, reliability, and customer satisfaction are at the heart of what we do.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2015 by environmental engineers and public health specialists, 
              Puremyst emerged from a simple yet powerful belief: access to clean water is 
              a fundamental human right. What began as a university research project has 
              evolved into a mission-driven company serving over 50,000 households nationwide.
            </p>
          </div>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-normal text-blue-700 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To make clean water accessible through sustainable, innovative solutions that 
                empower communities and protect our environment. We combine advanced purification 
                technology with comprehensive service networks to ensure every Indian household 
                has reliable access to safe drinking water.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-normal text-blue-700 mb-4">Why Choose Puremyst</h3>
              <p className="text-gray-600 leading-relaxed">
                Our multi-stage filtration systems remove over 99.9% of contaminants while 
                maintaining essential minerals. With service centers across India, we provide 
                prompt maintenance and support, ensuring your purifier operates at peak 
                performance year after year.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-normal text-blue-700 mb-4">Environmental Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                Every Puremyst system is designed with circular economy principles. We use 
                recyclable materials, minimize plastic waste, and develop technologies that 
                reduce water wastage by up to 60% compared to conventional systems.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-normal text-blue-700 mb-4">Future Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                By 2030, we aim to provide clean water solutions to one million households 
                annually, with a focus on regions most affected by water scarcity. We're 
                developing AI-powered purification systems and expanding our educational 
                initiatives about water conservation.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-700 text-white py-16 px-8 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-light mb-2">8+</div>
              <div className="text-sm text-gray-300">Years of Excellence</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">50K+</div>
              <div className="text-sm text-gray-300">Households Served</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">25+</div>
              <div className="text-sm text-gray-300">Cities Across India</div>
            </div>
            <div>
              <div className="text-3xl font-light mb-2">99.9%</div>
              <div className="text-sm text-gray-300">Contaminant Removal</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Ready for Pure Water?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the Puremyst difference - where advanced technology meets 
            reliable service and environmental responsibility.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-700 text-white text-sm hover:bg-blue-800 transition-colors rounded-lg">
              View Products
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 text-sm hover:bg-gray-50 transition-colors rounded-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
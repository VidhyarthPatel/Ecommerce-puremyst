import Image from "next/image";
import React from "react";
import AboutIMG from "@/assets/aboutIMG.png";

function AboutUs() {
  return (
    <section id="about" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            About PureMyst
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over eight years, revolutionizing water purification across India with 
            cutting-edge technology and unwavering commitment to quality.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <Image
                src={AboutIMG}
                alt="PureMyst Water Purification Technology"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl -z-10"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <div className="border-l-4 border-blue-600 pl-6 mb-8">
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Comprehensive Water Solutions
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    We provide all types of water purifiers including electric, non-electric, 
                    UV, RO, commercial RO, and industrial RO purifiers, with sales and service 
                    across India.
                  </p>
                  <p>
                    Founded in 2015 by environmental engineers and public health specialists, 
                    PureMyst emerged from a simple yet powerful belief: access to clean water 
                    is a fundamental human right.
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Serving over 50,000 households nationwide with reliable water purification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <h3 className="text-xl font-light text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To make clean water accessible through sustainable, innovative solutions that 
                empower communities and protect our environment.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <h3 className="text-xl font-light text-gray-900">Environmental Commitment</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Designed with circular economy principles, our systems use recyclable materials 
                and reduce water wastage by up to 60% compared to conventional systems.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <h3 className="text-xl font-light text-gray-900">Why Choose PureMyst</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Multi-stage filtration removes over 99.9% of contaminants while maintaining 
                essential minerals, with service centers across India.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">4</span>
                </div>
                <h3 className="text-xl font-light text-gray-900">Future Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                By 2030, we aim to provide clean water solutions to one million households 
                annually, focusing on regions most affected by water scarcity.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-8 rounded-2xl mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-light mb-2">8+</div>
              <div className="text-sm text-blue-100">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">50K+</div>
              <div className="text-sm text-blue-100">Households Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">25+</div>
              <div className="text-sm text-blue-100">Cities Across India</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">99.9%</div>
              <div className="text-sm text-blue-100">Contaminant Removal</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Experience Pure Water
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover the PureMyst difference—where advanced technology meets 
              reliable service and environmental responsibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                View Products
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
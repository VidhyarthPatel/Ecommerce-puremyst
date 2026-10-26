import Image from "next/image";
import Amazon from "@/assets/amazon.png";
import Flipkart from "@/assets/flipkart.png";

export default function TrustedBy() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Also Available On
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1c2b4b]">
            Shop PureMyst on Leading Platforms
          </h2>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">

          {/* Amazon Card */}
          <a
            href="https://www.amazon.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center bg-[#fafafa] border border-gray-200/90 rounded-sm p-8 hover:border-[#0b6c2c]/40 hover:shadow-md transition-all duration-200"
          >
            <Image
              src={Amazon}
              alt="Amazon"
              className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="mt-3 text-xs font-semibold text-gray-400 group-hover:text-gray-700 uppercase tracking-wider transition-colors">
              Shop on Amazon
            </span>
          </a>

          {/* Flipkart Card */}
          <a
            href="https://www.flipkart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center bg-[#fafafa] border border-gray-200/90 rounded-sm p-8 hover:border-[#0b6c2c]/40 hover:shadow-md transition-all duration-200"
          >
            <Image
              src={Flipkart}
              alt="Flipkart"
              className="h-10 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            />
            <span className="mt-3 text-xs font-semibold text-gray-400 group-hover:text-gray-700 uppercase tracking-wider transition-colors">
              Shop on Flipkart
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Sliders, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

interface Spec {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specs?: Spec[];
  productName?: string;
}

const defaultSpecs: Spec[] = [
  { label: "Purification Technology", value: "RO + UV + UF + TDS Infuser Mineralizer" },
  { label: "Purification Capacity", value: "Up to 15 Litres / hour" },
  { label: "Storage Tank Capacity", value: "8 - 10 Litres (Food Grade ABS)" },
  { label: "TDS Reduction Rate", value: "Up to 95% TDS Removal" },
  { label: "Input Water Pressure", value: "0.3 - 3.0 kg/cm²" },
  { label: "Applicable Water Source", value: "Borewell, Tanker, Municipal Tap Water" },
  { label: "Membrane Type", value: "80 GPD High-Rejection Thin Film Composite" },
  { label: "UV Lamp Power", value: "11 Watt High-Intensity UV-C Chamber" },
  { label: "Operating Voltage", value: "140 - 280 V AC, 50 Hz" },
  { label: "Power Consumption", value: "36 - 45 Watts (Energy Saving Mode)" },
  { label: "Mounting Type", value: "Wall Mount / Table Top Compatible" },
  { label: "Warranty", value: "1 Year Comprehensive Domestic Warranty" },
];

export default function ProductSpecs({ specs, productName }: ProductSpecsProps) {
  const displaySpecs = specs && specs.length > 0 ? specs : defaultSpecs;

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Detailed Parameters
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b]">
            Technical Specifications
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Comprehensive hardware and operational data for {productName || "this model"}.
          </p>
        </div>

        {/* Spec Table */}
        <div className="bg-[#fafafa] border border-gray-200/90 rounded-sm overflow-hidden shadow-2xs">
          <div className="bg-[#1c2b4b] px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Specifications Overview</span>
            </div>
            <span className="text-xs text-emerald-300 font-semibold bg-emerald-950/60 px-2.5 py-0.5 rounded-sm border border-emerald-500/30">
              Verified OEM Standards
            </span>
          </div>

          <div className="divide-y divide-gray-200/80">
            {displaySpecs.map((spec, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 sm:grid-cols-12 px-6 py-4 text-sm transition-colors ${
                  index % 2 === 0 ? "bg-white hover:bg-emerald-50/20" : "bg-[#fafafa] hover:bg-emerald-50/20"
                }`}
              >
                <div className="sm:col-span-5 font-semibold text-[#1c2b4b] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0b6c2c] flex-shrink-0" />
                  {spec.label}
                </div>
                <div className="sm:col-span-7 text-gray-600 mt-1 sm:mt-0 font-medium">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Footer Note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-emerald-50/60 border border-[#0b6c2c]/20 rounded-sm text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0b6c2c] flex-shrink-0" />
            <span>Specifications certified under standard temperature & 750 ppm test feed water conditions.</span>
          </div>
          <span className="font-bold text-[#0b6c2c] flex-shrink-0">
            PureMyst SafeWater™ Certified
          </span>
        </div>

      </div>
    </section>
  );
}

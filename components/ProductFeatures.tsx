"use client";

import React from "react";
import { 
  ShieldCheck, 
  Droplets, 
  Sparkles, 
  Gauge, 
  Layers, 
  Award,
  Zap,
  CheckCircle2
} from "lucide-react";

interface FeatureItem {
  icon: any;
  title: string;
  description: string;
  badge?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: Droplets,
    title: "Multi-Stage RO + UV Filtration",
    description: "Eliminates 99.9% of dissolved impurities, heavy metals (lead, arsenic), micro-plastics, bacteria, and active cysts.",
    badge: "Maximum Purity"
  },
  {
    icon: Sparkles,
    title: "Active Mineralizer Technology",
    description: "Enriches purified water with essential natural minerals like calcium and magnesium for balanced pH and sweet taste.",
    badge: "Optimal Taste"
  },
  {
    icon: Gauge,
    title: "Intelligent TDS Balancer",
    description: "Maintains healthy drinking TDS between 100-250 ppm, ensuring you never drink demineralized dead water.",
    badge: "Smart Control"
  },
  {
    icon: Layers,
    title: "Food-Grade Sealed Storage",
    description: "Engineered from high-density, non-toxic BPA-free polymers to prevent external bacterial re-contamination.",
    badge: "100% Food Safe"
  },
  {
    icon: Zap,
    title: "Rapid Flow & Auto-Cutoff",
    description: "High-capacity purification cycle delivering up to 15-20 Liters per hour with automatic power and water shutoff.",
    badge: "Zero Wastage"
  },
  {
    icon: Award,
    title: "Certified Lab Tested",
    description: "Tested and compliant with national drinking water standards (IS 10500) for uncompromised family health.",
    badge: "ISO & BIS Grade"
  },
];

export default function ProductFeatures({ features }: { features?: FeatureItem[] }) {
  const displayFeatures = features && features.length > 0 ? features : defaultFeatures;

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0b6c2c] uppercase tracking-wider block mb-2">
            Engineered For Purity
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c2b4b] tracking-tight">
            Advanced Purification Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Every component is rigorously tested to ensure clinical-grade drinking water for your home.
          </p>
        </div>

        {/* Features 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200/90 rounded-sm p-6 sm:p-7 hover:border-[#0b6c2c]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-[#0b6c2c]/10 text-[#0b6c2c] flex items-center justify-center transition-colors group-hover:bg-[#0b6c2c] group-hover:text-white">
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-bold text-[#0b6c2c] bg-emerald-50 px-2.5 py-0.5 rounded-sm border border-[#0b6c2c]/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#1c2b4b] mb-2 group-hover:text-[#0b6c2c] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0b6c2c]" />
                  Verified PureMyst Standard
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

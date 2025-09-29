"use client";

export default function SkeletonProductDetail() {
  const shimmer =
    "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery Skeleton */}
        <div className="space-y-6">
          <div className={`aspect-square bg-gray-200 rounded-2xl ${shimmer}`}></div>
          <div className="flex gap-3 justify-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-16 h-16 rounded-lg bg-gray-200 ${shimmer}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="lg:py-4 space-y-6">
          {/* Title */}
          <div className={`h-8 w-3/4 bg-gray-200 rounded ${shimmer}`}></div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className={`h-6 w-20 bg-gray-200 rounded-full ${shimmer}`}></div>
            <div className={`h-4 w-40 bg-gray-200 rounded ${shimmer}`}></div>
          </div>

          {/* Price */}
          <div className="p-4 bg-gray-100 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-24 bg-gray-200 rounded ${shimmer}`}></div>
              <div className={`h-6 w-20 bg-gray-200 rounded ${shimmer}`}></div>
              <div className={`h-6 w-16 bg-gray-200 rounded ${shimmer}`}></div>
            </div>
            <div className={`h-4 w-32 bg-gray-200 rounded ${shimmer}`}></div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <div className={`h-6 w-24 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`h-8 w-8 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`h-6 w-6 bg-gray-200 rounded ${shimmer}`}></div>
            <div className={`h-8 w-8 bg-gray-200 rounded ${shimmer}`}></div>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <div className={`h-12 w-full bg-gray-200 rounded-xl ${shimmer}`}></div>
            <div className={`h-12 w-full bg-gray-200 rounded-xl ${shimmer}`}></div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className={`h-5 w-32 bg-gray-200 rounded ${shimmer}`}></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-4 w-3/4 bg-gray-200 rounded ${shimmer}`}></div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <div className={`h-5 w-32 bg-gray-200 rounded ${shimmer}`}></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`h-4 w-full bg-gray-200 rounded ${shimmer}`}></div>
            ))}
          </div>

          {/* Specifications */}
          <div className="space-y-3">
            <div className={`h-5 w-40 bg-gray-200 rounded ${shimmer}`}></div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between gap-4">
                <div className={`h-4 w-20 bg-gray-200 rounded ${shimmer}`}></div>
                <div className={`h-4 w-32 bg-gray-200 rounded ${shimmer}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

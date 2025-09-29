export default function LoadingProductsPage() {
  return (
    <div className="bg-[#f5f5f7] min-h-screen py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mx-auto w-[90%] max-w-7xl">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col items-center text-center p-6 animate-pulse"
          >
            {/* Shimmer Image Skeleton */}
            <div className="w-full h-56 rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer" />

            <div className="mt-4 w-full space-y-3">
              <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded" /> {/* Title */}
              <div className="h-4 w-5/6 mx-auto bg-gray-200 rounded" /> {/* Desc */}
              <div className="h-6 w-1/3 mx-auto bg-gray-200 rounded" /> {/* Price */}
              <div className="h-4 w-1/4 mx-auto bg-gray-200 rounded" /> {/* Rating */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

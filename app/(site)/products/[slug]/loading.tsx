import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-ocean-900">
      <section className="py-4 md:py-8 bg-white dark:bg-ocean-900">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">

            {/* Left: Image Skeleton */}
            <div className="space-y-6">
              <div className="relative aspect-square bg-gray-100 dark:bg-card rounded-none overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 flex-shrink-0" />
                ))}
              </div>
            </div>

            {/* Right: Details Skeleton */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/3" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-6 w-1/4" />
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-2 h-2 rounded-full mt-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 space-y-4 max-w-md">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32 rounded-full" />
                  <Skeleton className="h-12 flex-1 rounded-full" />
                </div>
                <Skeleton className="h-12 w-full rounded-full" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export function VideoDetailsSkeleton() {
  return (
    <div className="mb-6 animate-pulse">
      {/* Video Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-3" />

      {/* Video Stats and Actions Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 bg-gray-200 rounded-full w-20" />
          <div className="h-9 bg-gray-200 rounded-full w-16" />
          <div className="h-9 bg-gray-200 rounded-full w-20" />
          <div className="h-9 bg-gray-200 rounded-full w-9" />
        </div>
      </div>

      {/* Channel Info Skeleton */}
      <div className="p-4 bg-gray-50 rounded-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
                <div className="h-3 bg-gray-200 rounded w-24" />
              </div>
              <div className="h-9 bg-gray-200 rounded-full w-24" />
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-4/5" />
              <div className="h-3 bg-gray-200 rounded w-3/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

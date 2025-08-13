export function RelatedVideoSkeleton() {
  return (
    <div className="flex gap-2 p-2 animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-40 h-24 bg-gray-200 rounded-lg flex-shrink-0" />

      {/* Video Info Skeleton */}
      <div className="flex-1 min-w-0">
        <div className="h-3 bg-gray-200 rounded mb-2" />
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
        <div className="h-2 bg-gray-200 rounded w-1/2 mb-1" />
        <div className="h-2 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

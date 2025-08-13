"use client"

export function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video bg-[#0a0a0a] rounded-xl mb-3 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full custom-shimmer" />
      </div>

      {/* Video Info Skeleton */}
      <div className="flex gap-3">
        {/* Channel Avatar Skeleton */}
        <div className="w-9 h-9 bg-[#0a0a0a] rounded-full flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full custom-shimmer" />
        </div>

        {/* Video Details Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 bg-[#0a0a0a] rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full custom-shimmer" />
          </div>
          <div className="h-3 bg-[#0a0a0a] rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full custom-shimmer" />
          </div>
          <div className="h-3 bg-[#0a0a0a] rounded w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full custom-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}

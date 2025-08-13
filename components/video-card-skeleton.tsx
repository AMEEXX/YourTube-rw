"use client"

export function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="aspect-video yt-skeleton rounded-xl mb-3 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-yt-skeleton-shimmer to-transparent" />
      </div>

      {/* Video Info Skeleton */}
      <div className="flex gap-3">
        {/* Channel Avatar Skeleton */}
        <div className="w-9 h-9 yt-skeleton rounded-full flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-yt-skeleton-shimmer to-transparent" />
        </div>

        {/* Video Details Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 yt-skeleton rounded relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-yt-skeleton-shimmer to-transparent" />
          </div>
          <div className="h-3 yt-skeleton rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-yt-skeleton-shimmer to-transparent" />
          </div>
          <div className="h-3 yt-skeleton rounded w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-yt-skeleton-shimmer to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}
/* Add shimmer animation */
;<style jsx>{`
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`}</style>

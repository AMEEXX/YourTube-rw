export function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      {/* Avatar Skeleton */}
      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />

      <div className="flex-1">
        {/* Author and timestamp */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>

        {/* Comment content */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="h-6 bg-gray-200 rounded w-12" />
          <div className="h-6 bg-gray-200 rounded w-12" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  )
}

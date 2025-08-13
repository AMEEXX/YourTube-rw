"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useSearch } from "@/hooks/use-search"

export function SearchResults() {
  const { searchResults, isSearching, hasResults, query } = useSearch()

  if (isSearching) {
    return (
      <Card className="bg-background border shadow-lg">
        <CardContent className="p-4">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-32 h-20 bg-muted rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!hasResults) {
    return (
      <Card className="bg-background border shadow-lg">
        <CardContent className="p-4">
          <div className="text-center py-4">
            <p className="text-muted-foreground">No whitelisted videos found for "{query}"</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try searching for different keywords or add more channels to your whitelist
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-background border shadow-lg max-h-96 overflow-y-auto">
      <CardContent className="p-4">
        <div className="space-y-3">
          {searchResults.slice(0, 5).map((video) => (
            <Link key={video.id} href={`/watch?v=${video.id}`}>
              <div className="flex gap-3 p-2 rounded hover:bg-muted transition-colors cursor-pointer">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{video.channel}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {searchResults.length > 5 && (
            <div className="text-center pt-2 border-t">
              <p className="text-sm text-muted-foreground">{searchResults.length - 5} more results available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

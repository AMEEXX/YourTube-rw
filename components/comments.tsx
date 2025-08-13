"use client"

import { useState } from "react"
import { ThumbsUp, ThumbsDown, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CommentSkeleton } from "@/components/comment-skeleton"

const mockComments = [
  {
    id: "1",
    author: "John Developer",
    avatar: "JD",
    content:
      "This is exactly what I needed! The explanation is so clear and easy to follow. Thank you for this amazing tutorial!",
    likes: 42,
    timestamp: "2 days ago",
    replies: 3,
  },
  {
    id: "2",
    author: "Sarah Code",
    avatar: "SC",
    content: "Great video! Could you make a follow-up tutorial about advanced patterns?",
    likes: 18,
    timestamp: "1 day ago",
    replies: 1,
  },
  {
    id: "3",
    author: "Mike Frontend",
    avatar: "MF",
    content: "The best programming tutorial I've seen this year. Subscribed!",
    likes: 67,
    timestamp: "3 hours ago",
    replies: 0,
  },
]

export function Comments() {
  const [newComment, setNewComment] = useState("")
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [isLoading] = useState(false) // Added loading state for skeleton demo

  return (
    <div className="mt-6">
      <div className="flex items-center gap-8 mb-6">
        <h2 className="text-xl font-semibold">1,247 Comments</h2>
        <Button variant="ghost" className="text-sm font-medium">
          Sort by
        </Button>
      </div>

      {/* Add Comment */}
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-semibold">YU</span>
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setShowCommentBox(true)}
            className="min-h-[20px] resize-none border-0 border-b border-gray-300 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-900"
          />
          {showCommentBox && (
            <div className="flex items-center justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowCommentBox(false)
                  setNewComment("")
                }}
              >
                Cancel
              </Button>
              <Button disabled={!newComment.trim()} className="bg-blue-600 hover:bg-blue-700">
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <CommentSkeleton key={i} />)
          : mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">{comment.avatar}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-gray-600 text-xs">{comment.timestamp}</span>
                  </div>

                  <p className="text-sm text-gray-900 mb-2 leading-5">{comment.content}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-gray-600">{comment.likes}</span>
                    </div>

                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" className="text-xs font-medium h-8 px-3 hover:bg-gray-100">
                      Reply
                    </Button>

                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  {comment.replies > 0 && (
                    <Button
                      variant="ghost"
                      className="text-blue-600 text-sm font-medium mt-2 h-8 px-0 hover:bg-transparent"
                    >
                      View {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

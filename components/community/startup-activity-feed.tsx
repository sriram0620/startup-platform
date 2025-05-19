"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import type { Post } from "@/data/community-data"

interface StartupActivityFeedProps {
  posts: Post[]
  isLoading: boolean
}

export default function StartupActivityFeed({ posts, isLoading }: StartupActivityFeedProps) {
  const [localPosts, setLocalPosts] = useState<Post[]>(posts)

  const handleLike = (id: number) => {
    setLocalPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No activity yet. Follow startups to see their updates here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {localPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.startup.logo} alt={post.startup.name} />
                  <AvatarFallback>{post.startup.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{post.startup.name}</h4>
                    <Badge variant="outline" className="text-xs bg-primary/5">
                      {post.startup.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Hide this post</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm">{post.content}</p>

            {post.image && (
              <div className="rounded-md overflow-hidden">
                <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
              <div className="flex items-center gap-4">
                <button
                  className={`flex items-center gap-1 hover:text-primary transition-colors ${post.isLiked ? "text-red-500" : ""}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={`h-3.5 w-3.5 ${post.isLiked ? "fill-red-500" : ""}`} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {index < localPosts.length - 1 && <Separator className="my-4" />}
        </motion.div>
      ))}

      <Button variant="ghost" size="sm" className="w-full text-primary text-xs">
        View More
      </Button>
    </div>
  )
}


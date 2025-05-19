"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2, MoreHorizontal, Image, FileText, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ProfilePostsProps {
  isLoading: boolean
  posts: any[]
}

export default function ProfilePosts({ isLoading, posts }: ProfilePostsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [newPostText, setNewPostText] = useState("")
  const [localPosts, setLocalPosts] = useState(posts)
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState<number | null>(null)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any | null>(null)

  // Filter posts based on tab
  const getFilteredPosts = () => {
    switch (activeTab) {
      case "articles":
        return localPosts.filter((post) => post.type === "article")
      case "updates":
        return localPosts.filter((post) => post.type === "update")
      default:
        return localPosts
    }
  }

  const filteredPosts = getFilteredPosts()

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

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    setLocalPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [
                ...(post.commentsList || []),
                {
                  id: Date.now(),
                  author: "John Doe",
                  avatar: "/placeholder.svg?height=40&width=40&text=JD",
                  content: commentText,
                  timeAgo: "Just now",
                },
              ],
            }
          : post,
      ),
    )

    setCommentText("")
    setCommentDialogOpen(false)
  }

  const openCommentDialog = (post: any) => {
    setSelectedPost(post)
    setCommentDialogOpen(true)
  }

  const toggleComments = (postId: number) => {
    setShowComments(showComments === postId ? null : postId)
  }

  const handleCreatePost = () => {
    if (!newPostText.trim()) return

    const newPost = {
      id: Date.now(),
      type: "update",
      content: newPostText,
      timeAgo: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      commentsList: [],
    }

    setLocalPosts([newPost, ...localPosts])
    setNewPostText("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* New Post Card */}
      <Card className="border-none shadow-md">
        <CardContent className="p-4 pt-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Share an update or article..."
                className="bg-muted/50 border-none focus-visible:ring-1"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                    <Image className="h-4 w-4" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Article
                  </Button>
                </div>

                <Button size="sm" className="h-8" disabled={!newPostText.trim()} onClick={handleCreatePost}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-40 w-full mt-4 rounded-md" />
                </CardContent>
              </Card>
            ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {activeTab === "all"
                ? "You haven't shared any posts yet."
                : activeTab === "articles"
                  ? "You haven't published any articles yet."
                  : "You haven't shared any updates yet."}
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Post
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm">John Doe</h3>
                        <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Post</DropdownMenuItem>
                        <DropdownMenuItem>Pin to Profile</DropdownMenuItem>
                        <DropdownMenuItem>Delete Post</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm">{post.content}</p>

                    {post.image && (
                      <div className="mt-3 rounded-md overflow-hidden">
                        <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {post.type === "article" && (
                      <div className="mt-3 p-3 border rounded-md">
                        <h4 className="font-medium">{post.articleTitle}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.articleSummary}</p>
                        <Button variant="link" className="p-0 h-auto mt-1 text-primary">
                          Read Article
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      <span>{post.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{post.comments} comments</span>
                      <span>{post.shares} shares</span>
                    </div>
                  </div>

                  {/* Comments section */}
                  {showComments === post.id && post.commentsList && post.commentsList.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-3">Comments</h4>
                      <div className="space-y-3">
                        {post.commentsList.map((comment: any) => (
                          <div key={comment.id} className="flex items-start gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar} alt={comment.author} />
                              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted/50 rounded-lg p-2 flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-medium">{comment.author}</h5>
                                <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                              </div>
                              <p className="text-sm mt-1">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 mt-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            placeholder="Write a comment..."
                            className="bg-muted/50 border-none focus-visible:ring-1 text-sm"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleAddComment(post.id)
                              }
                            }}
                          />
                        </div>
                        <Button
                          size="sm"
                          className="h-8"
                          disabled={!commentText.trim()}
                          onClick={() => handleAddComment(post.id)}
                        >
                          Post
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>

                <Separator />

                <CardFooter className="p-0">
                  <div className="grid grid-cols-3 w-full">
                    <Button
                      variant="ghost"
                      className={`rounded-none h-10 gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 ${post.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      Like
                    </Button>
                    <Button variant="ghost" className="rounded-none h-10 gap-2" onClick={() => toggleComments(post.id)}>
                      <MessageCircle className="h-4 w-4" />
                      Comment
                    </Button>
                    <Button variant="ghost" className="rounded-none h-10 gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => selectedPost && handleAddComment(selectedPost.id)} disabled={!commentText.trim()}>
              Post Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


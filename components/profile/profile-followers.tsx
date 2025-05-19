"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Users, MessageSquare, CheckCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProfileFollowersProps {
  isLoading: boolean
  followers: any[]
  following: any[]
}

export default function ProfileFollowers({ isLoading, followers, following }: ProfileFollowersProps) {
  const [activeTab, setActiveTab] = useState("followers")
  const [searchQuery, setSearchQuery] = useState("")
  const [localFollowers, setLocalFollowers] = useState(followers)
  const [localFollowing, setLocalFollowing] = useState(following)

  // Filter connections based on search query
  const filteredFollowers = localFollowers.filter(
    (follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.headline.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredFollowing = localFollowing.filter(
    (follow) =>
      follow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follow.headline.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFollowBack = (id: number) => {
    // Update the follower to show they're now followed
    setLocalFollowers((prev) =>
      prev.map((follower) => (follower.id === id ? { ...follower, isFollowing: true } : follower)),
    )

    // Add this person to the following list if they're not already there
    const follower = localFollowers.find((f) => f.id === id)
    if (follower && !localFollowing.some((f) => f.id === id)) {
      setLocalFollowing((prev) => [...prev, { ...follower, isFollowing: true }])
    }
  }

  const handleUnfollow = (id: number) => {
    // Update the following status
    setLocalFollowing((prev) => prev.map((follow) => (follow.id === id ? { ...follow, isFollowing: false } : follow)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="followers" onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="followers" className="gap-2">
              <Users className="h-4 w-4" />
              Followers ({localFollowers.length})
            </TabsTrigger>
            <TabsTrigger value="following" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Following ({localFollowing.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search connections..."
          className="pl-9 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TabsContent value="followers" className="mt-6 space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                  <Skeleton className="h-9 w-20" />
                </div>
              ))}
          </div>
        ) : filteredFollowers.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No followers found</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                {searchQuery
                  ? `No followers match "${searchQuery}"`
                  : "You don't have any followers yet. Share your profile to gain followers."}
              </p>
              {!searchQuery && <Button className="gap-2">Share Profile</Button>}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFollowers.map((follower, index) => (
              <motion.div
                key={follower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={follower.avatar} alt={follower.name} />
                        <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-medium text-sm truncate">{follower.name}</h3>
                          {follower.isVerified && (
                            <CheckCircle className="h-3.5 w-3.5 text-blue-500 ml-1 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{follower.headline}</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {follower.tags.map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-muted">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          {follower.isFollowing ? (
                            <Button variant="default" size="sm" className="h-8 gap-1 flex-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Following
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 gap-1 flex-1"
                              onClick={() => handleFollowBack(follower.id)}
                            >
                              <UserPlus className="h-3.5 w-3.5" />
                              Follow Back
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="following" className="mt-6 space-y-6">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                  <Skeleton className="h-9 w-20" />
                </div>
              ))}
          </div>
        ) : filteredFollowing.length === 0 ? (
          <Card className="border-none shadow-md">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Not following anyone</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                {searchQuery
                  ? `No following match "${searchQuery}"`
                  : "You're not following anyone yet. Explore profiles to find people to follow."}
              </p>
              {!searchQuery && <Button className="gap-2">Explore Profiles</Button>}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFollowing.map((follow, index) => (
              <motion.div
                key={follow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={follow.avatar} alt={follow.name} />
                        <AvatarFallback>{follow.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-medium text-sm truncate">{follow.name}</h3>
                          {follow.isVerified && (
                            <CheckCircle className="h-3.5 w-3.5 text-blue-500 ml-1 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{follow.headline}</p>

                        <div className="flex flex-wrap gap-1 mt-2">
                          {follow.tags.map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-muted">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="default"
                            size="sm"
                            className="h-8 gap-1 flex-1"
                            onClick={() => handleUnfollow(follow.id)}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                            Following
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </TabsContent>
    </div>
  )
}


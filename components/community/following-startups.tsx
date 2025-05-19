"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Users, Bell, TrendingUp, Heart, Share2, ExternalLink, Calendar, MapPin } from "lucide-react"
import type { Startup } from "@/data/startups"
import StartupDetailsDialog from "../startup-details-dialog"

interface FollowingStartupsProps {
  startups: Startup[]
  isLoading: boolean
}

export default function FollowingStartups({ startups, isLoading }: FollowingStartupsProps) {
  const [localStartups, setLocalStartups] = useState<Startup[]>(startups)
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleLike = (id: number) => {
    setLocalStartups((prev) =>
      prev.map((startup) =>
        startup.id === id
          ? {
              ...startup,
              isLiked: !startup.isLiked,
              likes: startup.isLiked ? startup.likes - 1 : startup.likes + 1,
            }
          : startup,
      ),
    )

    // Also update the selected startup if it's the one being liked
    if (selectedStartup && selectedStartup.id === id) {
      setSelectedStartup({
        ...selectedStartup,
        isLiked: !selectedStartup.isLiked,
        likes: selectedStartup.isLiked ? selectedStartup.likes - 1 : selectedStartup.likes + 1,
      })
    }
  }

  const handleFollow = (id: number) => {
    setLocalStartups((prev) =>
      prev.map((startup) =>
        startup.id === id
          ? {
              ...startup,
              isFollowing: !startup.isFollowing,
              followers: startup.isFollowing ? startup.followers - 1 : startup.followers + 1,
            }
          : startup,
      ),
    )

    // Also update the selected startup if it's the one being followed
    if (selectedStartup && selectedStartup.id === id) {
      setSelectedStartup({
        ...selectedStartup,
        isFollowing: !selectedStartup.isFollowing,
        followers: selectedStartup.isFollowing ? selectedStartup.followers - 1 : selectedStartup.followers + 1,
      })
    }
  }

  const openStartupDetails = (startup: Startup) => {
    setSelectedStartup(startup)
    setDetailsOpen(true)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <Card key={i} className="border-none shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-20 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (startups.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Not following any startups</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            You're not following any startups yet. Explore startups and follow the ones that interest you to stay
            updated with their progress.
          </p>
          <Button className="bg-gradient-to-r from-primary to-primary/80">Explore Startups</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {localStartups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="p-6 pb-0">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={startup.logo} alt={startup.name} />
                    <AvatarFallback className="rounded-md bg-primary/10">{startup.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{startup.name}</h3>
                      <Badge variant="outline" className="bg-primary/5">
                        {startup.category}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarImage src={startup.founder.avatar} alt={startup.founder.name} />
                          <AvatarFallback>{startup.founder.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {startup.founder.name}
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {startup.location}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-4">{startup.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {startup.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-secondary/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Funding Progress</span>
                          <span className="text-primary">
                            ${(startup.fundingRaised / 1000).toFixed(0)}K / ${(startup.fundingGoal / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <Progress value={(startup.fundingRaised / startup.fundingGoal) * 100} className="h-2" />
                      </div>

                      <div className="bg-muted/20 rounded-md p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Bell className="h-4 w-4 mr-2 text-primary" />
                          Latest Updates
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="text-muted-foreground">
                            <span className="font-medium text-foreground">{startup.name}</span> secured a new
                            partnership
                            <span className="block text-xs">2 days ago</span>
                          </li>
                          <li className="text-muted-foreground">
                            <span className="font-medium text-foreground">{startup.name}</span> released a product
                            update
                            <span className="block text-xs">1 week ago</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-md p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        Upcoming Events
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-md p-1.5 text-center min-w-[40px]">
                            <div className="text-xs font-medium">APR</div>
                            <div className="text-base font-bold">15</div>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium">Demo Day</h5>
                            <p className="text-xs text-muted-foreground">Virtual • 2:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/20 rounded-md p-4">
                      <h4 className="font-medium mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                        Growth Stats
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Growth</p>
                          <p className="font-medium text-green-600">{startup.growth}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Followers</p>
                          <p className="font-medium">{startup.followers}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-wrap justify-between gap-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button
                    className={`flex items-center gap-1 hover:text-primary transition-colors ${startup.isLiked ? "text-red-500" : ""}`}
                    onClick={() => handleLike(startup.id)}
                  >
                    <Heart className={`h-4 w-4 ${startup.isLiked ? "fill-red-500" : ""}`} />
                    <span>{startup.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>{startup.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>{startup.shares}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={startup.isFollowing ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFollow(startup.id)}
                    className={startup.isFollowing ? "bg-primary" : ""}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    {startup.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 group"
                    onClick={() => openStartupDetails(startup)}
                  >
                    <ExternalLink className="h-4 w-4 mr-1 transition-transform group-hover:scale-110" />
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Startup Details Dialog */}
      <StartupDetailsDialog
        startup={selectedStartup}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onLike={handleLike}
        onFollow={handleFollow}
      />
    </div>
  )
}


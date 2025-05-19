"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Users,
  TrendingUp,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Startup } from "@/data/startups"
import StartupDetailsDialog from "../startup-details-dialog"

interface StartupFeedProps {
  startups: Startup[]
  activeTab: string
  searchQuery: string
}

export default function StartupFeed({ startups, activeTab, searchQuery }: StartupFeedProps) {
  const [localStartups, setLocalStartups] = useState<Startup[]>(startups)
  const [visibleCount, setVisibleCount] = useState(4)
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Update local startups when the filtered startups change
  if (JSON.stringify(startups) !== JSON.stringify(localStartups)) {
    setLocalStartups(startups)
  }

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

  const handleBookmark = (id: number) => {
    setLocalStartups((prev) =>
      prev.map((startup) => (startup.id === id ? { ...startup, isBookmarked: !startup.isBookmarked } : startup)),
    )
  }

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, localStartups.length))
  }

  const openStartupDetails = (startup: Startup) => {
    setSelectedStartup(startup)
    setDetailsOpen(true)
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Discover Startups</h2>
        <div className="text-sm text-muted-foreground">
          {localStartups.length} {localStartups.length === 1 ? "result" : "results"}
        </div>
      </div>

      {localStartups.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No startups found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? `No results for "${searchQuery}". Try adjusting your search or filters.`
              : "Try adjusting your filters to see more results."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence initial={false}>
            {localStartups.slice(0, visibleCount).map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-4 pb-0 flex flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden relative bg-primary/10">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={startup.logo} alt={startup.name} />
                        <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
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
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Founded {new Date(startup.founded).getFullYear()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-4">{startup.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {startup.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="bg-secondary/30">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="bg-muted/30 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Stage</p>
                            <p className="font-medium">{startup.stage}</p>
                          </div>
                          <div className="bg-muted/30 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Team</p>
                            <p className="font-medium">{startup.teamSize} people</p>
                          </div>
                          <div className="bg-muted/30 p-2 rounded-md text-center">
                            <p className="text-xs text-muted-foreground">Growth</p>
                            <p className="font-medium text-green-600">{startup.growth}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Funding Progress</span>
                            <span className="text-primary">
                              ${(startup.fundingRaised / 1000).toFixed(0)}K / ${(startup.fundingGoal / 1000).toFixed(0)}
                              K
                            </span>
                          </div>
                          <Progress value={(startup.fundingRaised / startup.fundingGoal) * 100} className="h-2" />
                        </div>
                      </div>

                      <div
                        className="relative rounded-md overflow-hidden h-[200px] cursor-pointer"
                        onClick={() => openStartupDetails(startup)}
                      >
                        <img
                          src={startup.image || "/placeholder.svg"}
                          alt={startup.name}
                          className="w-full h-full object-cover"
                        />
                        {startup.isTrending && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                              <TrendingUp className="h-3 w-3" />
                              {startup.growth}
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex flex-wrap justify-between gap-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <button
                        className={`flex items-center gap-1 hover:text-primary transition-colors ${startup.isLiked ? "text-red-500" : ""}`}
                        onClick={() => handleLike(startup.id)}
                      >
                        <Heart className={`h-4 w-4 ${startup.isLiked ? "fill-red-500" : ""}`} />
                        <span>{startup.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{startup.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>{startup.shares}</span>
                      </button>
                      <button
                        className={`flex items-center gap-1 hover:text-primary transition-colors ${startup.isBookmarked ? "text-primary" : ""}`}
                        onClick={() => handleBookmark(startup.id)}
                      >
                        <Bookmark className={`h-4 w-4 ${startup.isBookmarked ? "fill-primary" : ""}`} />
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                          <DropdownMenuItem>Not Interested</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleCount < localStartups.length && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={loadMore}
                className="border-primary/20 text-primary hover:bg-primary/5"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}

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


"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Users, TrendingUp } from "lucide-react"
import type { Startup } from "@/data/startups"
import StartupDetailsDialog from "../startup-details-dialog"

interface RecommendedStartupsProps {
  startups: Startup[]
}

export default function RecommendedStartups({ startups }: RecommendedStartupsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [localStartups, setLocalStartups] = useState<Startup[]>(startups)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 300

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
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

  const openStartupDetails = (startup: Startup) => {
    setSelectedStartup(startup)
    setDetailsOpen(true)
  }

  // If no startups are available, don't render the component
  if (startups.length === 0) {
    return null
  }

  return (
    <div ref={ref} className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Recommended For You</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {localStartups.map((startup, index) => (
          <motion.div
            key={startup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-w-[300px] max-w-[300px]"
          >
            <Card
              className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openStartupDetails(startup)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={startup.logo} alt={startup.name} />
                    <AvatarFallback className="rounded-md bg-primary/10">{startup.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{startup.name}</h3>
                    <p className="text-sm text-muted-foreground">by {startup.founder.name}</p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {startup.growth}
                  </Badge>
                </div>

                <Badge variant="outline" className="mb-3 bg-primary/5">
                  {startup.category}
                </Badge>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{startup.description}</p>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1 text-primary" />
                  <span>{startup.followers} followers</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

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


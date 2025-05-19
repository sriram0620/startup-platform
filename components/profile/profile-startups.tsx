"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Users, Heart, TrendingUp, ExternalLink, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import StartupDetailsDialog from "../startup-details-dialog"
import NewStartupDialog from "./new-startup-dialog"
import { startups as initialStartups } from "@/data/startups"

// High-quality startup images
const startupImages = [
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
]

// High-quality logo images
const logoImages = [
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
]

// Enhance startups with better images
const enhancedStartups = initialStartups.map((startup, index) => ({
  ...startup,
  coverImage: startupImages[index % startupImages.length],
  logo: logoImages[index % logoImages.length],
}))

interface ProfileStartupsProps {
  isLoading: boolean
  startups: any[]
}

export default function ProfileStartups({ isLoading, startups }: ProfileStartupsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedStartup, setSelectedStartup] = useState<any | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [newStartupOpen, setNewStartupOpen] = useState(false)

  // Use enhanced startups with better images
  const [localStartups, setLocalStartups] = useState(
    startups.map((startup, index) => ({
      ...startup,
      coverImage: startupImages[index % startupImages.length],
      logo: logoImages[index % logoImages.length],
    })),
  )

  // Global state for all startups (to update both profile and explore sections)
  const [globalStartups, setGlobalStartups] = useState(enhancedStartups)

  // Filter startups based on tab
  const getFilteredStartups = () => {
    switch (activeTab) {
      case "created":
        return localStartups.filter((startup) => startup.role === "Founder")
      case "joined":
        return localStartups.filter((startup) => startup.role !== "Founder")
      default:
        return localStartups
    }
  }

  const filteredStartups = getFilteredStartups()

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

    // Also update global startups
    setGlobalStartups((prev) =>
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

    // Also update global startups
    setGlobalStartups((prev) =>
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
        followers: selectedStartup.isFollowing ? selectedStartup.followers - 1 : startup.followers + 1,
      })
    }
  }

  const openStartupDetails = (startup: any) => {
    // Ensure all numeric values are valid
    const fundingRaised =
      typeof startup.fundingRaised === "number" && !isNaN(startup.fundingRaised) ? startup.fundingRaised : 0
    const fundingGoal = typeof startup.fundingGoal === "number" && !isNaN(startup.fundingGoal) ? startup.fundingGoal : 1 // Avoid division by zero

    // Convert to the format expected by StartupDetailsDialog with safe values
    const formattedStartup = {
      ...startup,
      fundingRaised: fundingRaised,
      fundingGoal: fundingGoal,
      founder: {
        name: startup.founderName || "John Doe",
        avatar:
          startup.founderAvatar ||
          "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
      },
      category: startup.industry || "Technology",
      image: startup.coverImage || startupImages[0],
      comments: startup.comments || 0,
      shares: startup.shares || 0,
      isLiked: startup.isLiked || false,
      isFollowing: startup.isFollowing || false,
      tags: startup.tags || [], // Ensure tags is at least an empty array
      location: startup.location || "Remote",
      founded: startup.founded || new Date().toISOString(),
      teamSize: typeof startup.teamSize === "number" && !isNaN(startup.teamSize) ? startup.teamSize : 0,
      growth: startup.growth || "0%",
      stage: startup.stage || "Seed",
    }

    setSelectedStartup(formattedStartup)
    setDetailsOpen(true)
  }

  const handleAddStartup = (newStartup: any) => {
    // Add high-quality images to the new startup
    const enhancedStartup = {
      ...newStartup,
      coverImage: startupImages[Math.floor(Math.random() * startupImages.length)],
      logo: logoImages[Math.floor(Math.random() * logoImages.length)],
    }

    // Add to local startups
    setLocalStartups((prev) => [enhancedStartup, ...prev])

    // Add to global startups
    setGlobalStartups((prev) => [enhancedStartup, ...prev])

    // Update window.startups if it exists (for global state access)
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.startups = [enhancedStartup, ...globalStartups]

      // Dispatch event for other components to listen to
      const event = new CustomEvent("startupsChanged", {
        detail: { startups: [enhancedStartup, ...globalStartups] },
      })
      window.dispatchEvent(event)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Startups</TabsTrigger>
            <TabsTrigger value="created">Created</TabsTrigger>
            <TabsTrigger value="joined">Joined</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button className="gap-2" onClick={() => setNewStartupOpen(true)}>
          <Plus className="h-4 w-4" />
          New Startup
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
        </div>
      ) : filteredStartups.length === 0 ? (
        <Card className="border-none shadow-md">
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No startups found</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {activeTab === "all"
                ? "You haven't created or joined any startups yet."
                : activeTab === "created"
                  ? "You haven't created any startups yet."
                  : "You haven't joined any startups yet."}
            </p>
            <Button className="gap-2" onClick={() => setNewStartupOpen(true)}>
              <Plus className="h-4 w-4" />
              Create a Startup
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden">
                <div className="relative h-32 bg-gradient-to-r from-primary/20 to-purple-600/20">
                  <img
                    src={startup.coverImage || startupImages[index % startupImages.length]}
                    alt={startup.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {startup.stage || "Seed"}
                    </Badge>
                  </div>
                  <div className="absolute -bottom-6 left-4">
                    <Avatar className="h-12 w-12 border-2 border-background rounded-md">
                      <AvatarImage src={startup.logo || logoImages[index % logoImages.length]} alt={startup.name} />
                      <AvatarFallback className="rounded-md">{startup.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <CardContent className="pt-8 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{startup.name}</h3>
                      <p className="text-xs text-muted-foreground">{startup.role}</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/5">
                      {startup.industry || "Technology"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{startup.description}</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span className="text-primary">
                        $
                        {typeof startup.fundingRaised === "number" && !isNaN(startup.fundingRaised)
                          ? (startup.fundingRaised / 1000).toFixed(0)
                          : "0"}
                        K / $
                        {typeof startup.fundingGoal === "number" && !isNaN(startup.fundingGoal)
                          ? (startup.fundingGoal / 1000).toFixed(0)
                          : "0"}
                        K
                      </span>
                    </div>
                    <Progress
                      value={
                        typeof startup.fundingRaised === "number" &&
                        typeof startup.fundingGoal === "number" &&
                        !isNaN(startup.fundingRaised) &&
                        !isNaN(startup.fundingGoal) &&
                        startup.fundingGoal > 0
                          ? (startup.fundingRaised / startup.fundingGoal) * 100
                          : 0
                      }
                      className="h-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>
                        {typeof startup.teamSize === "number" && !isNaN(startup.teamSize) ? startup.teamSize : 0}{" "}
                        members
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      <span>
                        {typeof startup.followers === "number" && !isNaN(startup.followers) ? startup.followers : 0}{" "}
                        followers
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{startup.growth || "0%"}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 group"
                    onClick={() => openStartupDetails(startup)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
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

      {/* New Startup Dialog */}
      <NewStartupDialog open={newStartupOpen} onOpenChange={setNewStartupOpen} onAddStartup={handleAddStartup} />
    </div>
  )
}


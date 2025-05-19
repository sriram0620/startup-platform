"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, ExternalLink, TrendingUp, ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StartupDetailsDialog from "../startup-details-dialog"
import type { Startup } from "@/data/startups"

const trendingStartups = [
  {
    id: 1,
    name: "EcoVentures",
    logo: "/placeholder.svg?height=80&width=80",
    founder: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    category: "Sustainability",
    likes: 253,
    comments: 42,
    shares: 18,
    followers: 124,
    growth: "+28%",
    fundingGoal: 500000,
    fundingRaised: 325000,
    location: "San Francisco, CA",
    teamSize: 5,
    founded: "2023-01-15",
    stage: "Seed",
    tags: ["Eco-Friendly", "E-Commerce", "Packaging"],
    isFollowing: false,
    isLiked: false,
    isBookmarked: false,
    isRemote: false,
    isTrending: true,
    isNew: true,
    description: "Sustainable packaging solutions for e-commerce businesses.",
    image: "/placeholder.svg?height=400&width=600&text=EcoVentures",
  },
  {
    id: 2,
    name: "MediConnect",
    logo: "/placeholder.svg?height=80&width=80",
    founder: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
    },
    category: "Healthcare",
    likes: 197,
    comments: 36,
    shares: 24,
    followers: 89,
    growth: "+42%",
    fundingGoal: 750000,
    fundingRaised: 450000,
    location: "Boston, MA",
    teamSize: 8,
    founded: "2022-09-30",
    stage: "Series A",
    tags: ["Healthcare", "AI", "Telemedicine"],
    isFollowing: true,
    isLiked: true,
    isBookmarked: false,
    isRemote: false,
    isTrending: true,
    isNew: false,
    description: "AI-powered telemedicine platform connecting patients with specialists.",
    image: "/placeholder.svg?height=400&width=600&text=MediConnect",
  },
  {
    id: 3,
    name: "FinTech Pro",
    logo: "/placeholder.svg?height=80&width=80",
    founder: {
      name: "Michael Park",
      avatar: "/placeholder.svg?height=40&width=40&text=MP",
    },
    category: "Finance",
    likes: 164,
    comments: 29,
    shares: 15,
    followers: 76,
    growth: "+15%",
    fundingGoal: 1000000,
    fundingRaised: 650000,
    location: "New York, NY",
    teamSize: 12,
    founded: "2021-11-05",
    stage: "Series B",
    tags: ["Finance", "Investment", "Fintech"],
    isFollowing: false,
    isLiked: false,
    isBookmarked: true,
    isRemote: false,
    isTrending: false,
    isNew: false,
    description: "Democratizing investment opportunities for everyday people.",
    image: "/placeholder.svg?height=400&width=600&text=FinTech+Pro",
  },
  {
    id: 4,
    name: "FoodDrop",
    logo: "/placeholder.svg?height=80&width=80",
    founder: {
      name: "Emily Wright",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
    },
    category: "Food Delivery",
    likes: 142,
    comments: 31,
    shares: 22,
    followers: 67,
    growth: "+35%",
    fundingGoal: 300000,
    fundingRaised: 275000,
    location: "Portland, OR",
    teamSize: 7,
    founded: "2022-06-20",
    stage: "Seed",
    tags: ["Food", "Sustainability", "Delivery"],
    isFollowing: true,
    isLiked: true,
    isBookmarked: true,
    isRemote: false,
    isTrending: true,
    isNew: false,
    description: "Farm-to-table food delivery with zero carbon footprint.",
    image: "/placeholder.svg?height=400&width=600&text=FoodDrop",
  },
]

const categories = ["All", "Tech", "Healthcare", "Finance", "Sustainability", "Food"]

export default function TrendingStartups() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [localStartups, setLocalStartups] = useState<Startup[]>(trendingStartups)
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

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Trending Startups</h2>
            <p className="text-muted-foreground max-w-2xl">
              Discover the most popular startup ideas currently gaining traction on our platform.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View All Startups
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent p-0 space-x-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 transition-all"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {localStartups.map((startup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-800">
                        <TrendingUp className="h-3 w-3" />
                        {startup.growth}
                      </Badge>
                    </div>
                    <CardHeader className="p-6 pb-0 flex flex-row items-center gap-4">
                      <div className="w-12 h-12 rounded-md overflow-hidden relative bg-primary/10">
                        <Image
                          src={startup.logo || "/placeholder.svg"}
                          alt={startup.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{startup.name}</h3>
                        <p className="text-sm text-muted-foreground">{startup.founder.name}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-4">
                      <Badge variant="outline" className="mb-4 bg-primary/5">
                        {startup.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{startup.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart
                            className={`h-4 w-4 ${startup.isLiked ? "fill-red-500 text-red-500" : "text-red-500"}`}
                          />
                          <span>{startup.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>{startup.followers}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Startup Details Dialog */}
      <StartupDetailsDialog
        startup={selectedStartup}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onLike={handleLike}
        onFollow={handleFollow}
      />
    </section>
  )
}


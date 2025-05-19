"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Heart,
  MessageSquare,
  Users,
  Share2,
  MapPin,
  DollarSign,
  Github,
  Linkedin,
  Twitter,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import type { Startup } from "@/data/startups"

// High-quality team member images
const teamMemberImages = [
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
]

// High-quality gallery images
const galleryImageSets = [
  [
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  ],
]

interface StartupDetailsDialogProps {
  startup: Startup | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onLike: (id: number) => void
  onFollow: (id: number) => void
}

export default function StartupDetailsDialog({
  startup,
  open,
  onOpenChange,
  onLike,
  onFollow,
}: StartupDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [requestSent, setRequestSent] = useState(false)

  if (!startup) return null

  // Ensure numeric values are valid
  const fundingRaised =
    typeof startup.fundingRaised === "number" && !isNaN(startup.fundingRaised) ? startup.fundingRaised : 0
  const fundingGoal = typeof startup.fundingGoal === "number" && !isNaN(startup.fundingGoal) ? startup.fundingGoal : 1 // Avoid division by zero
  const fundingProgress = fundingGoal > 0 ? (fundingRaised / fundingGoal) * 100 : 0
  const fundingRaisedK = (fundingRaised / 1000).toFixed(0)
  const fundingGoalK = (fundingGoal / 1000).toFixed(0)

  // Ensure founded date is valid
  const foundedDate = startup.founded ? new Date(startup.founded) : new Date()
  const foundedYear = foundedDate.getFullYear()

  // Get a consistent set of gallery images for this startup
  const galleryImageSet = galleryImageSets[startup.id % galleryImageSets.length]

  // Mock data for the dialog
  const teamMembers = [
    {
      id: 1,
      name: startup.founder?.name || "Founder",
      role: "Founder & CEO",
      avatar: startup.founder?.avatar || teamMemberImages[0],
      bio: `Experienced entrepreneur with a passion for ${(startup.category || "technology").toLowerCase()} solutions. Previously founded two successful startups and has 10+ years of industry experience.`,
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    {
      id: 2,
      name: "Alex Rivera",
      role: "CTO",
      avatar: teamMemberImages[1],
      bio: "Technical leader with expertise in scalable architecture and AI. Previously worked at Google and Amazon.",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Head of Product",
      avatar: teamMemberImages[2],
      bio: "Product strategist with a background in UX design. Led product teams at multiple startups.",
      linkedin: "https://linkedin.com",
      github: null,
      twitter: "https://twitter.com",
    },
  ]

  const galleryImages = [
    {
      type: "image",
      url: startup.image || galleryImageSet[0],
      caption: `${startup.name} product showcase`,
    },
    {
      type: "image",
      url: galleryImageSet[1],
      caption: "Our team at work",
    },
    {
      type: "image",
      url: galleryImageSet[2],
      caption: "Our headquarters",
    },
  ]

  const milestones = [
    {
      date: foundedDate.toLocaleDateString("en-US", { year: "numeric", month: "long" }),
      title: "Company Founded",
      description: `${startup.name} was established with a mission to revolutionize ${(startup.category || "technology").toLowerCase()}.`,
    },
    {
      date: new Date(new Date(foundedDate).setMonth(foundedDate.getMonth() + 3)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      title: "MVP Launch",
      description: "Successfully launched our minimum viable product to early adopters.",
    },
    {
      date: new Date(new Date(foundedDate).setMonth(foundedDate.getMonth() + 6)).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
      title: `${startup.stage} Funding`,
      description: `Secured ${fundingRaisedK}K in ${(startup.stage || "seed").toLowerCase()} funding.`,
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleRequestToJoin = () => {
    setRequestSent(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header with close button */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 rounded-md">
              <AvatarImage src={startup.logo} alt={startup.name} />
              <AvatarFallback className="rounded-md bg-primary/10">{startup.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{startup.name}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Badge variant="outline" className="mr-2 bg-primary/5">
                  {startup.category || "Technology"}
                </Badge>
                <span className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  {startup.location || "Remote"}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-0">
          {/* Hero section with image gallery */}
          <div className="relative h-64 md:h-80 bg-muted overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={galleryImages[currentImageIndex].url || "/placeholder.svg"}
                  alt={galleryImages[currentImageIndex].caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">{galleryImages[currentImageIndex].caption}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Gallery navigation */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevImage}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Gallery indicators */}
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {galleryImages &&
                galleryImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
            </div>

            {/* Funding status badge */}
            <div className="absolute top-4 right-4">
              <Badge
                className={`${
                  fundingRaised < fundingGoal
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }`}
              >
                {fundingRaised < fundingGoal ? (
                  <>
                    <DollarSign className="h-3.5 w-3.5 mr-1" /> Seeking Funding
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Funding Closed
                  </>
                )}
              </Badge>
            </div>

            {/* Play button for demo video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-background/30 backdrop-blur-sm hover:bg-background/50 border-white/50"
              >
                <Play className="h-5 w-5 text-white" fill="white" />
              </Button>
            </div>
          </div>

          {/* Tabs navigation */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="pitch">Pitch Deck</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About {startup.name}</h3>
                <p className="text-muted-foreground">{startup.description}</p>
                <p className="text-muted-foreground mt-2">
                  Our mission is to revolutionize the {(startup.category || "technology").toLowerCase()} industry
                  through innovative technology and user-centered design. We're committed to creating sustainable
                  solutions that address real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Funding Progress</span>
                        <span className="text-sm text-primary">
                          ${fundingRaisedK}K / ${fundingGoalK}K
                        </span>
                      </div>
                      <Progress value={fundingProgress} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          <DollarSign className="h-3 w-3 inline" /> {startup.stage || "Seed"} Round
                        </span>
                        <span>
                          <Clock className="h-3 w-3 inline" /> {fundingRaised < fundingGoal ? "Active" : "Closed"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground mb-1">Stage</p>
                        <p className="font-medium">{startup.stage}</p>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground mb-1">Team</p>
                        <p className="font-medium">{startup.teamSize || 0} people</p>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground mb-1">Growth</p>
                        <p className="font-medium text-green-600">{startup.growth || "0%"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Milestones</h3>
                  <div className="space-y-4">
                    {milestones &&
                      milestones.map((milestone, index) => (
                        <div
                          key={index}
                          className="relative pl-6 pb-4 border-l border-muted-foreground/20 last:border-0 last:pb-0"
                        >
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary"></div>
                          <p className="text-xs text-muted-foreground">{milestone.date}</p>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {startup.tags && startup.tags.length > 0 ? (
                    startup.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-secondary/30">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No tags available</span>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Team tab */}
            <TabsContent value="team" className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Meet Our Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers &&
                  teamMembers.map((member) => (
                    <div key={member.id} className="bg-muted/20 rounded-lg p-4 flex gap-4">
                      <Avatar className="h-16 w-16 rounded-md">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="rounded-md bg-primary/10">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                        <p className="text-sm text-muted-foreground mb-3">{member.bio}</p>
                        <div className="flex gap-2">
                          {member.linkedin && (
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" asChild>
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {member.github && (
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" asChild>
                              <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {member.twitter && (
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" asChild>
                              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="bg-muted/20 rounded-lg p-6 text-center">
                <h4 className="font-semibold mb-2">We're Hiring!</h4>
                <p className="text-muted-foreground mb-4">
                  Join our team and help us build the future of {(startup.category || "technology").toLowerCase()}.
                </p>
                <Button>View Open Positions</Button>
              </div>
            </TabsContent>

            {/* Pitch Deck tab */}
            <TabsContent value="pitch" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Pitch Deck</h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>

              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <img
                  src={galleryImageSet[0] || "/placeholder.svg"}
                  alt="Pitch Deck Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Full Pitch Deck
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Problem</h4>
                  <p className="text-sm text-muted-foreground">
                    Current solutions in the {(startup.category || "technology").toLowerCase()} space are inefficient,
                    expensive, and not user-friendly.
                  </p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Solution</h4>
                  <p className="text-sm text-muted-foreground">
                    {startup.name} provides an innovative platform that makes{" "}
                    {(startup.category || "technology").toLowerCase()}
                    accessible, affordable, and easy to use.
                  </p>
                </div>
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Market Opportunity</h4>
                  <p className="text-sm text-muted-foreground">
                    The global {(startup.category || "technology").toLowerCase()} market is projected to reach $500B by
                    2030, growing at 15% annually.
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 p-6 rounded-lg">
                <h4 className="font-medium mb-3">Investment Opportunity</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Funding Stage:</span>
                    <span className="text-sm font-medium">{startup.stage || "Seed"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm">Seeking:</span>
                    <span className="text-sm font-medium">${fundingGoalK}K</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm">Raised So Far:</span>
                    <span className="text-sm font-medium">${fundingRaisedK}K</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm">Minimum Investment:</span>
                    <span className="text-sm font-medium">$10K</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Updates tab */}
            <TabsContent value="updates" className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Latest Updates</h3>

              <div className="space-y-6">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">New Partnership Announcement</h4>
                    <Badge variant="outline" className="text-xs">
                      1 week ago
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're excited to announce our strategic partnership with IndustryLeader Inc. This collaboration will
                    help us expand our market reach and accelerate product development.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>24 likes</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Read More
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Product Update v2.0</h4>
                    <Badge variant="outline" className="text-xs">
                      2 weeks ago
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've just released version 2.0 of our platform with several new features and improvements,
                    including AI-powered recommendations and a completely redesigned user interface.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>42 likes</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Read More
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Team Expansion</h4>
                    <Badge variant="outline" className="text-xs">
                      1 month ago
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're growing! This month, we welcomed three new team members to help us scale our operations and
                    improve our product offering.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span>18 likes</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer with action buttons */}
        <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t p-4 flex flex-wrap justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className={`gap-2 ${startup.isLiked ? "text-red-500" : ""}`}
              onClick={() => onLike(startup.id)}
            >
              <Heart className={`h-4 w-4 ${startup.isLiked ? "fill-red-500" : ""}`} />
              {startup.isLiked ? "Liked" : "Like"}
            </Button>

            <Button
              variant={startup.isFollowing ? "default" : "outline"}
              size="sm"
              className="gap-2"
              onClick={() => onFollow(startup.id)}
            >
              <Users className="h-4 w-4" />
              {startup.isFollowing ? "Following" : "Follow"}
            </Button>

            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {requestSent ? (
              <Button variant="outline" size="sm" className="gap-2" disabled>
                <CheckCircle className="h-4 w-4 text-green-500" />
                Request Sent
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="gap-2" onClick={handleRequestToJoin}>
                <Users className="h-4 w-4" />
                Request to Join
              </Button>
            )}

            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
              <MessageSquare className="h-4 w-4" />
              Message Founder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


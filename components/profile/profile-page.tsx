"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Edit,
  MessageSquare,
  UserPlus,
  Briefcase,
  Users,
  DollarSign,
  Star,
  Share2,
  Settings,
  MapPin,
  Calendar,
  LinkIcon,
  Twitter,
  Linkedin,
  Github,
  Award,
  Bookmark,
  MessageCircle,
  CheckCircle,
  TrendingUp,
  ExternalLink,
  MoreHorizontal,
  Mail,
} from "lucide-react"
import Navbar from "../homepage/navbar"
import Footer from "../homepage/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import ProfileStartups from "./profile-startups"
import ProfileFollowers from "./profile-followers"
import ProfilePosts from "./profile-posts"
import ProfileAchievements from "./profile-achievements"
import { userProfile } from "@/data/profile-data"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("startups")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(true)
  const [profile, setProfile] = useState(userProfile)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)

    // Update follower count
    setProfile((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        followers: isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-16">
        {/* Cover Photo */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-primary/30 to-purple-600/30 overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=1200&text=Cover+Photo"
            alt="Cover"
            className="w-full h-full object-cover opacity-50"
          />

          {isOwnProfile && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
            >
              <Edit className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          )}

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                <AvatarImage src="/placeholder.svg?height=128&width=128&text=JD" alt="John Doe" />
                <AvatarFallback className="text-4xl">JD</AvatarFallback>
              </Avatar>

              {isOwnProfile && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background shadow-md hover:bg-muted"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

              {profile.isVerified && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-md">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container mt-20 md:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Profile Header */}
              <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-4 w-64" />
                      <div className="flex gap-3 mt-6">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="md:ml-36 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h1 className="text-2xl font-bold">{profile.name}</h1>
                            <p className="text-muted-foreground">{profile.headline}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {isOwnProfile ? (
                              <>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Profile
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant={isFollowing ? "outline" : "default"}
                                  size="sm"
                                  className="gap-2"
                                  onClick={handleFollow}
                                >
                                  {isFollowing ? (
                                    <>
                                      <CheckCircle className="h-4 w-4" />
                                      Following
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus className="h-4 w-4" />
                                      Follow
                                    </>
                                  )}
                                </Button>
                                <Button variant="outline" size="sm" className="gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  Message
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 mr-2" />
                                      Share Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Invite to Startup
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Bookmark className="h-4 w-4 mr-2" />
                                      Save Profile
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-3">
                          {profile.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{profile.location}</span>
                            </div>
                          )}

                          {profile.website && (
                            <div className="flex items-center gap-1">
                              <LinkIcon className="h-4 w-4" />
                              <a
                                href={profile.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {profile.website.replace(/^https?:\/\//, "")}
                              </a>
                            </div>
                          )}

                          {profile.joinDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Joined {profile.joinDate}</span>
                            </div>
                          )}

                          {profile.email && (
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              <a href={`mailto:${profile.email}`} className="hover:underline">
                                {profile.email}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-primary/5">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <p className="mt-4 text-sm">{profile.bio}</p>

                        <div className="flex items-center gap-3 mt-4">
                          {profile.socialLinks.twitter && (
                            <a
                              href={profile.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Twitter className="h-5 w-5" />
                            </a>
                          )}

                          {profile.socialLinks.linkedin && (
                            <a
                              href={profile.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}

                          {profile.socialLinks.github && (
                            <a
                              href={profile.socialLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {isLoading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => <Skeleton key={i} className="h-24 rounded-lg" />)
                ) : (
                  <>
                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">{profile.stats.startups}</div>
                        <p className="text-xs text-muted-foreground">Startups</p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">{profile.stats.followers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                          <UserPlus className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">{profile.stats.following.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Following</p>
                      </CardContent>
                    </Card>

                    <Card className="border-none shadow-md overflow-hidden">
                      <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">${profile.stats.investments.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Investments</p>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Tabs */}
              <Tabs defaultValue="startups" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="startups"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Startups
                  </TabsTrigger>
                  <TabsTrigger
                    value="followers"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Network
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Achievements
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="startups" className="mt-6">
                  <ProfileStartups isLoading={isLoading} startups={profile.startups} />
                </TabsContent>

                <TabsContent value="followers" className="mt-6">
                  <ProfileFollowers isLoading={isLoading} followers={profile.followers} following={profile.following} />
                </TabsContent>

                <TabsContent value="posts" className="mt-6">
                  <ProfilePosts isLoading={isLoading} posts={profile.posts} />
                </TabsContent>

                <TabsContent value="achievements" className="mt-6">
                  <ProfileAchievements isLoading={isLoading} achievements={profile.achievements} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Current Startup */}
              {profile.currentStartup && (
                <Card className="border-none shadow-md overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-primary" />
                      Current Startup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12 rounded-md">
                            <AvatarImage src={profile.currentStartup.logo} alt={profile.currentStartup.name} />
                            <AvatarFallback className="rounded-md">
                              {profile.currentStartup.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{profile.currentStartup.name}</h3>
                            <p className="text-sm text-muted-foreground">{profile.currentStartup.role}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-primary/5">
                                {profile.currentStartup.industry}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                                {profile.currentStartup.stage}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm mt-3">{profile.currentStartup.description}</p>

                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="text-primary font-medium">
                              ${profile.currentStartup.fundingRaised.toLocaleString()} / $
                              {profile.currentStartup.fundingGoal.toLocaleString()}
                            </span>
                          </div>
                          <Progress
                            value={(profile.currentStartup.fundingRaised / profile.currentStartup.fundingGoal) * 100}
                            className="h-2"
                          />
                        </div>

                        <Button className="mt-4 w-full gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View Startup
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Skills & Expertise */}
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Star className="h-5 w-5 mr-2 text-primary" />
                    Skills & Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isLoading ? (
                    <div className="space-y-3">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span>{skill.name}</span>
                          </div>
                          <div className="flex">
                            {Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < skill.level ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                />
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommended Connections */}
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 mr-2 text-primary" />
                      Recommended Connections
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-primary">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-1 flex-1">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-8 w-20" />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile.recommendedConnections.map((connection, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={connection.avatar} alt={connection.name} />
                            <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{connection.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{connection.headline}</p>
                          </div>
                          <Button variant="outline" size="sm" className="h-8">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Activity Highlights */}
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Activity Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="space-y-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile.activityHighlights.map((activity, index) => (
                        <div key={index} className="border-l-2 border-primary/20 pl-3 py-1">
                          <p className="text-sm">{activity.content}</p>
                          <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <div className="fixed bottom-6 right-6 z-10">
          <Button className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}


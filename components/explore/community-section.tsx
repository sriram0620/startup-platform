"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, Calendar, ArrowRight, UserPlus, Star } from "lucide-react"

const communityMembers = [
  {
    id: 1,
    name: "Jessica Kim",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=40&width=40&text=JK",
    skills: ["UI/UX", "Product Design", "Figma"],
    connections: 87,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    skills: ["React", "Node.js", "MongoDB"],
    connections: 124,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Marketing Specialist",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    skills: ["Growth Marketing", "SEO", "Content Strategy"],
    connections: 93,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Robert Taylor",
    role: "Angel Investor",
    avatar: "/placeholder.svg?height=40&width=40&text=RT",
    skills: ["Seed Funding", "Mentorship", "Strategy"],
    connections: 156,
    rating: 4.9,
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Startup Pitch Competition",
    date: "Apr 15",
    time: "2:00 PM EST",
    attendees: 250,
    type: "Virtual",
  },
  {
    id: 2,
    title: "Founder Networking Mixer",
    date: "Apr 22",
    time: "6:30 PM EST",
    attendees: 120,
    type: "New York, NY",
  },
]

const discussions = [
  {
    id: 1,
    title: "How to find the right technical co-founder?",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=30&width=30&text=SJ",
    replies: 24,
    views: 342,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Best practices for remote team management",
    author: "David Chen",
    avatar: "/placeholder.svg?height=30&width=30&text=DC",
    replies: 18,
    views: 276,
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Fundraising strategies for early-stage startups",
    author: "Michael Park",
    avatar: "/placeholder.svg?height=30&width=30&text=MP",
    replies: 32,
    views: 415,
    time: "1 day ago",
  },
]

export default function CommunitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Community & Networking</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* People to Connect With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-none shadow-md h-full">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                People to Connect With
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-primary group">
                View All
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          {member.rating}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {member.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-secondary/30">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="text-xs text-muted-foreground">
                          <Users className="h-3 w-3 inline mr-1" />
                          {member.connections} connections
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <UserPlus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Discussions and Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* Trending Discussions */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Trending Discussions
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary group">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      className="p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <h4 className="font-medium text-sm hover:text-primary transition-colors">{discussion.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={discussion.avatar} alt={discussion.author} />
                            <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{discussion.author}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{discussion.time}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {discussion.views} views
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Upcoming Events
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-primary group">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className="bg-primary/10 text-primary rounded-md p-2 text-center min-w-[48px]">
                        <div className="text-xs font-medium">{event.date.split(" ")[0]}</div>
                        <div className="text-lg font-bold">{event.date.split(" ")[1]}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm hover:text-primary transition-colors">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.type} • {event.time}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


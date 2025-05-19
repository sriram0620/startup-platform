"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Users, Briefcase, Activity } from "lucide-react"
import Navbar from "../homepage/navbar"
import Footer from "../homepage/footer"
import CommunityHeader from "./community-header"
import MyStartups from "./my-startups"
import FollowingStartups from "./following-startups"
import StartupActivityFeed from "./startup-activity-feed"
import CommunityNotifications from "./community-notifications"
import { startups } from "@/data/startups"
import { communityPosts, notifications } from "@/data/community-data"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("my-startups")
  const [myStartups, setMyStartups] = useState([])
  const [followingStartups, setFollowingStartups] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter startups that the user has requested to join
      const requested = startups.filter((startup) => startup.hasRequested)
      setMyStartups(requested)

      // Filter startups that the user is following
      const following = startups.filter((startup) => startup.isFollowing)
      setFollowingStartups(following)

      // Count unread notifications
      const unread = notifications.filter((notification) => !notification.read).length
      setUnreadNotifications(unread)

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-16">
        <CommunityHeader
          myStartupsCount={myStartups.length}
          followingCount={followingStartups.length}
          unreadNotifications={unreadNotifications}
        />

        <div className="container mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <motion.div
              className="lg:col-span-8 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="my-startups" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger
                    value="my-startups"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    My Startups
                  </TabsTrigger>
                  <TabsTrigger
                    value="following"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Following
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="my-startups" className="space-y-6">
                  <MyStartups startups={myStartups} isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="following" className="space-y-6">
                  <FollowingStartups startups={followingStartups} isLoading={isLoading} />
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-4 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6 sticky top-24">
                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StartupActivityFeed posts={communityPosts} isLoading={isLoading} />
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-primary" />
                      Notifications
                    </CardTitle>
                    {unreadNotifications > 0 && <Badge className="bg-primary">{unreadNotifications}</Badge>}
                  </CardHeader>
                  <CardContent>
                    <CommunityNotifications notifications={notifications} isLoading={isLoading} />
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


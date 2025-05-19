"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Users, DollarSign, MessageSquare, CheckCircle, X, Filter, ArrowLeft } from "lucide-react"
import Navbar from "../homepage/navbar"
import Footer from "../homepage/footer"
import { notifications as allNotifications } from "@/data/community-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState(allNotifications)
  const [isLoading, setIsLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Count unread notifications
      const unread = notifications.filter((notification) => !notification.read).length
      setUnreadCount(unread)
    }, 1000)

    return () => clearTimeout(timer)
  }, [notifications])

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "follow":
        return notifications.filter(
          (notification) => notification.type === "request_accepted" || notification.type === "follow_request",
        )
      case "chat":
        return notifications.filter((notification) => notification.type === "message")
      case "funding":
        return notifications.filter((notification) => notification.type === "funding")
      default:
        return notifications
    }
  }

  const filteredNotifications = getFilteredNotifications()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="container mt-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/community">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && <Badge className="bg-primary ml-2">{unreadCount} new</Badge>}
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Show read</DropdownMenuItem>
                  <DropdownMenuItem>Show unread</DropdownMenuItem>
                  <DropdownMenuItem>Sort by newest</DropdownMenuItem>
                  <DropdownMenuItem>Sort by oldest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Bell className="h-4 w-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger
                value="follow"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4 mr-2" />
                Follow Requests
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat Requests
              </TabsTrigger>
              <TabsTrigger
                value="funding"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Funding Updates
              </TabsTrigger>
            </TabsList>

            <Card className="border-none shadow-md overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center">
                    {activeTab === "all" && <Bell className="h-5 w-5 mr-2 text-primary" />}
                    {activeTab === "follow" && <Users className="h-5 w-5 mr-2 text-primary" />}
                    {activeTab === "chat" && <MessageSquare className="h-5 w-5 mr-2 text-primary" />}
                    {activeTab === "funding" && <DollarSign className="h-5 w-5 mr-2 text-primary" />}
                    {activeTab === "all" && "All Notifications"}
                    {activeTab === "follow" && "Follow Requests"}
                    {activeTab === "chat" && "Chat Requests"}
                    {activeTab === "funding" && "Funding Updates"}
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {filteredNotifications.length}{" "}
                    {filteredNotifications.length === 1 ? "notification" : "notifications"}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-6 space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {activeTab === "all" && "You don't have any notifications yet."}
                      {activeTab === "follow" && "You don't have any follow requests."}
                      {activeTab === "chat" && "You don't have any chat requests."}
                      {activeTab === "funding" && "You don't have any funding updates."}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`p-4 relative ${!notification.read ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            {notification.type === "system" ? (
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bell className="h-5 w-5 text-primary" />
                              </div>
                            ) : notification.type === "funding" ? (
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <DollarSign className="h-5 w-5 text-green-600" />
                              </div>
                            ) : notification.type === "follow_request" ? (
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                            ) : (
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={notification.sender?.avatar || notification.startup?.logo}
                                  alt={notification.sender?.name || notification.startup?.name || "Notification"}
                                />
                                <AvatarFallback>
                                  {(notification.sender?.name || notification.startup?.name || "N").charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}

                            {!notification.read && (
                              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary border-2 border-background"></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm">
                                  {notification.type === "request_accepted" && (
                                    <span className="font-medium">{notification.startup?.name}</span>
                                  )}
                                  {notification.type === "message" && (
                                    <span className="font-medium">{notification.sender?.name}</span>
                                  )}
                                  {notification.type === "follow_request" && (
                                    <span className="font-medium">{notification.sender?.name}</span>
                                  )}
                                  {notification.type === "funding" && (
                                    <span className="font-medium">{notification.startup?.name}</span>
                                  )}{" "}
                                  {notification.content}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{notification.timeAgo}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 rounded-full hover:bg-muted"
                                  onClick={() => removeNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>

                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 rounded-full hover:bg-muted"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            {notification.type === "follow_request" && (
                              <div className="flex items-center gap-2 mt-3">
                                <Button size="sm" className="h-8 bg-primary">
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  Decline
                                </Button>
                              </div>
                            )}

                            {notification.type === "message" && notification.preview && (
                              <div className="mt-2 p-3 bg-muted/30 rounded-md text-sm">{notification.preview}</div>
                            )}

                            {notification.type === "funding" && notification.fundingDetails && (
                              <div className="mt-2 p-3 bg-green-50 rounded-md text-sm border border-green-100">
                                <div className="flex items-center justify-between">
                                  <span className="text-green-800 font-medium">Funding Goal:</span>
                                  <span className="text-green-800">
                                    ${notification.fundingDetails.goal.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                  <span className="text-green-800 font-medium">Raised:</span>
                                  <span className="text-green-800">
                                    ${notification.fundingDetails.raised.toLocaleString()} (
                                    {notification.fundingDetails.percentage}%)
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}


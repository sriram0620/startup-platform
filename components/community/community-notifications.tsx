"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Calendar, Users, MessageSquare } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import type { Notification } from "@/data/community-data"

interface CommunityNotificationsProps {
  notifications: Notification[]
  isLoading: boolean
}

export default function CommunityNotifications({ notifications, isLoading }: CommunityNotificationsProps) {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications)

  const markAsRead = (id: number) => {
    setLocalNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-6">
        <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No notifications yet.</p>
      </div>
    )
  }

  const unreadCount = localNotifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
        </p>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="text-xs" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {localNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div
              className={`flex items-start gap-3 p-2 rounded-md ${!notification.read ? "bg-primary/5" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <Avatar className="h-8 w-8">
                {notification.type === "system" ? (
                  <div className="h-full w-full flex items-center justify-center bg-primary/10">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src={notification.sender?.avatar} alt={notification.sender?.name || "System"} />
                    <AvatarFallback>{notification.sender?.name?.charAt(0) || "S"}</AvatarFallback>
                  </>
                )}
              </Avatar>

              <div className="flex-1">
                <p className="text-sm">
                  {notification.type === "request_accepted" && (
                    <span className="font-medium">{notification.startup?.name}</span>
                  )}
                  {notification.type === "message" && <span className="font-medium">{notification.sender?.name}</span>}{" "}
                  {notification.content}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{notification.timeAgo}</p>
                  {!notification.read && (
                    <Badge variant="outline" className="h-1.5 w-1.5 rounded-full p-0 bg-primary" />
                  )}
                </div>
              </div>

              {notification.type === "request_accepted" && (
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  View Team
                </Button>
              )}

              {notification.type === "message" && (
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}

              {notification.type === "event" && (
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  View Event
                </Button>
              )}
            </div>

            {index < localNotifications.length - 1 && <Separator className="my-2" />}
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" size="sm" className="w-full text-primary text-xs">
        View All Notifications
      </Button>
    </div>
  )
}


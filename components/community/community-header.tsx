"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, Bell, MessageSquare } from "lucide-react"

interface CommunityHeaderProps {
  myStartupsCount: number
  followingCount: number
  unreadNotifications: number
}

export default function CommunityHeader({
  myStartupsCount,
  followingCount,
  unreadNotifications,
}: CommunityHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 py-12">
      <div className="container">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Community</h1>
            <p className="text-muted-foreground mt-1">
              Manage your startups and stay updated with the projects you follow
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{myStartupsCount}</div>
                  <p className="text-muted-foreground">My Startups</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{followingCount}</div>
                  <p className="text-muted-foreground">Following</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">24</div>
                  <p className="text-muted-foreground">Messages</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-none shadow-md bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 relative">
                    <Bell className="h-6 w-6 text-primary" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-primary">{unreadNotifications}</div>
                  <p className="text-muted-foreground">Notifications</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


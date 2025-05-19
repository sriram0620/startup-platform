"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MessageSquare,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Settings,
  MoreHorizontal,
  Briefcase,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Startup } from "@/data/startups"
import StartupDetailsDialog from "../startup-details-dialog"

interface MyStartupsProps {
  startups: Startup[]
  isLoading: boolean
}

export default function MyStartups({ startups, isLoading }: MyStartupsProps) {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState("all")

  const openStartupDetails = (startup: Startup) => {
    setSelectedStartup(startup)
    setDetailsOpen(true)
  }

  // Filter startups based on their status
  const pendingStartups = startups.filter((startup) => startup.requestStatus === "pending")
  const acceptedStartups = startups.filter((startup) => startup.requestStatus === "accepted")

  // Get the appropriate startups based on the active tab
  const getFilteredStartups = () => {
    switch (activeSubTab) {
      case "pending":
        return pendingStartups
      case "accepted":
        return acceptedStartups
      default:
        return startups
    }
  }

  const filteredStartups = getFilteredStartups()

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <Card key={i} className="border-none shadow-md">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pb-6 pt-0">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-20 w-full rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (startups.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No startups yet</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            You haven't requested to join any startups yet. Explore startups and request to join the ones that interest
            you.
          </p>
          <Button className="bg-gradient-to-r from-primary to-primary/80">Explore Startups</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveSubTab}>
        <TabsList className="bg-muted/30 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-background">
            All ({startups.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-background">
            Pending ({pendingStartups.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="data-[state=active]:bg-background">
            Accepted ({acceptedStartups.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <AnimatePresence initial={false}>
        {filteredStartups.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-none shadow-md">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">
                  No startups found in this category.{" "}
                  {activeSubTab === "pending"
                    ? "Your join requests will appear here."
                    : "Accepted startups will appear here."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          filteredStartups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage src={startup.logo} alt={startup.name} />
                        <AvatarFallback className="rounded-md bg-primary/10">{startup.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{startup.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-2 bg-primary/5">
                            {startup.category}
                          </Badge>
                          <span className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            {startup.teamSize} team members
                          </span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={
                        startup.requestStatus === "accepted"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {startup.requestStatus === "accepted" ? (
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 mr-1" />
                      )}
                      {startup.requestStatus === "accepted" ? "Accepted" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-4">{startup.description}</p>

                      <div className="space-y-4">
                        {startup.requestStatus === "accepted" && (
                          <>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Project Progress</span>
                                <span className="text-primary">65%</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-muted/30 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Next Meeting</p>
                                <p className="font-medium">Tomorrow, 2PM</p>
                              </div>
                              <div className="bg-muted/30 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Tasks</p>
                                <p className="font-medium">4 pending</p>
                              </div>
                              <div className="bg-muted/30 p-2 rounded-md text-center">
                                <p className="text-xs text-muted-foreground">Updates</p>
                                <p className="font-medium">3 new</p>
                              </div>
                            </div>
                          </>
                        )}

                        {startup.requestStatus === "pending" && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                            <div className="flex items-start gap-3">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-yellow-800">Request Pending</h4>
                                <p className="text-sm text-yellow-700">
                                  Your request to join {startup.name} is pending approval from the founder. You'll be
                                  notified once they respond.
                                </p>
                                <p className="text-xs text-yellow-600 mt-2">
                                  Requested on {new Date().toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/20 rounded-md p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          Recent Activity
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {startup.requestStatus === "accepted" ? (
                            <>
                              <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">Sarah</span> added a new task
                                <span className="block text-xs">2 hours ago</span>
                              </li>
                              <li className="text-muted-foreground">
                                <span className="font-medium text-foreground">Mike</span> uploaded new files
                                <span className="block text-xs">Yesterday</span>
                              </li>
                            </>
                          ) : (
                            <li className="text-muted-foreground">
                              No activity yet. Activity will be available once your request is accepted.
                            </li>
                          )}
                        </ul>
                      </div>

                      {startup.requestStatus === "accepted" && (
                        <div className="bg-muted/20 rounded-md p-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-2 text-primary" />
                            Team Members
                          </h4>
                          <div className="flex -space-x-2 overflow-hidden">
                            <Avatar className="border-2 border-background inline-block h-8 w-8">
                              <AvatarImage src={startup.founder.avatar} />
                              <AvatarFallback>{startup.founder.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background inline-block h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=AR" />
                              <AvatarFallback>AR</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background inline-block h-8 w-8">
                              <AvatarImage src="/placeholder.svg?height=32&width=32&text=JD" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-background inline-block h-8 w-8">
                              <AvatarFallback>+{startup.teamSize - 3}</AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex flex-wrap justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {startup.requestStatus === "accepted" ? (
                      <>
                        <Button variant="outline" size="sm" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Team Chat
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Documents
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message Founder
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-gradient-to-r from-primary to-primary/80"
                      onClick={() => openStartupDetails(startup)}
                    >
                      View Details
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {startup.requestStatus === "accepted" && (
                          <DropdownMenuItem>
                            <Settings className="h-4 w-4 mr-2" />
                            Project Settings
                          </DropdownMenuItem>
                        )}
                        {startup.requestStatus === "pending" && (
                          <DropdownMenuItem>
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Cancel Request
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {/* Startup Details Dialog */}
      <StartupDetailsDialog
        startup={selectedStartup}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onLike={() => {}}
        onFollow={() => {}}
      />
    </div>
  )
}


"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    title: "Startup Pitch Competition",
    description:
      "Present your startup idea to a panel of investors and industry experts for a chance to win funding and mentorship.",
    image: "/placeholder.svg?height=200&width=400&text=Pitch+Competition",
    date: "April 15, 2025",
    time: "2:00 PM - 5:00 PM EST",
    location: "Virtual Event",
    attendees: 250,
    category: "Competition",
    type: "upcoming",
  },
  {
    title: "Founder Networking Mixer",
    description:
      "Connect with fellow entrepreneurs, investors, and industry experts in a casual setting to expand your network.",
    image: "/placeholder.svg?height=200&width=400&text=Networking+Mixer",
    date: "April 22, 2025",
    time: "6:30 PM - 9:00 PM EST",
    location: "New York, NY",
    attendees: 120,
    category: "Networking",
    type: "upcoming",
  },
  {
    title: "Fundraising Masterclass",
    description: "Learn proven strategies for raising capital from experienced founders and venture capitalists.",
    image: "/placeholder.svg?height=200&width=400&text=Fundraising+Masterclass",
    date: "May 5, 2025",
    time: "1:00 PM - 3:00 PM EST",
    location: "Virtual Event",
    attendees: 180,
    category: "Workshop",
    type: "upcoming",
  },
  {
    title: "Tech Startup Summit",
    description:
      "A two-day conference featuring keynote speakers, panel discussions, and workshops on the latest trends in tech entrepreneurship.",
    image: "/placeholder.svg?height=200&width=400&text=Tech+Summit",
    date: "May 15-16, 2025",
    time: "9:00 AM - 5:00 PM EST",
    location: "San Francisco, CA",
    attendees: 500,
    category: "Conference",
    type: "upcoming",
  },
  {
    title: "AI in Business Workshop",
    description:
      "Discover how to leverage artificial intelligence to optimize your startup operations and drive growth.",
    image: "/placeholder.svg?height=200&width=400&text=AI+Workshop",
    date: "March 10, 2025",
    time: "10:00 AM - 12:00 PM EST",
    location: "Virtual Event",
    attendees: 150,
    category: "Workshop",
    type: "past",
  },
  {
    title: "Venture Capital Panel",
    description: "Hear from leading VCs about what they look for in startups and how to secure investment.",
    image: "/placeholder.svg?height=200&width=400&text=VC+Panel",
    date: "February 28, 2025",
    time: "3:00 PM - 5:00 PM EST",
    location: "Boston, MA",
    attendees: 200,
    category: "Panel",
    type: "past",
  },
]

export default function UpcomingEvents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [eventType, setEventType] = useState("upcoming")
  const [currentPage, setCurrentPage] = useState(0)

  const filteredEvents = events.filter((event) => event.type === eventType)
  const eventsPerPage = 3
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const displayedEvents = filteredEvents.slice(currentPage * eventsPerPage, (currentPage + 1) * eventsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Events & Webinars</h2>
            <p className="text-muted-foreground max-w-2xl">
              Join our community events to learn, network, and grow your startup
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setEventType}>
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value={eventType} className="mt-0">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {displayedEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-white hover:bg-primary/90">{event.category}</Badge>
                          </div>
                        </div>

                        <CardHeader className="pt-6">
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        </CardHeader>

                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-2 text-primary" />
                              <span>
                                {event.date} • {event.time}
                              </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-2 text-primary" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-4 w-4 mr-2 text-primary" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter>
                          <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                            {event.type === "upcoming" ? "Register Now" : "View Recording"}
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {totalPages > 1 && (
                <div className="flex justify-center mt-8 gap-2">
                  <Button variant="outline" size="icon" onClick={prevPage} className="rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>

                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          currentPage === index ? "bg-primary scale-125" : "bg-primary/30"
                        }`}
                        onClick={() => setCurrentPage(index)}
                        aria-label={`Go to page ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button variant="outline" size="icon" onClick={nextPage} className="rounded-full">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}


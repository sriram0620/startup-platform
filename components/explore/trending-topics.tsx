"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageSquare, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const trendingTopics = [
  {
    id: 1,
    title: "AI in Healthcare",
    discussions: 128,
    participants: 342,
    growth: "+24%",
    tags: ["AI", "Healthcare", "Technology"],
  },
  {
    id: 2,
    title: "Sustainable Business Models",
    discussions: 96,
    participants: 215,
    growth: "+18%",
    tags: ["Sustainability", "Business", "Environment"],
  },
  {
    id: 3,
    title: "Remote Work Tools",
    discussions: 112,
    participants: 289,
    growth: "+32%",
    tags: ["Remote Work", "Productivity", "SaaS"],
  },
  {
    id: 4,
    title: "Blockchain Applications",
    discussions: 87,
    participants: 176,
    growth: "+15%",
    tags: ["Blockchain", "Crypto", "Finance"],
  },
]

export default function TrendingTopics() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <div ref={ref} className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Trending Topics</h2>
        <Button variant="ghost" size="sm" className="text-primary group">
          View All
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-none shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-primary/10 text-primary">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {topic.growth}
                  </Badge>
                </div>

                <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">{topic.title}</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                  {topic.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="bg-secondary/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-primary" />
                    <span>{topic.discussions} discussions</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-primary" />
                    <span>{topic.participants} people</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


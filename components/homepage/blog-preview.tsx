"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Tips for Finding the Perfect Co-Founder",
    excerpt:
      "Finding the right co-founder can make or break your startup. Learn the key qualities to look for and red flags to avoid.",
    image: "/placeholder.svg?height=200&width=400&text=Co-Founder+Tips",
    author: "Sarah Johnson",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    category: "Team Building",
  },
  {
    title: "How to Create a Pitch Deck That Gets Funded",
    excerpt:
      "Learn the essential elements of a compelling pitch deck that will capture investors' attention and secure funding.",
    image: "/placeholder.svg?height=200&width=400&text=Pitch+Deck+Guide",
    author: "Michael Chen",
    date: "Mar 10, 2025",
    readTime: "8 min read",
    category: "Funding",
  },
  {
    title: "The Future of AI in Startup Innovation",
    excerpt:
      "Explore how artificial intelligence is transforming the startup landscape and creating new opportunities for entrepreneurs.",
    image: "/placeholder.svg?height=200&width=400&text=AI+Innovation",
    author: "David Park",
    date: "Mar 5, 2025",
    readTime: "6 min read",
    category: "Technology",
  },
]

export default function BlogPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Startup Resources</h2>
            <p className="text-muted-foreground max-w-2xl">
              Expert advice and insights to help you navigate your startup journey
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 group">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white hover:bg-primary/90">{post.category}</Badge>
                  </div>
                </div>

                <CardHeader className="pt-6">
                  <Link href="#" className="group">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  </Link>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center mr-4">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button variant="ghost" className="p-0 h-auto text-primary group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


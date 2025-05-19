"use client"

import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Search, Rocket } from "lucide-react"
import { motion, useInView } from "framer-motion"

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up & Build Your Profile",
    description: "Enter your experience, interests & skills to create a personalized profile.",
  },
  {
    icon: Search,
    title: "Explore & Connect",
    description: "Swipe through startup ideas, follow teams, and chat with potential collaborators.",
  },
  {
    icon: Rocket,
    title: "Collaborate & Grow",
    description: "Join teams, raise funds, and make an impact with your innovative ideas.",
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-24" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes it easy to bring your ideas to life in just three simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="border-none shadow-lg h-full bg-gradient-to-br from-white to-primary/5 z-10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 flex flex-col items-center text-center relative">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {/* Animated arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-pulse">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive demo preview */}
        <motion.div
          className="mt-16 p-6 bg-white rounded-xl shadow-xl border border-primary/10 max-w-3xl mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-sm text-muted-foreground">Platform Preview</div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src="/placeholder.svg?height=400&width=800&text=Interactive+Demo"
              alt="Platform Demo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

